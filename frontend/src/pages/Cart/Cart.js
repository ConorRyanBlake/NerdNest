import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = "user-id"; // Replace with actual user ID from your auth system

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.post('http://localhost:4000/cart/get', { userId });
        if (response.data.success) {
          setCartItems(response.data.cartData);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={`${item.itemId._id}-${item.size}`}>
            <p>Product: {item.itemId.name}</p>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.itemId.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
