import React, { useState, useEffect } from "react";

const StudentComponent = ({ socket }) => {
  const [name, setName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("studentName");

    if (storedName) {
      setName(storedName);
      setShowQuestion(true);
    }

    const handleNewQuestion = (question) => {
      setCurrentQuestion(question);
      setShowQuestion(true);
      setSelectedOption("");
    };

    socket.on("new-question", handleNewQuestion);

    return () => {
      socket.off("new-question", handleNewQuestion);
    };
  }, [socket]);

  const handleSubmit = () => {
    localStorage.setItem("studentName", name);
    socket.emit("student-set-name", { name });
    setShowQuestion(true);
  };

  const handlePoling = () => {
    socket.emit("handle-polling", {
      option: selectedOption,
    });
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  console.log("selectedOption: ", selectedOption);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "80vh",
        padding: "200px",
        fontFamily: "Comic Sans MS",
      }}
    >
      {showQuestion && name ? (
        <div
          style={{
            border: "2px solid black",
            width: "100%",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Welcome, {name}</h1>
          {currentQuestion ? (
            currentQuestion.answered == false ? (
              <div
                style={{
                  rowGap: "16px",
                  columnGap: "16px",
                  borderTop: "2px solid black",
                  marginLeft: "0 16px",
                  padding: "50px",
                }}
              >
                <h2 style={{}}>Question: {currentQuestion.question}</h2>
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      border: `2px solid ${
                        selectedOption === option ? "green" : "black"
                      }`,
                      justifyContent: "space-between",
                      margin: "16px 0",
                      height: "26px",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <label htmlFor={`option${index}`}>{option}</label>
                    <input
                      type="radio"
                      id={`option${index}`}
                      name="options"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={handlePoling}
                  disabled={!selectedOption}
                  style={{
                    width: "36%",
                    height: "30px",
                    cursor: "pointer",
                    background: "black",
                    color: "white",
                    border: "none",
                  }}
                >
                  Submit
                </button>
              </div>
            ) : (
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
                    Object.entries(currentQuestion.optionsFrequency).map(
                      ([option]) => (
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
                      )
                    )}
                </ul>
              </div>
            )
          ) : (
            <h1>Waiting for question...</h1>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "16px",
          }}
        >
          <h2>Enter your name to participate in the contest</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{
              width: "35%",
              height: "30px",
              border: "2px solid black",
            }}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              width: "35%",
              height: "30px",
              cursor: "pointer",
              background: "black",
              color: "white",
              border: "none",
              fontFamily: "Comic Sans MS",
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentComponent;
