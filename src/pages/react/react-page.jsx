import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import SplitTextJS from "split-text-js";
import "./react-page.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FiMic } from "react-icons/fi";
import { CiKeyboard } from "react-icons/ci";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";
import click from "../../assets/answer.mp3";
import { RiErrorWarningLine } from "react-icons/ri";

const ReactPage = () => {
  const introRef = useRef(null);
  const questionsRef = useRef(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [questionSpoken, setQuestionSpoken] = useState(false);

  //button click
  const playButtonClick = () => {
    const audio = new Audio(click);
    audio.volume = 0.2;
    setTimeout(() => {
      audio.play();
    }, 100);
  };

  //React speech recognition
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  //if browser supports speech recognition or not
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // React sample questions
  const reactQuestions = [
    "What is React?",
    "What are components in React?",
    "What is the difference between state and props in React?",
    "What is JSX and how is it used in React?",
    "What is the significance of virtual DOM in React?",
    "What are React hooks? Provide examples of commonly used hooks.",
    "What is the purpose of the useEffect hook in React?",
    "What is React Router? How does it facilitate navigation in a React application?",
    "What is the significance of the key prop in React lists?",
    "What is the context API in React? How is it used for managing global state?",
  ];

  // Define correct answers for each question
  const correctAnswers = [
    "JavaScript library for building user interfaces",
    "Reusable pieces of code that can be used to build UI elements",
    "State is mutable data managed within a component, while props are immutable data passed to a component",
    "JSX is a syntax extension for JavaScript used with React to describe what the UI should look like",
    "Virtual DOM is a lightweight copy of the real DOM, used for performance optimization",
    "React hooks are functions that let you use state and other React features without writing a class",
    "useEffect hook is used to perform side effects in function components",
    "React Router is a library for routing in React applications, allowing navigation without page reloads",
    "The key prop is used to give each element in a list a unique identity, helping React identify which items have changed, added, or removed",
    "Context API is a way to pass data through the component tree without having to pass props down manually at every level",
  ];

  //gsap transition for landing text
  useEffect(() => {
    if (introRef.current) {
      const splitText = new SplitTextJS(introRef.current, { type: "chars" });
      const chars = Array.from(splitText.chars);
      gsap.from(chars, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 2,
        ease: "power3.out",
        onComplete: () => setShowQuestions(true),
      });
    }
  }, []);

  // Speak the current question
  useEffect(() => {
    if (showQuestions && !questionSpoken) {
      handleSpeech();
      setQuestionSpoken(true);
    }
  }, [showQuestions, questionSpoken]);

  //handleSpeech functions for the current question
  const handleSpeech = () => {
    if (currentQuestionIndex < reactQuestions.length) {
      const text = reactQuestions[currentQuestionIndex];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        resetTranscript();
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  //pagination for next question
  const handleNextQuestionClick = () => {
    playButtonClick();
    setTimeout(() => {
      if (currentQuestionIndex < reactQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setQuestionSpoken(false);
        resetTranscript();
        setIsAnswerCorrect(null);
      }
    }, 1000);
  };

  //pagination for previous question
  const handlePreviousQuestionClick = () => {
    playButtonClick();
    setTimeout(() => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        setQuestionSpoken(false);
        resetTranscript();
        setIsAnswerCorrect(null);
      }
    });
  };

  const checkAnswer = () => {
    const userAnswer = transcript.trim().toLowerCase();
    const correctAnswer = correctAnswers[currentQuestionIndex].toLowerCase();
    setIsAnswerCorrect(userAnswer === correctAnswer);

    if (userAnswer === "") {
      const feedback = "No answer detected";
      const utterance = new SpeechSynthesisUtterance(feedback);
      window.speechSynthesis.speak(utterance);
    } else {
      const feedback = "Thank you for your answer";
      const utterance = new SpeechSynthesisUtterance(feedback);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Define difficulty levels
  const difficultyLevels = ["Easy level", "Medium level", "Hard level"];

  // Define corresponding colors and background colors for each difficulty level
  const difficultyStyles = [
    { color: "green", backgroundColor: "rgb(204, 244, 204)" },
    { color: "rgb(148,125,248)", backgroundColor: "rgb(242,240,255)" },
    { color: "rgb(209,44,173)", backgroundColor: "rgb(255,240,252)" },
  ];

  // Get the current difficulty level based on the current question index
  const currentDifficultyLevel = () => {
    if (currentQuestionIndex < 3) {
      return { ...difficultyStyles[0], level: difficultyLevels[0] };
    } else if (currentQuestionIndex < 7) {
      return { ...difficultyStyles[1], level: difficultyLevels[1] };
    } else {
      return { ...difficultyStyles[2], level: difficultyLevels[2] };
    }
  };

  const currentLevel = currentDifficultyLevel();

  return (
    <div
      className="react"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="layout">
        <div className={`intro-text ${showQuestions ? "hidden" : ""}`}>
          <h1 ref={introRef}>Hi!, Let's Practice an Interview for React</h1>
        </div>
        <div className="question-intro">
          {showQuestions && currentQuestionIndex < reactQuestions.length && (
            <div ref={questionsRef}>
              <div className="question">
                <div className="question-list">
                  <div className="status">
                    <p
                      className="status-text"
                      style={{
                        color: currentLevel.color,
                        backgroundColor: currentLevel.backgroundColor,
                      }}
                    >
                      <RiErrorWarningLine /> {currentLevel.level}
                    </p>
                    <p>
                      {currentQuestionIndex + 1}/{reactQuestions.length}
                    </p>
                  </div>
                  <p style={{ fontSize: "20px" }}>
                    {reactQuestions[currentQuestionIndex]}
                  </p>
                </div>
                {transcript && (
                  <div className="answer-container">
                    <p>{transcript}</p>
                    {isAnswerCorrect !== null && transcript.trim() !== "" && (
                      <p style={{ color: isAnswerCorrect ? "green" : "red" }}>
                        {isAnswerCorrect ? "Correct!" : "Incorrect!"}
                      </p>
                    )}
                  </div>
                )}
                <div className="pagination" style={{ marginTop: "50px" }}>
                  <div className="answer">
                    <span
                      className="answer-speech"
                      onClick={SpeechRecognition.startListening}
                    >
                      <FiMic /> Answer
                    </span>
                    <span className="pagination-icon">
                      <CiKeyboard />
                    </span>
                  </div>
                  <div className="icon">
                    <button className="answer-speech" onClick={checkAnswer}>
                      Check Answer
                    </button>
                    <span
                      className={`pagination-icon ${
                        currentQuestionIndex === 0 ? "disabled" : ""
                      }`}
                      onClick={handlePreviousQuestionClick}
                    >
                      <FaArrowLeft />
                    </span>
                    <span
                      className={`pagination-icon ${
                        currentQuestionIndex === reactQuestions.length - 1
                          ? "disabled"
                          : ""
                      }`}
                      onClick={handleNextQuestionClick}
                    >
                      <FaArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="answer-layout"></div>
      </div>
    </div>
  );
};

export default ReactPage;
