
'use client';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './services.css';

const servicesList = [
  {
    id: 1,
    title: "Passport Renewal",
    desc: "Renew your passport quickly and easily.",
    status: "Available",
  },
  {
    id: 2,
    title: "Visa Extension",
    desc: "Extend your stay by applying for a visa extension.",
    status: "Not Available",
  },
  {
    id: 3,
    title: "Driving License Update",
    desc: "Update your address or personal details.",
    status: "Available",
  },
  {
    id: 4,
    title: "PAN Card Correction",
    desc: "Correct mistakes in your PAN card details.",
    status: "Available",
  }
];

export default function ServicesPage() {
  return (
    <div className="admin-layout">
      <Header />

      <div className="admin-body">
        <Sidebar />

        <main className="admin-content services-page">
          <h2>Our Services</h2>
          <p className="service-subtitle">Choose any service to apply.</p>

          <div className="services-grid">
            {servicesList.map(service => (
              <div className="service-card" key={service.id}>
                <h3>{service.title}</h3>
                <p className="service-desc">{service.desc}</p>

                <span className={`service-status ${service.status === "Available" ? "available" : "not-available"}`}>
                  {service.status}
                </span>

                <button
                  className="service-btn"
                  disabled={service.status !== "Available"}
                  onClick={() => window.location.href = '/inquiry'}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
