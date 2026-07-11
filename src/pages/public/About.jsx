// import { Link } from 'react-router-dom'
// import logo from '../../assets/logo.png'
// import './About.css'

// const About = () => {
//     const values = [
//         { icon: '🎯', title: 'Our Mission',  desc: 'To provide accessible, affordable, and world-class healthcare to every patient who walks through our doors, regardless of background.' },
//         { icon: '👁️', title: 'Our Vision',   desc: 'To be the leading primary healthcare provider in the region, recognized for compassionate care and medical excellence.' },
//         { icon: '💎', title: 'Our Values',    desc: 'Integrity, compassion, respect, and continuous improvement guide everything we do for our patients and community.' }
//     ]

//     const team = [
//         { icon: '👨‍⚕️', name: 'Dr. Abel Tesfaye',  role: 'Chief Medical Officer', specialty: 'Cardiology' },
//         { icon: '👩‍⚕️', name: 'Dr. Selam Girma',    role: 'Head of Pediatrics',    specialty: 'Pediatrics' },
//         { icon: '👨‍⚕️', name: 'Dr. Yonas Bekele',   role: 'Head of Surgery',       specialty: 'Orthopedics' },
//         { icon: '👩‍⚕️', name: 'Dr. Hanna Alemu',    role: 'Head of Neurology',     specialty: 'Neurology' }
//     ]

//     const milestones = [
//         { year: '2010', text: 'Durbet Primary Hospitals founded with a single clinic' },
//         { year: '2014', text: 'Expanded to 6 specialized departments' },
//         { year: '2018', text: 'Reached 5,000 patients served milestone' },
//         { year: '2022', text: 'Launched 24/7 emergency care services' },
//         { year: '2026', text: 'Introduced online appointment booking platform' }
//     ]

//     return (
//         <div className="about-page">

//             {/* ── Navbar ────────────────────────────────────── */}
//             <nav className="public-navbar">
//                 <div className="navbar-container">
//                     <Link to="/" className="navbar-brand">
//                         <img src={logo} alt="Durbet Primary Hospitals" className="brand-logo" />
//                         <span className="brand-text">DURBET PRIMARY HOSPITALS</span>
//                     </Link>
//                     <div className="navbar-links">
//                         <Link to="/" className="nav-link">Home</Link>
//                         <Link to="/about" className="nav-link active">About</Link>
//                         <Link to="/Service" className="nav-link">Service</Link>
//                         <Link to="/contact" className="nav-link">Contact</Link>
//                     </div>
//                     <div className="navbar-actions">
//                         <Link to="/login" className="btn-login">Login</Link>
//                         <Link to="/register" className="btn-register">Register</Link>
//                     </div>
//                 </div>
//             </nav>

//             {/* ── Page Hero ──────────────────────────────────── */}
//             <section className="page-hero">
//                 <div className="page-hero-glow" />
//                 <div className="page-hero-container">
//                     <span className="hero-badge">🏥 About Us</span>
//                     <h1 className="page-hero-title">
//                         Caring For Our Community <span className="highlight">Since 2010</span>
//                     </h1>
//                     <p className="page-hero-desc">
//                         Durbet Primary Hospitals has been a trusted name in healthcare,
//                         combining modern medicine with genuine compassion for every patient.
//                     </p>
//                 </div>
//             </section>

//             {/* ── Story Section ──────────────────────────────── */}
//             <section className="story-section">
//                 <div className="section-container">
//                     <div className="story-grid">
//                         <div className="story-image">
//                             <img src={logo} alt="Durbet Primary Hospitals" className="story-logo" />
//                         </div>
//                         <div className="story-content">
//                             <span className="section-tag">Our Story</span>
//                             <h2 className="section-title">
//                                 A Legacy Built On Trust And Care
//                             </h2>
//                             <p className="story-text">
//                                 Durbet Primary Hospitals began as a small community clinic
//                                 with one goal: to give every patient the same level of care
//                                 we would want for our own families. Over the years, we have
//                                 grown into a full-service hospital with multiple departments,
//                                 modern equipment, and a team of dedicated professionals.
//                             </p>
//                             <p className="story-text">
//                                 Today, we serve thousands of patients each year, but our
//                                 founding principle remains unchanged — putting people
//                                 before profit, and health before everything else.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* ── Mission / Vision / Values ──────────────────── */}
//             <section className="values-section">
//                 <div className="section-container">
//                     <div className="section-header-center">
//                         <span className="section-tag">What Drives Us</span>
//                         <h2 className="section-title">Mission, Vision & Values</h2>
//                     </div>
//                     <div className="values-grid">
//                         {values.map((value, index) => (
//                             <div key={index} className="value-card">
//                                 <div className="value-icon">{value.icon}</div>
//                                 <h3>{value.title}</h3>
//                                 <p>{value.desc}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* ── Timeline / Milestones ───────────────────────── */}
//             <section className="timeline-section">
//                 <div className="section-container">
//                     <div className="section-header-center">
//                         <span className="section-tag">Our Journey</span>
//                         <h2 className="section-title">Milestones Along The Way</h2>
//                     </div>
//                     <div className="timeline">
//                         {milestones.map((item, index) => (
//                             <div key={index} className="timeline-item">
//                                 <div className="timeline-dot" />
//                                 <div className="timeline-year">{item.year}</div>
//                                 <div className="timeline-text">{item.text}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* ── Team Section ────────────────────────────────── */}
//             <section className="team-section">
//                 <div className="section-container">
//                     <div className="section-header-center">
//                         <span className="section-tag">Meet Our Team</span>
//                         <h2 className="section-title">Leadership Behind Our Care</h2>
//                         <p className="section-desc">
//                             Experienced professionals dedicated to your health and wellbeing
//                         </p>
//                     </div>
//                     <div className="team-grid">
//                         {team.map((member, index) => (
//                             <div key={index} className="team-card">
//                                 <div className="team-avatar">{member.icon}</div>
//                                 <h3>{member.name}</h3>
//                                 <p className="team-role">{member.role}</p>
//                                 <span className="team-specialty">{member.specialty}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* ── CTA Section ───────────────────────────────── */}
//             <section className="cta-section">
//                 <div className="cta-container">
//                     <h2>Join The Durbet Family Today</h2>
//                     <p>Experience healthcare that puts you first</p>
//                     <Link to="/register" className="btn-cta">
//                         Get Started 🚀
//                     </Link>
//                 </div>
//             </section>

//             {/* ── Footer ─────────────────────────────────────── */}
//             <footer className="public-footer">
//                 <div className="footer-container">
//                     <div className="footer-brand">
//                         <div className="footer-brand-header">
//                             <img src={logo} alt="Durbet Primary Hospitals" className="footer-logo" />
//                             <span className="brand-text">DURBET PRIMARY HOSPITALS</span>
//                         </div>
//                         <p>Providing quality healthcare services since 2010</p>
//                     </div>
//                     <div className="footer-links">
//                         <div className="footer-col">
//                             <h4>Quick Links</h4>
//                             <Link to="/">Home</Link>
//                             <Link to="/about">About</Link>
//                             <Link to="/service">Service</Link>
//                             <Link to="/contact">Contact</Link>
//                         </div>
//                         <div className="footer-col">
//                             <h4>Contact Info</h4>
//                             <p>📍 Addis Ababa, Ethiopia</p>
//                             <p>📞 +251 911 234 567</p>
//                             <p>📧 info@durbethospitals.com</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="footer-bottom">
//                     <p>© 2026 DURBET PRIMARY HOSPITALS. All rights reserved.</p>
//                 </div>
//             </footer>

//         </div>
//     )
// }

// export default About
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const [navOpen, setNavOpen] = useState(false);

  // Team members – expanded with more professionals
  const team = [
    {
      name: 'Dr. Abebe Kebede',
      role: 'Chief Medical Officer',
      specialty: 'Cardiology',
      avatar: 'https://picsum.photos/seed/doc1/300/300',
      bio: 'Over 20 years of experience in cardiovascular medicine.',
    },
    {
      name: 'Dr. Tsehay Mesfin',
      role: 'Head of Surgery',
      specialty: 'General Surgery',
      avatar: 'https://picsum.photos/seed/doc2/300/300',
      bio: 'Pioneer in minimally invasive surgical techniques.',
    },
    {
      name: 'Dr. Selam Tesfaye',
      role: 'Lead Pediatrician',
      specialty: 'Pediatrics',
      avatar: 'https://picsum.photos/seed/doc3/300/300',
      bio: 'Dedicated to children’s health and wellness for 15 years.',
    },
    {
      name: 'Dr. Yonas Alemu',
      role: 'Neurology Specialist',
      specialty: 'Neurology',
      avatar: 'https://picsum.photos/seed/doc4/300/300',
      bio: 'Expert in treatment of complex neurological disorders.',
    },
    {
      name: 'Dr. Hanna Wondimu',
      role: 'Obstetrics & Gynecology',
      specialty: 'OB/GYN',
      avatar: 'https://picsum.photos/seed/doc5/300/300',
      bio: 'Compassionate care for women at every stage of life.',
    },
    {
      name: 'Dr. Dawit Hailu',
      role: 'Orthopedic Surgeon',
      specialty: 'Orthopedics',
      avatar: 'https://picsum.photos/seed/doc6/300/300',
      bio: 'Specializing in joint replacement and sports injuries.',
    },
    {
      name: 'Dr. Mekdes Alemu',
      role: 'Head of Radiology',
      specialty: 'Radiology',
      avatar: 'https://picsum.photos/seed/doc7/300/300',
      bio: 'Expert in diagnostic imaging and interventional radiology.',
    },
    {
      name: 'Dr. Fikru Tesfaye',
      role: 'Emergency Medicine',
      specialty: 'Emergency Care',
      avatar: 'https://picsum.photos/seed/doc8/300/300',
      bio: 'Leading our 24/7 emergency department with precision and speed.',
    },
  ];

  // Mission, Vision, Values
  const coreValues = [
    {
      icon: 'fa-solid fa-hand-holding-heart',
      title: 'Compassion',
      desc: 'We treat every patient with empathy and respect.',
    },
    {
      icon: 'fa-solid fa-flask',
      title: 'Innovation',
      desc: 'We embrace cutting-edge medical technology and research.',
    },
    {
      icon: 'fa-solid fa-people-group',
      title: 'Integrity',
      desc: 'We uphold the highest ethical standards in all we do.',
    },
    {
      icon: 'fa-solid fa-handshake',
      title: 'Collaboration',
      desc: 'We work together as a multidisciplinary team for optimal care.',
    },
  ];

  const stats = [
    { number: '25+', label: 'Years of Excellence' },
    { number: '150+', label: 'Expert Doctors' },
    { number: '30+', label: 'Departments' },
    { number: '99%', label: 'Patient Satisfaction' },
  ];

  const testimonials = [
    {
      name: 'Meron T.',
      role: 'Patient',
      text: 'The doctors and nurses at Durbet Primary are truly world-class. I received exceptional care during my treatment.',
      avatar: 'M',
    },
    {
      name: 'Dr. Michael S.',
      role: 'Consultant',
      text: 'I have collaborated with many hospitals, but Durbet Primary stands out for its commitment to excellence and patient safety.',
      avatar: 'M',
    },
    {
      name: 'Selamawit K.',
      role: 'Patient\'s Family',
      text: 'The support and kindness shown to my mother during her stay was overwhelming. Thank you for everything.',
      avatar: 'S',
    },
  ];

  return (
    <div className="about-container">

      {/* ===== NAVBAR (same as Home) ===== */}
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <i className="fa-solid fa-hospital"></i>
          <span>Durbet <small>Primary</small></span>
        </Link>
        <ul className={`nav-links ${navOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about" className="active">About</Link></li>
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
      <section className="about-hero">
        <div className="about-hero-glow" />
        <div className="about-hero-content">
          <h1>
            About <span className="highlight">Durbet Primary</span>
          </h1>
          <p>
            We are a premier healthcare institution dedicated to providing world-class medical services
            with a patient-centered approach. Our story is one of commitment, innovation, and community.
          </p>
          <div className="about-hero-actions">
            <Link to="/register" className="btn-primary">
              <i className="fa-solid fa-phone"></i> Book Appointment
            </Link>
            <Link to="/service" className="btn-secondary">
              <i className="fa-regular fa-circle-play"></i> Explore Services
            </Link>
          </div>
        </div>
        <div className="about-hero-image">
          <img
            src="https://picsum.photos/seed/abouthero/600/450"
            alt="About Durbet Primary"
            loading="lazy"
          />
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="mission-section">
        <div className="mission-card">
          <div className="mission-icon">
            <i className="fa-solid fa-bullseye"></i>
          </div>
          <h3>Our Mission</h3>
          <p>
            To improve the health and well-being of our community by delivering accessible,
            compassionate, and high-quality healthcare services.
          </p>
        </div>
        <div className="vision-card">
          <div className="vision-icon">
            <i className="fa-solid fa-eye"></i>
          </div>
          <h3>Our Vision</h3>
          <p>
            To be the leading healthcare provider in the region, recognized for clinical excellence,
            patient safety, and innovative medical solutions.
          </p>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="values-section">
        <h2 className="section-title">
          <i className="fa-solid fa-gem"></i> Our Core Values
        </h2>
        <p className="section-sub">The principles that guide everything we do</p>
        <div className="values-grid">
          {coreValues.map((value, i) => (
            <div className="value-card" key={i}>
              <div className="value-icon">
                <i className={value.icon}></i>
              </div>
              <h4>{value.title}</h4>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="about-stats">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <span className="number">{s.number}</span>
              <span className="label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TEAM (Professionals) ===== */}
      <section className="team-section">
        <h2 className="section-title">
          <i className="fa-solid fa-user-doctor"></i> Meet Our Professionals
        </h2>
        <p className="section-sub">
          Our dedicated team of medical experts is here to provide you with the best care possible.
        </p>
        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={i}>
              <div className="team-card-image">
                <img src={member.avatar} alt={member.name} loading="lazy" />
              </div>
              <div className="team-card-info">
                <h4>{member.name}</h4>
                <span className="role">{member.role}</span>
                <span className="specialty">{member.specialty}</span>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonial-section">
        <h2 className="section-title">
          <i className="fa-regular fa-comment"></i> What People Say
        </h2>
        <p className="section-sub">Hear from our patients and partners</p>
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
        <h2>Committed to Your Health</h2>
        <p>
          Experience the difference at Durbet Primary Hospital. Schedule your visit today and
          let our professionals take care of you.
        </p>
        <Link to="/register" className="btn-cta">
          Book an Appointment <i className="fa-solid fa-arrow-right"></i>
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

export default About;