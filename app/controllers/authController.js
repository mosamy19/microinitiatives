const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const nodemailer = require("nodemailer");
const nodemailerMailgunTransport = require("nodemailer-mailgun-transport");

const transporter = nodemailer.createTransport(
  nodemailerMailgunTransport({
    auth: {
      api_key: config.mailgunApiKey,
      domain: config.mailgunDomain,
    },
  })
);

module.exports = {
  signupController: async (req, res, next) => {
    let { firstName, familyName, email, password } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      // let user = await User.findOne({ email });
      // if (user) {
      //   return resourceError(res, "User with this email already exists.");
      // }
      // let token = jwt.sign(
      //   { firstName, familyName, email, password },
      //   config.jwtSecret,
      //   { expiresIn: "20m" }
      // );

      let hashedPassword = await bcrypt.hash(password, 11);
      let newUser = new User({
        firstName,
        familyName,
        email,
        password: hashedPassword,
      });
      let user = await newUser.save();
      res.status(status.created).json({
        message: "You have soigned up successfully, Now you can login ",
        user,
      });

      // const mailOptions = {
      //   from: "noreply@microinitiatives.com",
      //   to: email,
      //   subject: "Account Activation Link",
      //   html: `<h2>Please click on bellow link to activate your account...!</h2>
      //     <a href="${config.clientUri}/account-activation/${token}" style="padding: 10px 20px; background-color: yellow; color: #ffffff; text-decoration: none;">Click Here</a>
      //   `,
      // };

      // transporter.sendMail(mailOptions, (err, data) => {
      //   if (err) {
      //     console.log(err);
      //   }
      //   res.status(status.success).json({
      //     message: "Email has been sent, Activate your account",
      //   });
      // });
    } catch (error) {
      serverError(res, error);
    }
  },

  activateAccountController: async (req, res) => {
    const token = req.body.token;
    let decodedToken;
    try {
      if (token) {
        decodedToken = jwt.verify(token, config.jwtSecret);
      }

      const { firstName, familyName, email, password } = decodedToken;

      let isExistUser = await User.findOne({ email });
      if (isExistUser) {
        return resourceError(res, "User with this email already exists.");
      }

      let hashedPassword = await bcrypt.hash(password, 11);
      let newUser = new User({
        firstName,
        familyName,
        email,
        password: hashedPassword,
      });
      let user = await newUser.save();
      res.status(status.created).json({
        message: "You have soigned up successfully",
        user,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  loginController: async (req, res, next) => {
    let { email, password } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return resourceError(res, "Invalid credentials");
      }

      let match = await bcrypt.compare(password, user.password);
      if (!match) {
        return resourceError(res, "Invalid credentials");
      }

      let token = await jwt.sign(
        {
          _id: user._id,
          firstName: user.firstName,
          familyName: user.familyName,
          email: user.email,
        },
        config.jwtSecret,
        { expiresIn: "24h" }
      );

      res.status(status.success).json({
        message: "You have loggedin successfully",
        token: `Bearer ${token}`,
        user,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  forgetPasswordController: async (req, res, next) => {
    const { email } = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return resourceError(res, "User with this email not exists.");
      }

      const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
        expiresIn: "20m",
      });
      const mailOptions = {
        from: "noreply@microinitiatives.com",
        to: email,
        subject: "Reset Password Link",
        html: `<h2>Please click on bellow link to reset your password...!</h2>
          <a href="${config.clientUri}/reset-password/${token}" style="padding: 10px 20px; background-color: yellow; color: #ffffff; text-decoration: none;">Click Here</a>
        `,
      };

      transporter.sendMail(mailOptions, async (err, data) => {
        if (err) {
          console.log(err);
        }
        let newUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { resetToken: token } }
        );
        res.status(status.success).json({
          message: "Email has been sent, reset your password",
          newUser,
        });
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  resetPasswordController: async (req, res, next) => {
    const { token, newPassword } = req.body;
    let decode;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      if (token) {
        decode = jwt.verify(token, config.jwtSecret);
      }
      const { _id } = decode;
      let user = await User.findOne({ _id });
      if (!user) {
        return resourceError(res, "User with this token not exists.");
      }
      let newHashedPassword = await bcrypt.hash(newPassword, 11);
      let updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { password: newHashedPassword, resetToken: "" } }
      );
      res.status(status.success).json({
        message: "Password has reset successfully",
        updatedUser,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  changePasswordController: async (req, res, next) => {
    let { oldPassword, newPassword } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let match = await bcrypt.compare(oldPassword, req.user.password);

      if (!match) {
        return resourceError(res, "Invalid old password");
      }

      let newHashedPassword = await bcrypt.hash(newPassword, 11);
      let user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { password: newHashedPassword } }
      );
      res.status(status.success).json({
        message: "Password has changed successfully",
        user,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  editUser: async (req, res) => {
    const { firstName, familyName } = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }
    try {
      let user = await User.findOne({ _id: req.user._id });
      if (!user) {
        return resourceError(res, "User not found");
      }

      let avatar = user.avatar;
      if (req.file) {
        avatar = `/uploads/${req.file.filename}`;
      }

      let updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { firstName, familyName, avatar } },
        { new: true }
      );

      res.status(200).json({ message: "Edited successfully", updatedUser });
    } catch (error) {
      serverError(res, error);
    }
  },

 getLoggedinUser: async(req, res)=>{
   try {
     let user = await User.findOne({_id: req.user._id})
     res.status(200).json(user);
   } catch (error) {
      serverError(res, error);
   }
 }
};
