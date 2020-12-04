const { Schema, model } = require("mongoose");
const notificationSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    initiative: {
      type: Schema.Types.ObjectId,
      ref: "Initiative",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    type: String,
    siChecked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Notification = model("Notification", notificationSchema);
module.exports = Notification;
