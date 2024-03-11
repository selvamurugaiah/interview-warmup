import React, { useEffect, useRef } from "react";

const SlideCard = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
      const slider = sliderRef.current;
      let interval;
  
      const startAnimation = () => {
        interval = setInterval(() => {
          // Move the slider container to the left
          slider.style.transform = "translateX(100%)";
          slider.style.transitionDuration = "0s";
          // Schedule the next frame to apply the transition duration
          setTimeout(() => {
            slider.style.transform = "translateX(-10px)";
            slider.style.transitionDuration = "2s";
          }, 50); 
        }, 5000);
      };
  
      // Start the animation when the component mounts
      startAnimation();
  
      // Clean up interval when the component unmounts
      return () => clearInterval(interval);
    }, []);
  return (
    <div className="slide-card">
      <div className="card1" ref={sliderRef}>
        <span className="bar-1"></span><br/>
        <span  className="bar-2"></span><br/>
        <span  className="bar-3"></span>
      </div>
    </div>
  );
};

export default SlideCard;
