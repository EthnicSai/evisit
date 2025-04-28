import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Send login request to the backend
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
      
      // Save token to localStorage for authentication
      localStorage.setItem('authToken', res.data.token);

      // Redirect to the user's card manager page
      navigate(`/cardManager/${res.data.user._id}`);
    } catch (err) {
      setError('Invalid credentials'); // Set error message in case of failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>
            <Link to="/">E-VisitCard</Link>  {/* Wrap the brand with Link to go to home */}
          </h1>
        </div>
        <div className="navbar-links">
          <Link to="/features">Features</Link>
          <Link to="/templates">Templates</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </nav>

      {/* Login Form */}
      <section className="login-form-section fade-in">
        <h2>Login to Your Account</h2>
        {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="primary-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
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

export default LoginPage;
