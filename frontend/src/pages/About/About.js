import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-heading">About Nerdnest</h1>
        <p className="about-tagline">
          A modern e-commerce platform designed for tech enthusiasts, offering
          cutting-edge products with a seamless shopping experience.
        </p>
        <div className="about-divider"></div>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3 className="about-card-title">What I Learned</h3>
          <p className="about-card-text">
            Building Nerdnest provided invaluable experience in full-stack
            development with the MERN stack. This project significantly enhanced
            my technical expertise in:
          </p>
          <ul className="about-list">
            <li>
              <strong>Front-End Development:</strong> Enhanced my skills in
              React, focusing on component architecture and state management
              systems like Redux and Context API. Developed responsive,
              intuitive user interfaces using modern CSS techniques and
              Bootstrap.
            </li>
            <li>
              <strong>Back-End Engineering:</strong> Strengthened Node.js and
              Express.js skills through building robust RESTful APIs,
              implementing complex CRUD operations, and creating secure
              authentication systems with JWT and bcrypt.
            </li>
            <li>
              <strong>Database Architecture:</strong> Developed proficiency in
              MongoDB, focusing on efficient schema design, data modeling best
              practices, and optimized queries through Mongoose.
            </li>
            <li>
              <strong>State Management:</strong> Implemented sophisticated
              global state solutions, with efficient data fetching patterns
              using Axios and React Query for real-time data synchronization.
            </li>
            <li>
              <strong>Security Implementation:</strong> Built comprehensive user
              authentication with secure JWT workflows, password hashing, and
              role-based access control systems.
            </li>
            <li>
              <strong>E-Commerce Systems:</strong> Engineered core e-commerce
              functionality including dynamic cart management and product
              filtering.
            </li>
          </ul>
          <p className="about-card-conclusion">
            Beyond technical skills, this project provided valuable insights
            into application scalability, intuitive UI/UX design principles, and
            handling complex user interactions in real-time environments.
          </p>
        </div>
        <div className="about-card">
          <h3 className="about-card-title">Why I Built This</h3>
          <p className="about-card-text">
            Nerdnest was developed as both a portfolio project and a practical
            demonstration of my capabilities in building full-stack web
            applications. My key motivations were:
          </p>
          <ul className="about-list">
            <li>
              <strong>Demonstrating Technical Versatility:</strong> This project
              showcases my proficiency across the entire MERN stack (MongoDB,
              Express.js, React, Node.js). It demonstrates my ability to
              seamlessly integrate frontend and backend technologies, from
              crafting engaging user experiences to implementing complex
              database architecture and API integrations.
            </li>
            <li>
              <strong>Professional Development:</strong> Through this project, I
              deliberately challenged myself to explore advanced concepts in
              React development, modern authentication protocols, and
              performance optimization techniques. Each feature implementation
              served as an opportunity to deepen my understanding of
              contemporary web development practices and strengthen my
              problem-solving abilities.
            </li>
          </ul>
          <p className="about-card-conclusion">
            In summary, Nerdnest is more than being merely a project — it stands as
            a testament to my capabilities as a full-stack developer and
            reflects my commitment to creating sophisticated, user-centered web
            applications that deliver exceptional experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
