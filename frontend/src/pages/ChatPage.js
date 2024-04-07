    import {React,useEffect,useState} from 'react'
    import axios from "axios";
    const ChatPage=()=> {
        const[chats,setChats]=useState([]);
      const FetchChats=async()=>{

        try {
            const {data }= await axios.get("/api/chat");
            setChats(data);
        } catch (error) {
            console.log(error);;
        }
      }
      useEffect(() => {
      FetchChats();
      }, [])
      
        return (

        <div>
          {
            chats.map((chat)=>(
                <div key={chat.id}>
                    {chat.chatName}
                </div>
            ))
          }
        </div>
      )
    }
    
    export default ChatPage