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
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        auth: {
          user: "simon.chowdery@gmail.com",
          pass: "123$$$sss",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let info = await transporter.sendMail({
        from: '"Noii contact" <simon.chowdery@gmail.com>', // sender address
        to: "simon.chowdery@gmail.com", // list of receivers
        subject: "Noii Contact Requiest", // Subject line
        html: `<ul>
                  <li>Name: ${name}</li>
                  <li>Email: ${email}</li>
                  <li>Message: ${message}</li>
                </ul>`, // html body
      });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.log(error);
      serverError(res, error);
    }
  },
};
