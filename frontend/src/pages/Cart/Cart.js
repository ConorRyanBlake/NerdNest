import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import "./Cart.css";

const CartPage = ({ setItemCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  console.log("Cart items:", cartItems);
  

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

  const handleDelete = async (itemId, size) => {
    try {
      const token = localStorage.getItem('token'); //Get token from local storage

      const payload = { itemId, size}
      const response = await axios.post("http://localhost:4000/cart/delete", payload, {
        headers: {
          token,
        }
      }
  );

    if (response.data.success) {
      setCartItems(response.data.cartData);
    } else {
      alert(response.data.message);
    }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {error && <p className="error-message">{error}</p>}

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            
            <div key={`${item.itemId._id}-${item.size}`} className="cart-item">
              <img
                src={item.itemId.images?.[0]}
                alt={item.itemId.name}
                className="product-image"
              />
              <div className="cart-item-details">
                <p className="product-name">{item.itemId.name || "Unknown Product"}</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price per item: R{item.itemId.price ? item.itemId.price.toFixed(2) : "N/A"}</p>
                <p>Total: R{item.itemId.price ? (item.itemId.price * item.quantity).toFixed(2) : "N/A"}</p>
              </div>
              <div className="delete-icon">
                <FaTrash onClick={() => handleDelete(item.itemId._id, item.size)} />
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
