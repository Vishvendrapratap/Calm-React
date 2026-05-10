"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FileText, MessageCircle } from "lucide-react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import FormField from "../../../components/FormField/FormField";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import PostSubmitNoticeModal from "../../../components/PostSubmitNoticeModal/PostSubmitNoticeModal";
import STATES_AND_CITIES from "../../../data/indianStatesAndCities";
import { buildShortLeadWhatsAppMessage } from "../../../lib/whatsappLeadMessage";

const initialState = {
  landlordName: "",
  landlordPhone: "",
  landlordEmail: "",
  tenantName: "",
  tenantPhone: "",
  tenantEmail: "",
  propertyAddress: "",
  state: "",
  city: "",
  monthlyRent: "",
  securityDeposit: "",
  agreementStartDate: "",
  agreementDuration: "",
  specialTerms: "",
};

export default function RentAgreementPage() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const nextAfterNoticeRef = useRef(null);
  const router = useRouter();

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceType: "rent-agreement", ...form }),
      });
      const data = await res.json();
      if (data.success) {
        nextAfterNoticeRef.current = () => {
          const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919336552858";
          const message = buildShortLeadWhatsAppMessage({
            name: form.tenantName,
            phone: form.tenantPhone,
            serviceLabel: "Rent Agreement",
            urgency: "Not specified",
          });

          window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          setTimeout(() => {
            router.push(`/success?service=Rent Agreement&id=${data.id}`);
          }, 1200);
        };
        setNoticeOpen(true);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openWhatsAppChat = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919336552858";
    const message =
      "Hi Kaamzy team, I want help with Rent Agreement service. Please assist me.";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div>
      <Navbar />
      <div style={wrapper}>
        <div style={header}>
          <span style={iconBadge}>
            <FileText size={36} strokeWidth={2.2} />
          </span>
          <h1 style={title}>Rent Agreement</h1>
        </div>

        <section style={heroCard}>
          <div style={heroImage} aria-hidden />
          <div style={heroOverlay} />
          <div style={heroContent}>
            <h1 style={heroTitle}>Fill the form or chat with us directly.</h1>
            <p style={heroSub}>
              Mobile-first flow for landlords and tenants. Fill once, submit, and
              continue instantly on WhatsApp.
            </p>
          </div>
        </section>

        <p style={hintText}>After submission, we will open WhatsApp with your lead details prefilled.</p>

        <button type="button" onClick={openWhatsAppChat} style={whatsappBtn}>
          <span style={whatsappIcon}>
            <MessageCircle size={18} strokeWidth={2.5} />
          </span>
          Chat with us on WhatsApp
        </button>

        <form onSubmit={submit} style={formCard} className="heritage-form-center">
          {/* Landlord */}
          <h2 style={sectionHead}>Landlord Details</h2>
          <div style={grid}>
            <FormField label="Full Name" name="landlordName" value={form.landlordName} onChange={handle} placeholder="Landlord full name" />
            <FormField label="Phone Number" name="landlordPhone" type="tel" value={form.landlordPhone} onChange={handle} placeholder="10-digit phone" />
            <FormField label="Email" name="landlordEmail" type="email" value={form.landlordEmail} onChange={handle} placeholder="email@example.com" />
          </div>

          {/* Tenant */}
          <h2 style={sectionHead}>Tenant Details</h2>
          <div style={grid}>
            <FormField label="Full Name" name="tenantName" value={form.tenantName} onChange={handle} placeholder="Tenant full name" required />
            <FormField label="Phone Number" name="tenantPhone" type="tel" value={form.tenantPhone} onChange={handle} placeholder="10-digit phone" required />
            <FormField label="Email" name="tenantEmail" type="email" value={form.tenantEmail} onChange={handle} placeholder="email@example.com" required />
          </div>

          {/* Property */}
          <h2 style={sectionHead}>Property & Agreement Details</h2>
          <FormField label="Property Address" name="propertyAddress" type="textarea" value={form.propertyAddress} onChange={handle} placeholder="Full address of the property" rows={3} />
          <div style={{ ...grid, marginTop: 16 }}>
            <FormField label="State" name="state" type="select" value={form.state} onChange={handle} options={Object.keys(STATES_AND_CITIES)} placeholder="Select State" />
            <FormField label="City" name="city" type="select" value={form.city} onChange={handle} options={form.state ? STATES_AND_CITIES[form.state] : []} placeholder="Select City" />
            <FormField label="Monthly Rent (₹)" name="monthlyRent" type="number" value={form.monthlyRent} onChange={handle} placeholder="e.g. 15000" />
            <FormField label="Security Deposit (₹)" name="securityDeposit" type="number" value={form.securityDeposit} onChange={handle} placeholder="e.g. 30000" />
            <FormField label="Start Date" name="agreementStartDate" type="date" value={form.agreementStartDate} onChange={handle} />
            <FormField label="Duration (months)" name="agreementDuration" type="number" value={form.agreementDuration} onChange={handle} placeholder="e.g. 11" />
          </div>
          <div style={{ marginTop: 16 }}>
            <FormField label="Special Terms / Conditions" name="specialTerms" type="textarea" value={form.specialTerms} onChange={handle} placeholder="Any additional terms…" rows={3} />
          </div>

          <div style={{ marginTop: 28 }}>
            <SubmitButton loading={loading} label="Submit Rent Agreement" />
          </div>
        </form>
      </div>
      <Footer />
      <PostSubmitNoticeModal
        open={noticeOpen}
        onContinue={() => {
          setNoticeOpen(false);
          nextAfterNoticeRef.current?.();
          nextAfterNoticeRef.current = null;
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const wrapper = { maxWidth: 800, margin: "0 auto", padding: "40px 24px" };
const heroCard = {
  position: "relative",
  minHeight: 240,
  borderRadius: 18,
  overflow: "hidden",
  marginBottom: 26,
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow)",
};
const heroImage = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=70)",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
const heroOverlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(120deg, rgba(18,109,56,.92), rgba(18,109,56,.55) 58%, rgba(240,138,36,.65))",
};
const heroContent = {
  position: "relative",
  color: "#fff",
  padding: "28px 24px",
  maxWidth: 520,
};
const heroBadge = {
  display: "inline-block",
  fontSize: 12,
  fontWeight: 700,
  background: "rgba(255,255,255,.18)",
  padding: "7px 12px",
  borderRadius: 999,
};
const heroTitle = { fontSize: 34, lineHeight: 1.15, fontWeight: 800, marginTop: 14 };
const heroSub = { fontSize: 14, lineHeight: 1.7, marginTop: 10, color: "rgba(255,255,255,.95)" };
const header = { textAlign: "center", marginBottom: 36 };
const iconBadge = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 56,
  height: 56,
  borderRadius: 14,
  background: "rgba(31,138,76,.12)",
  color: "var(--primary-dark)",
};
const title = { fontSize: 30, fontWeight: 800, color: "var(--text)", marginTop: 8 };
const hintText = { fontSize: 13, color: "var(--primary-dark)", marginBottom: 10, fontWeight: 600, textAlign: "center" };
const whatsappBtn = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  background: "#20b15a",
  color: "#fff",
  padding: "14px 16px",
  borderRadius: "var(--radius-sm)",
  fontSize: 15,
  fontWeight: 700,
  marginBottom: 16,
  boxShadow: "var(--shadow-sm)",
};
const whatsappIcon = { display: "inline-flex", alignItems: "center", justifyContent: "center" };
const formCard = { background: "var(--bg-card)", borderRadius: "var(--radius)", padding: 36, border: "1px solid var(--border)", boxShadow: "var(--shadow)" };
const sectionHead = { fontSize: 18, fontWeight: 700, color: "var(--primary)", marginBottom: 16, marginTop: 24, paddingBottom: 8, borderBottom: "2px solid var(--border)" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 };
