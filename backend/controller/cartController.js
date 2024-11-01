const User = require("../models/userModel");

//Add an item to cart
exports.addToCart = async (req, res) => {
  console.log(req.body); // Add this to see incoming data
  const userId = req.body.userId;
  const { itemId, size, quantity } = req.body;

  // Validate required fields
  if (!itemId || !size || typeof quantity !== 'number') {
    return res.json({ success: false, message: "itemId, size, and quantity are required and must be valid" });
  }

  try {
    
    const user = await User.findById(userId);
    if (!user) return res.json({error: "User not found"});

    //Checking if item with the same itemId and size exists in the cart
    const existingItem = user.cartData.find(
      (item) => item.itemId &&item.itemId.toString() === itemId && item.size === size
    );

    if (existingItem) {
      //Update quantity if item already exists
      existingItem.quantity += quantity;
    } else {
      //Add new item to cart
      user.cartData.push({ itemId, size, quantity });
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
  const {itemId, size, quantity} = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({success: false, message: "User not found"});

    const itemToUpdate = user.cartData.find(
      (item) => item.itemId.toString() === itemId && item.size === size 
    );

    if (!itemToUpdate) return res.json({success: false, message: "Item not found in cart"});

    //Update quantity or size
    if (quantity !== undefined) itemToUpdate.quantity = quantity;
    if (size) itemToUpdate.size = size;

    await user.save();
    res.json({success: true, message: "Item updated successfully", cartData: user.cartData}); 
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}