import { useState } from 'react';
import SummaryCard from './components/SummaryCard';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setSummary('');

    const res = await fetch('http://localhost:5001/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText })
    });

    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Smart Text Summarizer</h1>
      <textarea
        className="text-input-box"
        rows="8"
        placeholder="Paste your long text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <button
        onClick={handleSummarize}
        className="summarize-button"
      >
        {loading ? 'Summarizing...' : 'Summarize'}</button>

      {summary && <SummaryCard summary={summary} />}
    </div>
  );
}

export default App;