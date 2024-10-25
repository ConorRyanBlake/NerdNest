// src/pages/HomePage.js
import React from 'react';
import Hero from '../components/Hero/Hero';
import Bestseller from '../components/Bestseller/Bestseller';

const Home = () => {
  return (
    <div>
      <Hero />
      <Bestseller />
    </div>
  );
};

export default Home;
