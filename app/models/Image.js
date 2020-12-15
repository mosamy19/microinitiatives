const { Schema, model } = require("mongoose");
const imageSchema = new Schema(
  {
    images: {
      type: Array,
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Image = model("Image", imageSchema);
module.exports = Image;
