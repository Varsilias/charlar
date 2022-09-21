const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar_present: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

module.exports = {
  User,
};
