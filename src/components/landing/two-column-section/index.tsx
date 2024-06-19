"use client";

import { ReactNode } from "react";
import { Chip } from "../../ui/chip";
import { Button } from "../../ui/button";
import { cn } from "@/src/lib/utils/cn";

interface Props {
    direction?: "reverse";
    chipText: string;
    title: string | ReactNode;
    description: string;
    buttonText?: string;
    buttonAction?: () => void;
    imageSection: ReactNode;
}

export const TwoColumnSection = ({
    buttonText,
    chipText,
    description,
    imageSection,
    title,
    buttonAction,
    direction,
}: Props) => {
    return (
        <div
            className={cn(
                "max-w-screen-xl mx-auto flex px-4 pt-12 flex-col-reverse lg:flex-row justify-between lg:items-center lg:gap-32 gap-6",
                direction === "reverse" && "lg:flex-row-reverse",
            )}
        >
            <div className="lg:basis-1/2 relative self-end lg:flex lg:justify-end">
                {imageSection}
            </div>
            <div className="lg:basis-1/2">
                <div className="">
                    <Chip
                        id={chipText.toLowerCase().split(" ").join("-")}
                        className="mb-2 scroll-mt-20"
                    >
                        {chipText}
                    </Chip>
                    <p className="font-bold text-[40px] leading-[1.2]">
                        {title}
                    </p>
                    <p className="text-gray-600 mt-4 max-w-lg text-lg">
                        {description}
                    </p>
                    <div className="mt-4">
                        <Button
                            size="lg"
                            onClick={() => {
                                buttonAction?.();
                            }}
                        >
                            {buttonText || "Discover"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
