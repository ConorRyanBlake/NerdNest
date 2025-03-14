import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./Cart.css";
import { removeItemFromCart, fetchCartCount } from "../../utils/cartUtils";

const CartPage = ({ setItemCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [error, setError] = useState("");

  console.log("Cart items:", cartItems);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:4000/cart/get", {
          headers: { token },
        });

        if (response.data.success) {
          const validItems = response.data.cartData.filter(
            (item) => item.itemId
          );

          setCartItems(validItems);
          
          // Calculate total price
          const total = validItems.reduce(
            (acc, item) => acc + (item.itemId.price || 0) * item.quantity,
            0
          );

          setTotalPrice(total);
          
          // Use fetchCartCount to get the item count and update it
          const count = await fetchCartCount(token);
          setItemCount(count);
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
      const token = localStorage.getItem("token");
      const result = await removeItemFromCart(itemId, size, token);
      
      if (result.success) {
        setCartItems(result.data);
        
        // Update the itemCount
        const count = result.data.reduce((acc, item) => acc + item.quantity, 0);
        setItemCount(count);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleShippingChange = (cost) => {
    setSelectedShipping(cost);
  };

  return (
    <div className="cart-page-wrapper">
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {error && <p className="error-message">{error}</p>}

      {cartItems.length > 0 ? (
        <div className="cart-container">
          {/* Cart table */}
          <div className="cart-items">
            <div className="cart-header">
              <span>Image</span>
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>

            {cartItems.map((item) => (
              <div
                key={`${item.itemId._id}-${item.size}`}
                className="cart-item"
              >
                <img
                  src={item.itemId.images?.[0]}
                  alt={item.itemId.name}
                  className="product-image"
                />
                <p className="product-name">
                  {item.itemId.name || "Unknown Product"}
                </p>
                <p>
                  R{item.itemId.price ? item.itemId.price.toFixed(2) : "N/A"}
                </p>
                <input
                  type="number"
                  value={item.quantity}
                  readOnly
                  className="quantity-input"
                />
                <p>
                  Total: R
                  {item.itemId.price
                    ? (item.itemId.price * item.quantity).toFixed(2)
                    : "N/A"}
                </p>
                <div className="delete-icon">
                  <FaTrash
                    onClick={() => handleDelete(item.itemId._id, item.size)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-container">
            {/* Cart total section */}
            <h2>Cart Totals</h2>
            <div className="total-line">
              <span>Subtotal</span>
              <span>R{totalPrice.toFixed(2)}</span>
            </div>

            <div className="shipping-options">
              <span>Shipping</span>
              <label>
                <input type="radio" name="shipping" onChange={() => handleShippingChange(0)} defaultChecked/> Free shipping
              </label>
              <label>
                <input type="radio" name="shipping" onChange={() => handleShippingChange(50)}/> Standard: R50
              </label>
              <label>
                <input type="radio" name="shipping" onChange={() => handleShippingChange(100)}/> Express: R100
              </label>
            </div>

            <div className="total-line">
              <span>Total</span>
              <span>R{(totalPrice + selectedShipping).toFixed(2)}</span>
            </div>

            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
    </div>
  );
};

export default CartPage;
