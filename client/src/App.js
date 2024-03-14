import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import TeacherComponent from "./components/TeacherComponent";
import StudentComponent from "./components/StudentComponent";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [isTeacher, setIsTeacher] = useState(null);

  const handleRoleSelection = (role) => {
    setIsTeacher(role === "teacher");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isTeacher === null ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            width: "80%",
          }}
        >
          <h1 style={{ fontFamily: "Comic Sans MS" }}>
            Select what type of user you are?
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "50%",
              margin: "100px",
            }}
          >
            <button
              onClick={() => handleRoleSelection("teacher")}
              style={{
                padding: "50px",
                cursor: "pointer",
              }}
            >
              I am a Teacher
            </button>
            <button
              onClick={() => handleRoleSelection("student")}
              style={{
                padding: "50px",
                cursor: "pointer",
              }}
            >
              I am a Student
            </button>
          </div>
        </div>
      ) : isTeacher ? (
        <TeacherComponent socket={socket} />
      ) : (
        <StudentComponent socket={socket} />
      )}
    </div>
  );
};

export default App;
