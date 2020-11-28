const Initiative = require("../models/Initiative");
const Share = require("../models/Share");
const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");

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

      let newShare = new Share({
        initiative: initiativeId,
        author: req.user._id,
      });

      let createdShare = await newShare.save();
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
};
