import { useEffect, useState } from "react";

export default function QuizButton({
  answer,
  buttonSelected,
  selected,
  quiz_id,
  quizComplete,
}) {
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: selected ? "#D6DBF5" : "#F5F7FB",
    border: `0.75px solid ${selected ? "#D6DBF5" : "#4d5b9e"}`,
  });

  useEffect(() => {
    if (quizComplete) {
      const theQuiz = quizComplete.find((quiz) => quiz.quiz_id === quiz_id);
      const correctAnswer = theQuiz.correctAnswer[0];
      const selectedAnswer = theQuiz.selectedAnswer[0] || null;

      if (selectedAnswer) {
        if (answer.id === correctAnswer.id) {
          setButtonStyle({
            backgroundColor: "#94D7A2",
            border: `0.75px solid #94D7A2`,
          });
        } else if (answer.id === selectedAnswer.id) {
          setButtonStyle({
            backgroundColor: "#F8BCBC",
            border: `0.75px solid #F8BCBC`,
            opacity: 0.5,
          });
        } else {
          setButtonStyle({
            border: "0.75px solid #4d5b9e",
            opacity: 0.5,
          });
        }
      }
    } else {
      setButtonStyle({
        backgroundColor: selected ? "#D6DBF5" : "#F5F7FB",
        border: `0.75px solid ${selected ? "#D6DBF5" : "#4d5b9e"}`,
      });
    }
  }, [quizComplete, selected]);

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
