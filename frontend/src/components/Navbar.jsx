import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>Card Manager</h1>
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/cards" className="navbar-link">Cards</Link>
          </li>
          <li>
            <Link to="/create-card" className="navbar-link">Create Card</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
