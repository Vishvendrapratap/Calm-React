'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './inquiry.css';

export default function InquiryPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    documentType: '',
    state: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="inquiry-wrapper">
        <div className="inquiry-card success">
          <h2>Inquiry Submitted 🎉</h2>
          <p>Our team will contact you shortly.</p>
          <button onClick={() => router.push('/admin')}>
            Back to Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inquiry-wrapper">
      <div className="inquiry-card">
        <button
          className="back-btn"
          onClick={() => router.push('/admin')}
        >
          ← Back to Admin
        </button>

        <h2>Submit an Inquiry</h2>
        <p className="subtitle">
          Fill in the details below and we’ll get back to you.
        </p>

        <form className="inquiry-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Document Type</label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              required
            >
              <option value="">Select document</option>
              <option value="Passport">Passport</option>
              <option value="Visa">Visa</option>
              <option value="Driving License">Driving License</option>
            </select>
          </div>

          <div className="form-group">
            <label>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select priority</option>
              <option value="New">New</option>
              <option value="Urgent">Urgent</option>
              <option value="Normal">Normal</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your inquiry..."
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
