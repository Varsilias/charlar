const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { routes } = require("./src/routes");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const WEB_URI = process.env.WEB_URI;

app.get("/", (req, res) => {
  res.send("Health Check");
});

app.use(express.json());
app.use(cors());
app.use("/api", routes);

mongoose
  .connect(MONGO_URI)
  .then((data) => console.log(`Mongo Connected`))
  .catch((error) => console.log(error));

const server = app.listen(PORT, () =>
  console.log("server running on port " + PORT)
);

const io = socket(server, {
  cors: {
    origin: WEB_URI,
    credentials: true,
  },
});
global.users = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("user_added", (userId) => {
    users.set(userId, socket.id);
  });

  socket.on("message_sent", (data) => {
    console.log(data);
    const userToSend = users.get(data.to);
    console.log(userToSend);
    if (userToSend) {
      socket.to(userToSend).emit("message_received", data.message);
    }
  });
});
