"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./HeroAnimation.module.css";
const videos = ["/video/gif_1_to_gif_2.mov", "/video/gif_2_to_gif_1.mov"];

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shouldPlay, setShouldPlay] = useState(true);
    const videoRefs = useRef<Array<HTMLVideoElement>>([] as any);

    useEffect(() => {
        const currentVideo = videoRefs.current[currentIndex];

        const handleVideoEnd = () => {
            setShouldPlay(false);
            const newIndex = (currentIndex + 1) % videos.length;
            videoRefs.current[newIndex].currentTime = 0;

            setTimeout(() => {
                setShouldPlay(true);
                setCurrentIndex(newIndex);
            }, 3000);
        };

        if (currentVideo) {
            currentVideo.addEventListener("ended", handleVideoEnd);
        }

        return () => {
            if (currentVideo) {
                currentVideo.removeEventListener("ended", handleVideoEnd);
            }
        };
    }, [currentIndex, videos.length]);

    useEffect(() => {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo && shouldPlay) {
            const handleCanPlay = () => {
                currentVideo.play();
                currentVideo.removeEventListener("canplay", handleCanPlay);
            };

            if (currentVideo.readyState >= 3) {
                currentVideo.play();
            } else {
                currentVideo.addEventListener("canplay", handleCanPlay);
            }
        }
    }, [currentIndex, shouldPlay]);

    return (
        <div className={styles.tiltingCardWrapper}>
            <div className={styles.mousePositionTracker}></div>
            <div className={styles.mousePositionTracker}></div>
            <div className={styles.mousePositionTracker}></div>
            <div className={styles.mousePositionTracker}></div>
            <div className={styles.mousePositionTracker}></div>
            <div className={styles.mousePositionTracker}></div>
            <div className={styles.mousePositionTracker}></div>
            <div className={styles.mousePositionTracker}></div>
            <div className={styles.mousePositionTracker}></div>
            <div className={styles.tiltingCardBody}>
                {videos.map((video, index) => {
                    return (
                        <video
                            key={index}
                            ref={(el) => {
                                if (el) {
                                    videoRefs.current[index] = el;
                                }
                            }}
                            src={video}
                            muted
                            style={{
                                display:
                                    currentIndex === index ? "block" : "none",
                                transition: "opacity 1s",
                                opacity: currentIndex === index ? 1 : 0,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
