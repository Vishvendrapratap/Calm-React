"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function SuccessContent() {
  const params = useSearchParams();
  const service = params.get("service") || "Document";
  const id = params.get("id") || "—";

  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={checkCircle}>✓</div>
        <h1 style={title}>Application Submitted!</h1>
        <p style={sub}>
          Your <strong>{service}</strong> application has been received and
          saved successfully.
        </p>
        <div style={idBox}>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Application ID
          </span>
          <span
            style={{ fontSize: 28, fontWeight: 800, color: "var(--primary)" }}
          >
            #{id}
          </span>
        </div>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            maxWidth: 420,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          We have saved your details. Our team will review your application and
          get in touch with you shortly.
        </p>
        <div style={btnGroup}>
          <Link href="/services" style={btnPrimary}>
            Apply for Another Service
          </Link>
          <Link href="/" style={btnSecondary}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div>
      <Navbar />
      <Suspense
        fallback={
          <div style={{ padding: 80, textAlign: "center" }}>Loading...</div>
        }
      >
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}

const wrapper = {
  maxWidth: 600,
  margin: "0 auto",
  padding: "60px 24px",
  textAlign: "center",
};
const card = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius)",
  padding: "48px 36px",
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow)",
};
const checkCircle = {
  width: 72,
  height: 72,
  borderRadius: "50%",
  background: "var(--success)",
  color: "#fff",
  fontSize: 36,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
};
const title = {
  fontSize: 28,
  fontWeight: 800,
  color: "var(--text)",
  marginBottom: 8,
};
const sub = { fontSize: 16, color: "var(--text-secondary)", marginBottom: 24 };
const idBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  background: "rgba(108,99,255,.06)",
  borderRadius: "var(--radius-sm)",
  padding: "16px 32px",
  margin: "0 auto 24px",
  maxWidth: 200,
};
const btnGroup = {
  display: "flex",
  gap: 16,
  justifyContent: "center",
  marginTop: 32,
  flexWrap: "wrap",
};
const btnPrimary = {
  padding: "12px 28px",
  background: "var(--primary)",
  color: "#fff",
  borderRadius: "var(--radius-sm)",
  fontWeight: 700,
  fontSize: 15,
  textDecoration: "none",
};
const btnSecondary = {
  padding: "12px 28px",
  background: "transparent",
  border: "2px solid var(--primary)",
  color: "var(--primary)",
  borderRadius: "var(--radius-sm)",
  fontWeight: 700,
  fontSize: 15,
  textDecoration: "none",
};
