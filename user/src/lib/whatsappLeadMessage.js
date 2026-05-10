/**
 * Compact WhatsApp text after a lead is captured — full details stay in Google Sheet / backend.
 */
export function buildShortLeadWhatsAppMessage({ name, phone, serviceLabel, urgency }) {
  const n = (name && String(name).trim()) || "—";
  const p = (phone && String(phone).trim()) || "—";
  const s = (serviceLabel && String(serviceLabel).trim()) || "—";
  const u =
    urgency !== undefined && urgency !== null && String(urgency).trim() !== ""
      ? String(urgency).trim()
      : "Not specified";
  return ["New KaamZy lead", `Name: ${n}`, `Phone: ${p}`, `Service: ${s}`, `Urgency: ${u}`].join("\n");
}
