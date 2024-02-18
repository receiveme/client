"use client";

import prisma from "../../../lib/prisma"
import {
    IconCircleCheck,
    IconCircleCheckFilled,
    IconCircleXFilled,
    IconFidgetSpinner,
    IconLoader,
    IconLoader2,
    IconLoader3,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ParticleNetwork, UserInfo } from '@particle-network/auth';
import { Avalanche } from '@particle-network/chains';
import { createUserProfile } from "@/src/actions";
import { useRouter } from 'next/router';

type Stage = "handle" | "link" | "profile" | "preview" | "completed";
type StageProps = {
    show: boolean;
} & Record<string, any>;

const particle = new ParticleNetwork({
    projectId: "19880450-9512-4857-a7a9-c29d16110034",
    clientKey: "cbIQ6bvFEBm8ZgVkpox4q0mpxJtxAgqj3ra4VQtf",
    appId: "124f61c4-f5ca-486c-a686-ae80b6966b72",
    chainName: Avalanche.name,
    chainId: Avalanche.id,
    wallet: {
        displayWalletEntry: true,
        uiMode: "dark"
    },
});


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
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [avaxBalance, setAvaxBalance] = useState<string | null>(null);

    const [metamaskAddress, setMetamaskAddress] = useState<string | null>()
    const [tronlinkAddress, setTronlinkAddress] = useState<string | null>()

    if (!show) {
        return <></>;
    }

    const handleLogin = async (preferredAuthType: 'google' | 'twitter' | 'twitch' | 'github' | 'discord' | 'linkedin') => {
        const user = await particle.auth.login({ preferredAuthType })
        sessionStorage.setItem("wallets", JSON.stringify([]))
        const socials = Array.isArray(JSON.parse(sessionStorage.getItem("socials"))) ?
            JSON.parse(sessionStorage.getItem("socials")) : []

        setUserInfo(user);

        if (sessionStorage.getItem(preferredAuthType)) {
            return 0
        }
        socials.push({ authType: preferredAuthType, socialUsername: user.thirdparty_user_info.user_info.name, socialInfo: user, socialImg: user.avatar, socialId: String(user.thirdparty_user_info.user_info.id) })
        //store the specific auth type user info in different storage items
        sessionStorage.setItem('socials', JSON.stringify(socials));
        sessionStorage.setItem(`${preferredAuthType}`, JSON.stringify(user));
    }

    // use when manually triggering logout
    // const handleLogout = () => {
    //     return particle.auth.logout()
    // }

    // opens the security dashboard on particle
    // const openSecurity = () => {
    //     particle.auth.openAccountAndSecurity().catch((error) => {
    //         if (error.code === 4011) {
    //             //ignore window close
    //         } else if (error.code === 10005) {
    //             //invalid token
    //         } else if (error.code === 8005) {
    //             //user not login
    //         }
    //     });
    // }

    function connectMetamask() {
        return new Promise(async (resolve, reject) => {
            const chainId = await window["ethereum"]?.request({ method: 'eth_chainId' });
            const accounts = await window["ethereum"]?.
                request({ method: 'eth_requestAccounts' }) // @ts-ignore
                .catch(e => {
                    console.error("METAMASK ERR:", e);
                    return reject();
                });
            // After connection
            if (accounts?.length && accounts[0] && chainId) {
                setMetamaskAddress(accounts[0])
                const wallets = Array.isArray(JSON.parse(sessionStorage.getItem("wallets"))) ? JSON.parse(sessionStorage.getItem("wallets")) : []
                wallets.push({ walletProvider: "metamask", walletAddress: accounts[0] })
                sessionStorage.setItem("wallets", JSON.stringify(wallets))
            } else return reject();
        })
    }

    function connectTronlink() {
        return new Promise(async (resolve, reject) => {
            try { //@ts-ignore
                await window["tronLink"]?.request({
                    method: "tron_requestAccounts",
                    params: {

                        websiteName: "receive.me"
                    }
                }) //@ts-ignore
                let tronLink = { ... (await window["tronLink"]) };
                let account = tronLink.tronWeb.defaultAddress.base58;
                setTronlinkAddress(account)
                const wallets = Array.isArray(JSON.parse(sessionStorage.getItem("wallets"))) ? JSON.parse(sessionStorage.getItem("wallets")) : []
                wallets.push({ walletProvider: "tron", walletaAddress: account })
                sessionStorage.setItem("wallets", JSON.stringify(wallets))
                if (!account) return reject();
                return resolve({ account, chain: "tron" });
            } catch (e) {
                console.log(e)
                return reject();
            }
        })
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
                    <h1 className="font-semibold text-lg" >Socials</h1>

                    <h3 className="font-regular text-sm mt-1">
                        Link your socials to display them on your profile.
                    </h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-x-2 gap-y-2">
                        {sessionStorage.getItem('discord') ? <>
                            <button onClick={() => handleLogin('discord')} type="button" className="transition-all border-2 border-green-500 hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/discord.png"
                                    alt="Link Discord"
                                    className="mr-2 h-auto w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link Discord
                                </span>
                                <span className="ml-1.5 text-xs text-gray-600 truncate ">
                                    {/**TODO */}
                                </span>

                            </button>
                        </> : <>

                            <button onClick={() => handleLogin('discord')} type="button" className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/discord.png"
                                    alt="Link Discord"
                                    className="mr-2 h-auto w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link Discord
                                </span>


                            </button>
                        </>}


                        {sessionStorage.getItem('github') ? <>
                            <button onClick={() => handleLogin('github')} type="button" className="transition-all border-2 border-green-500 hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/github.png"
                                    alt="Link Github"
                                    className="mr-2 h-5 w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link Github
                                </span>


                            </button>
                        </> : <>
                            <button onClick={() => handleLogin('github')} type="button" className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/github.png"
                                    alt="Link Github"
                                    className="mr-2 h-5 w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link Github
                                </span>
                            </button>
                        </>}

                        {sessionStorage.getItem('twitch') ? <>
                            <button onClick={() => handleLogin('twitch')} type="button" className="transition-all border-2 border-green-500 hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3v">
                                <img
                                    src="/img/3p/twitch.png"
                                    alt="Twitch"
                                    className="mr-2 h-5 w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link Twitch
                                </span>
                            </button>

                        </> : <>
                            <button onClick={() => handleLogin('twitch')} type="button" className="transition-all opacity-100 hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/twitch.png"
                                    alt="Twitch"
                                    className="mr-2 h-5 w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link Twitch
                                </span>
                            </button>

                        </>}


                        {sessionStorage.getItem('twitter') ? <>
                            <button onClick={() => handleLogin('twitter')} type="button" className="transition-all border-2 border-green-500 hover:bg-gray-200 
                                flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/twitter.png"
                                    alt="Google"
                                    className="mr-2 h-5 w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link Twitter
                                </span>
                            </button>
                        </> : <>
                            <button onClick={() => handleLogin('twitter')} type="button" className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/twitter.png"
                                    alt="Google"
                                    className="mr-2 h-5 w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link Twitter
                                </span>
                            </button>
                        </>}

                        {sessionStorage.getItem('linkedin') ? <>
                            <button onClick={() => handleLogin('linkedin')} type="button" className="transition-all border-2 border-green-500 hover:bg-gray-200 
                                flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/linkedin.png"
                                    alt="Google"
                                    className="mr-2 h-5 w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link LinkedIn
                                </span>
                            </button>
                        </> : <>
                            <button onClick={() => handleLogin('linkedin')} type="button" className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/linkedin.png"
                                    alt="Google"
                                    className="mr-2 h-5 w-5"
                                />

                                <span className="text-sm font-semibold">
                                    Link LinkedIn
                                </span>
                            </button>
                        </>}

                        <button disabled type="button" className="transition-all  flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3 opacity-60">
                            <img
                                src="/img/3p/paypal.png"
                                alt="Google"
                                className="mr-2 h-5 w-5"
                            />

                            <span className="text-sm font-semibold">
                                Link PayPal
                            </span>
                        </button>

                        <button disabled type="button" className="transition-all  flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3 opacity-60">
                            <img
                                src="/img/3p/instagram.png"
                                alt="Google"
                                className="mr-2 h-5 w-5 rounded-md"
                            />

                            <span className="text-sm font-semibold">
                                Link Instagram
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
                        {!metamaskAddress ?
                            <>
                                <button onClick={() => connectMetamask()} className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                    <img
                                        src="/img/3p/metamask.png"
                                        alt="Link Metamask"
                                        className="mr-2 h-5 w-5"
                                    />

                                    <span onClick={connectMetamask} className="text-sm font-semibold">
                                        Link Metamask
                                    </span>
                                </button>
                            </>
                            :

                            <>

                                <button onClick={() => connectMetamask()} className="transition-all border-2 border-green-500 hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                    <img
                                        src="/img/3p/metamask.png"
                                        alt="Link Metamask"
                                        className="mr-2 h-5 w-5"
                                    />

                                    <span onClick={connectMetamask} className="text-sm font-semibold">
                                        Link Metamask
                                    </span>

                                    <span className="ml-1.5 text-xs text-gray-600 truncate ">
                                        {metamaskAddress.substring(0, 5)}...{metamaskAddress.substring(35, 42)}
                                    </span>
                                </button>
                            </>


                        }
                        {/* <button className="transition-all border-2 border-green-500 hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
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
                        </button> */}
                        <button className="transition-all border-2  hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                            <img
                                src="/img/3p/algorand.png"
                                alt="Linked Algorand"
                                className="mr-2 h-5 w-5"
                            />

                            <span className="text-sm font-semibold">
                                Link Algorand
                            </span>

                            <span className="ml-1.5 text-xs text-gray-600">

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
                        {!tronlinkAddress ?
                            <>
                                <button onClick={() => connectTronlink()} className="transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                    <img
                                        src="/img/3p/tron.png"
                                        alt="Link Tron"
                                        className="mr-2 h-5 w-5"
                                    />

                                    <span className="text-sm font-semibold">
                                        Link Tronlink
                                    </span>
                                </button>

                            </>
                            :
                            <>
                                <button onClick={() => connectTronlink()} className="transition-all border-2 border-green-500 hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3">
                                    <img
                                        src="/img/3p/tron.png"
                                        alt="Link Tron"
                                        className="mr-2 h-5 w-5"
                                    />

                                    <span className="text-sm font-semibold">
                                        Link Tronlink
                                    </span>

                                    <span className="ml-1.5 text-xs text-gray-600 truncate">
                                        {tronlinkAddress.substring(0, 5)}...{tronlinkAddress.substring(35, 41)}
                                    </span>
                                </button>
                            </>

                        }

                        <button disabled onClick={() => handleLogin('twitter')} type="button" className="transition-all  flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3 opacity-60">
                            <img
                                src="/img/3p/unstoppabledomains.png"
                                alt="Google"
                                className="mr-2 h-5 w-5 rounded-md"
                            />

                            <span className="text-sm font-semibold">
                                Unstoppable Domains
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
                        <>Next</>
                    )}
                </button>
            </div>
        </>
    );
}

function Profile({ handle, next, setProfile, show }: StageProps) {
    const [theme, setTheme] = useState("yellow-300");
    const [banner, setBanner] = useState("white");

    function nextStage() {
        setProfile({ theme, banner });
        next();
    }

    if (!show) {
        return <></>;
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div
                    className={`mt-6 p-6 rounded-xl bg-gradient-to-b from-${theme} to-slate-900`}
                >
                    <div className={`relative rounded-xl bg-${banner}`}>
                        <div className="rounded-xl absolute w-full h-full p-4 flex items-end justify-between bg-gradient-to-t from-black to-transparent">
                            <span className="text-3xl text-white font-bold">
                                <span className="text-gray-400 font-normal">
                                    @
                                </span>
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

                    <div className="flex gap-4 mt-2">
                        <div
                            onClick={() => setTheme("yellow-300")}
                            className={`flex-grow-1 w-full h-12 rounded-md bg-gradient-to-b from-yellow-300 to-slate-900 transition cursor-pointer border-2 ${theme === "yellow-300"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                                }`}
                        ></div>
                        <div
                            onClick={() => setTheme("green-300")}
                            className={`flex-grow-1 w-full h-12 rounded-md bg-gradient-to-b from-green-300 to-slate-900 transition cursor-pointer border-2 ${theme === "green-300"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                                }`}
                        ></div>
                        <div
                            onClick={() => setTheme("blue-400")}
                            className={`flex-grow-1 w-full h-12 rounded-md bg-gradient-to-b from-blue-400 to-slate-900 transition cursor-pointer border-2 ${theme === "blue-400"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                                }`}
                        ></div>
                        <div
                            onClick={() => setTheme("red-500")}
                            className={`flex-grow-1 w-full h-12 rounded-md bg-gradient-to-b from-red-500 to-slate-900 transition cursor-pointer border-2 ${theme === "red-500"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                                }`}
                        ></div>
                        <div
                            onClick={() => setTheme("orange-600")}
                            className={`flex-grow-1 w-full h-12 rounded-md bg-gradient-to-b from-orange-600 to-slate-900 transition cursor-pointer border-2 ${theme === "orange-600"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                                }`}
                        ></div>
                    </div>

                    <h2 className="font-semibold text-lg mt-6">Banner</h2>

                    <h3 className="font-regular text-sm">
                        Choose a banner for your profile.
                    </h3>

                    <div className="flex gap-4 mt-2">
                        <img
                            className={`flex-grow-1 w-full h-12 rounded-md border-2 transition cursor-pointer ${banner === "white"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                                }`}
                            src="/img/profile/WhaleNew.png"
                            onClick={() => setBanner("white")}
                            alt="whale banner"
                        />
                        <img
                            className={`flex-grow-1 w-full h-12 rounded-md transition cursor-pointer border-2 ${banner === "green-400"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                                } bg-green-400`}
                            src="/img/profile/WhaleNew.png"
                            onClick={() => setBanner("green-400")}
                            alt="whale banner green"
                        />
                        <img
                            className={`flex-grow-1 w-full h-12 rounded-md transition cursor-pointer border-2 ${banner === "blue-300"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                                } bg-blue-300`}
                            src="/img/profile/WhaleNew.png"
                            onClick={() => setBanner("blue-300")}
                            alt="whale banner blue"
                        />
                        <img
                            className={`flex-grow-1 w-full h-12 rounded-md transition cursor-pointer border-2 ${banner === "red-500"
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-600"
                                } bg-red-500`}
                            src="/img/profile/WhaleNew.png"
                            onClick={() => setBanner("red-500")}
                            alt="whale banner red"
                        />
                        <img
                            className={`flex-grow-1 w-full h-12 rounded-md transition cursor-pointer border-2 ${banner === "orange-400"
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
                    className="mt-3 hover:scale-[1.01] duration-500 transition w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 px-4 rounded-md text-white font-bold flex items-center justify-center"
                    onClick={nextStage}
                >
                    Next
                </button>
            </div>
        </>
    );
}

function Preview({ handle, links, profile, show, complete }: StageProps) {
    if (!show) {
        return <></>;
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div
                    className={`mt-6 p-6 rounded-xl bg-gradient-to-b from-${profile.theme} to-slate-900`}
                >
                    <div className={`relative rounded-xl bg-${profile.banner}`}>
                        <div className="rounded-xl absolute w-full h-full p-4 flex items-end justify-between bg-gradient-to-t from-black to-transparent">
                            <span className="text-3xl text-white font-bold">
                                <span className="text-gray-400 font-normal">
                                    @
                                </span>
                                {handle}
                            </span>
                        </div>
                        <img
                            src="/img/profile/WhaleNew.png"
                            className="rounded-xl shadow-md"
                        />
                    </div>
                </div>

                <button
                    onClick={complete}
                    className="mt-3 hover:scale-[1.01] duration-500 transition w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 px-4 rounded-md text-white font-bold flex items-center justify-center"
                >
                    Complete
                </button>
            </div>
        </>
    );
}

export default function Onboard() {
    const [handle, setHandle] = useState("");
    const [links, setLinks] = useState({});
    const [profile, setProfile] = useState<any>({});
    // const router = useRouter();
    const [stage, setStage] = useState<Stage>("handle");

    const nextStage = () => {
        if (stage === "handle") setStage("link");
        else if (stage === "link") setStage("profile");
        else setStage("preview");
    };

    const previousStage = () => {
        if (stage === "preview") setStage("profile");
        else if (stage === "profile") setStage("link");
        else if (stage === "link") setStage("handle");
    };

    const complete = async () => {
        //@ts-ignore
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo")); // sucks
        const wallets = JSON.parse(sessionStorage.getItem("wallets"));
        const socials = JSON.parse(sessionStorage.getItem("socials"));

        const fetchSocialDetails = async () => {
            for (let i = 0; i < socials.length; i++) {
                if (socials[i].authType == 'github') {
                    if (!socials[i] && socials[i].socialId) {
                        let id = socials[i].socialId
                        let res = await fetch(`https://api.github.com/user/${id}`);
                        if (!res.ok) throw new Error('bad')
                        res = await res.json(); //@ts-ignore
                        socials[i].socialUsername = res.login
                        socials[i].socialImg = res.avatar_url
                    }
                } else if (socials[i].authType == 'twitch') {
                    //TODO
                } else if (socials[i].authType == 'twitter') {
                    //TODO
                }
            }
        }

        await fetchSocialDetails()
        await createUserProfile(socials, wallets, userInfo, handle, profile); // Assuming this is an async function
        sessionStorage.clear()
    }


    return (
        <>
            <main className="flex justify-center items-center min-h-screen">
                <div className="w-full p-4 sm:w-[650px] sm:p-3">
                    <h1 className="font-bold text-2xl">
                        {stage === "handle"
                            ? "First things first..."
                            : stage === "link"
                                ? "Next, link up your wallets & socials"
                                : stage === "profile"
                                    ? "Finally, customize your profile"
                                    : "Preview your profile"}
                    </h1>

                    <div>
                        <div className="mt-4" aria-hidden="true">
                            <div className="overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-indigo-600 transition-all ease-in-out duration-700"
                                    style={{
                                        width:
                                            stage === "handle"
                                                ? "0%"
                                                : stage === "link"
                                                    ? "30%"
                                                    : stage === "profile"
                                                        ? "60%"
                                                        : "85%",
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

                    <Profile
                        show={stage === "profile"}
                        handle={handle}
                        setProfile={setProfile}
                        next={nextStage}
                    />

                    <Preview
                        show={stage === "preview"}
                        handle={handle}
                        links={links}
                        profile={profile}
                        complete={complete}
                    />
                </div>
            </main>
        </>
    );
}
