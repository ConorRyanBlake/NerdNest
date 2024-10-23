import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/product/single/${productId}`
        );
        const product = response.data.product;
        setProduct(product);
        setSelectedImage(product.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
  
    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="product-page">
      <div className="product-gallery">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={product.name} className="product-image" onClick={() => setSelectedImage(image)}/>
        ))}
      </div>
      <div>
        <img src={selectedImage} alt={product.name} className="selected-image"/>
      </div>
      <div className="product-details">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: R{product.price}</p>
        <button className="add-to-cart" >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
