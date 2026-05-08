"use client";

import Link from "next/link";
import { FileBadge2, FileText, IdCard, MessageCircle, ReceiptText, ShieldCheck } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const services = [
  {
    icon: FileText,
    title: "Rent Agreement",
    desc: "Create legally valid rental agreements with landlord, tenant and property details.",
    href: "/services/rent-agreement",
    color: "#1f8a4c",
  },
  {
    icon: ShieldCheck,
    title: "Police Verification",
    desc: "Apply for tenant, employee or personal police verification in a guided flow.",
    href: "/services/police-verification",
    color: "#f08a24",
  },
  {
    icon: FileBadge2,
    title: "Domicile Certificate",
    desc: "Apply for domicile certificate with guided details and support.",
    href: "/services/domicile",
    color: "#0ea5a4",
  },
  {
    icon: ReceiptText,
    title: "Challan Settlement",
    desc: "Resolve pending challans with simple document sharing and support.",
    href: "/services/challan-settlement",
    color: "#9333ea",
  },
  {
    icon: IdCard,
    title: "RTO Work",
    desc: "Fitness, license issues, and RTO-related requests handled in one flow.",
    href: "/services/rto-work",
    color: "#ea580c",
  },
  {
    icon: ShieldCheck,
    title: "Character Certificate",
    desc: "Apply for character certificate and police clearance support.",
    href: "/services/character-certificate",
    color: "#0891b2",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <Navbar />
      <section style={wrapper} className="emblem-panel">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={heading}>Our Document Services</h1>
          <p style={sub}>Choose a service below to begin your application in minutes</p>
        </div>
        <div style={grid}>
          {services.map((s) => (
            <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
              <div style={card} className="service-card tile-emblem heritage-corner">
                <div style={{ ...iconBox, background: s.color + "15", color: s.color }}>
                  <s.icon size={30} strokeWidth={2.2} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{s.desc}</p>
                <span style={applyBtn}>
                  <MessageCircle size={15} strokeWidth={2.3} />
                  Chat with us
                </span>
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
  display: "inline-flex", alignItems: "center", gap: 7, marginTop: 18, fontSize: 15, fontWeight: 700, color: "var(--primary)",
};
