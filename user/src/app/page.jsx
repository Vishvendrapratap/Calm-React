"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const slides = [
  {
    id: 1,
    title: "Premium Services",
    description:
      "Discover our wide range of professional services tailored for you",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop",
    color: "#7CB342",
  },
  {
    id: 2,
    title: "Expert Solutions",
    description: "Connect with industry experts who deliver excellence",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop",
    color: "#FF8C1A",
  },
  {
    id: 3,
    title: "Fast & Reliable",
    description: "Quick turnaround times with guaranteed satisfaction",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop",
    color: "#7CB342",
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your needs",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    color: "#FF8C1A",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles.homePage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          <span>Kaamzy</span>
        </div>
        <nav className={styles.nav}>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="/raise-inquiry" className={styles.inquiryLink}>
            Raise Inquiry
          </a>
        </nav>
        <div className={styles.authButtons}>
          <button
            onClick={() => router.push("/login")}
            className={styles.loginBtn}
          >
            Login
          </button>
          <button
            onClick={() => router.push("/login")}
            className={styles.signupBtn}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Slideshow */}
      <section className={styles.slideshow}>
        <div className={styles.slidesContainer}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${
                index === currentSlide ? styles.active : ""
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div
                className={styles.slideOverlay}
                style={{
                  background: `linear-gradient(135deg, ${slide.color}dd 0%, ${slide.color}88 100%)`,
                }}
              />
              <div className={styles.slideContent}>
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <div className={styles.ctaButtons}>
                  <button
                    onClick={() => router.push("/login")}
                    className={styles.ctaButton}
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => router.push("/raise-inquiry")}
                    className={styles.ctaButtonSecondary}
                  >
                    Raise Inquiry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className={styles.navArrow + " " + styles.prevArrow}
          onClick={prevSlide}
        >
          ‹
        </button>
        <button
          className={styles.navArrow + " " + styles.nextArrow}
          onClick={nextSlide}
        >
          ›
        </button>

        {/* Dots */}
        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentSlide ? styles.activeDot : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Why Choose Us</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div
              className={styles.featureIcon}
              style={{ background: "#7CB342" }}
            >
              🎯
            </div>
            <h3>Quality Service</h3>
            <p>We deliver top-notch services with attention to every detail</p>
          </div>
          <div className={styles.featureCard}>
            <div
              className={styles.featureIcon}
              style={{ background: "#FF8C1A" }}
            >
              ⚡
            </div>
            <h3>Fast Delivery</h3>
            <p>Quick turnaround without compromising on quality</p>
          </div>
          <div className={styles.featureCard}>
            <div
              className={styles.featureIcon}
              style={{ background: "#7CB342" }}
            >
              💰
            </div>
            <h3>Best Prices</h3>
            <p>Competitive pricing that fits your budget</p>
          </div>
          <div className={styles.featureCard}>
            <div
              className={styles.featureIcon}
              style={{ background: "#FF8C1A" }}
            >
              🛡️
            </div>
            <h3>Secure & Safe</h3>
            <p>Your data and transactions are always protected</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 Kaamzy. All rights reserved.</p>
      </footer>
    </div>
  );
}
