import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignupPage.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await axios.post(`${API_URL}/api/users/register`, {
        username: formData.name,
        email: formData.email,
        password: formData.password
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating account, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>
            <Link to="/">E-VisitCard</Link>
          </h1>
        </div>
        <div className="navbar-links">
          <Link to="/signup">Sign-Up</Link>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </nav>

      {/* Sign-Up Section */}
      <section className="signup-section fade-in">
        <div className="signup-content">
          <h1>Create Your Account</h1>
          <p>Start building your digital business card today.</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="primary-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <p className="login-redirect">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
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

export default SignUpPage;
