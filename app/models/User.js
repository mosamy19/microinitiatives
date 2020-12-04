const { Schema, model } = require("mongoose");

const useSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    familyName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
      default: "",
    },
    initiatives: [
      {
        type: Schema.Types.ObjectId,
        ref: "Initiative",
      },
    ],

    avatar: {
      type: String,
      default: "",
    },
    notifications: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", useSchema);
module.exports = User;
