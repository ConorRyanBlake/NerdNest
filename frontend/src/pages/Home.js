// src/pages/HomePage.js
import React from 'react';
import Hero from '../components/Hero/Hero';
import Bestseller from '../components/Bestseller/Bestseller';
import CategoryGrid from '../components/Categories/Categories';


const Home = () => {
  return (
    <div>
      <Hero />
      <Bestseller />
      <CategoryGrid />
    </div>
  );
};

export default Home;
