import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div class="hero-section">
      <div class="hero-content">
        <h1>Welcome to NerdNest</h1>
        <p>Your one-stop shop for all things tech!</p>
        <a href="/products" class="hero-btn">
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default Hero;
