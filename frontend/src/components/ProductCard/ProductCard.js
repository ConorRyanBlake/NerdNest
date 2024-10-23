import React from "react";
import "./ProductCard.css";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
      <img src={product.images[0]} alt={product.name} className="card-img" />
      <div className="card-body text-center">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">R{product.price}</p>
      </div>
      </Link>
    </div>
  );
};

export default ProductCard;
