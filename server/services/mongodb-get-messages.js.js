// services/mongodb-get-messages.js
const Message = require("../models/Message");

const getMessages = async (room) => {
  try {
    const last100Messages = await Message.find({ room })
      .sort({ createdTime: -1 }) // Sort by createdTime in descending order
      .limit(100); // Limit to 100 messages

    return last100Messages;
  } catch (error) {
    console.error("Error fetching messages from MongoDB:", error);
    throw error; // Throw error to handle it elsewhere
  }
};

module.exports = getMessages;
