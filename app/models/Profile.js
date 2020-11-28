const { Schema, model } = require("mongoose");

const useSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profilePic: String,
    initiatives: [
      {
        type: Schema.Types.ObjectId,
        ref: "Initiative",
      },
    ],
    clones: [
      {
        type: Schema.Types.ObjectId,
        ref: "Initiative",
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Initiative",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", useSchema);
module.exports = User;
