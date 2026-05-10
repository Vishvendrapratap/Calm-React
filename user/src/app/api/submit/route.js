import { NextResponse } from "next/server";
import {
  appendToGoogleAppsScript,
  normalizeBlankFields,
  saveToLocalXlsx,
} from "../../../lib/saveSubmission";
import { buildSheetSummary } from "../../../lib/sheetLeadSummary";

/** Name + phone + email (tenant/husband variants where applicable). */
const CONTACT_TRIO_KEYS = {
  "rto-work": ["fullName", "phone", "email"],
  "rent-agreement": ["tenantName", "tenantPhone", "tenantEmail"],
  "police-verification": ["applicantName", "phone", "email"],
  "challan-settlement": ["fullName", "phone", "email"],
  "domicile-certificate": ["fullName", "phone", "email"],
  "character-certificate": ["fullName", "phone", "email"],
  "marriage-certificate": ["husbandName", "husbandPhone", "husbandEmail"],
};

function missingContactFields(serviceType, formData) {
  const keys = CONTACT_TRIO_KEYS[serviceType];
  if (!keys) return ["serviceType"];
  return keys.filter((k) => {
    const v = formData[k];
    return v === undefined || v === null || String(v).trim() === "";
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { serviceType, ...formData } = body;

    if (!serviceType) {
      return NextResponse.json({ error: "serviceType is required" }, { status: 400 });
    }

    const missing = missingContactFields(serviceType, formData);
    if (missing.length) {
      return NextResponse.json(
        {
          error:
            missing[0] === "serviceType"
              ? "Unsupported service type"
              : `Required: name, phone, and email for this form (${missing.join(", ")})`,
        },
        { status: 400 }
      );
    }

    const { id, fileName } = saveToLocalXlsx(serviceType, formData);

    let googleSync = "skipped";
    try {
      const submittedAtIso = new Date().toISOString();
      await appendToGoogleAppsScript({
        ...normalizeBlankFields(body),
        ...buildSheetSummary(body, {
          leadId: id,
          submittedAtIso,
          source: "service-form",
        }),
        source: "service-form",
        leadId: id,
        submittedAtIso,
      });
      googleSync = process.env.GOOGLE_APPS_SCRIPT_INQUIRY_URL ? "ok" : "skipped";
    } catch (err) {
      console.error("Google Sheet service-form sync failed:", err);
      googleSync = "failed";
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      id,
      file: fileName,
      googleSync,
    });
  } catch (err) {
    console.error("Excel save error:", err);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }
}
