export default function Menu({ startQuiz }) {
  return (
    <div className="header">
      <div></div>
      <h1 className="header-title">My Quizzle</h1>
      <p className="header-description">
        Test your knowledge with challenging trivia
      </p>
      <button type="button" className="header-button" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
