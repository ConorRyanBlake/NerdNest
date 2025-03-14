import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Nerdnest</h1>
      <p className="text-lg text-gray-600 mb-6">
        Nerdnest is a modern e-commerce platform designed to provide a seamless
        shopping experience for tech enthusiasts. The platform showcases a wide
        range of products with a user-friendly interface, efficient cart
        management, and secure checkout options.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        What I Learned
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Building this project gave me hands-on experience with the MERN stack,
        including React for the frontend, Express and Node.js for the backend,
        and MongoDB for data management. I also improved my skills in handling
        authentication, database operations, and responsive UI design.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Why I Built This
      </h2>
      <p className="text-lg text-gray-600">
        This project serves as a portfolio piece to demonstrate my ability to
        create full-stack applications from scratch. It highlights my expertise
        in modern web development, API integration, and user-focused design.
      </p>
    </div>
  );
};

export default About;
