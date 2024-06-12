"use client";

import { AuthDialog } from "@/src/components/common/navbar/auth-dialog";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils/cn";
import {
    IconCheck,
    IconCircleX,
    IconCircleXFilled,
    IconX,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const NameSearch = () => {
    const [value, setValue] = useState("");
    const [searchDisabled, setSearchDisabled] = useState(false);

    const {
        data: isNamehandleTaken,
        mutateAsync,
        isPending,
    } = useMutation({
        mutationKey: ["/users/handle/taken", { value }],
        mutationFn: async ({ value }: { value: string }) => {
            setSearchDisabled(true);
            try {
                const res = (
                    await axios.get(
                        `https://seal-app-8277b.ondigitalocean.app/users/handle/taken?q=${value}`,
                    )
                ).data;

                return res?.data;
            } catch (e) {
                return undefined;
            }
        },
    });

    const handleClick = () => {
        mutateAsync({ value });
    };

    const handleClaim = () => {
        // open signup popup
    };

    return (
        <>
            <div className="bg-gray-200 w-full rounded-full">
                <form
                    className="flex"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Claim your receive.me handle today..."
                        className="bg-transparent w-full pl-6 pr-2 outline-none"
                        disabled={isPending}
                        value={value}
                        onChange={(e) => {
                            setValue(e.currentTarget.value);
                            setSearchDisabled(false);
                        }}
                    />
                    <Button
                        className="py-3 h-full"
                        size="lg"
                        disabled={isPending || searchDisabled || !value}
                    >
                        {isPending ? "Searching..." : "Search"}
                    </Button>
                </form>
            </div>
            <div className="mt-4">
                <p>
                    {!isPending && isNamehandleTaken !== undefined ? (
                        <span className="flex items-center gap-1">
                            <span
                                className={cn(
                                    "h-4 w-4 grid place-items-center rounded-full",
                                    isNamehandleTaken && "bg-red-500",
                                    !isNamehandleTaken && "bg-green-500",
                                )}
                            >
                                {isNamehandleTaken ? (
                                    <IconX size={14} className="text-white" />
                                ) : (
                                    <IconCheck
                                        size={14}
                                        className="text-white"
                                    />
                                )}
                            </span>
                            <span>
                                Handle{" "}
                                <span className="underline">{value}</span> is{" "}
                                {isNamehandleTaken
                                    ? "not available"
                                    : "available"}
                            </span>
                            <span className="pl-2">
                                {isNamehandleTaken === false && (
                                    <AuthDialog
                                        trigger={
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                            >
                                                Claim now!
                                            </Button>
                                        }
                                        handle={value}
                                    />
                                )}
                            </span>
                        </span>
                    ) : null}
                </p>
            </div>
        </>
    );
};
