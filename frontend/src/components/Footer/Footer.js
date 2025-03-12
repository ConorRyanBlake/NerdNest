import React from "react";
import "./Footer.css";
// Import icons from react-icons
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h1>NerdNest</h1>
          <p>Your one-stop destination for premium gaming components and accessories. Elevate your gaming experience with NerdNest.</p>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" aria-label="Twitter/X">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <p className="footer-title">Quick Links</p>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/privacy">Privacy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <p className="footer-title">Get In Touch</p>
          <ul>
            <li><MdEmail /> <a href="mailto:4LWjv@example.com">4LWjv@example.com</a></li>
            <li><MdPhone /> <a href="tel:0123456789">0123456789</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NerdNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;