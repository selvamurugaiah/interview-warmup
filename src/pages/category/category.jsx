import React, { useEffect } from "react";
import './category.css';
import { IoIosArrowForward } from "react-icons/io";
import hoverSound from "../../assets/hover.mp3"
import click from "../../assets/button-click.mp3"
import gsap from "gsap";
import { Link } from "react-router-dom";

const Category = () => {

  const playHoverSound = () => {
    const audio = new Audio(hoverSound);
    audio.volume = 0.002; 
    setTimeout(() => {
      audio.play();
    }, 100); 
  };

  const playButtonClick = () => {
    const audio = new Audio(click);
    audio.volume = 0.2; 
    setTimeout(() => {
      audio.play();
    }, 100); 
  };
  useEffect(()=>{
    const topicDiv = document.querySelectorAll('.list-items');

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
    <div className="category">
      <div className="category-heading">
        What field do you want to practice for?
      </div>
      <div className="category-container">
      <Link to="/data-analytics" className="list-items" onClick={playButtonClick} onMouseEnter={playHoverSound}>MERN-Full Stack Development<span><IoIosArrowForward /></span></Link>
        <Link to="/start" className="list-items" onClick={playButtonClick} onMouseEnter={playHoverSound}>ReactJs<span><IoIosArrowForward /></span></Link>
        <Link to="/start" className="list-items" onClick={playButtonClick} onMouseEnter={playHoverSound}>HTML & CSS<span><IoIosArrowForward /></span></Link>
        <Link to="/start" className="list-items" onClick={playButtonClick} onMouseEnter={playHoverSound}>JavaScript<span><IoIosArrowForward /></span></Link>
        <Link to="/start" className="list-items" onClick={playButtonClick} onMouseEnter={playHoverSound}>NodeJs<span><IoIosArrowForward /></span></Link>
        <Link to="/start" className="list-items" onClick={playButtonClick} onMouseEnter={playHoverSound}>Mysql<span><IoIosArrowForward /></span></Link>
        <Link to="/start" className="list-items" onClick={playButtonClick} onMouseEnter={playHoverSound}>MongoDb<span><IoIosArrowForward /></span></Link>
      </div>
    </div>
  );
};

export default Category;
