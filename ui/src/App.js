import React from 'react';
import './App.css';
import SummaryGenerator from './summaryGenerator';
import './styles.css'; // Import CSS file

function App() {
  return (
    <div className="container"> {/* Apply container class */}
      <h1>GitHub Summary Generator</h1>
      <SummaryGenerator />
    </div>
  );
}

export default App;
