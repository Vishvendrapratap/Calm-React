"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.brand}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "var(--primary)" }}>
            📄 Doc<span style={{ color: "var(--accent)" }}>Ease</span>
          </span>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 8 }}>
            Making government document services simple, fast, and hassle-free.
          </p>
        </div>
        <div style={styles.links}>
          <h4 style={styles.linkTitle}>Services</h4>
          <Link href="/services/rent-agreement" style={styles.link}>Rent Agreement</Link>
          <Link href="/services/domicile" style={styles.link}>Domicile Certificate</Link>
          <Link href="/services/marriage-certificate" style={styles.link}>Marriage Certificate</Link>
          <Link href="/services/character-certificate" style={styles.link}>Character Certificate</Link>
        </div>
        <div style={styles.links}>
          <h4 style={styles.linkTitle}>Quick Links</h4>
          <Link href="/" style={styles.link}>Home</Link>
          <Link href="/services" style={styles.link}>All Services</Link>
        </div>
      </div>
      <div style={styles.bottom}>
        <p>© {new Date().getFullYear()} DocEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#1e1e2f",
    color: "#fff",
    paddingTop: 48,
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: 40,
  },
  brand: {},
  links: { display: "flex", flexDirection: "column", gap: 8 },
  linkTitle: { fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, color: "var(--primary-light)" },
  link: { fontSize: 14, color: "#ccc", textDecoration: "none" },
  bottom: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "20px 24px",
    marginTop: 40,
    borderTop: "1px solid rgba(255,255,255,.1)",
    fontSize: 13,
    color: "#888",
    textAlign: "center",
  },
};
