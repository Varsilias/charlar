const express = require("express");
const { MessageController } = require("../controllers/message.controller");
const messageRoutes = express.Router();

messageRoutes.post("/projected", MessageController.get_all_messages);
messageRoutes.post("/", MessageController.create_message);
// messageRoutes.post("/:id/avatar", AuthController.avatar);
// messageRoutes.get("/users/:id", AuthController.get_all_users);

module.exports = {
  messageRoutes,
};
