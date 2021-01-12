const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const nodemailer = require("nodemailer");
const nodemailerMailgunTransport = require("nodemailer-mailgun-transport");
const config = require("../../config/config");

const transporter = nodemailer.createTransport(
  nodemailerMailgunTransport({
    auth: {
      api_key: config.mailgunApiKey,
      domain: config.mailgunDomain,
    },
  })
);

module.exports = {
  receiveEmail: async (req, res) => {
    let { name, email, message } = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      const mailOptions = {
        from: "Noii|نوي noreply@mg.noii.io",
        to: "sara.28111@gmail.com",
        subject: "Noii Contact Requiest",
        html: `<ul>
                  <li>Name: ${name}</li>
                  <li>Email: ${email}</li>
                  <li>Message: ${message}</li>
                </ul>`,
      };

      let info = await transporter.sendMail(mailOptions);

      // let transporter = nodemailer.createTransport({
      //   host: "noii.io",
      //   port: 587,
      //   secure: true,
      //   auth: {
      //     user: "info@noii.io",
      //     pass: "sara2020,sA",
      //   },
      //   tls: {
      //     rejectUnauthorized: false,
      //   },
      // });

      // let info = await transporter.sendMail({
      //   from: '"Noii contact" <info@noii.io>', // sender address
      //   to: "simon.chowdery@gmail.com", // list of receivers
      //   subject: "Noii Contact Requiest", // Subject line
      // html: `<ul>
      //           <li>Name: ${name}</li>
      //           <li>Email: ${email}</li>
      //           <li>Message: ${message}</li>
      //         </ul>`, // html body
      // });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.log(error);
      serverError(res, error);
    }
  },
};
