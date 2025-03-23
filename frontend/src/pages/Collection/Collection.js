import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { backendURL } from "../../App";
import "./Collection.css";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortOption, setSortOption] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const [priceExpanded, setPriceExpanded] = useState(false);

  // Default price range values
  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 10000;

  // Refs for slider elements
  const sliderTrackRef = useRef(null);
  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);

  // Get URL parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");

  // Fetch Products from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendURL + "/product/list");
        console.log("Fetched products:", response.data);
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Set initial filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Toggle Category Filter
  const toggleCategory = (e) => {
    const selectedCategory = e.target.value;
    setCategory((prevCategory) =>
      prevCategory.includes(selectedCategory)
        ? prevCategory.filter((item) => item !== selectedCategory)
        : [...prevCategory, selectedCategory]
    );
  };

  // Reset price range to default
  const resetPriceRange = () => {
    setPriceRange([DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE]);
  };

  // Update slider track width and position
  useEffect(() => {
    if (sliderTrackRef.current && minRangeRef.current && maxRangeRef.current) {
      const minPercent = (priceRange[0] / DEFAULT_MAX_PRICE) * 100;
      const maxPercent = (priceRange[1] / DEFAULT_MAX_PRICE) * 100;

      sliderTrackRef.current.style.left = `${minPercent}%`;
      sliderTrackRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [priceRange]);

  // Handle min price change
  const handleMinPriceChange = (e) => {
    const newMinVal = parseInt(e.target.value);
    if (newMinVal < priceRange[1]) {
      setPriceRange([newMinVal, priceRange[1]]);
    }
  };

  // Handle max price change
  const handleMaxPriceChange = (e) => {
    const newMaxVal = parseInt(e.target.value);
    if (newMaxVal > priceRange[0]) {
      setPriceRange([priceRange[0], newMaxVal]);
    }
  };

  // Filter Products based on Category and Price Range
  useEffect(() => {
    let updatedProducts = [...products];

    if (category.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        category.includes(product.category)
      );
    }

    updatedProducts = updatedProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(updatedProducts);
  }, [category, priceRange, products]);

  // Set initial category from URL parameter
  useEffect(() => {
    if (categoryParam && !category.includes(categoryParam)) {
      setCategory([categoryParam]);
    }
  }, [categoryParam, category]);

  const toggleCategoryExpand = () => {
    setCategoryExpanded(!categoryExpanded);
  };

  const togglePriceExpand = () => {
    setPriceExpanded(!priceExpanded);
  };

  // Sort products
  const getSortedProducts = () => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case "low-high":
          return a.price - b.price;
        case "high-low":
          return b.price - a.price;
        case "a-z":
          return a.name.localeCompare(b.name);
        case "z-a":
          return b.name.localeCompare(a.name);
        default:
          return 0; // No sorting applied (recommended)
      }
    });
  };

  return (
    <div className="collection-container">
      {/* Sidebar Filters */}
      <div className="filter-options">
        {/* Category Filter */}
        <div className={`category-filter ${categoryExpanded ? "active" : ""}`}>
          <h2 onClick={toggleCategoryExpand}>Browse by</h2>
          <div className="category-filter-content">
            {[
              "Keyboards",
              "Mice",
              "Consoles",
              "Audio",
              "Accessories",
              "Furniture",
            ].map((cat) => (
              <p key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />{" "}
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* Price Slider - Updated UI */}
        <div className={`price-filter ${priceExpanded ? "active" : ""}`}>
          <h2 onClick={togglePriceExpand}>Filter by</h2>
          <div className="price-filter-content">
            <div className="price-range-header">
              <span>Price</span>
              <button className="price-reset-btn" onClick={resetPriceRange}>
                Reset
              </button>
            </div>

            {/* Rest of your price filter content */}
            <div className="price-range-slider">
              <div className="slider-track" ref={sliderTrackRef}></div>
            </div>

            <div className="price-range-input">
              <div className="range-input">
                <input
                  type="range"
                  className="min-range"
                  min={DEFAULT_MIN_PRICE}
                  max={DEFAULT_MAX_PRICE}
                  step="1"
                  value={priceRange[0]}
                  onChange={handleMinPriceChange}
                  ref={minRangeRef}
                />
                <input
                  type="range"
                  className="max-range"
                  min={DEFAULT_MIN_PRICE}
                  max={DEFAULT_MAX_PRICE}
                  step="1"
                  value={priceRange[1]}
                  onChange={handleMaxPriceChange}
                  ref={maxRangeRef}
                />
              </div>
            </div>

            <div className="price-range-values">
              <span>R{priceRange[0]}</span>
              <span>R{priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="product-container">
        <div className="product-title">
          <h1>All Products</h1>
          <p>All products are from <a href="https://www.evetech.co.za/">evetech</a></p>
        </div>
        <div className="product-header">
          <div className="product-count">
            <p>{filteredProducts.length} products</p>
          </div>

          {/* Product Sort */}
          <div className="product-sort">
            <label className="dropdown-label">Sort by:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="styled-select"
            >
              <option value="recommended">Recommended</option>
              <option value="low-high">Price (Low to High)</option>
              <option value="high-low">Price (High to Low)</option>
              <option value="a-z">Alphabetical (A-Z)</option>
              <option value="z-a">Alphabetical (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Display Sorted Products */}
        <div className="product-grid">
          {getSortedProducts().length > 0 ? (
            getSortedProducts().map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found for the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
