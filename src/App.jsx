import { useState } from "react";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";

export default function App() {
  const [quizStart, setQuizStart] = useState(false);
  const [difficultySetting, setDifficultySetting] = useState("easy");

  function startQuiz() {
    setQuizStart((quizStatus) => !quizStatus);
  }

  return (
    <>
      {!quizStart ? (
        <Menu
          startQuiz={startQuiz}
          setDifficultySetting={setDifficultySetting}
        />
      ) : (
        <Quiz startQuiz={startQuiz} difficultySetting={difficultySetting} />
      )}
    </>
  );
}
