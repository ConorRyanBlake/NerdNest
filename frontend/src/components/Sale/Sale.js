import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './Sale.css';

const SaleBanner = () => {
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
          
          <button className="shop-button">
            Shop the Sale
            <FaArrowRight className="arrow-icon" />
          </button>
        </div>
        
        <div className="sale-image">
          <div className="image-placeholder">
            <div className="placeholder-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
          </div>
          <div className="discount-badge">40% OFF</div>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;