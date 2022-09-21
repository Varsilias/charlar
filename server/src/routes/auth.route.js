const express = require("express");
const { AuthController } = require("../controllers/auth.controller");
const authRoutes = express.Router();

authRoutes.post("/signup", AuthController.sign_up);
authRoutes.post("/signin", AuthController.sign_in);
authRoutes.post("/:id/avatar", AuthController.avatar);
authRoutes.get("/users/:id", AuthController.get_all_users);

module.exports = {
  authRoutes,
};
