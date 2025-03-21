import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { backendURL } from "../../App";
import "./RelatedProducts.css";

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(backendURL + "/product/list");
        if (response.data.success) {
          // Filter products by category and subcategory, exclude current product
          const filteredProducts = response.data.products.filter(
            (product) =>
              product.category === category &&
              product._id !== currentProductId
          );
          
          // Limit to maximum 4 related products
          const limitedProducts = filteredProducts.slice(0, 4);
          setRelatedProducts(limitedProducts);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [category, currentProductId]);

  // Don't render anything if no related products and not loading
  if (!loading && relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="related-products-container">
      <h2 className="related-products-title">You May Also Like</h2>
      {loading ? (
        <div className="loading">Loading related items...</div>
      ) : relatedProducts.length > 0 ? (
        <div className="related-product-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct._id} product={relatedProduct} />
          ))}
        </div>
      ) : (
        <p className="no-product-message">No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;