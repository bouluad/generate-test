import React, { useState } from 'react';
import axios from 'axios';

function SummaryGenerator() {
  const [summary, setSummary] = useState('');

  const generateSummary = async (repoUrl, filePath) => {
    try {
      const response = await axios.get(`/generate-summary/?repo_url=${repoUrl}&file_path=${filePath}`);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  return (
    <div className="summary-container">
      {summary && <div className="summary">{summary}</div>}
    </div>
  );
}

export default SummaryGenerator;
