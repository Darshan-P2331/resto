const Category = require("../models/categoryModel.js");
const Product = require('../models/productModel.js')

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name,image } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "This category already exists" });
      const newCategory = Category({ name,image });
      await newCategory.save();
      return res.json({ msg: "Created a category" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Product.findOne({category: req.params.id})
            if(products) return res.status(400).json({msg: 'Please delete all products with a relationship.'})
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a category"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name,image } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name,image });

      res.json({ msg: "Updated a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl