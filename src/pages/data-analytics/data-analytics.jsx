import React, { useEffect } from 'react';
import './data-analytics.css';
import { IoIosArrowForward } from "react-icons/io";
import hoverSound from "../../assets/hover.mp3"
import gsap from "gsap";

const DataAnalytics = () => {

    const playHoverSound = () => {
        const audio = new Audio(hoverSound);
        audio.volume = 0.002; 
        setTimeout(() => {
          audio.play();
        }, 100); 
      };
    
      useEffect(()=>{
        const topicDiv = document.querySelectorAll('.analytics-items');
    
        const animation = gsap.from(topicDiv, {
          x:"200px",
          opacity: 0,
          duration:2,
          delay:1,
          ease:"power3.out",
          stagger: 0.1,
        })
        return ()=>{
          animation.kill();
        }
      },[]);
  return (
    <div className="analytics">
      <div className="analytics-heading">
        What field do you want to practice for?
      </div>
      <div className="analytics-container">
        <p className="analytics-items" onMouseEnter={playHoverSound}>Frontend & Backend<span><IoIosArrowForward /></span></p>
        <p className="analytics-items" onMouseEnter={playHoverSound}>Frontend-Techstack<span><IoIosArrowForward /></span></p>
        <p className="analytics-items" onMouseEnter={playHoverSound}>Backend-Techstack<span><IoIosArrowForward /></span></p>
      </div>
    </div>
  )
}

export default DataAnalytics