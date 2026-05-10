"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Shown after a successful form submit before WhatsApp / success navigation.
 * Portals to document.body so parent overflow/transform cannot clip the note row.
 */
export default function PostSubmitNoticeModal({ open, onContinue }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      style={overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-submit-notice-title"
    >
      <div style={overlayInner} onClick={onContinue}>
        <div style={card} onClick={(e) => e.stopPropagation()}>
          <h3 id="post-submit-notice-title" style={title}>
            Thank you
          </h3>
          <p style={body}>If you don&apos;t want to chat directly, we got you. We have your details and will get back to you.</p>
          <button type="button" style={btn} onClick={onContinue}>
            Continue to WhatsApp
          </button>
          <div style={hintBox} role="note">
            <span style={hintIconWrap} aria-hidden>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                <circle cx="12" cy="12" r="10" stroke="#1e40af" strokeWidth="2" />
                <path d="M12 16v-5M12 8h.01" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span style={hintText}>
              We store your data to reach out in case you miss texting on WhatsApp as soon as you click
              Continue.
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  zIndex: 99999,
  background: "rgba(15, 23, 42, 0.55)",
  boxSizing: "border-box",
  overflowY: "auto",
  overflowX: "hidden",
  WebkitOverflowScrolling: "touch",
  overscrollBehavior: "contain",
};

/** Centers the card when it fits; when taller than the viewport, the outer overlay scrolls so the hint stays reachable. */
const overlayInner = {
  minHeight: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  boxSizing: "border-box",
};

const card = {
  maxWidth: 420,
  width: "100%",
  background: "#fff",
  borderRadius: "var(--radius-md, 12px)",
  padding: "28px 24px",
  paddingBottom: 24,
  boxShadow: "0 24px 48px rgba(15, 23, 42, 0.18)",
  border: "1px solid var(--border, #e8e6f5)",
  overflow: "visible",
};

const title = {
  margin: "0 0 12px",
  fontSize: 22,
  fontWeight: 800,
  color: "var(--text, #1a1635)",
};

const body = {
  margin: "0 0 22px",
  fontSize: 15,
  lineHeight: 1.55,
  color: "var(--text-muted, #4b5563)",
};

const btn = {
  width: "100%",
  padding: "14px 20px",
  border: "none",
  borderRadius: "var(--radius-sm, 8px)",
  background: "var(--primary, #6c63ff)",
  color: "#fff",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};

const hintBox = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  marginTop: 16,
  padding: "12px 12px",
  background: "#eff6ff",
  borderRadius: 10,
  border: "1px solid #bfdbfe",
  flexShrink: 0,
  color: "#1e293b",
};

const hintIconWrap = {
  flexShrink: 0,
  display: "inline-flex",
  marginTop: 1,
};

const hintText = {
  fontSize: 13,
  lineHeight: 1.5,
  color: "#1e293b",
};
