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

      let authUser = await User.findOne({ _id: initiative.author });
      let category = await Category.findOne({ _id: initiative.category });

      let temp = {
        id: initiative._id,
        title: initiative.title,
        clones: initiative.clones,
        favorites: initiative.favorites,
        likes: initiative.likes,
        author: [
          {
            firstName: authUser.firstName,
            familyName: authUser.familyName,
            avatar: authUser.avatar,
          },
        ],
        category: {
          title: category.title,
          icon: category.icon,
        },
      };

      let newFavorite = new Favorite({
        initiative: temp,
        initiativeId: initiative._id,
        author: req.user._id,
      });

      let createdFavorite = await newFavorite.save();
      let user = await User.findOne({ _id: initiative.author });
      user.notifications++;
      user.save();

      await new Notification({
        body: `"${
          req.user.firstName + " " + req.user.familyName
        } "  قام بحفظ مبادرتك "  ${initiative.title}"`,
        author: initiative.author,
        initiative: initiative._id,
        type: "save",
      }).save();

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
        initiativeId,
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
      let favorites = await Favorite.find({ initiativeId });
      res.status(200).json({ favorite: false, favorites });
    } catch (error) {
      serverError(res, error);
    }
  },

  getMyFavorites: async (req, res) => {
    try {
      let favorites = await Favorite.find({ author: req.user._id });
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

  // Favorites aggregation
  getFavoritesChartDataDaily: async (req, res) => {
    try {
      let docs = await Favorite.aggregate([
        // {
        //   $match: {
        //     createdAt: { $gt: new Date("Nov 11, 2020") },
        //   },
        // },
        {
          $project: {
            year: { $year: ["$createdAt"] },
            // week: { $week: ["$createdAt"] },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
        {
          $group: {
            // _id: { $week: "$createdAt" },
            _id: {
              year: "$year",
              // week: "$week",
              day: "$day",
              month: "$month",
            },
            documentCount: { $sum: 1 },
          },
        },
      ]);
      docs.sort((d1, d2) => d1._id.year - d2._id.year);
      res.status(200).json(docs);
    } catch (error) {
      serverError(res, error);
    }
  },
  getFavoritesChartDataMonthly: async (req, res) => {
    try {
      let docs = await Favorite.aggregate([
        // {
        //   $match: {
        //     createdAt: { $gt: new Date("Nov 11, 2020") },
        //   },
        // },
        {
          $project: {
            year: { $year: ["$createdAt"] },
            // week: { $week: ["$createdAt"] },
            month: { $month: "$createdAt" },
            // day: { $dayOfMonth: "$createdAt" },
          },
        },
        {
          $group: {
            // _id: { $week: "$createdAt" },
            _id: {
              year: "$year",
              // week: "$week",
              // day: "$day",
              month: "$month",
            },
            documentCount: { $sum: 1 },
          },
        },
      ]);
      docs.sort((d1, d2) => d1._id.year - d2._id.year);
      res.status(200).json(docs);
    } catch (error) {
      serverError(res, error);
    }
  },
};
