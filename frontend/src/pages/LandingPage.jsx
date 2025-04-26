import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Import the specific CSS for the landing page

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to <br /> E-Visiting Card Generator</h1>
      <p>Your digital business card at your fingertips.</p>
      
      <div className="button-group">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
