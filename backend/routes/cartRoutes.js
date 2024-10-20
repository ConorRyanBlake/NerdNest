const express = require("express");
const cartController = require("../controller/cartController");
const authUser = require("../middleware/auth");
const router = express.Router();

//Route to add to cart
router.post("/add", authUser, cartController.addToCart);

//Route to get cart
router.get("/get", authUser, cartController.getCart);

//Route to update cart
router.put("/update", authUser, cartController.updateCart);

module.exports = router;