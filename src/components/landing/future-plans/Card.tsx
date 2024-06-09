"use client";

import React from "react";
import { Button } from "../../ui/button";

interface Props {
    number: string;
    title: string;
    description: string;
    btnText?: string;
    onBtnClick?: () => void;
}

export const FuturePlanCard = ({
    description,
    number,
    title,
    btnText,
    onBtnClick,
}: Props) => {
    return (
        <div>
            <div className="p-4 w-[320px] relative pt-12 border-4 border-[rgba(9,_4,_70,_1)] rounded-3xl">
                <div className="w-min absolute -top-16 bg-white left-1/2 -translate-x-1/2 p-4 border-4 rounded-full border-[rgba(9,_4,_70,_1)]">
                    <div className="text-4xl font-bold p-3 shadow-sm w-min rounded-full shadow-black">
                        {number}
                    </div>
                </div>
                <div className="p-4 pb-4 bg-white shadow-lg shadow-black/20 rounded-2xl flex flex-col items-center">
                    <div className="font-medium text-[22px]">{title}</div>
                    <div className="max-w-lg text-center pt-4 text-gray-600">
                        {description}
                    </div>
                    <div className="pt-5">
                        <Button
                            size="lg"
                            onClick={() => {
                                onBtnClick?.();
                            }}
                        >
                            {btnText || "Read More"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
