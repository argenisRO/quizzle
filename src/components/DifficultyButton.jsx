import { useState } from "react";
import { nanoid } from "nanoid";

export default function DifficultyButton({ setDifficultySetting }) {
  const [difficulties, setDifficulties] = useState({
    options: ["easy", "medium", "hard"],
    colors: {
      easy: "#94D7A2",
      medium: "#D6DBF5",
      hard: "#F8BCBC",
    },
    selectedDifficulty: null,
  });

  function handleClick(diff) {
    setDifficultySetting(diff);
    setDifficulties((oldDifficulties) => {
      return {
        ...oldDifficulties,
        selectedDifficulty: diff,
      };
    });
  }

  return (
    <div className="difficulty-buttons">
      {difficulties.options.map((difficulty) => (
        <button
          key={nanoid()}
          type="button"
          className="diff-button"
          onClick={() => handleClick(difficulty)}
          style={{
            backgroundColor:
              difficulties.selectedDifficulty === difficulty
                ? difficulties.colors[difficulty]
                : "#fff",
          }}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
}
