"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import FormField from "../../../components/FormField/FormField";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import STATES_AND_CITIES from "../../../data/indianStatesAndCities";

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
        router.push(`/success?service=Domicile Certificate&id=${data.id}`);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={wrapper}>
        <div style={header}>
          <span style={iconBadge}>📜</span>
          <h1 style={title}>Domicile Certificate</h1>
          <p style={sub}>Proof of residence for your state — required for admissions, jobs & more</p>
        </div>

        <form onSubmit={submit} style={formCard}>
          <h2 style={sectionHead}>Personal Details</h2>
          <div style={grid}>
            <FormField label="Full Name" name="fullName" value={form.fullName} onChange={handle} placeholder="As per Aadhar" />
            <FormField label="Father's Name" name="fatherName" value={form.fatherName} onChange={handle} placeholder="Father's full name" />
            <FormField label="Mother's Name" name="motherName" value={form.motherName} onChange={handle} placeholder="Mother's full name" />
            <FormField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handle} />
            <FormField label="Gender" name="gender" type="select" value={form.gender} onChange={handle} options={["Male", "Female", "Other"]} placeholder="Select Gender" />
            <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="10-digit phone" />
            <FormField label="Email" name="email" type="email" value={form.email} onChange={handle} placeholder="email@example.com" />
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
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const wrapper = { maxWidth: 800, margin: "0 auto", padding: "40px 24px" };
const header = { textAlign: "center", marginBottom: 36 };
const iconBadge = { fontSize: 40 };
const title = { fontSize: 30, fontWeight: 800, color: "var(--text)", marginTop: 8 };
const sub = { fontSize: 15, color: "var(--text-secondary)", marginTop: 4 };
const formCard = { background: "var(--bg-card)", borderRadius: "var(--radius)", padding: 36, border: "1px solid var(--border)", boxShadow: "var(--shadow)" };
const sectionHead = { fontSize: 18, fontWeight: 700, color: "var(--primary)", marginBottom: 16, marginTop: 24, paddingBottom: 8, borderBottom: "2px solid var(--border)" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 };
