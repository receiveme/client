"use client";

import { getUser } from "@/src/actions/getUser";
import { useState, useEffect } from "react";

export function DashboardProfile() {
    const [theme, setTheme] = useState("yellow-300");
    const [banner, setBanner] = useState("white");
    const [saveStatus, setSaveStatus] = useState<boolean>(false);
    const [user, setUser] = useState<any>(undefined);
    const handle = "hello";

    useEffect(() => {
        if (typeof window !== "undefined") {
            setTheme(localStorage?.getItem("theme") || "yellow-300");
            setBanner(localStorage?.getItem("banner") || "white");
        }
    }, [typeof window !== "undefined"]);

    useEffect(() => {
        let raw: any = localStorage.getItem("userInfo");
        if (raw) {
            (async () => {
                let obj: any = JSON.parse(raw)?.[0];
                let covalent_resp = await getUserData(obj?.["accountInfo"]);
                console.log(covalent_resp);
                setUser({ ...obj, ...covalent_resp } || undefined);
            })();
        }
    }, [localStorage.getItem("userInfo")]);

    function save() {
        localStorage.setItem("banner", banner);
        localStorage.setItem("theme", theme);
        setSaveStatus(true);
        setTimeout(() => setSaveStatus(false), 2000);
    }

    async function getUserData(address: string = ""): Promise<any> {
        return await getUser({ address });
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            {user && (
                <div>
                    <p>
                        Address: <b>{user?.["accountInfo"]}</b>
                    </p>
                    <p>
                        Balance: <b>${user?.usd_balance}</b>
                    </p>
                </div>
            )}
            <div
                className={`mt-6 p-6 py-12 rounded-xl bg-gradient-to-b from-${theme} to-slate-900 flex justify-center items-center w-full`}
            >
                <div
                    className={`relative rounded-xl bg-${banner} max-w-[580px] w-full`}
                >
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
            </div>

            <div>
                <h2 className="font-semibold text-lg">Theme</h2>

                <h3 className="font-regular text-sm">
                    Choose a theme for your profile.
                </h3>

                <div className="grid grid-cols-5 gap-4 mt-2">
                    <div
                        onClick={() => setTheme("yellow-300")}
                        className={`w-full h-auto rounded-md bg-gradient-to-b from-yellow-300 to-slate-900 transition cursor-pointer border-2 ${
                            theme === "yellow-300"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        }`}
                    ></div>
                    <div
                        onClick={() => setTheme("green-300")}
                        className={`w-full h-auto rounded-md bg-gradient-to-b from-green-300 to-slate-900 transition cursor-pointer border-2 ${
                            theme === "green-300"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        }`}
                    ></div>
                    <div
                        onClick={() => setTheme("blue-400")}
                        className={`w-full h-auto rounded-md bg-gradient-to-b from-blue-400 to-slate-900 transition cursor-pointer border-2 ${
                            theme === "blue-400"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        }`}
                    ></div>
                    <div
                        onClick={() => setTheme("red-500")}
                        className={`w-full h-auto rounded-md bg-gradient-to-b from-red-500 to-slate-900 transition cursor-pointer border-2 ${
                            theme === "red-500"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        }`}
                    ></div>
                    <div
                        onClick={() => setTheme("orange-600")}
                        className={`w-full h-10 lg:h-20 rounded-md bg-gradient-to-b from-orange-600 to-slate-900 transition cursor-pointer border-2 ${
                            theme === "orange-600"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        }`}
                    ></div>
                </div>

                <h2 className="font-semibold text-lg mt-6">Banner</h2>

                <h3 className="font-regular text-sm">
                    Choose a banner for your profile.
                </h3>

                <div className="grid grid-cols-5 gap-4 mt-2">
                    <img
                        className={`w-full h-auto rounded-md border-2 transition cursor-pointer ${
                            banner === "white"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        }`}
                        src="/img/profile/WhaleNew.png"
                        onClick={() => setBanner("white")}
                        alt="whale banner"
                    />
                    <img
                        className={`w-full h-auto rounded-md transition cursor-pointer border-2 ${
                            banner === "green-400"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        } bg-green-400`}
                        src="/img/profile/WhaleNew.png"
                        onClick={() => setBanner("green-400")}
                        alt="whale banner green"
                    />
                    <img
                        className={`w-full h-auto rounded-md transition cursor-pointer border-2 ${
                            banner === "blue-300"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        } bg-blue-300`}
                        src="/img/profile/WhaleNew.png"
                        onClick={() => setBanner("blue-300")}
                        alt="whale banner blue"
                    />
                    <img
                        className={`w-full h-auto rounded-md transition cursor-pointer border-2 ${
                            banner === "red-500"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        } bg-red-500`}
                        src="/img/profile/WhaleNew.png"
                        onClick={() => setBanner("red-500")}
                        alt="whale banner red"
                    />
                    <img
                        className={`w-full h-auto rounded-md transition cursor-pointer border-2 ${
                            banner === "orange-400"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                        } bg-orange-400`}
                        src="/img/profile/WhaleNew.png"
                        onClick={() => setBanner("orange-400")}
                        alt="whale banner orange"
                    />
                </div>
            </div>

            <button
                className={`mt-3 hover:scale-[1.01] duration-500 transition w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 px-4 rounded-md text-white font-bold flex items-center justify-center disabled:bg-indigo-300 hover:disabled:bg-indigo-400 disabled:cursor-default`}
                disabled={saveStatus}
                onClick={save}
            >
                {saveStatus ? "Successfully saved" : "Save"}
            </button>
        </div>
    );
}
