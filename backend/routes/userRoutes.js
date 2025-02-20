const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

//Route to register user
router.post("/register", userController.registerUser);

//Route to login user
router.post("/login", userController.loginUser);

//Route to admin login
router.post("/admin", userController.adminLogin);

// Route to reset password
router.post("/reset-password", userController.resetPassword);

module.exports = router