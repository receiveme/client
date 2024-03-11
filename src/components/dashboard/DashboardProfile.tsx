"use client";

import { useEffect, useState } from "react";
import { Banner } from "../profile/Banner";
import { ThemeOption } from "../profile/ThemeOption";
import { BannerOption } from "../profile/BannerOption";

import axios from "axios";
import Toast from "../toast";
import { IconLoader2 } from "@tabler/icons-react";
import { useAppState } from "@/src/hooks/useAppState";

export function DashboardProfile() {
    const [appState, setAppState] = useAppState();

    const handle = appState?.userData?.handle;
    const [theme, setTheme] = useState(appState.userData?.Profile[0].theme);
    const [banner, setBanner] = useState(
        appState.userData?.Profile[0].background,
    );

    useEffect(() => {
        setTheme(appState.userData?.Profile[0].theme);
        setBanner(appState.userData?.Profile[0].background);
    }, [appState]);

    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    async function save() {
        setIsLoading(true);

        if (!appState.userData) { // this used to have !appState.userInfo as well, but it's broken. TO FIX
            setIsLoading(false);
            return;
        };

        const uuid = appState.userData.authuuid;
        const token = ''

        // Send API request
        const response = await axios.post(
            `https://seal-app-8277b.ondigitalocean.app/` + "profiles",
            { uuid, token, theme, background: banner },
        );

        // Save to localStorage
        const userData = response.data.data;
        setAppState({ userData });

        setIsLoading(false);

        // Success Toast
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    return (
        <>
            <Toast
                show={saved}
                setShow={setSaved}
                type="success"
                title="Updated appearance"
            />

            <div className="flex flex-col gap-4 w-full transition fade-up">
                <h3 className="text-2xl font-bold">Appearance</h3>

                <div
                    className={`p-6 py-12 rounded-xl bg-gradient-to-b from-${theme?.split("/")[0]
                        } to-slate-900 flex justify-center items-center w-full`}
                >
                    <Banner
                        banner={banner}
                        handle={handle}
                        className="w=[80%] lg:w-[60%] h-auto"
                    />
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Theme</h2>

                    <h3 className="font-regular text-sm">
                        Choose a theme for your profile.
                    </h3>

                    <div className="grid grid-cols-5 gap-4 mt-2">
                        <ThemeOption
                            color="yellow-300"
                            theme={theme}
                            setTheme={setTheme}
                            className="!h-16"
                        />
                        <ThemeOption
                            color="green-300"
                            theme={theme}
                            setTheme={setTheme}
                            className="!h-16"
                        />
                        <ThemeOption
                            color="blue-400"
                            theme={theme}
                            setTheme={setTheme}
                            className="!h-16"
                        />
                        <ThemeOption
                            color="red-500"
                            theme={theme}
                            setTheme={setTheme}
                            className="!h-16"
                        />
                        <ThemeOption
                            color="orange-600"
                            theme={theme}
                            setTheme={setTheme}
                            className="!h-16"
                        />
                    </div>

                    <h2 className="font-semibold text-lg mt-6">Banner</h2>

                    <h3 className="font-regular text-sm">
                        Choose a banner for your profile.
                    </h3>

                    <div className="grid grid-cols-5 gap-4 mt-2">
                        <BannerOption
                            type="whale"
                            color="white"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="whale"
                            color="green-400"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="whale"
                            color="blue-300"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="whale"
                            color="red-500"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="whale"
                            color="orange-400"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="waves"
                            color="blue"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="waves"
                            color="pink"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="waves"
                            color="red"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="waves"
                            color="turquoise"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="waves"
                            color="yellow"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="beach"
                            color="day"
                            banner={banner}
                            setBanner={setBanner}
                        />

                        <BannerOption
                            type="gator"
                            color="night"
                            banner={banner}
                            setBanner={setBanner}
                        />
                        <BannerOption
                            type="gator"
                            color="evening"
                            banner={banner}
                            setBanner={setBanner}
                        />

                        <BannerOption
                            type="gator"
                            color="sunrise"
                            banner={banner}
                            setBanner={setBanner}
                        />

                        <BannerOption
                            type="gator"
                            color="cool"
                            banner={banner}
                            setBanner={setBanner}
                        />
                    </div>
                </div>

                <button
                    className="mt-3 hover:scale-[1.01] duration-500 transition w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 px-4 rounded-md text-white font-bold flex items-center justify-center"
                    onClick={save}
                >
                    {isLoading ? (
                        <>
                            <IconLoader2 className="animate-spin" />
                        </>
                    ) : (
                        <>Save</>
                    )}
                </button>
            </div>
        </>
    );
}
