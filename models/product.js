const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  title: "",
  description: "",
  type: "",
  brand: "",
  collections: {
    type: Array,
  },
  category: "",
  price: "",
  sale: {
    type: Boolean,
    default: false,
  },
  discount: "",
  stock: "",
  new: {
    type: Boolean,
    default: true,
  },
  tags: {
    type: Array,
  },
  variants: {
    type: Array,
  },
  images: {
    type: Array,
  },
  rating: "",
  stock: {
    type: Number,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", Product);
