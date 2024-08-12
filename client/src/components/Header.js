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


//making of the rooms
useEffect(() => {
async function fetchRooms(){
  const res = await fetch('http://localhost:4000/rooms');
  const {data}= await res.json();
  setRooms(data);
}
fetchRooms();
}, [])


  useEffect(() => {
  if(!socket)return;
  socket.on("new-room-created",({roomId})=>{
   setRooms([...rooms,roomId])
  });
  }, [socket])
  
return (
<div className="header">
      <div className="container">
        <Link to="/">
          <button className="btn">Home</button>
        </Link>
        <div className="rooms">
          {rooms.map((room) => (
            <Link
              key={room.roomId}
              to={`/room/${room.roomId}`} // Ensure room.roomId is passed here
              className="room-link"
            >
              <button className="btn">{room.name}</button>
            </Link>
          ))}
        </div>
        <button className="btn" onClick={createNewRoom}>
          New ROOM
        </button>
      </div>
    </div>
  );
}

export default Header;