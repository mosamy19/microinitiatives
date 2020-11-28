const Initiative = require("../models/Initiative");
const Like = require("../models/Like");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");

module.exports = {
  createLike: async (req, res) => {
    let { initiativeId } = req.params;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let initiative = await Initiative.findOne({ _id: initiativeId });
      if (!initiative) {
        return resourceError(res, "There is no initiative with the given id");
      }

      let newLike = new Like({
        initiative: initiativeId,
        author: req.user._id,
      });

      let createdLike = await newLike.save();
      //   initiative.likes.unshift(createdLike._id);
      //   let updatedInitiative = await Initiative.findOneAndUpdate(
      //     { _id: initiativeId },
      //     { $set: initiative },
      //     { new: true }
      //   );

      res.status(status.success).json({
        like: true,
        likes: createdLike,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  createDisLike: async (req, res) => {
    let { initiativeId } = req.params;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let deletedLike = await Like.findOneAndDelete({
        initiative: initiativeId,
        author: req.user._id,
      });

      res.status(status.success).json({
        like: false,
        deletedLike,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  getLikes: async (req, res) => {
    let { initiativeId } = req.params;
    try {
      let likes = await Like.find({ initiative: initiativeId });
      res.status(200).json({ like: false, likes });
    } catch (error) {
      serverError(res, error);
    }
  },
};
