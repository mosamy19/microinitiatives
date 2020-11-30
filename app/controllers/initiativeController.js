const Initiative = require("../models/Initiative");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");

module.exports = {
  createInitiative: async (req, res) => {
    let { title, category, description, draft, cloned } = req.body;
    // let userId = req.user._id;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    let newInitiative = new Initiative({
      title,
      category,
      description,
      draft,
      cloned,
      thumbnail: [],
      author: req.user._id,
      likes: [],
      clones: [],
      shares: [],
      comments: [],
    });

    if (req.files) {
      for (let file of req.files) {
        console.log(file.filename);
        newInitiative.thumbnail = [
          ...newInitiative.thumbnail,
          `/uploads/${file.filename}`,
        ];
      }
    }

    try {
      let initiative = await newInitiative.save();
      let updatedUser = await { ...req.user._doc };
      updatedUser.initiatives.unshift(initiative._id);
      let updatedInitiative = await User.findOneAndUpdate(
        { _id: updatedUser._id },
        { $set: updatedUser },
        { new: true }
      );

      res.status(status.success).json({
        message: "Initiative created successfully",
        ...initiative._doc,
        user: updatedInitiative,
      });
    } catch (error) {
      serverError(res, error);
    }
  },
  getAllInitiatives: async (req, res) => {
    try {
      let initiatives = await Initiative.find({ draft: false }).populate(
        "author",
        "firstName familyName email avatar"
      );
      if (initiatives.length === 0) {
        return res.status(200).json({
          message: "No Initiative Found",
        });
      }
      res.status(200).json(initiatives);
    } catch (error) {
      serverError(res, error);
    }
  },

  getDraftInitiatives: async (req, res) => {
    try {
      let initiatives = await Initiative.find({
        draft: true,
        author: req.user._id,
      }).populate("author", "firstName familyName email avatar");
      if (initiatives.length === 0) {
        return res.status(200).json({
          message: "No Initiative Found",
        });
      }
      res.status(200).json(initiatives);
    } catch (error) {
      serverError(res, error);
    }
  },

  getClonedtInitiatives: async (req, res) => {
    try {
      let initiatives = await Initiative.find({
        draft: false,
        cloned: true,
      }).populate("author", "firstName familyName email avatar");
      if (initiatives.length === 0) {
        return res.status(200).json({
          message: "No Initiative Found",
        });
      }
      res.status(200).json(initiatives);
    } catch (error) {
      serverError(res, error);
    }
  },

  getMyInitiatives: async (req, res) => {
    try {
      let initiatives = await Initiative.find({
        draft: false,
        author: req.user._id,
      });
      if (initiatives.length === 0) {
        return res.status(200).json({
          message: "No Initiative Found",
        });
      }
      res.status(200).json(initiatives);
    } catch (error) {
      serverError(res, error);
    }
  },

  getSingleInitiative: async (req, res) => {
    let { initiativeId } = req.params;
    try {
      let initiative = await Initiative.findOne({ _id: initiativeId }).populate(
        "author",
        "firstName familyName email avatar"
      );
      if (!initiative) {
        return resourceError(res, "No Initiative Found");
      }
      res.status(200).json(initiative);
    } catch (error) {
      serverError(res, error);
    }
  },

  editInitiative: async (req, res) => {
    let { initiativeId } = req.params;
    try {
      let initiative = await Initiative.findOneAndUpdate(
        { _id: initiativeId },
        { $set: req.body },
        { new: true }
      );
      if (!initiative) {
        return resourceError(res, "No Initiative Found");
      }
      res.status(200).json({ message: "Edited successfully", initiative });
    } catch (error) {
      serverError(res, error);
    }
  },
  deleteInitiative: async (req, res) => {
    let { initiativeId } = req.params;
    try {
      let initiative = await Initiative.findOneAndDelete({ _id: initiativeId });
      if (!initiative) {
        return resourceError(res, "No Initiative Found");
      }
      res.status(200).json({ message: "Deleted successfully", initiative });
    } catch (error) {
      serverError(res, error);
    }
  },
};
