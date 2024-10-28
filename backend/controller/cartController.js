const userModel = require("../models/userModel")


// add Product
exports.addToCart = async (req, res) => {
    const { userId, itemId, size } = req.body;

    // Validate input
    if (!userId || !itemId || !size) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        // Logic to add product to cart
        const cartItem = await Cart.findOne({ userId });
        
        if (!cartItem) {
            // Create a new cart for the user
            const newCartItem = new Cart({ userId, items: [{ itemId, size }] });
            await newCartItem.save();
        } else {
            // Update existing cart
            cartItem.items.push({ itemId, size });
            await cartItem.save();
        }

        return res.status(200).json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error("Error adding item to cart:", error); // Detailed logging
        return res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  exports.updateCart = async (req, res) => {
    try {
      const { userId, itemId, size, quantity } = req.body;
      const userData = await userModel.findById(userId);
  
      const itemIndex = userData.cartData.findIndex(
        (item) => item.itemId.toString() === itemId && item.size === size
      );
  
      if (itemIndex >= 0) {
        // Update quantity
        userData.cartData[itemIndex].quantity = quantity;
      } else {
        return res.json({ success: false, message: "Item not found in cart" });
      }
  
      await userData.save();
      res.json({ success: true, message: "Cart updated" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
//Get cart
  exports.getCart = async (req, res) => {
    try {
      const { userId } = req.body;
      const userData = await userModel.findById(userId).populate("cartData.itemId");
      res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

// remove user cart
exports.removeCart = async (req, res) => {

}

