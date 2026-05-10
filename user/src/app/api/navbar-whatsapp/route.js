import { NextResponse } from "next/server";
import { appendToGoogleAppsScript, normalizeBlankFields } from "../../../lib/saveSubmission";
import { buildSheetSummary } from "../../../lib/sheetLeadSummary";

/**
 * Logs a row when the user completes the home WhatsApp chat sheet (opened via navbar → /?chat=1).
 * Expects JSON: name, email, query, urgency (aliases: fullName, description, message, priority).
 */
export async function POST(request) {
  try {
    let parsed = {};
    try {
      parsed = await request.json();
    } catch {
      /* empty or invalid JSON */
    }

    const submittedAtIso = new Date().toISOString();
    const merged = normalizeBlankFields({
      serviceType: "navbar-whatsapp",
      name: parsed.name ?? parsed.fullName,
      fullName: parsed.fullName ?? parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      query: parsed.query ?? parsed.description ?? parsed.message,
      urgency: parsed.urgency ?? parsed.priority,
    });

    await appendToGoogleAppsScript({
      ...merged,
      ...buildSheetSummary(
        { ...merged, serviceType: "navbar-whatsapp" },
        {
          leadId: 0,
          submittedAtIso,
          source: "navbar-whatsapp",
        }
      ),
      source: "navbar-whatsapp",
      leadId: 0,
      submittedAtIso,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Navbar WhatsApp sheet sync:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
