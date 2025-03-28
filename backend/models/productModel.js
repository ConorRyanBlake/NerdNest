const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: Array, required: true },
  category: { type: String, required: true },
  bestseller: { type: Boolean, required: true },
  date: { type: Number, required: true },
},
  { collection: 'product'});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

module.exports = productModel;
