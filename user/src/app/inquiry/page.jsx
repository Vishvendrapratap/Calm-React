'use client';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './inquiry.css';
import { useState } from 'react';

export default function InquiryPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    documentType: '',
    priority: '',
    description: '',
    expectedDate: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Inquiry submitted successfully!');
  };

  return (
    <div className="admin-layout">
      <Header />

      <div className="admin-body">
        <Sidebar />

        <main className="admin-content inquiry-page">
          <h2>Submit Inquiry</h2>
          <p className="inquiry-subtitle">
            Provide the following details to submit your inquiry.
          </p>

          <form className="inquiry-form-dashboard" onSubmit={handleSubmit}>
            
            <div className="field-row">
              <label>Full Name</label>
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
              <label>Email Address</label>
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
              <label>Mobile Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>

            <div className="field-row">
              <label>Document Type</label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                required
              >
                <option value="">Select a document type</option>
                <option value="Passport">Passport</option>
                <option value="Visa">Visa</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>

            <div className="field-row">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select priority</option>
                <option value="New">New</option>
                <option value="Urgent">Urgent</option>
                <option value="Normal">Normal</option>
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

            <div className="field-row">
              <label>Description</label>
              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your inquiry…"
                required
              />
            </div>

            <div className="field-row">
              <label>Upload Supporting Document (optional)</label>
              <input
                type="file"
                name="file"
                accept=".pdf,.jpg,.png"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn-dashboard">
              Submit Inquiry
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}




