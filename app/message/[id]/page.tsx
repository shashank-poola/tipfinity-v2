"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function MessagePage() {
  const { id } = useParams(); // Get creator ID from URL
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: "You", text: message }]);
    setMessage(""); // Clear input field
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-neutral-900 text-white font-semibold">
        Chat with Creator {id}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Start a conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.sender === "You" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"
              } max-w-xs`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t flex items-center bg-white dark:bg-neutral-900">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg outline-none dark:bg-neutral-800"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
