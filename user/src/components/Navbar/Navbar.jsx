"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Landmark, MessageCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link href="/" style={styles.logo}>
          <span style={styles.logoIcon}>
            <Landmark size={24} strokeWidth={2.2} />
          </span>
          <span style={styles.logoName}>Kaa<span style={{ color: "var(--accent)" }}>mZy</span></span>
        </Link>

        <nav style={styles.nav}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                ...styles.link,
                ...(pathname === l.href ? styles.activeLink : {}),
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/?chat=1"
          style={styles.cta}
        >
          <MessageCircle size={16} strokeWidth={2.4} />
          WhatsApp
        </Link>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,.72)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(226,232,240,.75)",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "10px 24px",
    minHeight: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 21,
    fontWeight: 800,
    color: "var(--primary)",
    textDecoration: "none",
  },
  logoIcon: { display: "inline-flex", alignItems: "center", justifyContent: "center" },
  logoName: {
    fontFamily: "var(--font-display)",
    fontWeight: 900,
    letterSpacing: ".03em",
    lineHeight: 1,
  },
  nav: {
    display: "flex",
    gap: 8,
    padding: 4,
    borderRadius: 999,
    background: "rgba(255,255,255,.7)",
    border: "1px solid rgba(226,232,240,.9)",
  },
  link: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--text-secondary)",
    textDecoration: "none",
    transition: "color var(--transition)",
    padding: "8px 14px",
    borderRadius: 999,
  },
  activeLink: {
    color: "#fff",
    background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
    boxShadow: "0 6px 16px rgba(18,109,56,.22)",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    background: "#22c55e",
    color: "#fff",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    transition: "transform var(--transition), background var(--transition)",
  },
};
