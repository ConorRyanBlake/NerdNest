import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-heading">About Nerdnest</h1>
        <p className="about-tagline">
          A modern e-commerce platform designed for tech enthusiasts, offering cutting-edge products with a seamless shopping experience.
        </p>
        <div className="about-divider"></div>
      </div>

      <div className="about-section">
        <h2 className="about-subheading">Our Story</h2>
        <p className="about-text">
          Nerdnest was born from a passion for technology and a desire to create a specialized marketplace for tech enthusiasts. 
          What started as a small project has grown into a comprehensive e-commerce platform showcasing a wide range of products 
          with a user-friendly interface, efficient cart management, and secure checkout options.
        </p>
        <p className="about-text">
          Our mission is to connect tech lovers with the products they need, offering detailed information, competitive pricing, 
          and a shopping experience tailored specifically for the tech community.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3 className="about-card-title">What I Learned</h3>
          <p className="about-card-text">
            Building this project gave me hands-on experience with the MERN stack, including React for the frontend, 
            Express and Node.js for the backend, and MongoDB for data management. I also improved my skills in handling
            authentication, database operations, and responsive UI design.
          </p>
        </div>
        <div className="about-card">
          <h3 className="about-card-title">Why I Built This</h3>
          <p className="about-card-text">
            This project serves as a portfolio piece to demonstrate my ability to create full-stack applications from scratch. 
            It highlights my expertise in modern web development, API integration, and user-focused design principles that 
            prioritize both functionality and aesthetics.
          </p>
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-subheading">Our Technology</h2>
        <p className="about-text">
          Nerdnest is built using cutting-edge web technologies to ensure optimal performance and user experience. 
          The platform leverages React for a dynamic frontend, Node.js and Express for a robust backend, and MongoDB 
          for efficient data management.
        </p>
        <p className="about-text">
          Our responsive design ensures a seamless experience across all devices, while our secure authentication 
          and payment systems prioritize user safety and data protection.
        </p>
      </div>
    </div>
  );
};

export default About;