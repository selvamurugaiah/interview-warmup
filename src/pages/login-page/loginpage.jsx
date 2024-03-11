import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Welcome speech recognition
  const handleSpeech = () => {
    const text = "Hello, Welcome to interview warmup with guvi";
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const login = () => {
    setIsLoading(true); 
    setTimeout(() => {
      navigate("/landing");
      handleSpeech();
    }, 2000);
  };

  return (
    <div className="login">
      <button onClick={login}>
        {isLoading ? (
          <div className="loading-animation">Loading...</div>
        ) : (
          <>
            <img src="https://th.bing.com/th/id/OIP.EhTMbGiYfYzQnWLgjZaoJAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
            Login with Google
          </>
        )}
      </button>
    </div>
  );
};

export default Loginpage;

