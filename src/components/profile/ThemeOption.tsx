"use client";

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

type ThemeOptionProps = {
    color: string;
    theme: string;
    setTheme: (theme: string) => void;
    className?: string;
};

export function ThemeOption({
    color,
    theme,
    setTheme,
    className,
}: ThemeOptionProps) {
    const [animated, setAnimated] = useState(false);

    const onClick = function () {
        setTheme(`${color}/${animated ? "animate" : "none"}`);
    };

    const onClickAnimate = function () {
        const wasAnimated = animated;

        setAnimated(!wasAnimated);
        setTheme(`${color}/${!wasAnimated ? "animate" : "none"}`);
    };

    return (
        <>
            <div className="flex-grow-1 w-full">
                <div
                    onClick={onClick}
                    className={`relative flex-grow-1 w-full h-12 rounded-md bg-gradient-to-b from-${color} to-slate-900 transition cursor-pointer border-2 ${
                        theme.includes(color)
<<<<<<< HEAD
                            ? "border-indigo-600 shadow-md scale-[1.02]"
=======
                            ? "border-indigo-600"
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
                            : "border-gray-200 hover:border-indigo-600"
                    } ${className ?? ""}`}
                ></div>

                {theme.includes(color) && (
                    <div
                        className="w-full pt-3 mt-[-8px] border border-gray-100 pb-1.5 px-3 flex items-center justify-center cursor-pointer bg-white shadow-sm rounded-b-md rounded-l-md"
                        onClick={onClickAnimate}
                    >
                        <input
                            checked={animated}
                            type="checkbox"
                            readOnly
                            style={{ pointerEvents: "none" }}
                            className="h-3 w-3 rounded border-gray-100 text-indigo-600 focus:ring-indigo-600"
                        />
                        <p className="text-[11px] font-medium ml-1.5">
                            Animate
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
