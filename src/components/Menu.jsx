import DifficultyButtons from "./DifficultyButton";

export default function Menu({ startQuiz, setDifficultySetting }) {
  return (
    <div className="header">
      <h1 className="header-title">My Quizzle</h1>
      <p className="header-description">
        Test your knowledge with challenging trivia
      </p>
      <button type="button" className="header-button" onClick={startQuiz}>
        Start Quiz
      </button>
      <DifficultyButtons setDifficultySetting={setDifficultySetting} />
    </div>
  );
}
