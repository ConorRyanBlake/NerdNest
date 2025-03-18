import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { addItemToCart } from "../../utils/cartUtils";

const Product = ({ user: userId }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  console.log("Product Data:", product);
  console.log("Category:", product?.category, "Subcategory:", product?.subCategory);


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

  const addToCart = async () => {
    const payload = {
      itemId: product._id,
      name: product.name,
      quantity: 1,
    };

    const token = localStorage.getItem("token");
    const result = await addItemToCart(payload, token);
    
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page-wrapper">
      <div className="product-page">
        <div className="product-gallery">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.name}
              className={`product-image ${
                selectedImage === image ? "active" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="selected-image"
          />
        </div>
        <div className="product-details">
          <h1 className="product-name-title">{product.name}</h1>
          <p className="product-price">R{product.price}</p>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="related-products">
        {product && (
          <RelatedProducts
          category={product.category}
          subCategory={product.subCategory}
          currentProductId={product._id}
        />
        
        )}
      </div>
    </div>
  );
};

export default Product;
