import { decodeHtmlText } from "../utils/parse";
import QuizButton from "./QuizButton";

export default function QuizQuestion({
  question,
  buttonSelected,
  quizComplete,
}) {
  return (
    <div className="quiz">
      <h2 className="quiz-question">{decodeHtmlText(question.question)}</h2>

      <div className="quiz-options">
        {question.allAnswers.map((answer) => (
          <QuizButton
            key={answer.id}
            quiz_id={question.id}
            answer={answer}
            buttonSelected={buttonSelected}
            selected={answer.selected}
            quizComplete={quizComplete}
          />
        ))}
      </div>
    </div>
  );
}
