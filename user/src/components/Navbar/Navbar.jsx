"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
          <span style={styles.logoIcon}>📄</span>
          <span>Doc<span style={{ color: "var(--accent)" }}>Ease</span></span>
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

        <Link href="/services" style={styles.cta}>
          Apply Now
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
    background: "rgba(255,255,255,.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border)",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 22,
    fontWeight: 800,
    color: "var(--primary)",
    textDecoration: "none",
  },
  logoIcon: { fontSize: 26 },
  nav: { display: "flex", gap: 32 },
  link: {
    fontSize: 15,
    fontWeight: 500,
    color: "var(--text-secondary)",
    textDecoration: "none",
    transition: "color var(--transition)",
    padding: "6px 0",
  },
  activeLink: {
    color: "var(--primary)",
    fontWeight: 600,
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    background: "var(--primary)",
    color: "#fff",
    borderRadius: "var(--radius-sm)",
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    transition: "background var(--transition)",
  },
};
