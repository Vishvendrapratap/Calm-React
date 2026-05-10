import { NextResponse } from "next/server";
import { appendToGoogleAppsScript, normalizeBlankFields, saveToLocalXlsx } from "../../../lib/saveSubmission";
import { buildSheetSummary } from "../../../lib/sheetLeadSummary";

const SERVICE_TYPE = "raise-inquiry";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      documentType,
      priority,
      description,
      expectedDate,
      attachmentFileName,
    } = body;

    if (!fullName?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "fullName, email, and phone are required" },
        { status: 400 }
      );
    }

    const row = {
      fullName,
      email,
      phone,
      documentType,
      priority,
      description,
      expectedDate,
      attachmentFileName,
    };

    const { id, fileName } = saveToLocalXlsx(SERVICE_TYPE, row);

    let googleSync = "skipped";
    try {
      const submittedAtIso = new Date().toISOString();
      await appendToGoogleAppsScript({
        ...normalizeBlankFields(body),
        ...buildSheetSummary(body, {
          leadId: id,
          submittedAtIso,
          source: "raise-inquiry",
        }),
        source: "raise-inquiry",
        leadId: id,
        submittedAtIso,
      });
      googleSync = process.env.GOOGLE_APPS_SCRIPT_INQUIRY_URL ? "ok" : "skipped";
    } catch (err) {
      console.error("Google Sheet inquiry sync failed:", err);
      googleSync = "failed";
    }

    return NextResponse.json({
      success: true,
      id,
      file: fileName,
      googleSync,
    });
  } catch (err) {
    console.error("Inquiry save error:", err);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
