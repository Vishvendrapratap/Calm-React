import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");

/** Empty / whitespace-only values stored as this literal in Excel & Google Sheet payloads */
export const SHEET_BLANK = "BLANK";

export function valueOrBlank(v) {
  if (v === null || v === undefined) return SHEET_BLANK;
  if (typeof v === "number") {
    if (Number.isNaN(v)) return SHEET_BLANK;
    return v;
  }
  if (typeof v === "boolean") return v;
  if (typeof v === "string" && v.trim() === "") return SHEET_BLANK;
  return v;
}

/** Normalize all keys so omitted user input is stored as SHEET_BLANK */
export function normalizeBlankFields(record) {
  if (!record || typeof record !== "object") return {};
  const out = {};
  for (const [k, v] of Object.entries(record)) {
    out[k] = valueOrBlank(v);
  }
  return out;
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Persists a submission row to data/<serviceType>.xlsx (same layout as before).
 * @returns {{ id: number, fileName: string }}
 */
export function saveToLocalXlsx(serviceType, formData) {
  ensureDir();

  const fileName = `${serviceType}.xlsx`;
  const filePath = path.join(DATA_DIR, fileName);

  let workbook;
  let rows = [];

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    rows = XLSX.utils.sheet_to_json(sheet);
  } else {
    workbook = XLSX.utils.book_new();
  }

  const normalized = normalizeBlankFields(formData);

  const newRow = {
    ID: rows.length + 1,
    SubmittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ...normalized,
  };

  rows.push(newRow);

  const newSheet = XLSX.utils.json_to_sheet(rows);

  const colWidths = Object.keys(newRow).map((key) => ({
    wch: Math.max(key.length, String(newRow[key] || "").length) + 4,
  }));
  newSheet["!cols"] = colWidths;

  if (workbook.SheetNames.length > 0) {
    workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  } else {
    XLSX.utils.book_append_sheet(workbook, newSheet, "Applications");
  }

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  fs.writeFileSync(filePath, buffer);

  return { id: newRow.ID, fileName };
}

function normalizeGoogleAppsScriptUrl(raw) {
  if (!raw || typeof raw !== "string") {
    throw new Error("GOOGLE_APPS_SCRIPT_INQUIRY_URL is not set");
  }
  let u = raw.trim();
  if (!/^https:\/\//i.test(u)) {
    throw new Error("GOOGLE_APPS_SCRIPT_INQUIRY_URL must use https://");
  }
  // Common mistake: missing /exec
  if (/script\.google\.com\/macros\/s\/[^/]+\/?$/i.test(u)) {
    u = u.replace(/\/?$/, "/exec");
  }
  if (!/\/exec(\?|$)/i.test(u)) {
    throw new Error(
      "GOOGLE_APPS_SCRIPT_INQUIRY_URL must be the Web App URL ending in /exec (Deploy → copy URL from Apps Script, not the spreadsheet link)"
    );
  }
  return u;
}

/**
 * POST JSON to Apps Script /exec. Tries redirect: follow first (303/307-friendly),
 * then manual POST-on-each-redirect (302 chain). Some URLs return 405 + Google HTML
 * when the env URL is wrong or POST is dropped — normalizeGoogleAppsScriptUrl helps.
 */
async function postGoogleAppsScriptWebhook(startUrl, jsonBody) {
  const baseUrl = normalizeGoogleAppsScriptUrl(startUrl);
  const body = JSON.stringify(jsonBody);
  const jsonHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json, text/plain, */*",
    "User-Agent": "KaamZy-Server/1.0",
  };

  let res = await fetch(baseUrl, {
    method: "POST",
    headers: jsonHeaders,
    body,
    redirect: "follow",
  });

  if (res.ok) return res;

  // follow may turn POST→GET on 302 and hit the wrong handler — retry preserving POST per hop
  if (res.status === 405 || res.status === 403 || res.status === 404) {
    res = await postGoogleAppsScriptManualRedirects(baseUrl, body, jsonHeaders);
    if (res.ok) return res;
  }

  // Some deployments accept form body better than raw JSON from servers
  if (res.status === 405) {
    const formHeaders = {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      Accept: "application/json, text/plain, */*",
      "User-Agent": "KaamZy-Server/1.0",
    };
    const formBody = new URLSearchParams();
    formBody.set("payload", body);
    res = await fetch(baseUrl, {
      method: "POST",
      headers: formHeaders,
      body: formBody.toString(),
      redirect: "follow",
    });
    if (res.ok) return res;
    if (res.status === 405) {
      res = await postGoogleAppsScriptManualRedirects(baseUrl, formBody.toString(), formHeaders);
    }
  }

  return res;
}

async function postGoogleAppsScriptManualRedirects(startUrl, bodyString, headers) {
  let url = startUrl;
  for (let i = 0; i < 8; i++) {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: bodyString,
      redirect: "manual",
    });

    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) {
        throw new Error(`Google Apps Script redirect ${res.status} without Location header`);
      }
      url = new URL(loc, url).href;
      continue;
    }

    return res;
  }

  throw new Error("Too many redirects posting to Google Apps Script");
}

/**
 * POST JSON to a Google Apps Script web app deployed from your Sheet.
 * Script must implement doPost(e) and append a row; optional shared secret in env.
 */
export async function appendToGoogleAppsScript(payload) {
  const url = process.env.GOOGLE_APPS_SCRIPT_INQUIRY_URL;
  if (!url) return { skipped: true };

  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  const body = secret ? { ...payload, _secret: secret } : payload;

  const res = await postGoogleAppsScriptWebhook(url, body);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const hint405 =
      res.status === 405
        ? " Web App URL must end with /exec (Apps Script → Deploy → Web app). Do not use the spreadsheet browser URL."
        : "";
    throw new Error(`Google Sheet webhook returned ${res.status}:${hint405} ${text.slice(0, 200)}`);
  }

  return { skipped: false };
}
