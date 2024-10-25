import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h1>NerdNest</h1>
          <p>Your one-stop shop for all things tech!</p>
        </div>

        <div className="footer-section">
          <p className="footer-title">Company</p>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Products</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div className="footer-section">
          <p className="footer-title">Get In Touch</p>
          <ul>
            <li>Email us: 4LWjv@example.com</li>
            <li>Call us: 0123456789</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 NerdNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
