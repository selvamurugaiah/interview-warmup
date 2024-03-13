import React, { useRef } from "react";
import shortVideo from "../../assets/slide-video.mp4";

const SlideCard = () => {
    const videoRef = useRef(null);

    return (
        <div className="slide-card">
            <div className="card1">
                <video
                    ref={videoRef}
                    className="video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: "100%" }}
                >
                    <source src={shortVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default SlideCard;

