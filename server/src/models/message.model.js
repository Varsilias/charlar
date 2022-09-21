const { Schema, model, Types } = require("mongoose");

const messageSchema = new Schema(
  {
    message: { text: { type: String, required: true } },
    users: { type: Array },
    sender: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Message = model("Messages", messageSchema);

module.exports = {
  Message,
};
