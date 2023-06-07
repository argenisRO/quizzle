import { useEffect } from "react";

export default function QuizButton({
  answer,
  buttonSelected,
  selected,
  quiz_id,
  quizComplete,
}) {
  const buttonStyle = {
    backgroundColor: selected ? "#D6DBF5" : "#F5F7FB",
    border: `0.75px solid ${selected ? "#D6DBF5" : "#4d5b9e"}`,
  };

  return (
    <button
      id={answer.id}
      data-quiz={quiz_id}
      type="button"
      className="quiz-option"
      style={buttonStyle}
      onClick={(e) => buttonSelected(e, quiz_id)}
    >
      {answer.answer}
    </button>
  );
}
