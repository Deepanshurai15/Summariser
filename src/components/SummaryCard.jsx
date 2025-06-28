function SummaryCard({ summary }) {
  return (
    <div className="summary-card">
      <h2 className="summary-title">Summary:</h2>
      <p className="summary-text">{summary}</p>
    </div>
  );
}

export default SummaryCard;
