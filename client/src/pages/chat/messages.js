// chat-app\client\src\pages\chat\messages.js
import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

const MessagesReceived = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);

  // Effect to handle receiving new messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesReceived((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup function
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  // Effect to handle receiving last 100 messages on component mount
  useEffect(() => {
    socket.on("last_100_messages", (last100Messages) => {
      console.log("Last 100 messages:", last100Messages);
      setMessagesReceived(last100Messages);
    });

    // Cleanup function
    return () => {
      socket.off("last_100_messages");
    };
  }, [socket]);

  // Effect to scroll to the bottom when new message is received
  useEffect(() => {
    if (messagesColumnRef.current) {
      messagesColumnRef.current.scrollTop =
        messagesColumnRef.current.scrollHeight;
    }
  }, [messagesReceived]);

  // Render function for formatting message
  const renderMessage = (msg) => (
    <div className={styles.message} key={msg.__createdtime__}>
      <div className={styles.msgMeta}>
        <span>{msg.username}</span>
        <span>{formatDateFromTimestamp(msg.__createdtime__)}</span>
      </div>
      <p className={styles.msgText}>{msg.message}</p>
    </div>
  );

  // Helper function to format timestamp
  const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesReceived.map((msg) => renderMessage(msg))}
    </div>
  );
};

export default MessagesReceived;
