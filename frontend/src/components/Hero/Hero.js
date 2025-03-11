import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to NerdNest</h1>
        <p>
          Your ultimate destination for premium gaming components and accessories. Level up your gaming experience with our curated collection.
        </p>
        <div className="hero-buttons">
          <Link to="/products" className="hero-btn btn-shop">Shop Now <FaArrowRight /></Link>
          <a href="#category" className="hero-btn btn-categories">Browse Categories</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
