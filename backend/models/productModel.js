const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  sold: {
    type: Number,
    default: 0,
  },
},{
    timestamps: true
});

module.exports = mongoose.model('Product',productSchema)