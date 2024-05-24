import React, { useMemo } from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./Result.css";
import App from "./App.jsx";
export default function Result({ score, length }) {
  const [dark, setTheme] = useState(true);

  const navigate = useNavigate();
  const [themeName, setThemeName] = useState("light");
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

  const handleRestart = () => {
    navigate("/");
    window.location.reload();
  };
  const percentage = useMemo(() => {
    return ((score / length) * 100).toFixed(2);
  }, [score, length]);

  return (
    <div style={styleTheme} className="whole-page">
      <div className="header">
        <h4>Kalvium</h4>
        <button onClick={handleTheme}>{themeName}</button>
      </div>

      <div className="result-page">
        <h1>Final Result</h1>
        <h3>
          {score} out of {questions.length} Correct - ({percentage}%)
        </h3>
        <button onClick={handleRestart}>Restart game</button>
      </div>
    </div>
  );
}
