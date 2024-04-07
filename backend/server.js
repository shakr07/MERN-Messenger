  const express = require("express");
  const dotenv = require("dotenv");
  const {chats} =require("./data/data");

  const app = express();
  dotenv.config();

  app.get('/',(req,res)=>{
      res.send("api is run1ning")
  })
  app.get("/api/chat", (req, res) => {
    res.send(chats);
  });
  app.get("/api/chat/:id", (req, res) => {
    const singleChats=chats.find((c)=>c._id===req.params.id);
    res.send(singleChats);
  });
  const PORT=process.env.PORT || 5000;
  app.listen(PORT, console.log("connected on port 5000"));
