import React from 'react';
import './Chat.css';

function Chat() {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {/* Display chat messages here */}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Chat;
