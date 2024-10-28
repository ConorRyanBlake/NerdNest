import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Collection.css";
import axios from "axios";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  // Toggle Category Filter
  const toggleCategory = (e) => {
    const selectedCategory = e.target.value;
    if (category.includes(selectedCategory)) {
      setCategory(category.filter((item) => item !== selectedCategory));
    } else {
      setCategory([...category, selectedCategory]);
    }
  };

  // Toggle Subcategory Filter
  const toggleSubCategory = (e) => {
    const selectedSubCategory = e.target.value;
    if (subCategory.includes(selectedSubCategory)) {
      setSubCategory(subCategory.filter((item) => item !== selectedSubCategory));
    } else {
      setSubCategory([...subCategory, selectedSubCategory]);
    }
  };

  // Fetch Products from Backend
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

  // Filter Products based on Category and Subcategory
  useEffect(() => {
    const filterByCategoryAndSubCategory = () => {
      let updatedProducts = products;

      // Apply Category Filter
      if (category.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          category.includes(product.category)
        );
      }

      // Apply Subcategory Filter
      if (subCategory.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          subCategory.includes(product.subcategory)
        );
      }

      setFilteredProducts(updatedProducts);
    };

    filterByCategoryAndSubCategory();
  }, [category, subCategory, products]);

  // Sort products based on selected sort option without causing an infinite loop
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low-high") {
      return a.price - b.price;
    } else if (sortOption === "high-low") {
      return b.price - a.price;
    }
    return 0; // Default to no sorting (relevant)
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Filter Options */}
      <div className="filter-options">
        <p>Filters</p>

        {/* Category Filter */}
        <div className="category-filter">
          <p>Category</p>
          <p>
            <input type="checkbox" value="Men" onChange={toggleCategory} /> Men
          </p>
          <p>
            <input type="checkbox" value="Women" onChange={toggleCategory} /> Women
          </p>
          <p>
            <input type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
          </p>
        </div>

        {/* Subcategory Filter */}
        <div className="subcategory-filter">
          <p>Sub-Category</p>
          <p>
            <input type="checkbox" value="Shirts" onChange={toggleSubCategory} /> Shirts
          </p>
          <p>
            <input type="checkbox" value="Pants" onChange={toggleSubCategory} /> Pants
          </p>
          <p>
            <input type="checkbox" value="Winter" onChange={toggleSubCategory} /> Winter
          </p>
        </div>
      </div>

      {/* Product Sort */}
      <div className="product-sort">
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="relevant">Sort by: Relevant</option>
          <option value="low-high">Sort by: Low-to-High</option>
          <option value="high-low">Sort by: High-to-Low</option>
        </select>
      </div>

      {/* Title */}
      <div className="title">
        <h1>Products</h1>
      </div>

      {/* Display Sorted Products */}
      <div className="container mt-3">
        <div className="product-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
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
