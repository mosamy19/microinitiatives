const Initiative = require("../models/Initiative");
const Favorite = require("../models/Favorite");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");

module.exports = {
  setFavorite: async (req, res) => {
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

      let newFavorite = new Favorite({
        initiative: initiativeId,
        author: req.user._id,
      });

      let createdFavorite = await newFavorite.save();
      //   initiative.likes.unshift(createdLike._id);
      //   let updatedInitiative = await Initiative.findOneAndUpdate(
      //     { _id: initiativeId },
      //     { $set: initiative },
      //     { new: true }
      //   );

      res.status(status.success).json({
        favorite: true,
        favorites: createdFavorite,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  setUnfavorite: async (req, res) => {
    let { initiativeId } = req.params;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let deletedFavorite = await Favorite.findOneAndDelete({
        initiative: initiativeId,
        author: req.user._id,
      });

      res.status(status.success).json({
        favorite: false,
        deletedFavorite,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  getFavorites: async (req, res) => {
    let { initiativeId } = req.params;
    try {
      let favorites = await Favorite.find({ initiative: initiativeId });
      res.status(200).json({ favorite: false, favorites });
    } catch (error) {
      serverError(res, error);
    }
  },
};
