const { validationResult } = require("express-validator");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const nodemailer = require("nodemailer");

module.exports = {
  receiveEmail: async (req, res) => {
    let { name, email, message } = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let transporter = nodemailer.createTransport({
        host: "noii.io",
        port: 587,
        secure: false,
        auth: {
          user: "info@noii.io",
          pass: "sara2020,sA",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let info = await transporter.sendMail({
        from: '"Noii contact" <info@noii.io>', // sender address
        to: "simon.chowdery@gmail.com", // list of receivers
        subject: "Noii Contact Requiest", // Subject line
        html: `<div stye="margin: 50px 30px";>
                  <ul style="margin: 5px; padding: 20px; font-size: 16px; list-style: none; >
                    <li>Name: ${name}</li>
                    <li>Email: ${email}</li>
                    <li>Message: ${message}</li>
                  </ul>
                </div>`, // html body
      });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.log(error);
      serverError(res, error);
    }
  },
};
