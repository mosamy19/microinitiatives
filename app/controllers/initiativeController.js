const fs = require("fs");
const path = require("path");
const Initiative = require("../models/Initiative");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const sendEmail = require("../utils/sendEmail");
const sendNotificationForClone = require("../utils/notifications/sendNotificationForClone");

module.exports = {
  createInitiative: async (req, res) => {
    let {
      title,
      category,
      description,
      thumbnailUri,
      draft,
      cloned,
      clonedInitiativeOwner,
      clonedInitiativeId,
    } = req.body;
    let images = [];

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    if (thumbnailUri) {
      images = thumbnailUri;
    }

    for (let file of req.files) {
      images = [...images, `/uploads/${file.filename}`];
    }

    let newInitiative = new Initiative({
      title,
      category,
      description,
      draft,
      cloned,
      clonedInitiativeOwner,
      clonedInitiativeId,
      thumbnail: images,
      author: req.user._id,
    });

    try {
      let initiative = await newInitiative.save();

      if (initiative.cloned === true) {
        sendNotificationForClone(
          req,
          res,
          clonedInitiativeOwner,
          clonedInitiativeId,
          initiative.title,
          initiative._id
        );
        let clonedInitiatives = await Initiative.find({
          author: req.user._id,
          cloned: true,
        });
        const obj = {
          act: "create",
          type: "clone",
          quantity: clonedInitiatives.length,
          email: req.user.email,
          name: `${req.user.firstName} ${req.user.familyName}`,
          src: "https://noii.io/all-initiatives",
          res: res,
        };
        sendEmail(obj);
      }
      let user = await { ...req.user._doc };
      user.initiatives.unshift(initiative._id);
      let updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );

      const obj = {
        act: "create",
        type: "initiative",
        quantity: updatedUser.initiatives.length,
        email: updatedUser.email,
        name: `${updatedUser.firstName} ${updatedUser.familyName}`,
        src: "https://noii.io/all-initiatives",
        res: res,
      };
      sendEmail(obj);

      res.status(status.success).json({
        message: "Initiative created successfully",
        ...initiative._doc,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  createDraftInitiative: async (req, res) => {
    let {
      title,
      category,
      description,
      draft,
      cloned,
      clonedInitiativeOwner,
      clonedInitiativeId,
    } = req.body;
    let images = [];

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    if (req.files) {
      for (let file of req.files) {
        images = [...images, `/uploads/${file.filename}`];
      }
    }

    let newInitiative = new Initiative({
      title,
      category,
      description,
      draft,
      cloned,
      clonedInitiativeOwner,
      clonedInitiativeId,
      thumbnail: images,
      author: req.user._id,
    });

    try {
      let initiative = await newInitiative.save();

      if (initiative.cloned === true) {
        sendNotificationForClone(
          req,
          res,
          clonedInitiativeOwner,
          clonedInitiativeId,
          initiative.title,
          initiative._id
        );
      }

      let updatedUser = await { ...req.user._doc };
      updatedUser.initiatives.unshift(initiative._id);
      await User.findOneAndUpdate(
        { _id: updatedUser._id },
        { $set: updatedUser },
        { new: true }
      );

      res.status(status.success).json({
        message: "Initiative created as a draft successfully",
        ...initiative._doc,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  getLandingPageInitiatives: async (req, res) => {
    const { sortBy } = req.params;
    try {
      let initiatives = await Initiative.find({ draft: false })
        .populate("author", "firstName familyName  avatar")
        .populate("category", "title icon");
      if (initiatives.length === 0) {
        return res.status(200).json({
          message: "No Initiative Found",
        });
      }

      let sortedInitiatives;
      // if (sortBy === "pined" || sortBy === "") {
      //   sortedInitiatives = initiatives.sort((a, b) => b.pined - a.pined);
      // } else

      if (sortBy === "newest" || sortBy === "") {
        sortedInitiatives = initiatives.reverse();
      } else if (sortBy === "cloned") {
        sortedInitiatives = initiatives.sort((a, b) => b.clones - a.clones);
      } else if (sortBy === "liked") {
        sortedInitiatives = initiatives.sort((a, b) => b.likes - a.likes);
      } else if (sortBy === "saved") {
        sortedInitiatives = initiatives.sort(
          (a, b) => b.favorites - a.favorites
        );
      } else if (sortBy === "shared") {
        sortedInitiatives = initiatives.sort((a, b) => b.shares - a.shares);
      }

      res.status(200).json(sortedInitiatives);
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
  getLandingPageClonedtInitiatives: async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let { clonedInitiativeId } = req.params;

    try {
      let initiatives = await Initiative.find({
        draft: false,
        cloned: true,
        clonedInitiativeId,
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
      serverError(res, error);
    }
  },

  getAllInitiatives: async (req, res) => {
    const { sortBy } = req.params;
    try {
      let initiatives = await Initiative.find({ draft: false })
        .populate("author", "firstName familyName avatar")
        .populate("category", "title icon");
      if (initiatives.length === 0) {
        return res.status(200).json({
          message: "No Initiative Found",
        });
      }
      let sortedInitiatives;
      // if (sortBy === "pined" || sortBy === "") {
      //   sortedInitiatives = initiatives.sort((a, b) => b.pined - a.pined);
      // } else

      if (sortBy === "newest" || sortBy === "") {
        sortedInitiatives = initiatives.reverse();
      } else if (sortBy === "cloned") {
        sortedInitiatives = initiatives.sort((a, b) => b.clones - a.clones);
      } else if (sortBy === "liked") {
        sortedInitiatives = initiatives.sort((a, b) => b.likes - a.likes);
      } else if (sortBy === "saved") {
        sortedInitiatives = initiatives.sort(
          (a, b) => b.favorites - a.favorites
        );
      } else if (sortBy === "shared") {
        sortedInitiatives = initiatives.sort((a, b) => b.shares - a.shares);
      }

      res.status(200).json(sortedInitiatives);
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
    let { clonedInitiativeId } = req.params;
    try {
      let initiatives = await Initiative.find({
        draft: false,
        cloned: true,
        clonedInitiativeId,
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
      serverError(res, error);
    }
  },

  getMyInitiatives: async (req, res) => {
    try {
      let initiatives = await Initiative.find({
        author: req.user._id,
      })
        .populate("author", "firstName familyName email avatar")
        .populate("category", "title icon");
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
      })
        .populate("author", "firstName familyName avatar")
        .populate("category", "title icon");

      res.status(200).json(initiatives);
    } catch (error) {
      serverError(res, error);
    }
  },

  getSingleInitiative: async (req, res) => {
    let { initiativeId } = req.params;
    try {
      let initiative = await Initiative.findOne({ _id: initiativeId })
        .populate("author", "_id firstName familyName avatar")
        .populate("category", "title icon");
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
    const { title, category, description, thumbnailUri, draft } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let initiative = await Initiative.findOne({
        _id: initiativeId,
        author: req.user._id,
      });
      if (!initiative) {
        return resourceError(res, "Initiative not found");
      }

      let thumbnail = initiative.thumbnail;
      thumbnail = [];
      if (thumbnailUri) {
        if (thumbnailUri instanceof Array === false) {
          thumbnail = [...thumbnail, thumbnailUri];
        } else {
          thumbnail = thumbnailUri;
        }
      }
      if (req.files) {
        for (let file of req.files) {
          thumbnail = [...thumbnail, `/uploads/${file.filename}`];
        }
      }

      let updatedInitiative = await Initiative.findOneAndUpdate(
        { _id: initiativeId },
        { $set: { title, category, description, thumbnail, draft } },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Edited successfully", updatedInitiative });
    } catch (error) {
      serverError(res, error);
    }
  },

  // admin controllers
  get_admin_panel_initiatives: async (req, res) => {
    try {
      let initiatives = await Initiative.find().populate(
        "author",
        "firstName familyName avatar"
      );
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

  editInitiativeByAdmin: async (req, res) => {
    const { initiativeId } = req.params;
    const { title, category, description, thumbnailUri, draft } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let initiative = await Initiative.findOne({
        _id: initiativeId,
      });
      if (!initiative) {
        return resourceError(res, "Initiative not found");
      }

      let thumbnail = initiative.thumbnail;
      thumbnail = [];
      if (thumbnailUri) {
        if (thumbnailUri instanceof Array === false) {
          thumbnail = [...thumbnail, thumbnailUri];
        } else {
          thumbnail = thumbnailUri;
        }
      }
      if (req.files) {
        for (let file of req.files) {
          thumbnail = [...thumbnail, `/uploads/${file.filename}`];
        }
      }

      let updatedInitiative = await Initiative.findOneAndUpdate(
        { _id: initiativeId },
        { $set: { title, category, description, thumbnail, draft } },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Edited successfully", updatedInitiative });
    } catch (error) {
      console.log(error);
      serverError(res, error);
    }
  },

  pinInitiative: async (req, res) => {
    const { initiativeId } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let initiative = await Initiative.findOne({
        _id: initiativeId,
      });
      if (!initiative) {
        return resourceError(res, "Initiative not found");
      }

      let updatedInitiative = await Initiative.findOneAndUpdate(
        { _id: initiativeId },
        { $set: { pined: true } },
        { new: true }
      );
      res.status(200).json({
        message: "Initiative has been pined successfully",
        updatedInitiative,
      });
    } catch (error) {
      serverError(res, error);
    }
  },
  unpinInitiative: async (req, res) => {
    const { initiativeId } = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let initiative = await Initiative.findOne({
        _id: initiativeId,
      });
      if (!initiative) {
        return resourceError(res, "Initiative not found");
      }

      let updatedInitiative = await Initiative.findOneAndUpdate(
        { _id: initiativeId },
        { $set: { pined: false } },
        { new: true }
      );
      res.status(200).json({
        message: "Initiative has been unpined successfully",
        updatedInitiative,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  lovedInitiative: async (req, res) => {
    const { initiativeId } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let initiative = await Initiative.findOne({
        _id: initiativeId,
      });
      if (!initiative) {
        return resourceError(res, "Initiative not found");
      }

      let updatedInitiative = await Initiative.findOneAndUpdate(
        { _id: initiativeId },
        { $set: { loved: true } },
        { new: true }
      );
      res.status(200).json({
        message: "Initiative has been made loved successfully",
        updatedInitiative,
      });
    } catch (error) {
      serverError(res, error);
    }
  },
  unlovedInitiative: async (req, res) => {
    const { initiativeId } = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let initiative = await Initiative.findOne({
        _id: initiativeId,
      });
      if (!initiative) {
        return resourceError(res, "Initiative not found");
      }

      let updatedInitiative = await Initiative.findOneAndUpdate(
        { _id: initiativeId },
        { $set: { loved: false } },
        { new: true }
      );
      res.status(200).json({
        message: "Initiative has been made unloved successfully",
        updatedInitiative,
      });
    } catch (error) {
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
      let user = await User.findOne({ _id: initiative.author });
      user.initiatives.splice(user.initiatives.indexOf(initiativeId), 1);
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );

      res.status(200).json({ message: "Deleted successfully", initiative });
    } catch (error) {
      serverError(res, error);
    }
  },
};
