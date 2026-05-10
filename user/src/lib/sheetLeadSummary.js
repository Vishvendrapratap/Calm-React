/** Human-readable labels for service slugs sent as `serviceType` */
const SERVICE_SLUG_TO_LABEL = {
  "rto-work": "RTO Work",
  "rent-agreement": "Rent Agreement",
  "police-verification": "Police Verification",
  "challan-settlement": "Challan Settlement",
  "domicile-certificate": "Domicile Certificate",
  "character-certificate": "Character Certificate",
  "marriage-certificate": "Marriage Certificate",
  /** Fallback when chat document type is missing */
  "navbar-whatsapp": "Navbar WhatsApp",
};

function pickFirstNonEmpty(...vals) {
  for (const v of vals) {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      return String(v).trim();
    }
  }
  return "BLANK";
}

/**
 * Canonical fields for Google Sheets / Apps Script (`data.sheet`).
 * Resolves varying form keys (fullName vs applicantName vs tenantName, etc.).
 */
export function buildSheetSummary(rawBody, { leadId, submittedAtIso, source }) {
  const d = rawBody || {};

  const serviceLabel =
    source === "raise-inquiry"
      ? pickFirstNonEmpty(d.documentType)
      : source === "navbar-whatsapp"
        ? pickFirstNonEmpty(
            d.query,
            d.documentType,
            d.serviceType ? SERVICE_SLUG_TO_LABEL[d.serviceType] : undefined,
            d.serviceType
          )
        : pickFirstNonEmpty(
            d.serviceType ? SERVICE_SLUG_TO_LABEL[d.serviceType] : undefined,
            d.serviceType
          );

  const serviceKey =
    source === "raise-inquiry"
      ? pickFirstNonEmpty(d.documentType)
      : pickFirstNonEmpty(d.serviceType);

  const name = pickFirstNonEmpty(
    d.name,
    d.fullName,
    d.applicantName,
    d.tenantName,
    d.husbandName
  );

  const email = pickFirstNonEmpty(d.email, d.tenantEmail, d.husbandEmail, d.landlordEmail);

  const phone = pickFirstNonEmpty(d.phone, d.tenantPhone, d.husbandPhone, d.landlordPhone);

  /** Free-text need / message — navbar chat and inquiries */
  const leadQuery = pickFirstNonEmpty(d.query, d.description, d.message);

  const leadUrgency = pickFirstNonEmpty(d.urgency, d.priority);

  const state = pickFirstNonEmpty(d.state);
  const city = pickFirstNonEmpty(d.city);

  /** Ready for `appendRow` — exactly: Name | Service | Email | Phone */
  const sheetRowLead = [name, serviceLabel, email, phone];

  return {
    sheet: {
      submittedAtIso,
      leadId,
      serviceKey,
      serviceLabel,
      name,
      email,
      phone,
      state,
      city,
      query: leadQuery,
      urgency: leadUrgency,
    },
    /** Flat mirrors for Apps Script (no nesting) */
    leadName: name,
    leadService: serviceLabel,
    leadEmail: email,
    leadPhone: phone,
    leadState: state,
    leadCity: city,
    leadQuery,
    leadUrgency,
    /** Use in Apps Script: `sheet.appendRow(data.sheetRowLead)` → 4 columns */
    sheetRowLead,
    /** Navbar / WhatsApp chat shortcut: Name | Email | Query | Urgency */
    sheetRowNavbar: [name, email, leadQuery, leadUrgency],
    /** Optional: time + id + 4 lead fields + location */
    sheetRowFull: [submittedAtIso, leadId, name, serviceLabel, email, phone, state, city],
  };
}
