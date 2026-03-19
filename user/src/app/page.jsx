"use client";

import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const services = [
  {
    icon: "🏠",
    title: "Rent Agreement",
    desc: "Create legally valid rental agreements instantly for any city.",
    href: "/services/rent-agreement",
    color: "#6C63FF",
  },
  {
    icon: "📜",
    title: "Domicile Certificate",
    desc: "Apply for a domicile / residence certificate for your state.",
    href: "/services/domicile",
    color: "#FF6584",
  },
  {
    icon: "💍",
    title: "Marriage Certificate",
    desc: "Register your marriage and get your certificate hassle-free.",
    href: "/services/marriage-certificate",
    color: "#10b981",
  },
  {
    icon: "✅",
    title: "Character Certificate",
    desc: "Obtain a character / police verification certificate easily.",
    href: "/services/character-certificate",
    color: "#f59e0b",
  },
];

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* ── Hero ── */}
      <section style={hero}>
        <div style={heroBg} />
        <div style={heroContent}>
          <span style={badge}>🚀 Fast & Trusted Document Services</span>
          <h1 style={heroTitle}>
            Government Documents<br />
            <span style={{ color: "var(--accent)" }}>Made Simple</span>
          </h1>
          <p style={heroSub}>
            Apply for rent agreements, domicile certificates, marriage certificates and character
            certificates — all from the comfort of your home.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/services" style={btnPrimary}>
              Browse Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section style={sectionStyle}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={sectionTitle}>Our Services</h2>
          <p style={sectionSub}>Select a service to get started with your application</p>
        </div>
        <div style={grid}>
          {services.map((s) => (
            <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
              <div style={card} className="service-card">
                <div style={{ ...iconBox, background: s.color + "18", color: s.color }}>
                  <span style={{ fontSize: 32 }}>{s.icon}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
                <span style={applyLink}>Apply Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ ...sectionStyle, background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={sectionTitle}>How It Works</h2>
          <p style={sectionSub}>Three simple steps to get your documents</p>
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { step: "1", icon: "📝", title: "Fill the Form", desc: "Provide your details in our easy-to-use forms" },
            { step: "2", icon: "📤", title: "Submit Application", desc: "We store your data securely and process it" },
            { step: "3", icon: "📄", title: "Get Your Document", desc: "Receive your document delivered at your doorstep" },
          ].map((s) => (
            <div key={s.step} style={stepCard}>
              <div style={stepNum}>{s.step}</div>
              <span style={{ fontSize: 36 }}>{s.icon}</span>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        .service-card { transition: transform .25s, box-shadow .25s; }
        .service-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

/* ── inline styles ── */
const hero = {
  position: "relative",
  minHeight: "85vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};
const heroBg = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(135deg, #6C63FF 0%, #a78bfa 50%, #FF6584 100%)",
  opacity: 0.08,
};
const heroContent = {
  position: "relative",
  textAlign: "center",
  maxWidth: 720,
  padding: "0 24px",
};
const badge = {
  display: "inline-block",
  background: "var(--primary)",
  color: "#fff",
  padding: "6px 18px",
  borderRadius: 50,
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 24,
};
const heroTitle = {
  fontSize: 52,
  fontWeight: 800,
  lineHeight: 1.15,
  color: "var(--text)",
  marginBottom: 20,
};
const heroSub = {
  fontSize: 18,
  color: "var(--text-secondary)",
  maxWidth: 560,
  margin: "0 auto 32px",
  lineHeight: 1.7,
};
const btnPrimary = {
  display: "inline-flex",
  alignItems: "center",
  padding: "14px 36px",
  background: "var(--primary)",
  color: "#fff",
  borderRadius: "var(--radius-sm)",
  fontWeight: 700,
  fontSize: 16,
  textDecoration: "none",
  margin: "0 auto",
};
const sectionStyle = {
  padding: "80px 24px",
  maxWidth: 1200,
  margin: "0 auto",
};
const sectionTitle = {
  fontSize: 32,
  fontWeight: 800,
  color: "var(--text)",
};
const sectionSub = {
  fontSize: 16,
  color: "var(--text-secondary)",
  marginTop: 8,
};
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 24,
};
const card = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius)",
  padding: 28,
  border: "1px solid var(--border)",
  cursor: "pointer",
};
const iconBox = {
  width: 56,
  height: 56,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
};
const applyLink = {
  display: "inline-block",
  marginTop: 14,
  fontSize: 14,
  fontWeight: 600,
  color: "var(--primary)",
};
const stepCard = {
  textAlign: "center",
  padding: 32,
  flex: "1 1 260px",
  maxWidth: 300,
};
const stepNum = {
  width: 36,
  height: 36,
  background: "var(--primary)",
  color: "#fff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: 16,
  margin: "0 auto 16px",
};
