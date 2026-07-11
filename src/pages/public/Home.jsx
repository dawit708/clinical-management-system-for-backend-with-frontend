import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // ----- Carousel Images (20) — hospital roles & departments -----
  const images = [
    { id: 1,  src: 'https://picsum.photos/seed/doctor1/1400/700',    title: 'Expert Doctors',       desc: 'Board-certified physicians ready to help' },
    { id: 2,  src: 'https://picsum.photos/seed/nurse1/1400/700',     title: 'Caring Nurses',        desc: 'Dedicated nursing staff around the clock' },
    { id: 3,  src: 'https://picsum.photos/seed/lab1/1400/700',       title: 'Medical Laboratory',   desc: 'Fast and accurate diagnostic testing' },
    { id: 4,  src: 'https://picsum.photos/seed/surgery1/1400/700',   title: 'Surgical Team',        desc: 'Advanced surgical procedures and recovery' },
    { id: 5,  src: 'https://picsum.photos/seed/pharmacy1/1400/700',  title: 'In-House Pharmacy',    desc: 'Full-service pharmacy for all prescriptions' },
    { id: 6,  src: 'https://picsum.photos/seed/radiology1/1400/700', title: 'Radiology Department', desc: 'Modern imaging and scanning technology' },
    { id: 7,  src: 'https://picsum.photos/seed/icu1/1400/700',       title: 'Intensive Care Unit',  desc: '24/7 critical care monitoring' },
    { id: 8,  src: 'https://picsum.photos/seed/maternity1/1400/700', title: 'Maternity Ward',       desc: 'Safe and comfortable delivery rooms' },
    { id: 9,  src: 'https://picsum.photos/seed/pediatric1/1400/700', title: 'Pediatric Care',       desc: 'Specialized care for children' },
    { id: 10, src: 'https://picsum.photos/seed/dental1/1400/700',    title: 'Dental Clinic',        desc: 'Complete oral health services' },
    { id: 11, src: 'https://picsum.photos/seed/cardio1/1400/700',    title: 'Cardiology Unit',      desc: 'Heart and vascular specialists' },
    { id: 12, src: 'https://picsum.photos/seed/neuro1/1400/700',     title: 'Neurology Department', desc: 'Brain and nervous system experts' },
    { id: 13, src: 'https://picsum.photos/seed/ortho1/1400/700',     title: 'Orthopedics',          desc: 'Bone and joint treatment specialists' },
    { id: 14, src: 'https://picsum.photos/seed/physio1/1400/700',    title: 'Physiotherapy',        desc: 'Recovery and rehabilitation programs' },
    { id: 15, src: 'https://picsum.photos/seed/reception1/1400/700', title: 'Front Desk Team',      desc: 'Friendly reception and patient support' },
    { id: 16, src: 'https://picsum.photos/seed/ambulance1/1400/700', title: 'Emergency Response',   desc: 'Rapid ambulance and emergency services' },
    { id: 17, src: 'https://picsum.photos/seed/admin1/1400/700',     title: 'Hospital Administration', desc: 'Efficient management and operations' },
    { id: 18, src: 'https://picsum.photos/seed/ward1/1400/700',      title: 'General Ward',         desc: 'Comfortable recovery accommodations' },
    { id: 19, src: 'https://picsum.photos/seed/equipment1/1400/700', title: 'Modern Equipment',     desc: 'State-of-the-art medical technology' },
    { id: 20, src: 'https://picsum.photos/seed/building1/1400/700',  title: 'Our Facility',         desc: 'Spacious and modern hospital campus' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const totalSlides = images.length;

  const goToSlide = useCallback((index) => {
    let target = index;
    if (target < 0) target = totalSlides - 1;
    if (target >= totalSlides) target = 0;
    setCurrentIndex(target);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Auto-slide every 1 seconds
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(nextSlide, 500);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, nextSlide]);

  // ----- Page Previews (20) — label header + image style -----
  const pagePreviews = [
    { label: 'Doctor Page',        img: 'https://picsum.photos/seed/doc-page/500/380' },
    { label: 'Patient Page',       img: 'https://picsum.photos/seed/pat-page/500/380' },
    { label: 'Nurse Page',         img: 'https://picsum.photos/seed/nur-page/500/380' },
    { label: 'Receptionist Page',  img: 'https://picsum.photos/seed/rec-page/500/380' },
    { label: 'Admin Page',         img: 'https://picsum.photos/seed/adm-page/500/380' },
    { label: 'Medical Store Page', img: 'https://picsum.photos/seed/med-page/500/380' },
    { label: 'Report Page',        img: 'https://picsum.photos/seed/rep-page/500/380' },
    { label: 'Prescription Page',  img: 'https://picsum.photos/seed/pre-page/500/380' },
    { label: 'Appointment Page',   img: 'https://picsum.photos/seed/app-page/500/380' },
    { label: 'Cardiology Page',    img: 'https://picsum.photos/seed/car-page/500/380' },
    { label: 'Laboratory Page',    img: 'https://picsum.photos/seed/lab-page/500/380' },
    { label: 'Radiology Page',     img: 'https://picsum.photos/seed/rad-page/500/380' },
    { label: 'ICU Page',           img: 'https://picsum.photos/seed/icu-page/500/380' },
    { label: 'Emergency Page',     img: 'https://picsum.photos/seed/emg-page/500/380' },
    { label: 'Pharmacy Page',      img: 'https://picsum.photos/seed/phr-page/500/380' },
    { label: 'Billing Page',       img: 'https://picsum.photos/seed/bil-page/500/380' },
    { label: 'Surgery Page',       img: 'https://picsum.photos/seed/sur-page/500/380' },
    { label: 'Maternity Page',     img: 'https://picsum.photos/seed/mat-page/500/380' },
    { label: 'Pediatric Page',     img: 'https://picsum.photos/seed/ped-page/500/380' },
    { label: 'Dashboard Page',     img: 'https://picsum.photos/seed/dash-page/500/380' },
  ];

  // ----- Stats -----
  const stats = [
    { number: '12K+', label: 'Happy Patients' },
    { number: '45+',  label: 'Expert Doctors' },
    { number: '18+',  label: 'Departments' },
    { number: '98%',  label: 'Satisfaction Rate' },
  ];

  // ----- Services -----
  const services = [
    { icon: 'fa-solid fa-stethoscope',   name: 'General Medicine', desc: 'Comprehensive primary care' },
    { icon: 'fa-solid fa-heart-pulse',   name: 'Cardiology',       desc: 'Heart & vascular health' },
    { icon: 'fa-solid fa-brain',         name: 'Neurology',        desc: 'Brain & nervous system' },
    { icon: 'fa-solid fa-bone',          name: 'Orthopedics',      desc: 'Bone & joint care' },
    { icon: 'fa-solid fa-baby',          name: 'Pediatrics',       desc: 'Child & adolescent health' },
    { icon: 'fa-solid fa-user-md',       name: 'Emergency',        desc: '24/7 urgent care' },
  ];

  // ----- Role Portals -----
  const portals = [
    { icon: 'fa-solid fa-user-doctor',    name: 'Doctor Portal',       desc: 'Manage appointments and patients', color: 'blue' },
    { icon: 'fa-solid fa-hospital-user',  name: 'Patient Portal',      desc: 'Book appointments and view records', color: 'green' },
    { icon: 'fa-solid fa-user-nurse',     name: 'Nurse Portal',        desc: 'Coordinate patient care', color: 'purple' },
    { icon: 'fa-solid fa-clipboard-list', name: 'Receptionist Portal', desc: 'Front desk and check-in operations', color: 'orange' },
    { icon: 'fa-solid fa-user-shield',    name: 'Admin Portal',        desc: 'Full system management and reports', color: 'red' },
    { icon: 'fa-solid fa-pills',          name: 'Pharmacy Portal',     desc: 'Medicine stock and prescriptions', color: 'teal' },
  ];

  // ----- Why Choose Us -----
  const whyUs = [
    { icon: 'fa-solid fa-user-md',        title: 'Expert Medical Team',   desc: 'Board-certified doctors with years of experience' },
    { icon: 'fa-solid fa-microscope',     title: 'Modern Equipment',      desc: 'State-of-the-art medical technology and facilities' },
    { icon: 'fa-solid fa-truck-medical',  title: '24/7 Emergency Care',   desc: 'Round-the-clock emergency services always available' },
    { icon: 'fa-solid fa-calendar-check', title: 'Easy Online Booking',   desc: 'Book appointments online anytime, anywhere' },
  ];

  // ----- Testimonials -----
  const testimonials = [
    { name: 'Sarah M.',     role: 'Patient',       text: 'The care I received was exceptional. The staff treated me like family and the facilities are top-notch.', avatar: 'S' },
    { name: 'Dr. James K.', role: 'Chief Surgeon', text: 'Durbet Primary is a place where innovation meets compassion. Proud to be part of this team.',           avatar: 'J' },
    { name: 'Emily R.',     role: 'Patient',       text: 'From the moment I walked in, I felt at ease. The doctors explained everything clearly and the recovery was smooth.', avatar: 'E' },
  ];

  // Mobile nav toggle
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="home-container">

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <i className="fa-solid fa-hospital"></i>
          <span>Durbet <small>Primary</small></span>
        </Link>
        <ul className={`nav-links ${navOpen ? 'open' : ''}`}>
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/service">Service</Link></li>
          <li><Link to="/contact">Contact</Link></li>
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
      <section className="hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fa-solid fa-shield-halved"></i> Trusted Since 2010
          </div>
          <h1>
            Your Health, <br />
            <span className="highlight">Our Priority</span>
          </h1>
          <p>
            Welcome to Durbet Primary Hospital — where advanced technology meets compassionate care.
            We are committed to providing exceptional healthcare services to our community.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn-primary">
              <i className="fa-solid fa-phone"></i> Book Appointment
            </Link>
            <Link to="/service" className="btn-secondary">
              <i className="fa-regular fa-circle-play"></i> Our Services
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <span className="number">{s.number}</span>
                <span className="label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://picsum.photos/seed/hospitalhero/600/450"
            alt="Durbet Primary Hospital"
            loading="lazy"
          />
        </div>
      </section>

      {/* ===== CAROUSEL ===== */}
      <section className="carousel-section">
        <div className="carousel-header">
          <div>
            <h2><i className="fa-regular fa-images"></i> Our Facility & Team</h2>
            <p>Meet the people and departments behind Durbet Primary Hospital</p>
          </div>
          <div className="carousel-controls">
            <button onClick={prevSlide} aria-label="Previous">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button onClick={nextSlide} aria-label="Next">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img) => (
              <div className="carousel-slide" key={img.id}>
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="slide-overlay">
                  <h3>{img.title}</h3>
                  <p>{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== PAGE PREVIEWS GRID ===== */}
      <section className="pages-section">
        <h2 className="section-title">
          <i className="fa-solid fa-table-cells-large"></i> Explore Every Page
        </h2>
        <p className="section-sub">A quick preview of every portal and page inside our HMS</p>
        <div className="pages-grid">
          {pagePreviews.map((page, i) => (
            <div className="page-card" key={i}>
              <div className="page-card-header">
                <span>{page.label}</span>
              </div>
              <div className="page-card-image">
                <img src={page.img} alt={page.label} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ROLE PORTALS ===== */}
      <section className="portals-section">
        <h2 className="section-title">
          <i className="fa-solid fa-users-gear"></i> Access Your Portal
        </h2>
        <p className="section-sub">One platform connecting every part of our hospital</p>
        <div className="portals-grid">
          {portals.map((p, i) => (
            <div className={`portal-card ${p.color}`} key={i}>
              <div className="portal-icon">
                <i className={p.icon}></i>
              </div>
              <h4>{p.name}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services-section">
        <h2 className="section-title">
          <i className="fa-regular fa-hospital"></i> Our Departments
        </h2>
        <p className="section-sub">
          Comprehensive healthcare services tailored to your needs
        </p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="icon">
                <i className={s.icon}></i>
              </div>
              <h4>{s.name}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why-section">
        <h2 className="section-title">
          <i className="fa-solid fa-award"></i> Why Choose Durbet Primary
        </h2>
        <p className="section-sub">Providing excellence in every treatment</p>
        <div className="why-grid">
          {whyUs.map((w, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">
                <i className={w.icon}></i>
              </div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonial-section">
        <h2 className="section-title">
          <i className="fa-regular fa-comment"></i> What Our Patients Say
        </h2>
        <p className="section-sub">Real stories from real people</p>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <blockquote>"{t.text}"</blockquote>
              <div className="author">
                <div className="avatar">{t.avatar}</div>
                <div className="info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <h2>Ready to Book Your Appointment?</h2>
        <p>Join thousands of patients who trust Durbet Primary Hospital for their healthcare needs</p>
        <Link to="/register" className="btn-cta">
          Get Started Today <i className="fa-solid fa-arrow-right"></i>
        </Link>
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

export default Home;