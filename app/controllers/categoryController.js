const { validationResult } = require("express-validator");
const Category = require("../models/Category");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
module.exports = {
  createCategory: async (req, res) => {
    let { title } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let icon = "";
      if (req.file) {
        icon = `/uploads/${req.file.filename}`;
      }
      let newCategory = new Category({
        title,
        icon: icon,
        author: req.user._id,
      });
      let category = await newCategory.save();
      res.status(status.success).json({
        message: "Category has been added successfully",
        category: category,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  getAllCategories: async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    try {
      let categories = await Category.find().sort([[sortBy, order]]);
      res.status(200).json(categories);
    } catch (error) {
      serverError(res, error);
    }
  },

  editCategory: async (req, res) => {
    const { title, categoryId } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let category = await Category.findOne({ _id: categoryId });
      if (!category) {
        return resourceError(res, "Category not found");
      }

      let icon = category.icon;
      if (req.file) {
        icon = `/uploads/${req.file.filename}`;
      }

      let updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId },
        { $set: { title, icon } },
        { new: true }
      );
      res.status(200).json({ message: "Edited successfully", updatedCategory });
    } catch (error) {
      serverError(res, error);
    }
  },
  getSingleCategory: async (req, res) => {
    let { categoryId } = req.params;
    try {
      let category = await Category.findOne({ _id: categoryId });
      if (!category) {
        return resourceError(res, "No category Found");
      }
      res.status(200).json(category);
    } catch (error) {
      serverError(res, error);
    }
  },

  deleteCategory: async (req, res) => {
    let { categoryId } = req.params;
    try {
      let category = await Category.findOneAndDelete({ _id: categoryId });
      if (!category) {
        return resourceError(res, "No category Found");
      }
      res.status(200).json({ message: "Deleted successfully", category });
    } catch (error) {
      serverError(res, error);
    }
  },
};
