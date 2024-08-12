 
import express from "express";
import http from "http";
import path from "path";  
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import sockets from "./socket/sockets.js";
import mongoose from "mongoose";
import router from "./api/routes.js";
import cors from "cors";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 await mongoose.connect(
   "mongodb+srv://shanusingh09032002:shashank17520@cluster0.g7akhqt.mongodb.net/"
 );

const PORT = 4000;
app.use(cors);
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/",router);

io.on("connection", sockets); 

httpServer.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
