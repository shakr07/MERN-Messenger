import React from "react";
import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import Container from "@mui/material/Container";
import { Outlet, useOutletContext} from "react-router-dom";  
import Header from "./components/Header";
import Box from "@mui/material/Box";

 import { io } from "socket.io-client";

function App() {
 const [socket, setSocket] = useState(null);
       useEffect(() => {
         setSocket(io("http://localhost:4000"));
       }, []);

  return (
    <div>
      <Container>
        <Header socket= {socket}/>
        <Box>
          <Outlet context={{ socket }} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
