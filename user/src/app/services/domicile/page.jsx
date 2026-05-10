"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import FormField from "../../../components/FormField/FormField";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import PostSubmitNoticeModal from "../../../components/PostSubmitNoticeModal/PostSubmitNoticeModal";
import STATES_AND_CITIES from "../../../data/indianStatesAndCities";
import { buildShortLeadWhatsAppMessage } from "../../../lib/whatsappLeadMessage";

const initialState = {
  fullName: "",
  fatherName: "",
  motherName: "",
  dob: "",
  gender: "",
  phone: "",
  email: "",
  aadharNumber: "",
  currentAddress: "",
  state: "",
  city: "",
  pincode: "",
  residingSince: "",
  purpose: "",
};

export default function DomicilePage() {
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
        body: JSON.stringify({ serviceType: "domicile-certificate", ...form }),
      });
      const data = await res.json();
      if (data.success) {
        nextAfterNoticeRef.current = () => {
          const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919336552858";
          const message = buildShortLeadWhatsAppMessage({
            name: form.fullName,
            phone: form.phone,
            serviceLabel: "Domicile Certificate",
            urgency: "Not specified",
          });
          window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          setTimeout(() => {
            router.push(`/success?service=Domicile Certificate&id=${data.id}`);
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
      "Hi Kaamzy team, I want help with Domicile Certificate service. Please assist me.";
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
              Apply for domicile certificate with guided support and quick
              follow-up.
            </p>
          </div>
        </section>

        <div style={header}>
          <span style={iconBadge}>📜</span>
          <h1 style={title}>Domicile Certificate</h1>
          <p style={sub}>Proof of residence for your state — required for admissions, jobs & more</p>
        </div>

        <button type="button" onClick={openWhatsAppChat} style={whatsappBtn}>
          <span style={whatsappIcon}>
            <MessageCircle size={18} strokeWidth={2.5} />
          </span>
          Chat with us on WhatsApp
        </button>

        <form onSubmit={submit} style={formCard} className="heritage-form-center">
          <h2 style={sectionHead}>Personal Details</h2>
          <div style={grid}>
            <FormField label="Full Name" name="fullName" value={form.fullName} onChange={handle} placeholder="As per Aadhar" required />
            <FormField label="Father's Name" name="fatherName" value={form.fatherName} onChange={handle} placeholder="Father's full name" />
            <FormField label="Mother's Name" name="motherName" value={form.motherName} onChange={handle} placeholder="Mother's full name" />
            <FormField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handle} />
            <FormField label="Gender" name="gender" type="select" value={form.gender} onChange={handle} options={["Male", "Female", "Other"]} placeholder="Select Gender" />
            <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="10-digit phone" required />
            <FormField label="Email" name="email" type="email" value={form.email} onChange={handle} placeholder="email@example.com" required />
            <FormField label="Aadhar Number" name="aadharNumber" value={form.aadharNumber} onChange={handle} placeholder="12-digit Aadhar" />
          </div>

          <h2 style={sectionHead}>Address & Residency</h2>
          <FormField label="Current Address" name="currentAddress" type="textarea" value={form.currentAddress} onChange={handle} placeholder="Full postal address" rows={3} />
          <div style={{ ...grid, marginTop: 16 }}>
            <FormField label="State" name="state" type="select" value={form.state} onChange={handle} options={Object.keys(STATES_AND_CITIES)} placeholder="Select State" />
            <FormField label="City" name="city" type="select" value={form.city} onChange={handle} options={form.state ? STATES_AND_CITIES[form.state] : []} placeholder="Select City" />
            <FormField label="Pincode" name="pincode" value={form.pincode} onChange={handle} placeholder="6-digit pincode" />
            <FormField label="Residing Since" name="residingSince" type="date" value={form.residingSince} onChange={handle} />
          </div>

          <h2 style={sectionHead}>Purpose</h2>
          <FormField label="Purpose of Certificate" name="purpose" type="select" value={form.purpose} onChange={handle} options={["Education / Admission", "Government Job", "Private Job", "Legal / Court", "Passport", "Other"]} placeholder="Select purpose" />

          <div style={{ marginTop: 28 }}>
            <SubmitButton loading={loading} label="Submit Domicile Application" />
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
    "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=70)",
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
const iconBadge = { fontSize: 40 };
const title = { fontSize: 30, fontWeight: 800, color: "var(--text)", marginTop: 8 };
const sub = { fontSize: 15, color: "var(--text-secondary)", marginTop: 4 };
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
