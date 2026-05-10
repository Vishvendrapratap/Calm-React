"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, ShieldCheck } from "lucide-react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import FormField from "../../../components/FormField/FormField";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import PostSubmitNoticeModal from "../../../components/PostSubmitNoticeModal/PostSubmitNoticeModal";
import STATES_AND_CITIES from "../../../data/indianStatesAndCities";
import { buildShortLeadWhatsAppMessage } from "../../../lib/whatsappLeadMessage";

const initialState = {
  applicantName: "",
  phone: "",
  email: "",
  verificationType: "",
  purpose: "",
  state: "",
  city: "",
  address: "",
  preferredCallTime: "",
};

export default function PoliceVerificationPage() {
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
        body: JSON.stringify({ serviceType: "police-verification", ...form }),
      });
      const data = await res.json();

      if (data.success) {
        nextAfterNoticeRef.current = () => {
          const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919336552858";
          const message = buildShortLeadWhatsAppMessage({
            name: form.applicantName,
            phone: form.phone,
            serviceLabel: form.verificationType
              ? `Police Verification (${form.verificationType})`
              : "Police Verification",
            urgency: form.preferredCallTime || "Not specified",
          });

          window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          setTimeout(() => {
            router.push(`/success?service=Police Verification&id=${data.id}`);
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
      "Hi Kaamzy team, I want help with Police Verification service. Please assist me.";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div>
      <Navbar />
      <div style={wrapper}>
        <section style={heroCard}>
          <div style={heroImage} aria-hidden />
          <div style={heroOverlay} />
          <div style={heroContent}>
            <h1 style={heroTitle}>Fill the form or chat with us directly.</h1>
            <p style={heroSub}>
              Share applicant details and we will guide your police verification
              process quickly.
            </p>
          </div>
        </section>

        <div style={header}>
          <span style={iconBadge}>
            <ShieldCheck size={36} strokeWidth={2.2} />
          </span>
          <h1 style={title}>Police Verification</h1>
          <p style={sub}>Share your details and we will guide the process end-to-end.</p>
          <p style={hintText}>On submit, WhatsApp opens with your lead details.</p>
        </div>

        <button type="button" onClick={openWhatsAppChat} style={whatsappBtn}>
          <span style={whatsappIcon}>
            <MessageCircle size={18} strokeWidth={2.5} />
          </span>
          Chat with us on WhatsApp
        </button>

        <form onSubmit={submit} style={formCard} className="heritage-form-center">
          <h2 style={sectionHead}>Applicant Details</h2>
          <div style={grid}>
            <FormField label="Full Name" name="applicantName" value={form.applicantName} onChange={handle} placeholder="Your full name" required />
            <FormField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="10-digit number" required />
            <FormField label="Email" name="email" type="email" value={form.email} onChange={handle} placeholder="email@example.com" required />
            <FormField
              label="Verification Type"
              name="verificationType"
              type="select"
              value={form.verificationType}
              onChange={handle}
              options={["Tenant", "Employee", "Domestic Help", "Personal"]}
              placeholder="Select type"
            />
          </div>

          <h2 style={sectionHead}>Location & Requirement</h2>
          <div style={grid}>
            <FormField label="State" name="state" type="select" value={form.state} onChange={handle} options={Object.keys(STATES_AND_CITIES)} placeholder="Select state" />
            <FormField label="City" name="city" type="select" value={form.city} onChange={handle} options={form.state ? STATES_AND_CITIES[form.state] : []} placeholder="Select city" />
            <FormField label="Preferred Call Time" name="preferredCallTime" value={form.preferredCallTime} onChange={handle} placeholder="e.g. 5 PM - 7 PM" />
          </div>

          <div style={{ marginTop: 16 }}>
            <FormField label="Address" name="address" type="textarea" value={form.address} onChange={handle} placeholder="Current address for verification" rows={3} />
          </div>
          <div style={{ marginTop: 16 }}>
            <FormField label="Purpose / Notes" name="purpose" type="textarea" value={form.purpose} onChange={handle} placeholder="Any context or urgency details" rows={3} />
          </div>

          <div style={{ marginTop: 28 }}>
            <SubmitButton loading={loading} label="Submit Police Verification" />
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
  minHeight: 220,
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
    "url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=70)",
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
  maxWidth: 560,
};
const heroTitle = { fontSize: 32, lineHeight: 1.15, fontWeight: 800 };
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
const sub = { fontSize: 15, color: "var(--text-secondary)", marginTop: 4 };
const hintText = { fontSize: 13, color: "var(--primary-dark)", marginTop: 8, fontWeight: 600 };
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
