const Initiative = require("../models/Initiative");
const Comment = require("../models/Comment");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");

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

      let newComment = new Comment({
        body,
        initiative: initiativeId,
        author: req.user._id,
      });

      let createdComment = await newComment.save();
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
    try {
      let comments = await Comment.find({ initiative: initiativeId }).populate(
        "author",
        "firstName familyName avatar"
      );
      res.status(200).json(comments);
    } catch (error) {
      serverError(res, error);
    }
  },
};
