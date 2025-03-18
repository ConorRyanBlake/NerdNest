import React from 'react';
import { FaDesktop, FaKeyboard, FaHeadphones, FaGamepad, FaChair } from 'react-icons/fa';
import { MdMonitor } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const CategoryGrid = () => {

    const navigate = useNavigate();
  
  // Map your category titles to the category names in Collection.js
  const categoryMapping = {
    'Gaming PCs': 'GamingPCs',
    'Peripherals': 'Peripherals',
    'Monitors': 'Monitors',
    'Audio': 'Audio',
    'Accessories': 'Accessories',
    'Furniture': 'Furniture'
  };

  const handleCategoryClick = (categoryTitle) => {
    // Get the corresponding category name from your mapping
    const collectionCategory = categoryMapping[categoryTitle];
    
    // Navigate to collection page with category parameter
    navigate(`/products?category=${collectionCategory}`);
  };

  const categories = [
    {
      id: 1,
      title: 'Gaming PCs',
      description: 'Custom built gaming rigs',
      icon: <FaDesktop size={32} />,
      colorClass: 'blue-icon'
    },
    {
      id: 2,
      title: 'Peripherals',
      description: 'Keyboards, mice & more',
      icon: <FaKeyboard size={32} />,
      colorClass: 'purple-icon'
    },
    {
      id: 3,
      title: 'Monitors',
      description: 'Ultra-wide & high refresh',
      icon: <MdMonitor size={36} />,
      colorClass: 'green-icon'
    },
    {
      id: 4,
      title: 'Audio',
      description: 'Headsets & speakers',
      icon: <FaHeadphones size={32} />,
      colorClass: 'red-icon'
    },
    {
      id: 5,
      title: 'Accessories',
      description: 'Controllers & adapters',
      icon: <FaGamepad size={32} />,
      colorClass: 'yellow-icon'
    },
    {
      id: 6,
      title: 'Furniture',
      description: 'Gaming chairs & desks',
      icon: <FaChair size={32} />,
      colorClass: 'teal-icon'
    }
  ];

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Shop by Category</h1>
        <p>Browse our extensive collection of gaming gear</p>
      </div>
      
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card" onClick={() => handleCategoryClick(category.title)}>
            <div className="category-content">
              <div className="icon-circle">
                <div className={`icon ${category.colorClass}`}>
                  {category.icon}
                </div>
              </div>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;