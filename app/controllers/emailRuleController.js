const { validationResult } = require("express-validator");
const Rule = require("../models/Rule");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
module.exports = {
  createRule: async (req, res) => {
    let { activity, quantity, type, subject, content } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let newRule = new Rule({
        activity,
        quantity,
        type,
        subject,
        content,
      });
      let rule = await newRule.save();
      res.status(status.success).json({
        message: "New rule has been added successfully",
        rule,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  getRules: async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    try {
      let rules = await Rule.find().sort([[sortBy, order]]);
      res.status(200).json(rules);
    } catch (error) {
      serverError(res, error);
    }
  },

  getSingleRule: async (req, res) => {
    let { ruleId } = req.params;
    try {
      let rule = await Rule.findOne({ _id: ruleId });
      if (!rule) {
        return resourceError(res, "No rule Found");
      }
      res.status(200).json(rule);
    } catch (error) {
      serverError(res, error);
    }
  },

  editRule: async (req, res) => {
    let { activity, quantity, type, subject, content, ruleId } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }
    console.log("rule id:", type);
    try {
      let rule = await Rule.findOne({ _id: ruleId });
      if (!rule) {
        return resourceError(res, "Rule not found");
      }

      let updatedRule = await Rule.findOneAndUpdate(
        { _id: ruleId },
        { $set: { activity, quantity, type, subject, content } },
        { new: true }
      );
      res.status(200).json({ message: "Edited successfully", updatedRule });
    } catch (error) {
      serverError(res, error);
    }
  },

  deleteRule: async (req, res) => {
    let { ruleId } = req.params;
    try {
      let rule = await Rule.findOneAndDelete({ _id: ruleId });
      if (!rule) {
        return resourceError(res, "No rule Found");
      }
      res.status(200).json({ message: "Deleted successfully", rule });
    } catch (error) {
      serverError(res, error);
    }
  },
};
