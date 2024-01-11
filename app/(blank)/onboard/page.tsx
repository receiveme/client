"use client";

import { useState } from "react";

type Stage = "handle" | "link" | "profile" | "preview" | "completed";
type StageProps = {
    show: boolean;
} & Record<string, any>;

function Handle({ show, updateHandle }: StageProps) {
    const [handleInput, setHandleInput] = useState("");

    function changeHandle(value: string) {
        setHandleInput(value);
        updateHandle(value);
    }

    if (!show) {
        return <></>;
    }

    return (
        <>
            <div className="my-6 relative">
                <div className="rounded-xl absolute w-full h-full p-4 flex items-end justify-between bg-gradient-to-t from-black to-transparent">
                    <span className="text-3xl text-white font-bold">
                        <span className="text-gray-400 font-normal">@</span>
                        {handleInput ? `${handleInput}` : "myhandle"}
                    </span>

                    <div className="flex gap-2 items-center">
                        <a
                            href={"#"}
                            className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid p-1 rounded-md flex justify-center items-center bg-white`}
                        >
                            <img
                                src="/img/3p/paypal.png"
                                className={`h-[20px] w-[20px]`}
                            />
                        </a>
                    </div>
                </div>
                <img
                    src="/img/profile/WhaleNew.png"
                    className="rounded-xl shadow-md"
                />
            </div>

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
                    value={handleInput}
                    onInput={(e) => changeHandle(e.currentTarget.value)}
                    required
                    placeholder="myhandle"
                    className="block w-full pl-8 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 py-2"
                />
            </div>

            <button className="mt-4 hover:scale-[1.01] duration-500 transition w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 px-4 rounded-md text-white font-bold">
                Create Handle {handleInput ? `@${handleInput}` : ""}
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
    const [handle, setHandle] = useState("");
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
            <main className="flex justify-center items-center min-h-screen">
                <div className="w-full p-4 sm:w-[650px] sm:p-3">
                    <h1 className="font-bold text-2xl">
                        First things first...
                    </h1>

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

                    <Handle
                        updateHandle={setHandle}
                        show={stage === "handle"}
                    />
                    <Link show={stage === "link"} />
                    <Profile show={stage === "profile"} />
                </div>
            </main>
        </>
    );
}
