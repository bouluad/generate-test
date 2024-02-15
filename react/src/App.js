import React from 'react';
import './App.css';
import Chat from './components/Chat';
import SummaryGenerator from './components/SummaryGenerator';

function App() {
  const handleSummaryGeneration = (repoUrl, filePath) => {
    // Call a function to handle summary generation
    // e.g., generateSummary(repoUrl, filePath);
  };

  return (
    <div className="App">
      <h1>GitHub Summary Generator</h1>
      <Chat onSend={handleSummaryGeneration} />
      <SummaryGenerator />
    </div>
  );
}

export default App;
