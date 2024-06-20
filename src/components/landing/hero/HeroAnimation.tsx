"use client";

import React, { useState } from "react";
import Lottie, { Options } from "react-lottie";
import animationData1 from "../../../../public/JSONs/Gif 1 to Gif 2.json";
import animationData2 from "../../../../public/JSONs/Gif 2 to Gif 1.json";
import styles from "./HeroAnimation.module.css";

const animations = [animationData1, animationData2];

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const defaultOptions: Options = {
        loop: false,
        autoplay: true,
        animationData: animations[currentIndex % 2],
        rendererSettings: {
            context: "canvas",
        },
    };

    const handleAnimationComplete = () => {
        setTimeout(
            () => {
                setCurrentIndex(currentIndex < 12 ? currentIndex + 1 : 1);
            },
            currentIndex > 5 ? 100 : 2000,
        );
    };

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
                <Lottie
                    options={defaultOptions}
                    eventListeners={[
                        {
                            eventName: "complete",
                            callback: handleAnimationComplete,
                        },
                    ]}
                    speed={2}
                />
            </div>
        </div>
    );
}

export default App;
