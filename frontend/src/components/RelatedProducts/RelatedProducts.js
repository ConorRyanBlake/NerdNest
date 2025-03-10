import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import "./RelatedProducts.css";

const RelatedProduct = ({ category, subCategory, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product/list");
        if (response.data.success) {
          const filteredProducts = response.data.products.filter(
            (product) =>
              product.category === category &&
              product.subCategory === subCategory &&
              product._id !== currentProductId
          );
          
          setRelatedProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (category && subCategory) {
      fetchProducts();
    }
  }, [category, subCategory, currentProductId]);

  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <div className="related-product-list">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct._id} product={relatedProduct} />
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;