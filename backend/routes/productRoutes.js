const express = require("express");
const productController = require("../controller/productController");
const upload = require("../middleware/multer");
const router = express.Router();

//Route to add product
router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  productController.addProduct
);

//Route to list product
router.get("/list", productController.listProduct);

//Route to remove product
router.delete("/remove", productController.removeProduct);

//Route to single product
router.get("/single", productController.singleProduct);

module.exports = router;
