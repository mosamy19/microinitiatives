const { Schema, model } = require("mongoose");
const Comment = require("./Comment");
const initiativeSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    category: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      maxlength: 5000,
    },
    thumbnail: [
      {
        type: Array,
        default: [],
      },
    ],
    draft: {
      type: Boolean,
      default: false,
    },
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shares: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Initiative = model("Initiative", initiativeSchema);
module.exports = Initiative;
