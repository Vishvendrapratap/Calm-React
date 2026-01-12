"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./raise-inquiry.css";

export default function RaiseInquiryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    documentType: "",
    priority: "",
    description: "",
    expectedDate: "",
    file: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would send this to your backend API
  };

  if (isSubmitted) {
    return (
      <div className="raise-inquiry-wrapper">
        <div className="inquiry-success-card">
          <div className="success-icon">✓</div>
          <h2>Inquiry Submitted Successfully!</h2>
          <p>
            Thank you for your inquiry. Our team will review your request and
            get back to you within 24-48 hours.
          </p>
          <p className="contact-info">
            A confirmation email has been sent to{" "}
            <strong>{formData.email}</strong>
          </p>
          <div className="success-actions">
            <button onClick={() => router.push("/")} className="home-btn">
              Back to Home
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  documentType: "",
                  priority: "",
                  description: "",
                  expectedDate: "",
                  file: null,
                });
              }}
              className="another-btn"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="raise-inquiry-wrapper">
      {/* Header */}
      <header className="inquiry-header">
        <div className="logo" onClick={() => router.push("/")}>
          <span className="logo-icon">✦</span>
          <span>Kaamzy</span>
        </div>
        <div className="header-actions">
          <button onClick={() => router.push("/login")} className="login-link">
            Login
          </button>
          <button onClick={() => router.push("/login")} className="signup-link">
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="inquiry-main">
        <div className="inquiry-intro">
          <h1>Raise an Inquiry</h1>
          <p>
            Have a question or need our services? Fill out the form below and
            our team will get back to you shortly.
          </p>
        </div>

        <form className="public-inquiry-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="field-row">
                <label>
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="field-row">
                <label>
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  required
                />
              </div>

              <div className="field-row">
                <label>
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Inquiry Details</h3>
            <div className="form-grid">
              <div className="field-row">
                <label>
                  Service Type <span className="required">*</span>
                </label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service type</option>
                  <option value="Passport">Passport Services</option>
                  <option value="Visa">Visa Services</option>
                  <option value="Driving License">Driving License</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Aadhaar">Aadhaar Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="field-row">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="">Select priority</option>
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div className="field-row">
                <label>Expected Completion Date</label>
                <input
                  type="date"
                  name="expectedDate"
                  value={formData.expectedDate}
                  onChange={handleChange}
                />
              </div>

              <div className="field-row full-width">
                <label>
                  Description <span className="required">*</span>
                </label>
                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please describe your inquiry in detail..."
                  required
                />
              </div>

              <div className="field-row full-width">
                <label>Upload Supporting Document (optional)</label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.jpg,.png"
                  onChange={handleChange}
                />
                <span className="file-hint">
                  Accepted formats: PDF, JPG, PNG (Max 5MB)
                </span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Inquiry
            </button>
            <p className="form-note">
              Already have an account? <a href="/login">Login</a> to track your
              inquiries.
            </p>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="inquiry-footer">
        <p>© 2026 Kaamzy. All rights reserved.</p>
      </footer>
    </div>
  );
}
