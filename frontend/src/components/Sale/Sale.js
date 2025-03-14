import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Sale.css';

const SaleBanner = () => {

  const navigate = useNavigate();

  const handleSaleClick = () => {
    // Navigate to products page with sale category
    navigate('/products?category=Men');
  };

  return (
    <div className="sale-banner">
      <div className="sale-content">
        <div className="sale-text">
          <h1>Summer Gaming Sale</h1>
          <p>
            Upgrade your gaming setup with exclusive deals. Save up to 40% on 
            selected gaming peripherals, components, and accessories. Limited 
            time offer!
          </p>
          
          <button className="shop-button" onClick={handleSaleClick}>
            Shop the Sale
            <FaArrowRight className="arrow-icon" />
          </button>
        </div>
        
        <div className="sale-image">
          <div className="image-placeholder">
            <div className="placeholder-icon">
              <img src="hero_img.jpg" alt="Placeholder" />
            </div>
          </div>
          <div className="discount-badge">40% OFF</div>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;