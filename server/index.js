// server/index.js
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const saveMessage = require("./services/mongodb-save-message");
const getMessages = require("./services/mongodb-get-messages.js");
const leaveRoom = require("./utils/leave-room");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", async (data) => {
    const { username, room } = data;
    socket.join(room);

    let createdTime = Date.now();

    // Emit messages to the joined user
    getMessages(room)
      .then((last100Messages) => {
        socket.emit("last_100_messages", last100Messages.reverse()); // Reverse to maintain chronological order
      })
      .catch((err) => console.log(err));

    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      createdTime,
    });
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      createdTime,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    const chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });

  socket.on("send_message", (data) => {
    const { message, username, room, createdTime } = data;
    console.log(
      `Received message: ${message} from ${username} in room ${room} at ${createdTime}`
    );
    io.in(room).emit("receive_message", data);
    saveMessage(message, username, room, createdTime)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    const createdTime = Date.now();
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      createdTime,
    });
    console.log(`${username} has left the chat`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from the chat");
    const user = allUsers.find((user) => user.id === socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit("chatroom_users", allUsers);
      socket.to(chatRoom).emit("receive_message", {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });
});

server.listen(4000, () => console.log("Server is running on port 4000"));
