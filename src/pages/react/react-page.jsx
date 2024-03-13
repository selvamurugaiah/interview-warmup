import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import SplitTextJS from 'split-text-js';
import './react-page.css';

const ReactPage = () => {
  const introRef = useRef(null);
  const questionsRef = useRef(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
    "What is the context API in React? How is it used for managing global state?"
  ];

  useEffect(() => {
    if (introRef.current) {
      const splitText = new SplitTextJS(introRef.current, { type: 'chars' });
      const chars = Array.from(splitText.chars);
      gsap.from(chars, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 2,
        ease: "power3.out",
        onComplete: () => setShowQuestions(true) 
      });
      return () => {
        splitText.revert();
      };
    }
  }, []);

  const handleQuestionClick = () => {
    if (currentQuestionIndex < reactQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <div className='react' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className='layout'>
        <div className={`intro-text ${showQuestions ? 'hidden' : ''}`}>
          <h1 ref={introRef}>
            Hi!, Let's Practice an Interview for React
          </h1>
        </div>
        <div className='question-intro'>
          {showQuestions && currentQuestionIndex < reactQuestions.length &&
            <div ref={questionsRef} onClick={handleQuestionClick}>
              <h2>Question {currentQuestionIndex + 1}:</h2>
              <p>{reactQuestions[currentQuestionIndex]}</p>
            </div>
          }
        </div>
        <div className='answer-layout'>

        </div>
      </div>
    </div>
  );
}

export default ReactPage;


