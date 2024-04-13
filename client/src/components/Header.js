import React from 'react'
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {Link,Outlet}from "react-router-dom"
const { v4: uuidv4 } = require("uuid");
function Header() {
  const roomId=uuidv4();
  return (
    <div>
      <Card sx={{ marginTop: 5, backgroundColor: "#00cef7" }}>
        <Link to="/">
          <Button sx={{ color: "white" }} variant="text">
            Home
          </Button>
        </Link>
        <Link to="/chats">
          <Button sx={{ color: "white" }} variant="text">
            chats
          </Button>
        </Link>
        <Link to={`/rooms/${roomId}`}>
          <Button sx={{ color: "white" }} variant="text">
            Room1
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export default Header