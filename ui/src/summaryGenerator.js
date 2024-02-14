import React, { useState } from 'react';
import axios from 'axios';

function SummaryGenerator() {
  const [repoUrl, setRepoUrl] = useState('');
  const [filePath, setFilePath] = useState('');
  const [summary, setSummary] = useState('');

  const generateSummary = async () => {
    try {
      const response = await axios.get(`/generate-summary/?repo_url=${repoUrl}&file_path=${filePath}`);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  return (
    <div className="chat-box"> {/* Apply chat-box class */}
      <div className="message"> {/* Apply message class */}
        <input
          type="text"
          placeholder="GitHub Repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
      </div>
      <div className="message"> {/* Apply message class */}
        <input
          type="text"
          placeholder="File Path"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
        />
      </div>
      <div className="input-group"> {/* Apply input-group class */}
        <button onClick={generateSummary}>Generate Summary</button>
      </div>
      {summary && <div className="message">{summary}</div>} {/* Apply message class */}
    </div>
  );
}

export default SummaryGenerator;
