import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

const Product = ({ user: userId }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

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
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    console.log("User ID:", userId); // Check if userId is correct

    const payload = {
      itemId: product._id,
      name: product.name,
      size: selectedSize,
      quantity: 1,
    };

    console.log("Payload", payload); // Debugging line

    try {
      const token = localStorage.getItem("token"); // Ensure token is stored
      console.log("Token:", token);

      const response = await axios.post(
        "http://localhost:4000/cart/add",
        payload,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        alert("Item added to cart!");
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
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
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: R{product.price}</p>
          <p>Select Size</p>
          <div className="product-sizes">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`size-button ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
        <div className="related-products">
          <RelatedProducts />
        </div>
      </div>
    </div>
  );
};

export default Product;
