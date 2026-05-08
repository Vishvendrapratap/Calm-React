"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FileBadge2, FileText, IdCard, MessageCircle, ReceiptText, ShieldCheck, Star } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const services = [
  {
    icon: FileText,
    title: "Rent Agreement",
    desc: "Get your draft-ready agreement by sharing tenant, property and rent details.",
    href: "/services/rent-agreement",
    cta: "Start Rent Agreement",
  },
  {
    icon: ShieldCheck,
    title: "Police Verification",
    desc: "Submit your verification requirements for tenant, employee, or personal purpose.",
    href: "/services/police-verification",
    cta: "Start Police Verification",
  },
  {
    icon: FileBadge2,
    title: "Domicile Certificate",
    desc: "Apply for state domicile certificate with guided form and quick support.",
    href: "/services/domicile",
    cta: "Start Domicile",
  },
  {
    icon: ReceiptText,
    title: "Challan Settlement",
    desc: "Get help with pending traffic challans and settlement support end-to-end.",
    href: "/services/challan-settlement",
    cta: "Start Challan Settlement",
  },
  {
    icon: IdCard,
    title: "RTO Work",
    desc: "Fitness, license issues, RC updates and other RTO formalities handled smoothly.",
    href: "/services/rto-work",
    cta: "Start RTO Work",
  },
  {
    icon: ShieldCheck,
    title: "Character Certificate",
    desc: "Apply for police/character certificate support for job or official use.",
    href: "/services/character-certificate",
    cta: "Start Character Certificate",
  },
];

const reviews = [
  {
    name: "Priya Sharma",
    city: "Pune",
    text: "I came from an Instagram ad and finished my rent agreement form in less than 5 minutes. Very smooth and clear process.",
  },
  {
    name: "Rohit Verma",
    city: "Noida",
    text: "The WhatsApp follow-up was instant. Team guided me properly and I did not have to visit multiple offices.",
  },
  {
    name: "Ayesha Khan",
    city: "Hyderabad",
    text: "Super simple on mobile. Forms are easy to understand and the support response felt personal and quick.",
  },
];

const faqs = [
  {
    q: "How does KaamZy process my request?",
    a: "You can fill the form or chat on WhatsApp. Our team verifies details, shares next steps, and coordinates the process with relevant local support.",
  },
  {
    q: "Which services are available right now?",
    a: "Rent Agreement, Police Verification, Domicile, Character Certificate, Challan Settlement, and RTO Work are currently available.",
  },
  {
    q: "Can I apply if I live away from my hometown?",
    a: "Yes. KaamZy is designed for users living away from home and provides remote guidance wherever possible.",
  },
  {
    q: "What if my case is urgent?",
    a: "Use the chat flow and choose Urgent priority. Your request is highlighted and handled on priority by our support team.",
  },
  {
    q: "Will I get updates after submission?",
    a: "Yes. We share updates through WhatsApp and follow-up calls so you always know the progress of your request.",
  },
];

const heroSlides = [
  {
    step: "Step 1",
    title: "Share details",
    subtitle: "Fill your service details in a simple mobile-first form.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=70",
  },
  {
    step: "Step 2",
    title: "Pay",
    subtitle: "Complete payment securely and confirm your request quickly.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=70",
  },
  {
    step: "Step 3",
    title: "Receive",
    subtitle: "Get assisted delivery and updates directly on your phone.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=70",
  },
];

const infoPhotoSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=70",
    label: "You stay at home and we handle the hustle.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=70",
    label: "Trusted by more than 500+ individuals living away from home.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=70",
    label: "We work with the best professions in the city town and state.",
  },
];

const headlineLines = [
  "ANY GOVT WORK IN 3 STEPS.",
  "AWAY FROM HOME? DONT WORRY.",
  "KAAMZY DO ALL THE GOVT WORK.",
  "EVERYTHING ONLINE, NO HUSTLE.",
];

export default function Home() {
  const searchParams = useSearchParams();
  const [activeHero, setActiveHero] = useState(0);
  const [activeInfoSlide, setActiveInfoSlide] = useState(0);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [headlineVisible, setHeadlineVisible] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [chatForm, setChatForm] = useState({
    name: "",
    service: "Rent Agreement",
    priority: "Normal",
  });

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 3400);
    return () => clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const infoTimer = setInterval(() => {
      setActiveInfoSlide((prev) => (prev + 1) % infoPhotoSlides.length);
    }, 3200);
    return () => clearInterval(infoTimer);
  }, []);

  useEffect(() => {
    if (searchParams.get("chat") === "1") {
      setChatOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setHeadlineVisible(false);
    }, 1800);

    const switchTimer = setTimeout(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlineLines.length);
      setHeadlineVisible(true);
    }, 2200);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(switchTimer);
    };
  }, [headlineIndex]);

  const openWhatsAppChat = () => {
    setChatOpen(true);
  };

  const submitWhatsAppChat = (e) => {
    e.preventDefault();
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919336552858";
    const message = [
      "Hi KaamZy team, I need help.",
      `Name: ${chatForm.name || "Not provided"}`,
      `Document Type: ${chatForm.service}`,
      `Priority: ${chatForm.priority}`,
    ].join("\n");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setChatOpen(false);
  };

  return (
    <div>
      <Navbar />
      <section style={{ ...sectionStyle, paddingBottom: 18 }} className="headline-section">
        <div style={{ ...sectionTop, ...headlineWrap }} className="headline-wrap">
          <h2 style={{ ...sectionTitle, ...heroSectionTitle }} className="headline-rotator">
            <span
              style={{
                ...headlineTextTransition,
                opacity: headlineVisible ? 1 : 0,
              }}
            >
              {headlineLines[headlineIndex]}
            </span>
          </h2>
        </div>
      </section>
      <section style={hero}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.step}
            style={{
              ...heroSlide,
              opacity: activeHero === index ? 1 : 0,
              transform: activeHero === index ? "translateX(0)" : "translateX(40px)",
            }}
          >
            <div
              role="img"
              aria-label={`${slide.step} ${slide.title}`}
              style={{ ...heroImage, backgroundImage: `url(${slide.image})` }}
            />
            <div style={heroOverlay} />
            <div style={heroContent}>
              <span style={badge}>{slide.step}</span>
              <h1 style={heroTitle}>{slide.title}</h1>
              <p style={heroSub}>{slide.subtitle}</p>
            </div>
          </div>
        ))}
        <div style={heroActionsStatic}>
          <Link href="/services" style={btnPrimary}>
            Start Now
          </Link>
          <button type="button" onClick={openWhatsAppChat} style={btnGhost}>
            <MessageCircle size={16} strokeWidth={2.4} />
            Chat with us
          </button>
        </div>
      </section>

      <section style={sectionStyle} className="emblem-panel">
        <div style={sectionTop}>
          <h2 style={sectionTitle}>Choose your service</h2>
          <p style={sectionSub}>Choose from our most used government service workflows.</p>
        </div>
        <div style={grid}>
          {services.map((s) => (
            <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
              <article style={card} className="service-card tile-emblem fade-slide-up">
                <span style={serviceIcon}>
                  <s.icon size={30} strokeWidth={2.2} />
                </span>
                <h3 style={cardTitle}>{s.title}</h3>
                <p style={cardDesc}>{s.desc}</p>
                <span style={applyLink}>{s.cta} →</span>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ ...sectionStyle, paddingTop: 8 }}>
        <article style={infoSliderFrame} className="service-card">
          {infoPhotoSlides.map((slide, index) => (
            <div
              key={slide.label}
              style={{
                ...infoSlide,
                opacity: activeInfoSlide === index ? 1 : 0,
                transform: activeInfoSlide === index ? "translateX(0)" : "translateX(12px)",
              }}
            >
              <div style={{ ...infoSlideImage, backgroundImage: `url(${slide.image})` }} />
              <div style={infoSlideOverlay} />
              <div style={infoSlideContent}>{slide.label}</div>
            </div>
          ))}
        </article>
      </section>

      <section style={{ ...sectionStyle, paddingTop: 12 }} className="emblem-panel">
        <div style={sectionTop}>
          <h2 style={sectionTitle}>What customers say</h2>
          <p style={sectionSub}>Real-style feedback from users across India.</p>
        </div>
        <div style={reviewGrid}>
          {reviews.map((review) => (
            <article key={review.name} style={reviewCard} className="service-card tile-emblem fade-slide-up">
              <div style={stars}>
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p style={reviewText}>"{review.text}"</p>
              <div style={reviewUser}>
                <span style={reviewAvatar}>{review.name.charAt(0)}</span>
                <div>
                  <p style={reviewName}>{review.name}</p>
                  <p style={reviewCity}>{review.city}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ ...sectionStyle, paddingTop: 8 }} className="emblem-panel">
        <div style={sectionTop}>
          <h2 style={sectionTitle}>Quick FAQs</h2>
          <p style={sectionSub}>Common questions before you start your request.</p>
        </div>
        <div style={faqWrap}>
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <article key={faq.q} style={faqItem} className="service-card tile-emblem">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  style={faqQuestionBtn}
                >
                  <span>{faq.q}</span>
                  <span style={faqToggle}>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p style={faqAnswer}>{faq.a}</p>}
              </article>
            );
          })}
        </div>
      </section>

      {chatOpen && (
        <div style={modalOverlay} onClick={() => setChatOpen(false)}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <h3 style={modalTitle}>Chat with us</h3>
            <p style={modalSub}>Fill details below to continue on WhatsApp</p>
            <form onSubmit={submitWhatsAppChat} style={modalForm}>
              <label style={modalLabel}>
                Name
                <input
                  style={modalInput}
                  value={chatForm.name}
                  onChange={(e) => setChatForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  required
                />
              </label>
              <label style={modalLabel}>
                Document Type
                <select
                  style={modalInput}
                  value={chatForm.service}
                  onChange={(e) => setChatForm((prev) => ({ ...prev, service: e.target.value }))}
                >
                  <option>Rent Agreement</option>
                  <option>Police Verification</option>
                  <option>Domicile Certificate</option>
                  <option>Marriage Certificate</option>
                  <option>Character Certificate</option>
                  <option>Challan Settlement</option>
                  <option>RTO Work</option>
                </select>
              </label>
              <div style={modalLabel}>
                Priority
                <div style={priorityRow}>
                  <button
                    type="button"
                    style={{
                      ...priorityBtn,
                      ...(chatForm.priority === "Normal" ? priorityBtnActive : {}),
                    }}
                    onClick={() => setChatForm((prev) => ({ ...prev, priority: "Normal" }))}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    style={{
                      ...priorityBtn,
                      ...(chatForm.priority === "Urgent" ? priorityBtnUrgent : {}),
                    }}
                    onClick={() => setChatForm((prev) => ({ ...prev, priority: "Urgent" }))}
                  >
                    Urgent
                  </button>
                </div>
              </div>
              <div style={modalActions}>
                <button type="button" style={modalCancelBtn} onClick={() => setChatOpen(false)}>
                  Cancel
                </button>
                <button type="submit" style={modalSubmitBtn}>
                  Continue to WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        .service-card { transition: transform .3s ease, box-shadow .3s ease; }
        .service-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }

        .fade-slide-up {
          animation: fadeSlideUp .7s ease both;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          h1 { font-size: 36px !important; }
          .headline-wrap { height: 104px !important; }
          .headline-rotator {
            white-space: normal !important;
            overflow: visible !important;
            height: auto !important;
            line-height: 1.2 !important;
            padding: 0 8px;
          }
        }

        .headline-wrap { height: 52px; }
        .headline-rotator {
          white-space: nowrap;
          overflow: hidden;
          height: 52px;
          line-height: 1.2 !important;
          align-items: center !important;
          font-size: clamp(24px, 2.4vw, 34px) !important;
          padding-top: 0;
        }

        @media (min-width: 769px) {
          .headline-section {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

const hero = {
  position: "relative",
  minHeight: "62vh",
  overflow: "hidden",
  borderRadius: 16,
  margin: "0 24px",
};
const heroSlide = {
  position: "absolute",
  inset: 0,
  transition: "opacity .95s cubic-bezier(.22,.61,.36,1), transform .95s cubic-bezier(.22,.61,.36,1)",
  willChange: "opacity, transform",
};
const heroImage = {
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
};
const heroOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(120deg, rgba(12,54,30,.82), rgba(12,54,30,.52) 55%, rgba(240,138,36,.52))",
};
const heroContent = {
  position: "relative",
  color: "#fff",
  maxWidth: 680,
  padding: "52px 24px",
};
const badge = {
  display: "inline-block",
  background: "rgba(255,255,255,.18)",
  border: "1px solid rgba(255,255,255,.45)",
  color: "#fff",
  padding: "8px 14px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
  marginBottom: 14,
  textTransform: "uppercase",
  letterSpacing: ".06em",
};
const heroTitle = {
  fontSize: 50,
  fontWeight: 900,
  lineHeight: 1.12,
  color: "#fff",
  marginBottom: 14,
  textTransform: "uppercase",
};
const heroSub = {
  fontSize: 16,
  color: "rgba(255,255,255,.92)",
  maxWidth: 560,
  marginBottom: 26,
  lineHeight: 1.7,
  textTransform: "uppercase",
};
const heroActions = { display: "flex", gap: 12, flexWrap: "wrap" };
const heroActionsStatic = {
  ...heroActions,
  position: "absolute",
  left: 24,
  bottom: 28,
  zIndex: 2,
};
const btnPrimary = {
  display: "inline-flex",
  alignItems: "center",
  padding: "14px 30px",
  background: "var(--primary)",
  color: "#fff",
  borderRadius: "var(--radius-sm)",
  fontWeight: 700,
  fontSize: 15,
  textDecoration: "none",
};
const btnGhost = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "14px 24px",
  border: "1px solid var(--border)",
  color: "#fff",
  borderRadius: "var(--radius-sm)",
  fontWeight: 700,
  fontSize: 15,
  textDecoration: "none",
  background: "rgba(255,255,255,.12)",
};
const sectionStyle = {
  padding: "72px 24px",
  maxWidth: 1200,
  margin: "0 auto",
};
const sectionTop = { textAlign: "center", marginBottom: 36 };
const sectionTitle = {
  fontSize: 33,
  fontWeight: 800,
  color: "var(--text)",
};
const heroSectionTitle = {
  fontSize: "clamp(28px, 4.2vw, 46px)",
  fontWeight: 900,
  letterSpacing: ".04em",
  lineHeight: 1.05,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
};
const headlineWrap = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const headlineTextTransition = {
  transition: "opacity .35s ease",
};
const sectionSub = {
  fontSize: 15,
  color: "var(--text-secondary)",
  marginTop: 8,
};
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 18,
};
const card = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius)",
  padding: 24,
  border: "1px solid var(--border)",
  cursor: "pointer"
};
const serviceIcon = {
  width: 56,
  height: 56,
  borderRadius: 14,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--primary-dark)",
  background: "rgba(31,138,76,.12)",
};
const cardTitle = { fontSize: 21, fontWeight: 700, color: "var(--text)", marginTop: 12 };
const cardDesc = { fontSize: 14, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.7 };
const applyLink = {
  display: "inline-block",
  marginTop: 16,
  fontSize: 14,
  fontWeight: 700,
  color: "var(--primary)",
};
const reviewGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 };
const reviewCard = {
  background: "var(--bg-card)",
  borderRadius: 14,
  border: "1px solid var(--border)",
  padding: 20,
  boxShadow: "var(--shadow-sm)",
};
const stars = { color: "var(--accent)", display: "flex", gap: 4 };
const reviewText = { marginTop: 10, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 };
const reviewUser = { marginTop: 14, display: "flex", alignItems: "center", gap: 10 };
const reviewAvatar = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "rgba(31,138,76,.14)",
  color: "var(--primary-dark)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
  fontSize: 13,
};
const reviewName = { fontSize: 14, fontWeight: 700, color: "var(--text)" };
const reviewCity = { fontSize: 12, color: "var(--text-secondary)" };
const faqWrap = { display: "flex", flexDirection: "column", gap: 12, maxWidth: 900, margin: "0 auto" };
const faqItem = { borderRadius: 12, border: "1px solid var(--border)", background: "var(--bg-card)", padding: 14 };
const faqQuestionBtn = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  textAlign: "left",
  background: "transparent",
  color: "var(--text)",
  fontSize: 16,
  fontWeight: 800,
  padding: 0,
};
const faqToggle = { color: "var(--accent)", fontSize: 28, lineHeight: 1 };
const faqAnswer = { marginTop: 10, color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8 };
const infoSliderFrame = {
  position: "relative",
  minHeight: 220,
  borderRadius: 16,
  border: "1px solid var(--border)",
  overflow: "hidden",
};
const infoSlide = {
  position: "absolute",
  inset: 0,
  transition: "opacity .65s ease, transform .65s ease",
};
const infoSlideImage = {
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
};
const infoSlideOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(12,54,30,.78), rgba(12,54,30,.2))",
};
const infoSlideContent = {
  position: "relative",
  height: "100%",
  display: "flex",
  alignItems: "end",
  padding: 18,
  color: "var(--accent)",
  textShadow: "0 2px 10px rgba(0,0,0,.55)",
  fontSize: 22,
  fontWeight: 800,
  lineHeight: 1.25,
};
const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(11,16,13,.45)",
  backdropFilter: "blur(3px)",
  zIndex: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
};
const modalCard = {
  width: "100%",
  maxWidth: 420,
  background: "#fff",
  borderRadius: 14,
  padding: 20,
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow-lg)",
};
const modalTitle = { fontSize: 24, fontWeight: 800, color: "var(--text)" };
const modalSub = { marginTop: 4, color: "var(--text-secondary)", fontSize: 14 };
const modalForm = { marginTop: 14, display: "flex", flexDirection: "column", gap: 12 };
const modalLabel = { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 700, color: "var(--text)" };
const modalInput = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: 8,
  background: "#fff",
  padding: "10px 12px",
  fontSize: 14,
};
const priorityRow = { display: "flex", gap: 8 };
const priorityBtn = {
  flex: 1,
  border: "1px solid var(--border)",
  background: "#f8faf9",
  color: "var(--text)",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 13,
  fontWeight: 700,
};
const priorityBtnActive = {
  background: "rgba(31,138,76,.14)",
  borderColor: "rgba(31,138,76,.45)",
  color: "var(--primary-dark)",
};
const priorityBtnUrgent = {
  background: "rgba(240,138,36,.16)",
  borderColor: "rgba(240,138,36,.5)",
  color: "#92400e",
};
const modalActions = { display: "flex", gap: 8, marginTop: 6 };
const modalCancelBtn = {
  flex: 1,
  border: "1px solid var(--border)",
  background: "#fff",
  color: "var(--text)",
  borderRadius: 8,
  padding: "10px 12px",
  fontWeight: 700,
};
const modalSubmitBtn = {
  flex: 1.6,
  background: "#20b15a",
  color: "#fff",
  borderRadius: 8,
  padding: "10px 12px",
  fontWeight: 700,
};
