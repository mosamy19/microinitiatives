const Initiative = require("../models/Initiative");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const Notification = require("../models/Notification");

module.exports = {
  createInitiative: async (req, res) => {
    let {
      title,
      category,
      description,
      draft,
      cloned,
      clonedInitiativeOwner,
      clonedInitiativeId,
    } = req.body;
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
      clonedInitiativeOwner,
      clonedInitiativeId,
      thumbnail: [],
      author: req.user._id,
    });

    if (req.files) {
      for (let file of req.files) {
        newInitiative.thumbnail = [
          ...newInitiative.thumbnail,
          `/uploads/${file.filename}`,
        ];
      }
    }

    try {
      let initiative = await newInitiative.save();

      if (initiative.cloned === true) {
        let user = await User.findOne({ _id: clonedInitiativeOwner });
        user.notifications++;
        user.save();
        let initiative = await Initiative.findOne({ _id: clonedInitiativeId });
        initiative.clones++;
        initiative.save();

        await new Notification({
          body: `You have a new clone on post ${initiative.title} by ${
            req.user.firstName + " " + req.user.familyName
          }`,
          author: clonedInitiativeOwner,
          initiative: initiative._id,
          type: "clone",
        }).save();
      }
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
  getLandingPageInitiatives: async (req, res) => {
    try {
      let initiatives = await Initiative.find({ draft: false }).populate(
        "author",
        "firstName familyName  avatar"
      );
      if (initiatives.length === 0) {
        return res.status(200).json({
          message: "No Initiative Found",
        });
      }
      res.status(200).json(initiatives.reverse());
    } catch (error) {
      serverError(res, error);
    }
  },
  getLandingPageSingleInitiative: async (req, res) => {
    let { initiativeId } = req.params;
    try {
      let initiative = await Initiative.findOne({ _id: initiativeId }).populate(
        "author",
        "_id firstName familyName avatar"
      );
      if (!initiative) {
        return resourceError(res, "No Initiative Found");
      }
      res.status(200).json(initiative);
    } catch (error) {
      serverError(res, error);
    }
  },
  getAllInitiatives: async (req, res) => {
    try {
      let initiatives = await Initiative.find({ draft: false }).populate(
        "author",
        "firstName familyName avatar"
      );
      if (initiatives.length === 0) {
        return res.status(200).json({
          message: "No Initiative Found",
        });
      }
      res.status(200).json(initiatives.reverse());
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
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";

    try {
      let initiatives = await Initiative.find({
        draft: false,
        cloned: true,
      })
        .populate("author", "firstName familyName email avatar")
        .sort([[sortBy, order]]);
      if (initiatives.length === 0) {
        return res.status(200).json({
          message: "No Initiative Found",
        });
      }
      res.status(200).json(initiatives);
    } catch (error) {
      console.log(error);
      serverError(res, error);
    }
  },

  getMyInitiatives: async (req, res) => {
    try {
      let initiatives = await Initiative.find({
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

  getPublicProfileInitiatives: async (req, res) => {
    const { userId } = req.params;
    try {
      let initiatives = await Initiative.find({
        author: userId,
      }).populate("author", "firstName familyName avatar");

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
        "_id firstName familyName avatar"
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
    const { initiativeId } = req.params;
    const { title, category, description } = req.body;
    console.log(req.body);

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let initiative = await Initiative.findOne({ _id: initiativeId });
      if (!initiative) {
        return resourceError(res, "Initiative not found");
      }
      console.log(initiative.thumbnail);
      let thumbnail = initiative.thumbnail;
      thumbnail = [];
      if (req.files) {
        for (let file of req.files) {
          thumbnail = [...thumbnail, `/uploads/${file.filename}`];
        }
      }

      let updatedInitiative = await Initiative.findOneAndUpdate(
        { _id: initiativeId },
        { $set: { title, category, description, thumbnail } },
        { new: true }
      );

      console.log(updatedInitiative);
      res
        .status(200)
        .json({ message: "Edited successfully", updatedInitiative });
    } catch (error) {
      console.log(error);
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
