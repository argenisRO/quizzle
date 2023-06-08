import { useEffect, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import { decodeHtmlText } from "../utils/parse";
import Loading from "./Loading";
import { nanoid } from "nanoid";

export default function Quiz({ startQuiz }) {
  const [quizData, setQuizData] = useState([]);
  const [quizLoaded, setQuizLoaded] = useState(false);
  const [questions, setQuestions] = useState({});
  const [quizComplete, setQuizComplete] = useState(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=4&category=9&difficulty=easy&type=multiple"
        );
        const data = await response.json();

        if (data.response_code !== 0) {
          throw new Error("Error fetching Quiz Data");
        }

        // append a unique id to each question and and set it to state
        const newQuizData = data.results.map((question) => ({
          ...question,
          id: nanoid(),
        }));

        setQuizData(newQuizData);
        setQuizLoaded(true);
      } catch (error) {
        console.log("Error", error);
      }
    }

    fetchQuiz();
  }, [startQuiz]);

  useEffect(() => {
    const newQuestions = quizData.map((question) => {
      const qQuestion = decodeHtmlText(question.question);
      const qCorrect = decodeHtmlText(question.correct_answer);
      const qIncorrect = question.incorrect_answers.map((choice) =>
        decodeHtmlText(choice)
      );

      const allA = [...qIncorrect, qCorrect].map((answer) => {
        return { selected: false, id: nanoid(), answer };
      });

      return {
        id: question.id,
        question: qQuestion,
        correct: qCorrect,
        incorrect: qIncorrect,
        allAnswers: allA.sort(() => Math.random() - 0.5),
      };
    });

    setQuestions(newQuestions);
  }, [quizData]);

  function buttonSelected(e, quiz_id) {
    const buttonId = e.target.id;

    setQuestions((oldQuestions) => {
      // map over all the questions matching the quiz_id
      const newQuestions = oldQuestions.map((question) => {
        // map over all the answers inside question matching the buttonId
        const newAnswer = question.allAnswers.map((answer) => {
          // if the answer id matches the button id, set selected to true
          // This way, we ensure only one answer is selected at a time
          return answer.id === buttonId
            ? { ...answer, selected: true }
            : { ...answer, selected: false };
        });

        // return the question with the new allAnswers array if the quiz_id matches,
        // otherwise return the question as is
        return question.id === quiz_id
          ? {
              ...question,
              allAnswers: newAnswer,
            }
          : question;
      });
      return newQuestions;
    });
  }

  function checkAnswers() {
    const checkAnswers = questions.map((question) => {
      const selectedAnswer = question.allAnswers.filter(
        (answer) => answer.selected
      );
      const correctAnswer = question.allAnswers.filter(
        (answer) => answer.answer === question.correct
      );

      return {
        quiz_id: question.id,
        selectedAnswer,
        correctAnswer,
      };
    });

    setQuizComplete(checkAnswers);
  }

  function getScore() {
    if (quizComplete) {
      const correctAnswers = quizComplete.filter((question) => {
        if (question.selectedAnswer.length === 0) {
          return false;
        }
        return (
          question.selectedAnswer[0].answer === question.correctAnswer[0].answer
        );
      });

      return `${correctAnswers.length}/${quizComplete.length}`;
    }
    return "0/0";
  }

  return (
    <div className="quiz-container">
      {quizLoaded ? (
        <>
          {questions.map((question) => (
            <QuizQuestion
              key={question.id}
              question={question}
              buttonSelected={buttonSelected}
              quizComplete={quizComplete}
            />
          ))}
          {quizComplete ? (
            <div className="score-container">
              <h1 className="score-title">
                You Scored {getScore()} correct answers
              </h1>
              <button
                type="button"
                className="quiz-submit"
                onClick={() => setQuizComplete(null)}
              >
                Play Again
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="quiz-submit"
              onClick={checkAnswers}
            >
              Check Answers
            </button>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
