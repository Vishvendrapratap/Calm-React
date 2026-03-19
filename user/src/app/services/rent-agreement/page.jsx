"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import FormField from "../../../components/FormField/FormField";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import STATES_AND_CITIES from "../../../data/indianStatesAndCities";

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
        router.push(`/success?service=Rent Agreement&id=${data.id}`);
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
          <span style={iconBadge}>🏠</span>
          <h1 style={title}>Rent Agreement</h1>
          <p style={sub}>Fill in the details below to generate your rent agreement</p>
        </div>

        <form onSubmit={submit} style={formCard}>
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
            <FormField label="Full Name" name="tenantName" value={form.tenantName} onChange={handle} placeholder="Tenant full name" />
            <FormField label="Phone Number" name="tenantPhone" type="tel" value={form.tenantPhone} onChange={handle} placeholder="10-digit phone" />
            <FormField label="Email" name="tenantEmail" type="email" value={form.tenantEmail} onChange={handle} placeholder="email@example.com" />
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
            <FormField label="Special Terms / Conditions" name="specialTerms" type="textarea" value={form.specialTerms} onChange={handle} placeholder="Any additional terms…" required={false} rows={3} />
          </div>

          <div style={{ marginTop: 28 }}>
            <SubmitButton loading={loading} label="Submit Rent Agreement" />
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
