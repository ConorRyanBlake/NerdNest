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
            In summary, Nerdnest is more than being merely a project — it stands
            as a testament to my capabilities as a full-stack developer and
            reflects my commitment to creating sophisticated, user-centered web
            applications that deliver exceptional experiences.
          </p>
        </div>
        
        <div className="about-section">
          <h3 className="about-section-title">Features and Functionality</h3>
          
          <div className="feature-grid">
            <div className="feature-category">
              <h5>Advanced Product Filtering & Sorting</h5>
              <ul>
                <li>
                  <strong>Multi-Category Filtering:</strong> Narrow down your search using multiple
                  filters.
                </li>
                <li>
                  <strong>Price Range Selector:</strong> Easily set a minimum and maximum price range
                  to find products within your budget.
                </li>
                <li>
                  <strong>Sorting Options:</strong> Organize results by recommended, alphabetically (a-z/z-a),
                  price (low to high/high to low).
                </li>
              </ul>
            </div>
            
            <div className="feature-category">
              <h5>Cart Functionality</h5>
              <ul>
                <li>
                  <strong>One-Click Add to Cart:</strong> Add items to your cart directly from product listings without leaving the page.
                </li>
                <li>
                  <strong>Real-Time Cart Updates:</strong> See cart totals update instantly as you add or remove items.
                </li>
                <li>
                  <strong>Persistent Cart:</strong> Your cart items are saved between sessions, so you never lose your selections.
                </li>
                <li>
                  <strong>Quantity Management:</strong> Easily increase or decrease product quantities within the cart.
                </li>
              </ul>
            </div>
            
            <div className="feature-category">
              <h5>Product Page</h5>
              <ul>
                <li>
                  <strong>Detailed Specifications:</strong> Comprehensive technical details for each product to make informed purchasing decisions.
                </li>
                <li>
                  <strong>High-Resolution Images:</strong> Multiple product images to examine products in detail.
                </li>
                <li>
                  <strong>Related Products:</strong> Discover similar or complementary items that match your interests.
                </li>
              </ul>
            </div>
            
            <div className="feature-category">
              <h5>User Authentication</h5>
              <ul>
                <li>
                  <strong>Secure Login/Registration:</strong> Protected user authentication with JWT and password hashing.
                </li>
                <li>
                  <strong>Role-Based Access:</strong> Different permission levels for customers and administrators.
                </li>
              </ul>
            </div>
            
            <div className="feature-category">
              <h5>Backend Integration</h5>
              <ul>
                <li>
                  <strong>RESTful API Architecture:</strong> Carefully designed endpoints following REST principles for intuitive data access.
                </li>
                <li>
                  <strong>Advanced Data Modeling:</strong> Optimized MongoDB schemas with Mongoose for efficient data storage and retrieval.
                </li>
                <li>
                  <strong>Middleware Pipeline:</strong> Request validation, authentication checks, and error handling through Express middleware.
                </li>
                <li>
                  <strong>Asynchronous Processing:</strong> Non-blocking operations using async/await for optimal performance.
                </li>
                <li>
                  <strong>Data Aggregation:</strong> Sophisticated MongoDB aggregation pipelines for complex data operations.
                </li>
              </ul>
            </div>
            
            <div className="feature-category">
              <h5>Admin Dashboard</h5>
              <ul>
                <li>
                  <strong>Comprehensive Product Management:</strong> Add and delete product information with an intuitive interface.
                </li>
              </ul>
            </div>
            
            <div className="feature-category">
              <h5>Responsive Design</h5>
              <ul>
                <li>
                  <strong>Mobile-First Approach:</strong> Seamless shopping experience across all devices, from smartphones to desktops.
                </li>
                <li>
                  <strong>Intuitive Navigation:</strong> User-friendly interface with logical information architecture.
                </li>
                <li>
                  <strong>Performance Optimized:</strong> Fast loading times and smooth interactions for an enjoyable browsing experience.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;