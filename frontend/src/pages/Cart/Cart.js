import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Cart.css"

const CartPage = ({ setItemCount}) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/cart/get', {
          headers: {
            token,
          }
        });
        if (response.data.success) {
          setCartItems(response.data.cartData);
          // Calculate total item count
          const totalItems = response.data.cartData.reduce((acc, item) => acc + item.quantity, 0);
          setItemCount(totalItems);
        } else {
          console.error("Failed to fetch cart data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={`${item.itemId._id}-${item.size}`} className="cart-item">
            <img src={item.itemId.image} alt={item.itemId.name} className="product-image" />
            <div className="cart-item-details">
              <p className="product-name">{item.itemId.name}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.itemId.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
