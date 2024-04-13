    import React from 'react'
    import Box from "@mui/material/Box";
    import Typography from "@mui/material/Typography";
    import Button from "@mui/material/Button";
    import TextField from "@mui/material/TextField";
    import InputAdornment from "@mui/material/InputAdornment";
    import OutlinedInput from "@mui/material/OutlinedInput";
    import { useEffect, useState } from "react";
    import IconButton from "@mui/material/IconButton";
 import { useNavigate, useOutletContext, useParams } from "react-router-dom";
    import SendIcon from "@mui/icons-material/Send";
    import Card from "@mui/material/Card";
    import InputLabel from "@mui/material/InputLabel";
    function ChatWindow() {
      // console.log();
      //  const [socket, setSocket] = useState(null);
       const { socket } = useOutletContext();
       const [message, setMessage] = useState(" ");
       const [chat, setchat] = useState([""]);     
       const [typing, setTyping] = useState(false); 
       const { roomId } = useParams();

       useEffect(() => {
         if (!socket) return;
         socket.on("message-from-server", (data) => {
           setchat((prev) => [
             ...prev,
             { message: data.message, received: true },
           ]);
         });

        socket.on("typing-started-from-server", () => setTyping(true));
        socket.on("typing-stoped-from-server", () => setTyping(false));
       }, [socket]);


      const [typingTimeout, settypingTimeout] = useState(null);
       const handleform = (e) => {
         e.preventDefault();
         socket.emit("send-message", { message,roomId});
          setchat((prev) => [
            ...prev,
            { message , received: false },
          ]);
         setMessage(""); // Clear the message field
       };


       const handleInput=(e)=>{
        setMessage(e.target.value);
        socket.emit("typing-started", { roomId });
        if (typingTimeout) clearTimeout(typingTimeout);

        settypingTimeout(
          setTimeout(() => {
            socket.emit("typing-stopped", { roomId });
           // console.log("typing-speed");
          }, 1000)
        );
       } 
        return (
          <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                style={{
                  padding: 2,
                  marginTop: 50,
                  width: "60% ",
                  backgroundColor: "#94cde9",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {roomId && <Typography>Room: {roomId}</Typography>}
                  {/* {roomId && (
                    <Button
                      size="small"
                      variant="text"
                      color="secondary"
                      onClick={removeRoom}
                    >
                      Delete Room
                    </Button>
                  )} */}
                </Box>

                <Box style={{ marginBottom: 40 }}>
                  {chat.map((data) => (
                    //if true then it is receiver so it is on left  and
                    <Typography
                      key={data.message}
                      sx={{ textAlign: data.received ? "left" : "right" }}
                    >
                      {data.message}
                    </Typography>
                  ))}
                </Box>
                <Box component="form" onSubmit={handleform}>
                  {typing && (
                    <InputLabel
                      sx={{ color: "orange " }}
                      shrink
                      htmlFor="message-input"
                    >
                      Typing...
                    </InputLabel>
                  )}
                  <OutlinedInput
                    sx={{ backgroundColor: "white", width: "100%  " }}
                    size="small"
                    id="message-input"
                    value={message}
                    placeholder="Write your message"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton type="submit" edge="end">
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Box>
              </Card>
            </Box>
          </>
        );
    }
    
    export default ChatWindow