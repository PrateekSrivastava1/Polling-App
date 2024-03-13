import React, { useState } from "react";
import PollingResult from "./PollingResult";

const TeacherComponent = ({ socket }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [questionPublished, setQuestionPublished] = useState(false);

  const askQuestion = () => {
    const questionData = {
      question,
      options: options.filter((option) => option.trim() !== ""),
    };

    if (socket && question && questionData.options.length) {
      socket.emit("teacher-ask-question", questionData);
      setQuestionPublished(true);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div
      style={{
        width: "60%",
        height: "80vh",
        fontFamily: "Comic Sans MS",
      }}
    >
      <h1>Teacher Interface</h1>
      {questionPublished ? (
        <>
          <PollingResult socket={socket} something="teacher something" />
          <button
            onClick={() => setQuestionPublished(false)}
            style={{
              width: "36%",
              height: "30px",
              cursor: "pointer",
              background: "black",
              color: "white",
              border: "none",
              marginTop: "50px",
            }}
          >
            Ask Another Question?
          </button>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "16px",
          }}
        >
          <label>Enter Question and Options</label>
          <textarea
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question..."
            style={{
              width: "50%",
              height: "100px",
              border: "2px solid black",
            }}
          />
          <br />
          <label>Enter Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Enter Option number ${index + 1}`}
                style={{
                  width: "35%",
                  height: "30px",
                  border: "2px solid black",
                }}
              />
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={addOption}
              style={{
                width: "36%",
                height: "30px",
                cursor: "pointer",
                background: "black",
                color: "white",
                border: "none",
                fontFamily: "Comic Sans MS",
              }}
            >
              Add another option +
            </button>
            <br />
            <button
              onClick={askQuestion}
              style={{
                width: "36%",
                height: "30px",
                cursor: "pointer",
                background: "black",
                color: "white",
                border: "none",
                fontFamily: "Comic Sans MS",
              }}
            >
              Ask Question -&gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherComponent;
