import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Cart.css";

const CartPage = ({ setItemCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("User not authenticated.");
          return;
        }

        const response = await axios.get('http://localhost:4000/cart/get', {
          headers: { token }
        });

        if (response.data.success) {
          // Filter out invalid items where itemId is null
          const validItems = response.data.cartData.filter(item => item.itemId);

          setCartItems(validItems);

          // Calculate total item count and total price
          const totalItems = validItems.reduce((acc, item) => acc + item.quantity, 0);
          const total = validItems.reduce((acc, item) => acc + (item.itemId.price || 0) * item.quantity, 0);

          setItemCount(totalItems);
          setTotalPrice(total);
        } else {
          setError("Failed to fetch cart data: " + response.data.message);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("An error occurred while fetching the cart.");
      }
    };

    fetchCart();
  }, [setItemCount]);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {error && <p className="error-message">{error}</p>}

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={`${item.itemId._id}-${item.size}`} className="cart-item">
              <img
                src={item.itemId.image || "https://via.placeholder.com/150"}
                alt={item.itemId.name || "Product Image"}
                className="product-image"
              />
              <div className="cart-item-details">
                <p className="product-name">{item.itemId.name || "Unknown Product"}</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price per item: R{item.itemId.price ? item.itemId.price.toFixed(2) : "N/A"}</p>
                <p>Total: R{item.itemId.price ? (item.itemId.price * item.quantity).toFixed(2) : "N/A"}</p>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total Price: R{totalPrice.toFixed(2)}</h2>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
