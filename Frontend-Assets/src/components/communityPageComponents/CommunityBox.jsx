/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import { Send } from "lucide-react";

const CommunityBox = ({ communityName }) => {
  const members=10;
  const [messages, setMessages] = useState([
    { sender: "John", text: "Hello everyone!" },
    { sender: "Alice", text: "Hi there!" },
  ]);
  const [message, setMessage] = useState("");

  // Function to send message
  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { sender: "You", text: message }]);
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="  flex flex-col h-full w-full  border rounded-lg shadow-lg bg-white">
      
      {/* 🔹 Chat Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
        <div>
          <h2 className="text-lg font-semibold">{communityName}</h2>
          <p className="text-sm opacity-80">{members} members</p>
        </div>
      </div>

      {/* 🔹 Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "You" ? "bg-blue-500 text-white self-end" : "bg-white shadow"
            }`}
          >
            <p className="text-sm font-semibold">{msg.sender}</p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Chat Input Box */}
      <div className="p-3 flex items-center gap-2 border-t bg-white rounded-b-lg">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md focus:outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Send on Enter key
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {/* <Send size={20} /> */}Send
        </button>
      </div>

    </div>
  );
};

export default CommunityBox;
