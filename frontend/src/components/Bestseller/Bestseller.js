import React, { useEffect, useState } from "react";
import "./Bestseller.css";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const BestSeller = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product/list");
      const bestSellerProducts = response.data.products.filter(product => product.bestseller);
      setProducts(bestSellerProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  })
  return (
    <div>
      <div className="container">
        <h2>Best Seller</h2>
        <div className="row">
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
