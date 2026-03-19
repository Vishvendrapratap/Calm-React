"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const services = [
  {
    icon: "🏠",
    title: "Rent Agreement",
    desc: "Create legally valid rental agreements for residential or commercial properties. Select your city and fill landlord/tenant details.",
    href: "/services/rent-agreement",
    color: "#6C63FF",
  },
  {
    icon: "📜",
    title: "Domicile Certificate",
    desc: "Apply for a domicile / residence certificate proving you are a resident of a particular state. Required for admissions, jobs, etc.",
    href: "/services/domicile",
    color: "#FF6584",
  },
  {
    icon: "💍",
    title: "Marriage Certificate",
    desc: "Register your marriage officially and receive your marriage certificate. Required for passport, visa, and legal proceedings.",
    href: "/services/marriage-certificate",
    color: "#10b981",
  },
  {
    icon: "✅",
    title: "Character Certificate",
    desc: "Obtain a character / police verification certificate. Needed for employment, higher studies, and government applications.",
    href: "/services/character-certificate",
    color: "#f59e0b",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <Navbar />
      <section style={wrapper}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={heading}>Our Document Services</h1>
          <p style={sub}>Choose a service below to begin your application</p>
        </div>
        <div style={grid}>
          {services.map((s) => (
            <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
              <div style={card} className="service-card">
                <div style={{ ...iconBox, background: s.color + "15", color: s.color }}>
                  <span style={{ fontSize: 36 }}>{s.icon}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{s.desc}</p>
                <span style={applyBtn}>Apply Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
      <style>{`
        .service-card { transition: transform .25s, box-shadow .25s; }
        .service-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
      `}</style>
    </div>
  );
}

const wrapper = { maxWidth: 1200, margin: "0 auto", padding: "60px 24px" };
const heading = { fontSize: 36, fontWeight: 800, color: "var(--text)" };
const sub = { fontSize: 16, color: "var(--text-secondary)", marginTop: 8 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 };
const card = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius)",
  padding: 32,
  border: "1px solid var(--border)",
  height: "100%",
  cursor: "pointer",
};
const iconBox = {
  width: 64, height: 64, borderRadius: 14,
  display: "flex", alignItems: "center", justifyContent: "center",
  marginBottom: 20,
};
const applyBtn = {
  display: "inline-block", marginTop: 18, fontSize: 15, fontWeight: 700, color: "var(--primary)",
};
