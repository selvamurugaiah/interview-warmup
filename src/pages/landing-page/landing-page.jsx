import React, { useEffect, useState, useRef } from "react";
import "./landing-page.css";
import gsap from "gsap";
import SplitTextJS from "split-text-js";
import video1 from "../../assets/Interview-Warmup1.mp4";
import video2 from "../../assets/Interview-Warmup2.mp4";
import video3 from "../../assets/Interview-Warmup3.mp4";
import { useNavigate } from "react-router-dom";
import click from "../../assets/button-click.mp3"

export const LandingPage = () => {
  const topics = [
    "Data Analytics",
    "Digital Marketing",
    "E-commerce",
    "IT Support",
    "Project Management",
    "UI/UX Design",
    "Cyber Security",
    "General",
  ];

  const [displayedTopic, setDisplayedTopic] = useState(topics[0]);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  const handleClick=()=>{
    const audio = new Audio(click);
    audio.volume = 0.2; 
    setTimeout(() => {
      navigate("/category")
      audio.play();
    }, 100); 
     
  }



  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % topics.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [topics.length]);

  useEffect(() => {
    setDisplayedTopic(topics[index]);
  }, [index, topics]);

  // Ref for the h1 element
  const headingRef = useRef(null);

  useEffect(() => {
    const splitText = new SplitTextJS(headingRef.current, { type: "chars" });
    const chars = Array.from(splitText.chars); 
  
    gsap.from(chars, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 2,
      ease: "power3.out",
    });
  
    // Apply color to characters corresponding to "interview"
    const interviewChars = chars.slice(0, 9);
    interviewChars.forEach((char) => {
      char.style.color = "rgb(108, 118, 134)";
    });
  
    // Apply linear gradient color to characters corresponding to "warmup"
    const warmupChars = chars.slice(10);
    warmupChars.forEach((char) => {
      char.style.background =
        "linear-gradient(to right, " +
        "rgb(91, 202, 248), " +
        "rgb(115, 200, 244), " +
        "rgb(122, 191, 239), " +
        "rgb(182, 201, 237), " +
        "rgb(166, 176, 226), " +
        "rgb(210, 186, 226), " +
        "rgb(228, 187, 224), " +
        "rgb(232, 161, 211), " +
        "rgb(232, 161, 211))";
      char.style["-webkit-background-clip"] = "text";
      char.style.color = "transparent";
    });
  }, []);
  

  useEffect(() => {
    const topicDiv = document.querySelector(".main-text");

    // Apply GSAP animation after 2 seconds
    const animation = gsap.from(topicDiv, {
      y: "100%",
      opacity: 0,
      duration: 2,
      delay: 2,
      ease: "power3.out",
    });

    return () => {
      animation.kill();
    };
  }, []);

  //Video running setup
  useEffect(() => {
    const topicDiv = document.querySelector(".bottom-section");

    // Apply GSAP animation after 2 seconds
    const animation = gsap.from(topicDiv, {
      y: "100%",
      opacity: 0,
      duration: 2,
      delay: 3,
      ease: "power3.out",
    });

    return () => {
      animation.kill();
    };
  }, []);

  // Refs for video elements
  const videosRef = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, 
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
          }
        });
      },
      options
    );

    videosRef.current.forEach((video) => {
      observer.observe(video);
      video.addEventListener("click", () => {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Main Content */}
      <div className="main-content">
        <h1 ref={headingRef}>
          interview <span className="black-text">warmup</span>
        </h1>
        <div
          className="main-text"
          style={{ padding: "20px", textAlign: "center" }}
        >
          <p>A quick way to prepare for your next interview in</p>
          <div className="topics">
            <span key={index} className="topic">
              {displayedTopic}
            </span>
            <p>
              Practice key questions, get insights about your answers and get
              more
            </p>
            <p>comfortable interviewing</p>

            <button className="btn" onClick={handleClick}>Start Practicing</button>
          </div>
        </div>
        <div className="bottom-section">
          <h1 className="working" style={{ fontSize: "20px" }}>
            How it works
          </h1>
          <div className="bottom-section">
            <div className="video-area">
              <div className="first-container">
                <video
                  ref={(ref) => (videosRef.current[0] = ref)}
                  className="video-area-1"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%" }}
                >
                  <source src={video3} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="text">
                  <h2>Practice answering interview questions.</h2>
                  <p>
                    Get comfortable answering questions from industry experts.
                    Just talk and your
                  </p>
                  <p>answers are transcribed in real time.</p>
                </div>
              </div>
              <div className="second-container">
                <video
                  ref={(ref) => (videosRef.current[1] = ref)}
                  className="video-area-2"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "800px" }}
                >
                  <source src={video1} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="text">
                  <h2>Get insights about your answers.</h2>
                  <p>
                    No grades, just insights about what you said. See
                    job-related terms you used, your
                  </p>
                  <p>most-used words, and talking points you covered.</p>
                </div>
              </div>
              <div className="third-container">
                <video
                  ref={(ref) => (videosRef.current[2] = ref)}
                  className="video-area-3"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%" }}
                >
                  <source src={video2} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div>
            <h1 className="text-end">Grow with Guvi</h1>
          </div>
          <div>
            <p className="text-start">privay,Terms & License</p>
          </div>
        </div>
      </div>
    </div>
  );
};
