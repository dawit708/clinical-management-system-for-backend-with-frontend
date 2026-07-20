import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Service.css';

const Service = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // ----- All Services with categories -----
  const allServices = [
    { icon: 'fa-solid fa-heart-pulse',    name: 'Cardiology',       category: 'specialist', desc: 'Complete heart and cardiovascular care including ECG, angioplasty, and bypass surgery consultations.', price: 'From 500 ETB' },
    { icon: 'fa-solid fa-tooth',          name: 'Dentistry',        category: 'general',     desc: 'Full range of dental services from cleanings to root canals, crowns, and cosmetic dentistry.', price: 'From 300 ETB' },
    { icon: 'fa-solid fa-brain',          name: 'Neurology',        category: 'specialist', desc: 'Diagnosis and treatment of brain, spinal cord, and nervous system disorders.', price: 'From 600 ETB' },
    { icon: 'fa-solid fa-bone',           name: 'Orthopedics',      category: 'specialist', desc: 'Bone, joint, and muscle treatment including fractures, arthritis, and sports injuries.', price: 'From 550 ETB' },
    { icon: 'fa-solid fa-baby',           name: 'Pediatrics',       category: 'general',     desc: 'Comprehensive healthcare for infants, children, and adolescents up to age 18.', price: 'From 350 ETB' },
    { icon: 'fa-solid fa-stethoscope',    name: 'General Medicine', category: 'general',     desc: 'Primary care checkups, vaccinations, and treatment for common illnesses.', price: 'From 250 ETB' },
    { icon: 'fa-solid fa-eye',            name: 'Ophthalmology',    category: 'specialist', desc: 'Complete eye care including vision tests, cataract surgery, and glaucoma treatment.', price: 'From 400 ETB' },
    { icon: 'fa-solid fa-lungs',          name: 'Pulmonology',      category: 'specialist', desc: 'Diagnosis and treatment of respiratory conditions including asthma and pneumonia.', price: 'From 500 ETB' },
    { icon: 'fa-solid fa-baby-carriage',  name: 'Maternity Care',   category: 'general',     desc: 'Prenatal checkups, delivery services, and postnatal care for mothers and newborns.', price: 'From 800 ETB' },
    { icon: 'fa-solid fa-vial',           name: 'Laboratory',       category: 'diagnostic',  desc: 'Blood tests, urine analysis, and other diagnostic lab services with fast results.', price: 'From 150 ETB' },
    { icon: 'fa-solid fa-x-ray',          name: 'Radiology',        category: 'diagnostic',  desc: 'X-rays, CT scans, MRI, and ultrasound imaging services.', price: 'From 450 ETB' },
    { icon: 'fa-solid fa-pills',          name: 'Pharmacy',         category: 'support',     desc: 'Full-service in-house pharmacy stocking prescription and over-the-counter medicine.', price: 'Varies' },
    { icon: 'fa-solid fa-truck-medical',  name: 'Emergency Care',   category: 'emergency',  desc: '24/7 emergency room services with rapid response and trauma care.', price: 'From 700 ETB' },
    { icon: 'fa-solid fa-user-nurse',     name: 'Nursing Care',     category: 'support',     desc: 'In-patient nursing services, wound care, and home visit nursing.', price: 'From 300 ETB' },
    { icon: 'fa-solid fa-dumbbell',       name: 'Physiotherapy',    category: 'general',     desc: 'Rehabilitation and physical therapy for injury recovery and mobility.', price: 'From 350 ETB' },
    { icon: 'fa-solid fa-syringe',        name: 'Vaccination',      category: 'support',     desc: 'Routine and travel vaccinations for all age groups.', price: 'From 200 ETB' },
    { icon: 'fa-solid fa-scissors',       name: 'Surgery',          category: 'specialist', desc: 'General and specialized surgical procedures with experienced surgeons.', price: 'From 2000 ETB' },
    { icon: 'fa-solid fa-kit-medical',    name: 'Ambulance Service',category: 'emergency',  desc: 'Emergency ambulance transport with trained paramedics on standby.', price: 'From 600 ETB' },
  ];

  const filters = [
    { id: 'all',        label: 'All Services',   icon: 'fa-solid fa-grip' },
    { id: 'general',    label: 'General Care',   icon: 'fa-solid fa-stethoscope' },
    { id: 'specialist', label: 'Specialist',     icon: 'fa-solid fa-user-doctor' },
    { id: 'diagnostic', label: 'Diagnostic',     icon: 'fa-solid fa-vial' },
    { id: 'emergency',  label: 'Emergency',      icon: 'fa-solid fa-truck-medical' },
    { id: 'support',    label: 'Support',        icon: 'fa-solid fa-hand-holding-medical' },
  ];

  const filteredServices = activeFilter === 'all'
    ? allServices
    : allServices.filter(s => s.category === activeFilter);

  // ----- Process Steps -----
  const steps = [
    { icon: 'fa-solid fa-calendar-check', title: 'Book Appointment',  desc: 'Choose your doctor and preferred time slot online' },
    { icon: 'fa-solid fa-clipboard-check',title: 'Get Checked In',    desc: 'Arrive at the hospital and complete quick registration' },
    { icon: 'fa-solid fa-user-doctor',    title: 'Meet Your Doctor',  desc: 'Receive consultation and personalized treatment plan' },
    { icon: 'fa-solid fa-notes-medical',  title: 'Follow-Up Care',    desc: 'Get prescriptions, lab results, and ongoing support' },
  ];

  // ----- Insurance Partners -----
  const insurance = ['Nyala Insurance', 'Nile Insurance', 'Awash Insurance', 'Ethiopian Insurance', 'Global Insurance', 'United Insurance'];

  return (
    <div className="service-container">

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <i className="fa-solid fa-hospital"></i>
          <span>Durbet <small>Primary</small></span>
        </Link>
        <ul className={`nav-links ${navOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/service" className="active">Service</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login" className="nav-btn-outline">Login</Link></li>
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

      {/* ===== PAGE HERO ===== */}
      <section className="page-hero">
        <div className="page-hero-glow" />
        <div className="page-hero-content">
          <span className="hero-badge">
            <i className="fa-solid fa-shield-halved"></i> Our Services
          </span>
          <h1>
            Comprehensive Care For <span className="highlight">Every Need</span>
          </h1>
          <p>
            From routine checkups to specialized treatments, Durbet Primary Hospital
            offers a full range of medical services delivered by expert professionals.
          </p>
        </div>
      </section>

      {/* ===== FILTER TABS ===== */}
      <section className="filter-section">
        <div className="filter-tabs">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`filter-tab ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              <i className={f.icon}></i> {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="services-main-section">
        <div className="services-main-grid">
          {filteredServices.map((s, i) => (
            <div className="service-detail-card" key={i}>
              <div className="service-detail-icon">
                <i className={s.icon}></i>
              </div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="service-detail-footer">
                <span className="service-price">{s.price}</span>
                <Link to="/register" className="service-book-link">
                  Book Now <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="process-section">
        <h2 className="section-title">
          <i className="fa-solid fa-route"></i> How It Works
        </h2>
        <p className="section-sub">Getting the care you need is simple and fast</p>
        <div className="process-grid">
          {steps.map((step, i) => (
            <div className="process-card" key={i}>
              <div className="process-number">{i + 1}</div>
              <div className="process-icon">
                <i className={step.icon}></i>
              </div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
              {i < steps.length - 1 && <div className="process-arrow"><i className="fa-solid fa-chevron-right"></i></div>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== INSURANCE PARTNERS ===== */}
      <section className="insurance-section">
        <h2 className="section-title">
          <i className="fa-solid fa-file-shield"></i> We Accept These Insurances
        </h2>
        <p className="section-sub">Cashless treatment available with our partner providers</p>
        <div className="insurance-grid">
          {insurance.map((ins, i) => (
            <div className="insurance-chip" key={i}>
              <i className="fa-solid fa-check-circle"></i> {ins}
            </div>
          ))}
        </div>
      </section>

      {/* ===== EMERGENCY BANNER ===== */}
      <section className="emergency-banner">
        <div className="emergency-content">
          <div className="emergency-icon">
            <i className="fa-solid fa-truck-medical"></i>
          </div>
          <div>
            <h3>Medical Emergency?</h3>
            <p>Our emergency team is available 24/7. Call now for immediate assistance.</p>
          </div>
        </div>
        <a href="tel:+251954329763" className="emergency-call-btn">
          <i className="fa-solid fa-phone"></i> +251 954 32 97 63
        </a>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <h2>Not Sure Which Service You Need?</h2>
        <p>Our team can guide you to the right department for your health concern</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn-cta">
            Book Appointment <i className="fa-solid fa-arrow-right"></i>
          </Link>
          <Link to="/contact" className="btn-cta-outline">
            Contact Us
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
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

export default Service;