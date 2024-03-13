import React, { useState, useEffect } from "react";

const PollingResult = ({ socket }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const handleNewQuestion = (question) => {
    setCurrentQuestion(question);
  };
  useEffect(() => {
    socket.on("new-question", handleNewQuestion);

    return () => {
      socket.off("new-question", handleNewQuestion);
    };
  }, [socket]);

  return (
    <div
      style={{
        border: "2px solid black",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Polling Results</h2>
      <ul
        style={{
          rowGap: "16px",
          columnGap: "16px",
          borderTop: "2px solid black",
        }}
      >
        {currentQuestion &&
          Object.entries(currentQuestion.optionsFrequency).map(([option]) => (
            <li
              key={option}
              style={{
                display: "flex",
                border: "2px solid black",
                justifyContent: "space-between",
                margin: "16px",
                height: "26px",
                padding: "10px",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignContent: "center",
                }}
              >
                {option}
              </span>
              <span
                style={{
                  display: "flex",
                  alignContent: "center",
                }}
              >
                {currentQuestion.results[option]}%
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PollingResult;
