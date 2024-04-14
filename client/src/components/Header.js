import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
 
import { useEffect, useState } from "react";
import { Link, useNavigate,useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Header({socket}) {
  const roomId = uuidv4();
  const navigate=useNavigate();
  //const {socket}=useOutletContext();
    const [rooms, setRooms] = useState([]);
  function createNewRoom() {
    //const roomId = uuidv4();
       navigate(`/rooms/${roomId}`);
      socket.emit("new-room-created", { roomId});
      setRooms([...rooms, roomId]);
    // setRooms([...rooms, { roomId, name: "Test", _id: "testId" }]);
  }
  useEffect(() => {
  if(!socket)return;
  socket.on("new-room-created",({roomId})=>{
   setRooms([...rooms,roomId])
  });
  }, [socket])
  
return (
  <div>
    <Card sx={{ marginTop: 5, backgroundColor: "#00cef7" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Link to="/">
            <Button sx={{ color: "white" }} variant="text">
              Home
            </Button>
          </Link>
        </Box>

        {rooms.map((room) => (
          <Link
            key={room.roomId}
            style={{ textDecoration: "none" }}
            to={`/room/${room.roomId}`}
          >
            <Button sx={{ color: "white" }} variant="text">
              {room.name}
            </Button>
          </Link>
        ))}
        <Button sx={{ color: "white" }} variant="text" onClick={createNewRoom}>
          New ROOM
        </Button>
      </Box>
    </Card>
  </div>
);
}

export default Header;
