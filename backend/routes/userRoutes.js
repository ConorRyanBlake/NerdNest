const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

//Route to register user
router.post("/register", userController.registerUser);

//Route to login user
router.post("/login", userController.loginUser);

//Route to admin login
router.post("/admin/login", userController.adminLogin);

module.exports = router