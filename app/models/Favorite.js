const { Schema, model } = require("mongoose");
const favoriteSchema = new Schema(
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
const Favorite = model("Favorite", favoriteSchema);
module.exports = Favorite;
