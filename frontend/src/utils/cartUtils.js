// src/utils/cartUtils.js
import axios from 'axios';

// Fetch cart items and return count
export const fetchCartCount = async (token) => {
  try {
    const response = await axios.get("http://localhost:4000/cart/get", {
      headers: { token },
    });

    if (response.data.success) {
      const validItems = response.data.cartData.filter(item => item.itemId);
      return validItems.reduce((acc, item) => acc + item.quantity, 0);
    }
    return 0;
  } catch (err) {
    console.error("Error fetching cart count:", err);
    return 0;
  }
};

// Add item to cart
export const addItemToCart = async (payload, token) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/cart/add",
      payload,
      {
        headers: { token },
      }
    );

    if (response.data.success) {
      const newCount = await fetchCartCount(token);
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: newCount }));
      return { success: true, message: "Item added to cart!" };
    } else {
      return { success: false, message: "Failed to add item to cart" };
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, message: "Error adding to cart" };
  }
};

// Remove item from cart
export const removeItemFromCart = async (itemId, size, token) => {
  try {
    const payload = { itemId, size };
    const response = await axios.post(
      "http://localhost:4000/cart/delete",
      payload,
      {
        headers: { token },
      }
    );

    if (response.data.success) {
      const newCount = await fetchCartCount(token);
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: newCount }));
      return { success: true, data: response.data.cartData };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    return { success: false, message: "Error deleting item" };
  }
};