const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  shopid: {
    type: String,
    required: true,
    ref: "Admin",
  }
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart
