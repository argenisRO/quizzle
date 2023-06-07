import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";

export default function App() {
  const [quizStart, setQuizStart] = useState(false);

  function startQuiz() {
    setQuizStart((quizStatus) => !quizStatus);
  }

  return (
    <>
      {!quizStart ? (
        <Menu startQuiz={startQuiz} />
      ) : (
        <Quiz startQuiz={startQuiz} />
      )}
    </>
  );
}
