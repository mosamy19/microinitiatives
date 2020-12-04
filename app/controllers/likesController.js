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
        body: `You have a new like on post ${initiative.title} by ${
          req.user.firstName + " " + req.user.familyName
        }`,
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
};
