const express = require("express");
const { authRoutes } = require("./auth.route");
const { messageRoutes } = require("./message.route");

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/messages", messageRoutes);

module.exports = {
  routes,
};
