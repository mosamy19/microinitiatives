const Initiative = require("../models/Initiative");
const Like = require("../models/Like");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const Notification = require("../models/Notification");

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
      initiative.likes++;
      initiative.save();

      let newLike = new Like({
        initiative: initiativeId,
        author: req.user._id,
      });

      let createdLike = await newLike.save();
      let user = await User.findOne({ _id: initiative.author });
      user.notifications++;
      user.save();

      await new Notification({
        body: `"${
          req.user.firstName + " " + req.user.familyName
        } "  قام بالإعجاب بمبادرتك "  ${initiative.title}"`,
        author: initiative.author,
        initiative: initiative._id,
        type: "like",
      }).save();

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
      console.log(error);
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
      let initiative = await Initiative.findOne({ _id: initiativeId });
      if (!initiative) {
        return resourceError(res, "There is no initiative with the given id");
      }
      initiative.likes--;
      initiative.save();

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

  getAllLikes: async (req, res) => {
    try {
      let likes = await Like.find();
      res.status(200).json(likes);
    } catch (error) {
      serverError(res, error);
    }
  },

  // Likes aggregation
  getLikesChartDataDaily: async (req, res) => {
    try {
      let docs = await Like.aggregate([
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
  getLikesChartDataMonthly: async (req, res) => {
    try {
      let a = 0;
      let docs = await Like.aggregate([
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
