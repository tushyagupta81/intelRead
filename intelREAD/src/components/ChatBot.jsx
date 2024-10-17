"use client";
import React, { useState } from 'react';
import { buttonVariants } from "./ui/button";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Add AI response logic here (mocking response for now)
      setMessages(prev => [...prev, { text: 'AI is responding to your question...', sender: 'ai' }]);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };
  return (
    <div className="flex flex-col h-full border-l border-gray-300 p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 border rounded-l-lg p-2 mr-10 focus:outline-none"
          placeholder="Enter your question..."
          value={input}
          onKeyDown={handleKeyDown}
          onChange={e => setInput(e.target.value)}
        />
        <button
        
          onClick={handleSend}
          className={buttonVariants({
            size: 'sm', 

        })}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;