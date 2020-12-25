const Initiative = require("../models/Initiative");
const Comment = require("../models/Comment");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const User = require("../models/User");
const Notification = require("../models/Notification");

module.exports = {
  createComment: async (req, res) => {
    let { body } = req.body;
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
      initiative.comments++;
      initiative.save();

      let newComment = new Comment({
        body,
        initiative: initiativeId,
        author: req.user._id,
      });

      // let user = await User.findOne({ _id: initiative.author });
      // user.notifications.push(
      //   `You have a new comment on post ${initiative.title} by ${newComment.author}`
      // );
      // user.save();

      let createdComment = await newComment.save();
      let user = await User.findOne({ _id: initiative.author });
      user.notifications++;
      user.save();

      await new Notification({
        body: `You have a new comment on post ${initiative.title} by ${
          req.user.firstName + " " + req.user.familyName
        }`,
        author: initiative.author,
        initiative: initiative._id,
        type: "comment",
      }).save();

      // initiative.comments.unshift(createdComment._id);
      // let updatedInitiative = await Initiative.findOneAndUpdate(
      //   { _id: initiativeId },
      //   { $set: initiative },
      //   { new: true }
      // );

      res.status(status.success).json({
        message: "Comment has been added successfully",
        comments: createdComment,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  getComments: async (req, res) => {
    let { initiativeId } = req.params;
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    try {
      let comments = await Comment.find({ initiative: initiativeId })
        .populate("author", "firstName familyName avatar")
        .sort([[sortBy, order]]);
      res.status(200).json(comments);
    } catch (error) {
      serverError(res, error);
    }
  },

  getAllComments: async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    try {
      let comments = await Comment.find()
        .populate("author", "firstName familyName avatar")
        .sort([[sortBy, order]]);
      res.status(200).json(comments);
    } catch (error) {
      serverError(res, error);
    }
  },
  editComment: async (req, res) => {
    const { commentId } = req.params;
    const { body } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let comment = await Comment.findOne({ _id: commentId });
      if (!comment) {
        return resourceError(res, "Comment not found");
      }

      let updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId },
        { $set: { body } },
        { new: true }
      );
      res.status(200).json({ message: "Edited successfully", updatedComment });
    } catch (error) {
      serverError(res, error);
    }
  },
  getSingleComment: async (req, res) => {
    let { commentId } = req.params;
    try {
      let comment = await Comment.findOne({ _id: commentId });
      if (!comment) {
        return resourceError(res, "No Comment Found");
      }
      res.status(200).json(comment);
    } catch (error) {
      serverError(res, error);
    }
  },
  deleteComment: async (req, res) => {
    let { commentId } = req.params;
    try {
      let comment = await Comment.findOneAndDelete({ _id: commentId });
      if (!comment) {
        return resourceError(res, "No Comment Found");
      }
      res.status(200).json({ message: "Deleted successfully", comment });
    } catch (error) {
      serverError(res, error);
    }
  },
};
