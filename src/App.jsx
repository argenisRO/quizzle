import { useState } from "react";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";

export default function App() {
  const [quizStart, setQuizStart] = useState(false);
  const [difficultySetting, setDifficultySetting] = useState("easy");
  const [handleError, setHandleError] = useState(false);

  function startQuiz() {
    setQuizStart((quizStatus) => !quizStatus);
  }

  return (
    <>
      {handleError.error ? (
        <Error startQuiz={startQuiz} />
      ) : !quizStart ? (
        <Menu
          startQuiz={startQuiz}
          setDifficultySetting={setDifficultySetting}
        />
      ) : (
        <Quiz
          startQuiz={startQuiz}
          difficultySetting={difficultySetting}
          setHandleError={setHandleError}
        />
      )}
    </>
  );
}
