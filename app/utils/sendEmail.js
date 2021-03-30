const nodemailer = require("nodemailer");
const Rule = require("../models/Rule");
const nodemailerMailgunTransport = require("nodemailer-mailgun-transport");
const config = require("../../config/config");
const Email = require("email-templates");
const { serverError } = require("../utils/error");

const transporter = nodemailer.createTransport(
  nodemailerMailgunTransport({
    auth: {
      api_key: config.mailgunApiKey,
      domain: config.mailgunDomain,
    },
  })
);
module.exports = async (obj) => {
  try {
    let rules = await Rule.find();
    rules.map(async (rule) => {
      if (
        rule.activity === obj.act &&
        rule.type === obj.type &&
        rule.quantity === obj.quantity
      ) {
        const emailTemp = new Email({
          views: { root: "./template", options: { extension: "ejs" } },
          message: {
            from: "Noii|نوي<noreply@mg.noii.io>",
          },
          preview: false,
          send: true,
          transport: transporter,
        });

        await emailTemp.send({
          template: "test",
          message: {
            to: obj.email,
          },
          locals: {
            title: rule.subject,
            subject: rule.subject,
            content: rule.content,
            name: `مرحبا(${obj.name})`,
            source: obj.src,
          },
        });
      }
    });
  } catch (error) {
    serverError(obj.res, error);
  }
};
