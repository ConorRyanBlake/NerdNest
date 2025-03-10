import React, { useEffect, useRef, useState } from "react";
import "./Bestseller.css";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
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

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
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
            className="carousel-arrow carousel-arrow-left"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            &larr;
          </button>

          <div className="product-carousel" ref={carouselRef}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
