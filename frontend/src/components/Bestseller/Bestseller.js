import React, { useEffect, useRef, useState } from "react";
import "./Bestseller.css";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const carouselRef = useRef(null);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product/list");
      const bestSellerProducts = response.data.products.filter(
        (product) => product.bestseller
      );
      setProducts(bestSellerProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Check scroll position
  const checkScrollPosition = () => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    // Check if at start
    setIsAtStart(scrollLeft <= 0);
    
    // Check if at end (with a small buffer for rounding errors)
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    // Set initial scroll state
    checkScrollPosition();
    
    // Add scroll event listener
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      
      return () => {
        carousel.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [products]);

  const scrollLeft = () => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 500); // 500ms cool down
    }
  };

  const scrollRight = () => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 500); // 500ms cool down
    }
  };

  return (
    <div className="bestseller-section">
      <div className="container">
        <h2 className="bestseller-title">Bestselling Products</h2>
        <p className="bestseller-text">
          Our most popular gaming gear loved by our customers
        </p>

        <div className="carousel-wrapper">
          <button
            className={`carousel-arrow carousel-arrow-left ${isScrolling ? 'scrolling' : ''}`}
            onClick={scrollLeft}
            aria-label="Scroll left"
            disabled={isAtStart || isScrolling}
          >
            <FaArrowLeft />
          </button>

          <div 
            className="product-carousel" 
            ref={carouselRef}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <button
            className={`carousel-arrow carousel-arrow-right ${isScrolling ? 'scrolling' : ''}`}
            onClick={scrollRight}
            aria-label="Scroll right"
            disabled={isAtEnd || isScrolling}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;