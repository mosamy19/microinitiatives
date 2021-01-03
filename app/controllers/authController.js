const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("../../config/config");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");
const nodemailer = require("nodemailer");
const nodemailerMailgunTransport = require("nodemailer-mailgun-transport");
const Email = require("email-templates");

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
    const pickedProperty = _.pick(req.body, [
      "firstName",
      "familyName",
      "email",
      "password",
    ]);

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let hashedPassword = await bcrypt.hash(pickedProperty.password, 11);
      let avatar = "";
      if (req.file) {
        avatar = `/uploads/${req.file.filename}`;
      }
      let newUser = new User({
        firstName,
        familyName,
        email,
        password: hashedPassword,
        avatar: avatar,
      });

      let user = await newUser.save();
      let token = await jwt.sign(
        {
          _id: user._id,
          firstName: user.firstName,
          familyName: user.familyName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        config.jwtSecret,
        { expiresIn: "72h" }
      );

      res.status(status.created).json({
        token: `Bearer ${token}`,
        user,
      });

      const emailTemp = new Email({
        views: { root: "./template", options: { extension: "ejs" } },
        message: {
          from: "Noii|نوي noreply@mg.noii.io",
        },
        // juice: true,
        // juiceSettings: {
        //   tableElements: ["TABLE"],
        // },
        // juiceResources: {
        //   preserveImportant: true,
        //   webResources: {
        //     relativeTo: path.resolve("template"),
        //   },
        // },

        preview: false,
        send: true,
        transport: transporter,
      });

      let info = await emailTemp.send({
        template: "test",
        message: {
          to: user.email,
        },
        locals: {
          title: "تفعيل حسابك في نوي",
          subject: "تفعيل حسابك في نوي",
          content: "من فضلك اضغط على الرابط التالي لتفعيل حسابك",
          name: `مرحبا(${user.firstName} ${user.familyName})`,
          source: `https://noii.io/all-initiatives`,
        },
      });
      res.status(status.success).json({
        message: "Email sent",
      });

      // transporter.sendMail(mailOptions, (err, data) => {
      //   if (err) {
      //     console.log(err);
      //   }
      // });
    } catch (error) {
      serverError(res, error);
    }
  },

  // activateAccountController: async (req, res) => {
  //   const token = req.body.token;
  //   let decodedToken;
  //   try {
  //     if (token) {
  //       decodedToken = jwt.verify(token, config.jwtSecret);
  //     }

  //     const { firstName, familyName, email, password } = decodedToken;

  //     let isExistUser = await User.findOne({ email });
  //     if (isExistUser) {
  //       return resourceError(res, "User with this email already exists.");
  //     }

  //     let hashedPassword = await bcrypt.hash(password, 11);
  //     let newUser = new User({
  //       firstName,
  //       familyName,
  //       email,
  //       password: hashedPassword,
  //     });
  //     let user = await newUser.save();
  //     res.status(status.created).json({
  //       message: "You have soigned up successfully",
  //       user,
  //     });
  //   } catch (error) {
  //     serverError(res, error);
  //   }
  // },

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
          isAdmin: user.isAdmin,
        },
        config.jwtSecret,
        { expiresIn: "72h" }
      );

      res.status(status.success).json({
        message: "قمت بالتسجيل بنجاح",
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

      const emailTemp = new Email({
        views: { root: "./template", options: { extension: "ejs" } },
        message: {
          from: "Noii|نوي noreply@mg.noii.io",
        },
        // juice: true,
        // juiceSettings: {
        //   tableElements: ["TABLE"],
        // },
        // juiceResources: {
        //   preserveImportant: true,
        //   webResources: {
        //     relativeTo: path.resolve("template"),
        //   },
        // },

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
          title: "تغيير الكلمة السرية",
          subject: "تغيير الكلمة السرية",
          content: "من فضلك اضغط على الرابط التالي لتغيير الكلمة السرية لحسابك",
          name: `مرحبا(${user.firstName} ${user.familyName})`,
          source: `https://noii.io/reset-password/${token}`,
        },
      });
      let newUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { resetToken: token } }
      );
      res.status(status.success).json({
        message: "Email sent",
        newUser,
      });
      // const mailOptions = {
      //   from: "Noii micorinitiatives noreply@mg.noii.io",
      //   to: email,
      //   subject: "Reset Password Link",
      //   html: `<h2>Please click on bellow link to reset your password...!</h2>
      //     <a href="${config.clientUri}/reset-password/${token}" style="padding: 10px 20px; background-color: yellow; color: #ffffff; text-decoration: none; font-size: 18px;"> اضغط هنا</a>
      //   `,
      // };

      // transporter.sendMail(mailOptions, async (err, data) => {
      //   if (err) {
      //     console.log(err);
      //   }
      //   let newUser = await User.findOneAndUpdate(
      //     { _id: user._id },
      //     { $set: { resetToken: token } }
      //   );
      //   res.status(status.success).json({
      //     message: "Email sent",
      //     newUser,
      //   });
      // });
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
        decode = await jwt.verify(token, config.jwtSecret);
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
      serverError(res, error.message);
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

  getLoggedinUser: async (req, res) => {
    try {
      let user = await User.findOne({ _id: req.user._id });
      res.status(200).json(user);
    } catch (error) {
      serverError(res, error);
    }
  },
  getPublicProfileUser: async (req, res) => {
    const { userId } = req.params;
    try {
      let user = await User.find({ _id: userId }).populate(
        "initiative",
        "_id title category likes clones favorites shares description"
      );
      res.status(200).json(user);
    } catch (error) {
      serverError(res, error);
    }
  },

  // admin routes

  addNewUser: async (req, res, next) => {
    let { firstName, familyName, email, password } = req.body;
    const pickedProperty = _.pick(req.body, [
      "firstName",
      "familyName",
      "email",
      "password",
    ]);

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let hashedPassword = await bcrypt.hash(pickedProperty.password, 11);
      let avatar = "";
      if (req.file) {
        avatar = `/uploads/${req.file.filename}`;
      }
      let newUser = new User({
        firstName,
        familyName,
        email,
        password: hashedPassword,
        avatar: avatar,
      });

      let user = await newUser.save();
      res.status(status.created).json({
        message: "User has been created successfully ",
        user,
      });
    } catch (error) {
      serverError(res, error);
    }
  },

  editUserByAdmin: async (req, res) => {
    const { firstName, familyName, email } = req.body;
    const { userId } = req.params;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let user = await User.findOne({ _id: userId });
      if (!user) {
        return resourceError(res, "User not found");
      }

      let avatar = user.avatar;
      if (req.file) {
        avatar = `/uploads/${req.file.filename}`;
      }

      let updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { firstName, familyName, email, avatar } },
        { new: true }
      );

      res.status(200).json({ message: "Edited successfully", updatedUser });
    } catch (error) {
      serverError(res, error);
    }
  },

  deleteUser: async (req, res) => {
    let { userId } = req.params;
    try {
      let user = await User.findOneAndDelete({ _id: userId });
      if (!user) {
        return resourceError(res, "No user Found");
      }
      res.status(200).json({ message: "Deleted successfully", user });
    } catch (error) {
      serverError(res, error);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      let users = await User.find();
      if (users.length === 0) {
        return resourceError(res, "No user found");
      }
      res.status(200).json(users);
    } catch (error) {
      serverError(res, error);
    }
  },
  getSingleUser: async (req, res) => {
    let { userId } = req.params;
    try {
      let user = await User.findOne({ _id: userId });
      if (!user) {
        return resourceError(res, "User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      serverError(res, error);
    }
  },
};
