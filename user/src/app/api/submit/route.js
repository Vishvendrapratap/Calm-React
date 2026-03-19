import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { serviceType, ...formData } = body;

    if (!serviceType) {
      return NextResponse.json({ error: "serviceType is required" }, { status: 400 });
    }

    ensureDir();

    const fileName = `${serviceType}.xlsx`;
    const filePath = path.join(DATA_DIR, fileName);

    let workbook;
    let rows = [];

    // If file exists, read existing data
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(sheet);
    } else {
      workbook = XLSX.utils.book_new();
    }

    // Add timestamp and ID
    const newRow = {
      ID: rows.length + 1,
      SubmittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ...formData,
    };

    rows.push(newRow);

    // Create new sheet from updated rows
    const newSheet = XLSX.utils.json_to_sheet(rows);

    // Auto-size columns
    const colWidths = Object.keys(newRow).map((key) => ({
      wch: Math.max(key.length, String(newRow[key] || "").length) + 4,
    }));
    newSheet["!cols"] = colWidths;

    // Replace or add sheet
    if (workbook.SheetNames.length > 0) {
      workbook.Sheets[workbook.SheetNames[0]] = newSheet;
    } else {
      XLSX.utils.book_append_sheet(workbook, newSheet, "Applications");
    }

    // Write file
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      id: newRow.ID,
      file: fileName,
    });
  } catch (err) {
    console.error("Excel save error:", err);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }
}
