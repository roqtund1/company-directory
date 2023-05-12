const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  type: String,
  tags: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
