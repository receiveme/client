import { useRef, useState } from "react";

export const useCoinflipAnimation = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onMouseEnter = () => {
        if (timeoutRef.current) return;
        setIsAnimating(true);

        timeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
            timeoutRef.current = null;
        }, 2000);
    };

    const className = isAnimating ? "coinflip-animation" : "";

    return {
        onMouseEnter,
        className,
    };
};
