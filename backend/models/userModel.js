const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    role: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dn2115qyt/image/upload/v1631276603/avatar/SeekPng.com_male-symbol-png_410093_l6erpx.png",
    },
    cart: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User',userSchema)
