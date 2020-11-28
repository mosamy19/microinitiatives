const { Schema, model } = require("mongoose");
const likeSchema = new Schema(
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
const Like = model("Like", likeSchema);
module.exports = Like;
