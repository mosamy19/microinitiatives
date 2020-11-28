const { Schema, model } = require("mongoose");
const shareSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);
const Share = model("Share", shareSchema);
module.exports = Share;
