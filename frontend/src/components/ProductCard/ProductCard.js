import React from "react";
import "./ProductCard.css";
import { Link } from 'react-router-dom';
import { addItemToCart } from "../../utils/cartUtils";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <div className="product-card-img-container">
          <img src={product.images[0]} alt={product.name} className="product-card-img" />
        </div>
        <div className="product-card-body text-center">
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-price">R{product.price}</p>
          <button className="quick-add-btn" onClick={addItemToCart}>Add to Cart</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;