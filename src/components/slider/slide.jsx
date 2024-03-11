import React, { useRef } from 'react'
import './slider.css'
import SlideCard from './slidecard'
import click from "../../assets/button-click.mp3"
import { useNavigate } from 'react-router-dom'

const Slide = () => {

  const navigate = useNavigate()

  const handleClick=()=>{
    const audio = new Audio(click);
    audio.volume = 0.2; 
    setTimeout(() => {
      navigate("/react-questions")
      audio.play();
      handleSpeech();
    }, 1000); 
     
  }

  // Welcome speech recognition
  const handleSpeech = () => {
    const text = " Hi!, Let's Practise an interview for React";
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className='slider-main'>
        <div className='slider-layout'>
        <div className='slider-content'>
          <SlideCard/>
        </div>
        <div className='slider-text'>
       <h3> Answer 5 interview questions</h3>
<p>When you're done, review your answers and discover insights.</p>
        </div>
        <button className='slider-btn' onClick={handleClick}>Start</button>
        </div>
    </div>
  )
}

export default Slide