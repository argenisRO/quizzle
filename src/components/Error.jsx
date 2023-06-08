export default function Error({ startQuiz }) {
  return (
    <div className="error">
      <h1 className="error-title">Error</h1>
      <p className="error-description">Failed to Fetch Quiz</p>
      <button type="button" className="error-button" onClick={startQuiz}>
        Try Again
      </button>
    </div>
  );
}
