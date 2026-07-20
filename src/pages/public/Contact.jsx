import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [navOpen, setNavOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('Sending...');
    setTimeout(() => {
      setFormStatus('Thank you! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  // Contact info items
  const contactInfo = [
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Visit Us',
      detail: 'Addis Ababa, Ethiopia\nBole Sub-city, Woreda 03',
      link: 'https://maps.google.com',
    },
    {
      icon: 'fa-solid fa-phone',
      title: 'Call Us',
      detail: '+251 911 234 567\n+251 922 345 678',
      link: 'tel:+251911234567',
    },
    {
      icon: 'fa-solid fa-envelope',
      title: 'Email Us',
      detail: 'info@durbetprimary.com\nsupport@durbetprimary.com',
      link: 'mailto:info@durbetprimary.com',
    },
    {
      icon: 'fa-solid fa-clock',
      title: 'Working Hours',
      detail: 'Mon – Fri: 8:00 AM – 8:00 PM\nSat – Sun: 9:00 AM – 5:00 PM',
    },
  ];

  return (
    <div className="contact-container">

      {/* ===== NAVBAR (same as Home) ===== */}
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <i className="fa-solid fa-hospital"></i>
          <span>Durbet <small>Primary</small></span>
        </Link>
        <ul className={`nav-links ${navOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/service">Service</Link></li>
          <li><Link to="/contact" className="active">Contact</Link></li>
          <li>
            <Link to="/login" className="nav-btn-outline">Login</Link>
          </li>
          <li>
            <Link to="/register" className="nav-btn">
              <i className="fa-solid fa-calendar-check"></i> Register
            </Link>
          </li>
        </ul>
        <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)}>
          <i className={`fa-solid ${navOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </nav>

      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="contact-hero-glow" />
        <div className="contact-hero-content">
          <h1>
            Get In <span className="highlight">Touch</span>
          </h1>
          <p>
            We’d love to hear from you! Whether you have a question about our services,
            need to book an appointment, or just want to say hello — reach out anytime.
          </p>
        </div>
        <div className="contact-hero-image">
          <img
            src="https://picsum.photos/seed/contacthero/600/450"
            alt="Contact Durbet Primary"
            loading="lazy"
          />
        </div>
      </section>

      {/* ===== CONTACT INFO CARDS ===== */}
      <section className="contact-info-section">
        <div className="info-grid">
          {contactInfo.map((item, i) => (
            <div className="info-card" key={i}>
              <div className="info-icon">
                <i className={item.icon}></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.detail.split('\n').map((line, idx) => (
                <span key={idx}>{line}<br /></span>
              ))}</p>
              {item.link && (
                <a href={item.link} className="info-link" target="_blank" rel="noopener noreferrer">
                  Connect <i className="fa-solid fa-arrow-right"></i>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT FORM + MAP ===== */}
      <section className="contact-form-section">
        <div className="form-container">
          <div className="form-wrapper">
            <div className="form-header">
              <span className="section-tag">Send a Message</span>
              <h2 className="section-title">We’re Here to Help</h2>
              <p className="section-desc">
                Fill out the form below and our team will respond within 24 hours.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Dr. Abebe Kebede"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251 911 234 567"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Appointment Inquiry"
                  />
                </div>
              </div>
              <div className="form-group full-width">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can assist you..."
                  rows="5"
                  required
                ></textarea>
              </div>
              {formStatus && (
                <div className={`form-status ${formStatus.includes('Thank') ? 'success' : 'sending'}`}>
                  {formStatus}
                </div>
              )}
              <button type="submit" className="btn-submit">
                <i className="fa-regular fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>

          <div className="map-wrapper">
            <div className="map-placeholder">
              <i className="fa-solid fa-map-location-dot"></i>
              <h3>Find Us</h3>
              <p>Durbet Primary Hospital<br />Addis Ababa, Ethiopia</p>
              <div className="map-image">
                <img
                  src="https://picsum.photos/seed/map/600/400"
                  alt="Map location"
                  loading="lazy"
                />
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                Open in Google Maps <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <h2>Ready to Book an Appointment?</h2>
        <p>Call us directly or use our online booking system to schedule your visit.</p>
        <Link to="/register" className="btn-cta">
          Book Now <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </section>

      {/* ===== FOOTER (same as Home) ===== */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3><i className="fa-solid fa-hospital"></i> Durbet Primary</h3>
            <p>
              Delivering exceptional healthcare with compassion, integrity, and innovation.
              Your well-being is our greatest commitment.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/service">Our Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/register">Careers</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>For Patients</h4>
            <ul>
              <li><Link to="/register">Book Appointment</Link></li>
              <li><Link to="/login">Patient Portal</Link></li>
              <li><a href="#">Insurance</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="#"><i className="fa-solid fa-phone"></i> +251 911 234 567</a></li>
              <li><a href="#"><i className="fa-solid fa-envelope"></i> info@durbetprimary.com</a></li>
              <li><a href="#"><i className="fa-solid fa-location-dot"></i> Addis Ababa, Ethiopia</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Durbet Primary Hospital. All rights reserved.</span>
          <div className="socials">
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;