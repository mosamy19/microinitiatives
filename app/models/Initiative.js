const { Schema, model } = require("mongoose");
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
      trim: true,
    },
    description: {
      type: String,
      maxlength: 5000,
      required: true,
      trim: true,
    },
    thumbnail: [
      {
        type: String,
        default: "",
      },
    ],
    draft: {
      type: Boolean,
      default: false,
    },
    cloned: {
      type: Boolean,
      default: false,
    },
    clonedInitiativeOwner: String,
    clonedInitiativeId: String,
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    clones: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Initiative = model("Initiative", initiativeSchema);
module.exports = Initiative;
