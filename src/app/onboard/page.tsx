'use client'
import { useState } from "react";

type Stage = "handle" | "link" | "profile" | "preview" | "completed";
type StageProps = {
    show: boolean;
};

function Handle({ show }: StageProps) {
    if (!show) {
        return <></>;
    }

    return (
        <>
            <img
                src="/img/onboard/handle.png"
                className="w-full mt-6"
                alt="Handle Manager"
            />

            <p className="text-gray-700 mt-4">
                Create a permanent user handle which is attached to your profile
                & wallet addresses. Use it to share your profile.
            </p>

            <div className="relative mt-3 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm mr-2">@</span>
                </div>
                <input
                    id="handle"
                    name="handle"
                    type="text"
                    required
                    placeholder="myhandle"
                    className="block w-full pl-8 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 py-2"
                />
            </div>

            <button className="mt-3 hover:scale-[1.03] transition w-full bg-gray-700 hover:bg-gray-600 text-lg py-3 px-4 rounded-md text-white font-bold">
                Create Handle
            </button>
        </>
    );
}

function Link({ show }: StageProps) {
    if (!show) {
        return <></>;
    }

    return <></>;
}

function Profile({ show }: StageProps) {
    if (!show) {
        return <></>;
    }

    return <></>;
}

export default function Onboard() {
    const [stage, setStage] = useState<Stage>("handle");

    const nextStage = () => {
        if (stage === "handle") setStage("link");
        else if (stage === "link") setStage("profile");
        else setStage("completed");
    };

    const previousStage = () => {
        if (stage === "profile") setStage("link");
        else if (stage === "link") setStage("handle");
    };

    return (
        <>
            <main className="flex justify-center items-start min-h-screen">
                <div className="w-full p-4 sm:w-[650px] sm:p-3">
                    <h1 className="font-bold text-2xl">Let's get you setup</h1>

                    <div>
                        <div className="mt-4" aria-hidden="true">
                            <div className="overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-indigo-600 transition-all ease-in-out duration-700"
                                    style={{
                                        width:
                                            stage === "handle" ? "0%" : "25%",
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <Handle show={stage === "handle"} />
                    <Link show={stage === "link"} />
                    <Profile show={stage === "profile"} />
                </div>
            </main>
        </>
    );
}

Onboard.hideNavbar = true;
