import React, { useMemo } from "react";
import "./App.css";
import Result from "./Result.jsx";
import { useState, useEffect } from "react";
import questions from "./questions.js";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentques = questions[currentIndex];
  const [dark, setTheme] = useState(true);
  const [themeName, setThemeName] = useState("light");
  const [brown, setBrown] = useState(false);
  const [score, setScore] = useState(0);
  const [quizcompleted, setQuizCompleted] = useState(false);
  const handleTheme = () => {
    setTheme((prevDark) => !prevDark);
  };

  const styleTheme = useMemo(() => {
    return {
      backgroundColor: dark ? "rgb(82, 79, 79)" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  useEffect(() => {
    setThemeName(dark ? "dark" : "light");
  }, [dark]);

  const styleHeading = useMemo(() => {
    return { color: brown ? "blue" : "brown" };
  }, [brown]);

  const handleHighlight = () => {
    setBrown(true);
  };

  const handleRemoveHighlight = () => {
    setBrown(false);
  };

  const handleClick = (id, isCorrect) => () => {
    console.log(id, isCorrect);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setCurrentIndex((prevInd) => {
      const nextIndex = prevInd + 1;
      if (nextIndex < questions.length) {
        return nextIndex;
      } else {
        setQuizCompleted(true);
        return prevInd;
      }
    });
  };
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setQuizCompleted(false);
  };
  if (quizcompleted) {
    return (
      <Result
        score={score}
        length={questions.length}
        onRestart={handleRestart}
      />
    );
  }
  return (
    <div style={styleTheme} className="whole-page">
      <div className="header">
        <h4>Kalvium</h4>
        <button onClick={handleTheme}>{themeName}</button>
      </div>

      <div className="quiz-page">
        <div className="display-quiz">
          <div className="questions">
            <h3>
              Question: {currentIndex + 1} out of {questions.length}
            </h3>
          </div>
          <div style={styleHeading} className="questions">
            <h1>{currentques.text}</h1>
          </div>
          <div className="options">
            {currentques.options.map((option) => (
              <button
                onClick={handleClick(option.id, option.isCorrect)}
                key={option.id}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="highlight">
            <button onClick={handleHighlight}>Highlight</button>
            <button onClick={handleRemoveHighlight}>Remove Highlight</button>
          </div>
        </div>
      </div>
    </div>
  );
}
