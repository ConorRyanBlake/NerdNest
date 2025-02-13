import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import "./Collection.css";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortOption, setSortOption] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Fetch Products from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product/list");
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
    <>
      {/* Filter Options */}
      <div className="filter-options">
        {/* Category Filter */}
        <div className="category-filter">
          <p>Browse by</p>
          {["Men", "Women", "Kids"].map((cat) => (
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

        {/* Price Slider */}
        <div className="price-filter">
          <p>
            Price Range: R{priceRange[0]} - R{priceRange[1]}{" "}
          </p>
          <input
            type="range"
            className="min-range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="range"
            className="max-range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      {/* Title */}
      <div className="product-title">
        <h1>All Products</h1>
      </div>
      <div className="product-container">
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

        {/* Display Sorted Products */}
        <div className="container mt-3">
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
    </>
  );
};

export default Collection;
