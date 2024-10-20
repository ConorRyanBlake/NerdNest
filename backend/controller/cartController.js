const userModel = require("../models/userModel")


// add Product
exports.addToCart = async (req, res) => {
    try {
        
        const { userId, itemId, size } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndDelete(userId, {cartData})

        res.json({ success: true , message: "Added to cart"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
exports.updateCart = async (req, res) => {
    try {
        
        const { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndDelete(userId, {cartData})

        res.json({ success: true , message: "Cart updated"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// get user cart
exports.getCart = async (req, res) => {
    try {
        
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true , cartData})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// remove user cart
exports.removeCart = async (req, res) => {

}

