"use client";

import {
    IconCircleCheck,
    IconCircleCheckFilled,
    IconCircleXFilled,
    IconFidgetSpinner,
    IconLoader,
    IconLoader2,
    IconLoader3,
} from "@tabler/icons-react";
import { useState } from "react";

type Stage = "handle" | "link" | "profile" | "preview" | "completed";
type StageProps = {
    show: boolean;
} & Record<string, any>;

function Handle({ show, updateHandle, next }: StageProps) {
    const [handleInput, setHandleInput] = useState("");
    const [isLoading, setLoading] = useState(false);

    // Once input hasn't been changed for 200-500ms,
    // check with server/db if handle is available.
    // If not, let user know.
    const [available, setAvailable] = useState<boolean | null>(null);
    const [inputTimeout, setInputTimeout] = useState<any>(null);

    function changeHandle(value: string) {
        setHandleInput(value);
        updateHandle(value);

        // setAvailable(Math.random() < 0.7);
    }

    function createHandle() {
        const handle = handleInput;
        // Call to server

        setLoading(true);

        setTimeout(() => {
            next();
        }, 500);
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

                    {/* <div className="flex gap-2 items-center">
                        <a
                            href={"#"}
                            className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid p-1 rounded-md flex justify-center items-center bg-white`}
                        >
                            <img
                                src="/img/3p/paypal.png"
                                className={`h-[20px] w-[20px]`}
                            />
                        </a>
                    </div> */}
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

            {available === false && (
                <div className="flex gap-1 mt-3">
                    <IconCircleXFilled className="text-red-500" size="20" />
                    <span className="text-sm">
                        Oh noooooo! @{handleInput} is not available.
                    </span>
                </div>
            )}

            <button
                className="mt-4 hover:scale-[1.01] duration-500 transition w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 px-4 rounded-md text-white font-bold flex items-center justify-center"
                onClick={createHandle}
            >
                {isLoading ? (
                    <>
                        <IconLoader2 className="animate-spin" />
                    </>
                ) : (
                    <>Create Handle {handleInput ? `@${handleInput}` : ""}</>
                )}
            </button>
        </>
    );
}

function Link({ handle, show, next }: StageProps) {
    const [isLoading, setLoading] = useState(false);

    if (!show) {
        return <></>;
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="mt-6 relative">
                    <div className="rounded-xl absolute w-full h-full p-4 flex items-end justify-between bg-gradient-to-t from-black to-transparent">
                        <span className="text-3xl text-white font-bold">
                            <span className="text-gray-400 font-normal">@</span>
                            {handle}
                        </span>
                    </div>
                    <img
                        src="/img/profile/WhaleNew.png"
                        className="rounded-xl shadow-md"
                    />
                </div>

                <div className="w-full">
                    <h2 className="font-semibold text-lg">Socials</h2>

                    <h3 className="font-regular text-sm mt-1">
                        Link your socials to display them on your profile.
                    </h3>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-x-2 gap-y-2">
                        <button className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                            <img
                                src="/img/3p/discord.png"
                                alt="Link Discord"
                                className="mr-2 h-auto w-5"
                            />

                            <span className="text-sm font-semibold">
                                Link Discord
                            </span>
                        </button>
                        <button className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                            <img
                                src="/img/3p/github.png"
                                alt="Link Github"
                                className="mr-2 h-5 w-5"
                            />

                            <span className="text-sm font-semibold">
                                Link Github
                            </span>
                        </button>
                        <button className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                            <img
                                src="/img/3p/instagram.png"
                                alt="Google"
                                className="mr-2 h-5 w-5"
                            />

                            <span className="text-sm font-semibold">
                                Link Instagram
                            </span>
                        </button>
                        <button className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                            <img
                                src="/img/3p/twitter.png"
                                alt="Google"
                                className="mr-2 h-5 w-5"
                            />

                            <span className="text-sm font-semibold">
                                Link Twitter
                            </span>
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    <h2 className="font-semibold text-lg">Wallets</h2>

                    <h3 className="font-regular text-sm mt-1">
                        Link your wallets and start getting paid.
                    </h3>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-x-2 gap-y-2">
                        <button className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                            <img
                                src="/img/3p/metamask.png"
                                alt="Link Metamask"
                                className="mr-2 h-5 w-5"
                            />

                            <span className="text-sm font-semibold">
                                Link Metamask
                            </span>
                        </button>
                        <button className="transition-all border-2 border-green-500 hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                            <img
                                src="/img/3p/algorand.png"
                                alt="Linked Algorand"
                                className="mr-2 h-5 w-5"
                            />

                            <span className="text-sm font-semibold">
                                Linked Algorand
                            </span>

                            <span className="ml-1.5 text-xs text-gray-600">
                                5WCIZNG...L6F2E
                            </span>
                        </button>
                        <button className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                            <img
                                src="/img/3p/solana.png"
                                alt="Link Solana"
                                className="mr-2 h-5 w-5"
                            />

                            <span className="text-sm font-semibold">
                                Link Solana
                            </span>
                        </button>
                        <button className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                            <img
                                src="/img/3p/tron.png"
                                alt="Link Tron"
                                className="mr-2 h-5 w-5"
                            />

                            <span className="text-sm font-semibold">
                                Link Tron
                            </span>
                        </button>
                    </div>
                </div>

                <button
                    className="mt-3 hover:scale-[1.01] duration-500 transition w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 px-4 rounded-md text-white font-bold flex items-center justify-center"
                    onClick={next}
                >
                    {isLoading ? (
                        <>
                            <IconLoader2 className="animate-spin" />
                        </>
                    ) : (
                        <>Done</>
                    )}
                </button>
            </div>
        </>
    );
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
                        {stage === "handle"
                            ? "First things first..."
                            : stage === "link"
                            ? "Next, link up your wallets & socials"
                            : stage === "profile"}
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
                        next={nextStage}
                    />
                    <Link
                        show={stage === "link"}
                        handle={handle}
                        next={nextStage}
                    />
                    <Profile show={stage === "profile"} />
                </div>
            </main>
        </>
    );
}
