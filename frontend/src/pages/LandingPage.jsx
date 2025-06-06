import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>E-VisitCard</h1>
        </div>
        <div className="navbar-links">
          <Link to="/signup">Sign-Up</Link>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section fade-in">
        <div className="hero-content">
          <h1>Create Stunning Digital Business Cards in Minutes</h1>
          <p>Transform your professional networking with customizable, shareable e-visiting cards.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="primary-btn">Get Started Free</Link>
          </div>
        </div>
        {/* <div className="hero-image">
          <img src="/images/hero-card.png" alt="Example of a digital business card" />
        </div> */}
      </section>

      {/* Features Section */}
      <section className="features-section fade-in">
        <h2>Why Choose Our E-Visiting Card Generator</h2>
        <div className="features-grid">
          {[
            { icon: '✨', title: 'Easy to Use', desc: 'Create professional cards in minutes with our intuitive editor.' },
            { icon: '📱', title: 'Mobile Friendly', desc: 'Your digital card looks great on any device.' },
            { icon: '🔄', title: 'Instant Updates', desc: 'Change your details anytime - no need to reprint.' },
            { icon: '📊', title: 'Analytics', desc: 'Track who views your card and when.' }
          ].map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works fade-in">
        <h2>How It Works</h2>
        <div className="steps">
          {[
            { step: 1, title: 'Sign Up', desc: 'Create your free account in seconds.' },
            { step: 2, title: 'Choose a Template', desc: 'Select from our professionally designed templates.' },
            { step: 3, title: 'Customize', desc: 'Add your details, logo, and social links.' },
            { step: 4, title: 'Share', desc: 'Share via QR code, link, or social media.' }
          ].map((item, index) => (
            <div className="step" key={index}>
              <div className="step-number">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials fade-in">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          {[
            {
              quote: '"This service revolutionized how I network at conferences!"',
              img: '/images/user1.jpg',
              name: 'Ethnic Sai Arroju'
            },
            {
              quote: '"My clients love how professional my digital card looks."',
              img: '/images/user2.jpg',
              name: 'Varshith Kotha'
            }
          ].map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <p>{testimonial.quote}</p>
              <div className="user">
                {/* <img src={testimonial.img} alt={testimonial.name} /> */}
                <span>{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section fade-in">
        <h2>Ready to Elevate Your Professional Presence?</h2>
        <p>Join thousands of professionals who've upgraded to digital business cards.</p>
        <Link to="/signup" className="primary-btn">Start Now – It's Free</Link>
      </section>

      {/* Footer */}
      <footer className="footer fade-in">
        <div className="footer-content">
          <div className="footer-section">
            <h3>E-VisitCard</h3>
            <p>Digital business cards for the modern professional.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="#"><i className="fab fa-twitter" aria-hidden="true"></i></a>
              <a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i></a>
              <a href="#"><i className="fab fa-facebook" aria-hidden="true"></i></a>
              <a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} E-VisitCard Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
