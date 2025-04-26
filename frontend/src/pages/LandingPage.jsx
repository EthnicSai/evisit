import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Import the specific CSS for the landing page

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to <br></br> E-Visiting Card Generator</h1>
      <p>Your digital business card at your fingertips.</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <br />
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default LandingPage;
