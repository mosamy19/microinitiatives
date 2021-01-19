const nodemailer = require("nodemailer");
const nodemailerMailgunTransport = require("nodemailer-mailgun-transport");
const config = require("../../config/config");
const Email = require("email-templates");

const transporter = nodemailer.createTransport(
  nodemailerMailgunTransport({
    auth: {
      api_key: config.mailgunApiKey,
      domain: config.mailgunDomain,
    },
  })
);
module.exports = async (email, title, content, name, src) => {
  try {
    const emailTemp = new Email({
      views: { root: "./template", options: { extension: "ejs" } },
      message: {
        from: "Noii|نوي noreply@mg.noii.io",
      },
      preview: false,
      send: true,
      transport: transporter,
    });

    let info = await emailTemp.send({
      template: "test",
      message: {
        to: email,
      },
      locals: {
        title,
        subject: title,
        content,
        name: `مرحبا(${name})`,
        source: src,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
