import React, { useState } from 'react';
import '../Chat.css';

function Chat({ onSend }) {
  const [repoUrl, setRepoUrl] = useState('');
  const [filePath, setFilePath] = useState('');

  const handleSend = () => {
    onSend(repoUrl, filePath);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {/* Display chat messages here */}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="GitHub Repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="File Path"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
        />
        <button onClick={handleSend}>Generate Summary</button>
      </div>
    </div>
  );
}

export default Chat;
