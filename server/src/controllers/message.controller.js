const { Message } = require("../models/message.model");

const MessageController = {
  get_all_messages: async (req, res, next) => {
    try {
      const { from, to } = req.body;
      const messages = await Message.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
      const projectedMessages = messages.map((msg) => {
        return {
          from_me: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });

      return res
        .status(200)
        .json({ success: true, message: "Success", data: projectedMessages });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "We can not complete your request at this time",
        error: error.message,
        errors: error.stack,
      });
    }
  },

  create_message: async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await Message.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
      if (!data) {
        return res.status(200).json({
          success: false,
          message: "An error occured while adding message",
        });
      }

      return res
        .status(200)
        .json({ success: true, message: "Message Added", data: data });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "We can not complete your request at this time",
        error: error.message,
        errors: error.stack,
      });
    }
  },
};

module.exports = {
  MessageController,
};
