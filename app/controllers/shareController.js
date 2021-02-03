const Initiative = require("../models/Initiative");
const Share = require("../models/Share");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const User = require("../models/User");
const Notification = require("../models/Notification");

module.exports = {
  makeShare: async (req, res) => {
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
      initiative.shares++;
      initiative.save();

      let newShare = new Share({
        initiative: initiativeId,
        author: req.user._id,
      });

      let createdShare = await newShare.save();
      let user = await User.findOne({ _id: initiative.author });
      user.notifications++;
      user.save();

      await new Notification({
        body: `"${
          req.user.firstName + " " + req.user.familyName
        } " قام بمشاركة مبادرتك "  ${initiative.title}"`,
        author: initiative.author,
        initiative: initiative._id,
        type: "share",
      }).save();

      res.status(status.success).json({
        share: true,
        shares: createdShare,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  getShares: async (req, res) => {
    let { initiativeId } = req.params;
    try {
      let shares = await Share.find({ initiative: initiativeId });
      res.status(200).json({ share: false, shares });
    } catch (error) {
      serverError(res, error);
    }
  },
  getAllShares: async (req, res) => {
    try {
      let shares = await Share.find();
      res.status(200).json(shares);
    } catch (error) {
      serverError(res, error);
    }
  },

  // Shares aggregation
  getSharesChartDataDaily: async (req, res) => {
    try {
      let docs = await Share.aggregate([
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
  getSharesChartDataMonthly: async (req, res) => {
    try {
      let docs = await Share.aggregate([
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
