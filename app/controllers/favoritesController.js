const Initiative = require("../models/Initiative");
const Favorite = require("../models/Favorite");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const User = require("../models/User");
const Notification = require("../models/Notification");
const Category = require("../models/Category");

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
      initiative.favorites++;
      initiative.save();

      let newFavorite = new Favorite({
        initiative: initiativeId,
        author: req.user._id,
      });

      let createdFavorite = await newFavorite.save();
      let user = await User.findOne({ _id: initiative.author });
      user.notifications++;
      user.save();

      await new Notification({
        body: `You have a new save on post ${initiative.title} by ${
          req.user.firstName + " " + req.user.familyName
        }`,
        author: initiative.author,
        initiative: initiative._id,
        type: "save",
      }).save();

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
      let initiative = await Initiative.findOne({ _id: initiativeId });
      if (!initiative) {
        return resourceError(res, "There is no initiative with the given id");
      }
      initiative.favorites--;
      initiative.save();

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

  getMyFavorites: async (req, res) => {
    try {
      let favorites = await Favorite.find({ author: req.user._id }).populate(
        "initiative",
        "title likes clones favorites category"
      );
      res.status(200).json(favorites);
    } catch (error) {
      serverError(res, error);
    }
  },
  getAllFavorites: async (req, res) => {
    try {
      let favorites = await Favorite.find();
      res.status(200).json(favorites);
    } catch (error) {
      serverError(res, error);
    }
  },
};
