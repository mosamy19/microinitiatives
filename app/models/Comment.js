const { Schema, model } = require("mongoose");
const commentsSchema = new Schema(
  {
    body: {
      type: String,
      trim: true,
      required: true,
    },
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    initiative: [
      {
        type: Schema.Types.ObjectId,
        ref: "Initiative",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Comment = model("Comment", commentsSchema);
module.exports = Comment;
