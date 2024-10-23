import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Collection.css";
import axios from "axios";

const Collection = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product/list");
      console.log("Fetched products:", response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-3">
        <h1 className="title">Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
