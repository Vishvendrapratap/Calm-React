"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import FormField from "../../../components/FormField/FormField";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import STATES_AND_CITIES from "../../../data/indianStatesAndCities";

const initialState = {
  husbandName: "",
  husbandDob: "",
  husbandPhone: "",
  husbandEmail: "",
  husbandAadhar: "",
  wifeName: "",
  wifeDob: "",
  wifePhone: "",
  wifeAadhar: "",
  marriageDate: "",
  marriagePlace: "",
  state: "",
  city: "",
  witnessName1: "",
  witnessName2: "",
  remarks: "",
};

export default function MarriageCertificatePage() {
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
        body: JSON.stringify({ serviceType: "marriage-certificate", ...form }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/success?service=Marriage Certificate&id=${data.id}`);
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
          <span style={iconBadge}>💍</span>
          <h1 style={title}>Marriage Certificate</h1>
          <p style={sub}>
            Register your marriage and obtain your official certificate
          </p>
        </div>

        <form onSubmit={submit} style={formCard}>
          <h2 style={sectionHead}>Husband Details</h2>
          <div style={grid}>
            <FormField
              label="Full Name"
              name="husbandName"
              value={form.husbandName}
              onChange={handle}
              placeholder="Husband's full name"
            />
            <FormField
              label="Date of Birth"
              name="husbandDob"
              type="date"
              value={form.husbandDob}
              onChange={handle}
            />
            <FormField
              label="Phone"
              name="husbandPhone"
              type="tel"
              value={form.husbandPhone}
              onChange={handle}
              placeholder="10-digit phone"
            />
            <FormField
              label="Email"
              name="husbandEmail"
              type="email"
              value={form.husbandEmail}
              onChange={handle}
              placeholder="email@example.com"
            />
            <FormField
              label="Aadhar Number"
              name="husbandAadhar"
              value={form.husbandAadhar}
              onChange={handle}
              placeholder="12-digit Aadhar"
            />
          </div>

          <h2 style={sectionHead}>Wife Details</h2>
          <div style={grid}>
            <FormField
              label="Full Name"
              name="wifeName"
              value={form.wifeName}
              onChange={handle}
              placeholder="Wife's full name"
            />
            <FormField
              label="Date of Birth"
              name="wifeDob"
              type="date"
              value={form.wifeDob}
              onChange={handle}
            />
            <FormField
              label="Phone"
              name="wifePhone"
              type="tel"
              value={form.wifePhone}
              onChange={handle}
              placeholder="10-digit phone"
            />
            <FormField
              label="Aadhar Number"
              name="wifeAadhar"
              value={form.wifeAadhar}
              onChange={handle}
              placeholder="12-digit Aadhar"
            />
          </div>

          <h2 style={sectionHead}>Marriage Details</h2>
          <div style={grid}>
            <FormField
              label="Date of Marriage"
              name="marriageDate"
              type="date"
              value={form.marriageDate}
              onChange={handle}
            />
            <FormField
              label="Place of Marriage"
              name="marriagePlace"
              value={form.marriagePlace}
              onChange={handle}
              placeholder="Venue / Place"
            />
            <FormField
              label="State"
              name="state"
              type="select"
              value={form.state}
              onChange={handle}
              options={Object.keys(STATES_AND_CITIES)}
              placeholder="Select State"
            />
            <FormField
              label="City"
              name="city"
              type="select"
              value={form.city}
              onChange={handle}
              options={form.state ? STATES_AND_CITIES[form.state] : []}
              placeholder="Select City"
            />
          </div>

          <h2 style={sectionHead}>Witnesses</h2>
          <div style={grid}>
            <FormField
              label="Witness 1 Name"
              name="witnessName1"
              value={form.witnessName1}
              onChange={handle}
              placeholder="Full name"
            />
            <FormField
              label="Witness 2 Name"
              name="witnessName2"
              value={form.witnessName2}
              onChange={handle}
              placeholder="Full name"
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <FormField
              label="Remarks"
              name="remarks"
              type="textarea"
              value={form.remarks}
              onChange={handle}
              placeholder="Any additional notes…"
              required={false}
              rows={3}
            />
          </div>

          <div style={{ marginTop: 28 }}>
            <SubmitButton
              loading={loading}
              label="Submit Marriage Certificate Application"
            />
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
const title = {
  fontSize: 30,
  fontWeight: 800,
  color: "var(--text)",
  marginTop: 8,
};
const sub = { fontSize: 15, color: "var(--text-secondary)", marginTop: 4 };
const formCard = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius)",
  padding: 36,
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow)",
};
const sectionHead = {
  fontSize: 18,
  fontWeight: 700,
  color: "var(--primary)",
  marginBottom: 16,
  marginTop: 24,
  paddingBottom: 8,
  borderBottom: "2px solid var(--border)",
};
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
  gap: 16,
};
