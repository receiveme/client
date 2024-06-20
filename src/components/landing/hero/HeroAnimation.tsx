"use client";

import React, { useEffect, useState } from "react";
import "@lottiefiles/lottie-player";
import animationData1 from "../../../../public/JSONs/Gif 1 to Gif 2.json";
import animationData2 from "../../../../public/JSONs/Gif 2 to Gif 1.json";
import styles from "./HeroAnimation.module.css";

const animations = [animationData1, animationData2];

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const lottieRef: any = React.useRef(null);

    const handleAnimationComplete = () => {
        setTimeout(
            () => {
                const newIndex = currentIndex < 12 ? currentIndex + 1 : 1;
                lottieRef.current?.load(
                    JSON.stringify(animations[newIndex % 2]),
                );
                setCurrentIndex(newIndex);
            },
            currentIndex > 5 ? 500 : 2000,
        );
    };

    useEffect(() => {
        if (lottieRef.current) {
            console.log("lottieRef.current");
            lottieRef.current.addEventListener("rendered", () => {
                lottieRef.current?.load(animations[0]);
            });
            lottieRef.current.addEventListener(
                "complete",
                handleAnimationComplete,
            );

            return () => {
                lottieRef.current.removeEventListener(
                    "complete",
                    handleAnimationComplete,
                );
                lottieRef.current.removeEventListener("rendered", () => {
                    lottieRef.current?.load(animations[0]);
                });
            };
        }
    });

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
                <lottie-player
                    autoplay
                    ref={lottieRef}
                    mode="normal"
                    style={{ width: "100%", height: "100%" }}
                ></lottie-player>
            </div>
        </div>
    );
}

export default App;
