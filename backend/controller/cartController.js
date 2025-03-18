const User = require("../models/userModel");
const Product = require("../models/productModel");

//Add an item to cart
exports.addToCart = async (req, res) => {
  console.log(req.body); // Add this to see incoming data
  const userId = req.body.userId;
  const { itemId,quantity } = req.body;

  // Validate required fields
  if (!itemId || typeof quantity !== 'number') {
    return res.json({ success: false, message: "itemId and quantity are required and must be valid" });
  }

  try {
    //Fetch user details
    const user = await User.findById(userId);
    if (!user) return res.json({error: "User not found"});

    //Fetch product details
    const product = await Product.findById(itemId);
    if (!product) return res.json({ success: false, message: "Product not found"})

    //Checking if item with the same itemId exists in the cart (already in cart)
    const existingItem = user.cartData.find(
      (item) => item.itemId &&item.itemId.toString() === itemId
    );

    if (existingItem) {
      //Update quantity if item already exists
      existingItem.quantity += quantity;
    } else {
      //Add new item to cart
      user.cartData.push({ itemId, name:product.name, quantity });
    }

    await user.save();
    res.json({ success: true, message: "Item added to cart successfully", cartData: user.cartData });
      
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//Get users cart
exports.getCart = async (req, res) => {
  const userId = req.body.userId;

  try {
    
    const user = await User.findById(userId).populate("cartData.itemId");
    if(!user) return res.json({success: false, message: "User not found"});

    res.json({success: true, cartData: user.cartData});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

//Update cart items
exports.updateCart = async (req, res) => {
  const userId = req.body.userId;
  const {itemId, quantity} = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({success: false, message: "User not found"});

    const itemToUpdate = user.cartData.find(
      (item) => item.itemId.toString() === itemId
    );

    if (!itemToUpdate) return res.json({success: false, message: "Item not found in cart"});

    //Update quantity
    if (quantity !== undefined) itemToUpdate.quantity = quantity;

    await user.save();
    res.json({success: true, message: "Item updated successfully", cartData: user.cartData}); 
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

//Delete a cart item 
exports.deleteCartItem = async (req, res) => {
  const userId = req.body.userId;
  const { itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found"})

    //Filter out the item that matches itemId and size
    const updateCart = user.cartData.filter(
      (item) => !(item.itemId.toString() === itemId)
    );

    // If no change in length, item wasn't found
    if (updateCart.length === user.cartData.length) {
      return res.json({ success: false, message: "Item not found in cart"})
    }

    user.cartData = updateCart;
    await user.save();

    res.json({ success: true, message: "item removed from cart", cartData: user.cartData })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
};