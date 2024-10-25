import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard"; 
import "./RelatedProducts.css"; 

const RelatedProduct = ({ category, subcategory, products }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      const filteredProducts = products.filter(
        (product) =>
          product.category === category && product.subcategory === subcategory
      );
      setRelatedProducts(filteredProducts);
    }
  }, [category, subcategory, products]);

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
