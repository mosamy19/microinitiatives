const { validationResult } = require("express-validator");
const Notification = require("../models/Notification");
const User = require("../models/User");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");

module.exports = {
  getNotifications: async (req, res) => {
    try {
      let all_notifications = await Notification.find({ author: req.user._id });

      let user = await User.findOne({ _id: req.user._id });
      user.notifications = 0;
      user.save();

      res.status(200).json(all_notifications.reverse());
    } catch (error) {
      serverError(res, error);
    }
  },

  makeIsCheckedTrue: async (req, res) => {
    try {
      let all_notifications = await Notification.findOne({ author: req.user._id });
      all_notifications.isChecked = true;
      all_notifications.save();
      res.status(200).json(all_notifications.reverse);
    } catch (error) {
      console.log(error);
      serverError(res, error);
    }
  },
};
