 
import express from "express";
import http from "http";
import path from "path";  
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
 // console.log("connection is ready");

 socket.on("send-message", (data) => {
   //console.log("received", data);
   socket.broadcast.emit("message-from-server", data);
 });

 socket.on("typing-started",()=>{  
  //it will braod cast to other users
  // console.log("from-c;ien");  
 socket.broadcast.emit("typing-started-from-server");
 
 })

  socket.on("disconnect", () => {
    //  to "disconnect"
    //console.log("disconnection");
  });
});


httpServer.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
