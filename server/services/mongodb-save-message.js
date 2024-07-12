const Message = require("../models/Message");

const saveMessage = async (message, username, room, createdTime) => {
  try {
    const newMessage = new Message({ message, username, room, createdTime });
    await newMessage.save();
    return { status: "success", message: "Message saved to MongoDB" };
  } catch (error) {
    console.error("Error saving message to MongoDB:", error);
    return { status: "error", message: "Failed to save message to MongoDB" };
  }
};

module.exports = saveMessage;
