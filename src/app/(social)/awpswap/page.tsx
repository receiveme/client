"use client";

import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import "../../globals.css";
import toast from "react-hot-toast";
import { FollowOnTwitterModal } from "./components/FollowOnTwitterModal";
import { useEffect, useState } from "react";
import { JoinDiscordModal } from "./components/JoinDiscordModal";

let SOCIALS = [
    {
        platform: "awpswap",
        link: `https://awpswap.io`,
        src: `/img/3p/swap-icon.png`,
    },
    {
        platfrom: "twitter",
        link: `https://twitter.com/awpswapio`,
        src: `/img/3p/twitter.png`,
    },
    {
        platform: "discord",
        link: "https://discord.gg/NtK7RWpMHJ",
        src: `/img/3p/discord.png`,
    },
];

export default function AWPSwap() {
    const [followOnTwitterModalIsOpen, setFollowOnTwitterModalIsOpen] =
        useState(false);
    const [joinDiscordModalIsOpen, setJoinDiscordModalIsOpen] = useState(false);

    const [isTwitterLinkClicked, setIsTwitterLinkClicked] = useState(false);
    const [isDiscordLinkClicked, setIsDiscordLinkClicked] = useState(false);

    function copy(text: string) {
        try {
            navigator.clipboard.writeText(text);
            toast.success("Address is copied to the clipboard");
        } catch (e) {
            console.error(e);
            toast.error("Address cannot be copied");
        }
    }

    useEffect(() => {
        if (typeof window === "undefined") return;

        const twitterLinkClicked =
            Boolean(localStorage?.getItem("awpswap:twitter-link-clicked")) ||
            false;

        setIsTwitterLinkClicked(twitterLinkClicked);

        const discordLinkClicked =
            Boolean(localStorage?.getItem("awpswap:discord-link-clicked")) ||
            false;

        setIsDiscordLinkClicked(discordLinkClicked);
    }, []);

    return (
        <>
            <FollowOnTwitterModal
                isOpen={followOnTwitterModalIsOpen}
                setIsOpen={setFollowOnTwitterModalIsOpen}
                setIsTwitterLinkClicked={setIsTwitterLinkClicked}
            />
            <JoinDiscordModal
                isOpen={joinDiscordModalIsOpen}
                setIsOpen={setJoinDiscordModalIsOpen}
                setIsDiscordLinkClicked={setIsDiscordLinkClicked}
            />
            <div
                className="
                    awpswap-socials
                    w-full h-[100dvh] flex flex-col items-center justify-center"
            >
                <div className="flex flex-col h-fit w-[45%] border border-[#B026BA] rounded-xl relative">
                    <div
                        className="
                        w-full h-52
                        bg-banner bg-bottom bg-[length:auto] bg-no-repeat rounded-tl-xl rounded-tr-xl"
                    >
                        <div
                            className="
                            absolute w-full h-52 top-0
                            rounded-tl-xl rounded-tr-xl bg-black opacity-50"
                        ></div>
                        <div className="relative z-10 h-full flex flex-col justify-end p-4">
                            <div className="flex justify-between gap-4">
                                <div>
                                    <h1 className="font-inter font-semibold text-2xl">
                                        <a
                                            href="https://app.awpswap.io/"
                                            target="_blank"
                                        >
                                            AWPSwap
                                        </a>
                                    </h1>
                                    <p className="text-gray-300">
                                        AWPSwap.io is a trading CS2 platform.
                                        Buy, sell, and trade skins more quickly
                                        and easily. Join our community. Earn
                                        rewards.
                                    </p>
                                </div>
                                <div className="min-w-[150px] flex justify-center items-end gap-2"></div>
                            </div>
                        </div>
                    </div>
                    {/* socials section */}
                    <div className="flex flex-col">
                        {/* <a
                            href="https://awpswap.io"
                            target=""
                            className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                        >
                            <img className="w-6" src="/icons/home.svg" />
                            <span className="ml-3 font-bold">
                                awpswap.io - Home
                            </span>
                        </a> */}
                        <a
                            href="https://awpswap.io"
                            target=""
                            className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                        >
                            <img className="w-6" src="/icons/home.svg" />
                            <span className="ml-3 font-bold">
                                awpswap.io - Home
                            </span>
                        </a>

                        <a
                            href="https://awpswap.io"
                            target=""
                            className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                        >
                            <img className="w-6" src="/icons/instantswap.svg" />
                            <span className="ml-3 font-bold">
                                awpswap.io - Instant Swap
                            </span>
                        </a>

                        <a
                            href="https://awpswap.io"
                            target=""
                            className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                        >
                            <img
                                className="w-6"
                                src="/img/3p/twitter-white.png"
                            />
                            <span className="ml-3 font-bold">Twitter</span>
                        </a>
                        <a
                            href="https://discord.gg/NtK7RWpMHJ"
                            target="_blank"
                            className="p-4 transition flex items-center hover:bg-[#ffffff2b] rounded-bl-xl rounded-br-xl"
                        >
                            <img
                                className="w-6"
                                src="/img/3p/discord-white.png"
                            />
                            <span className="ml-3 font-bold">
                                Join our Discord community
                            </span>
                        </a>
                    </div>
                </div>

                {/* tasks section */}
                <div className="bg-[#B026BA] mt-4 rounded-xl w-[45%]">
                    <div className="flex flex-col">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                            <button
                                onClick={() =>
                                    setFollowOnTwitterModalIsOpen(true)
                                }
                            >
                                <span className="flex items-center">
                                    <img
                                        className="h-6 rounded-lg"
                                        src="/img/3p/twitter-white.png"
                                    />
                                    <span className="break-all ml-3 mr-4 font-bold ">
                                        Follow us on twitter
                                    </span>
                                    <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate">
                                        @awpswapio
                                    </span>
                                </span>
                            </button>
                            <div>
                                <button
                                    onClick={() => {
                                        setFollowOnTwitterModalIsOpen(true);
                                    }}
                                    className="
                                    flex items-center justify-center h-7 w-7
                                    bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                >
                                    {isTwitterLinkClicked ? (
                                        <IconCheck color="green" />
                                    ) : (
                                        <IconChevronRight fill="black" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-b-xl">
                        <button onClick={() => setJoinDiscordModalIsOpen(true)}>
                            <span className="flex items-center">
                                <img
                                    className="h-6 rounded-lg"
                                    src="/img/3p/discord-white.png"
                                />
                                <span className="break-all ml-3 mr-4 font-bold ">
                                    Join our Discord community
                                </span>
                                <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate">
                                    @awpswapio
                                </span>
                            </span>
                        </button>

                        <div>
                            <button
                                onClick={() => {
                                    setJoinDiscordModalIsOpen(true);
                                }}
                                className="
                                    flex items-center justify-center h-7 w-7
                                    bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                            >
                                {isDiscordLinkClicked ? (
                                    <IconCheck color="green" />
                                ) : (
                                    <IconChevronRight fill="black" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col h-fit w-[45%] bg-[#ffffff2a] mt-4 rounded-xl relative">
                    <div className="flex flex-col">
                        {/* <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                            <div className="flex items-center">
                                <img className="h-6" src="/img/3p/eth.png" />
                                <span className="break-all ml-3 mr-4">
                                    0x60A3166452fF240F5F521C0EFD3259Af56179e63
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() =>
                                        copy(
                                            "0x60A3166452fF240F5F521C0EFD3259Af56179e63",
                                        )
                                    }
                                    className="
                                        flex items-center justify-center h-7 w-7
                                        bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                >
                                    <img src="/icons/copy.svg" className="h-4" />
                                </button>
                            </div>
                        </div> */}
                        {/* <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-bl-xl rounded-br-xl">
                            <div className="flex items-center">
                                <img className="h-6" src="/img/3p/tron.png" />
                                <span className="break-all ml-3 mr-4">
                                    TSb4jDB4wY1VExgtZydJF6TKFuwJKdDrK8
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() =>
                                        copy("TSb4jDB4wY1VExgtZydJF6TKFuwJKdDrK8")
                                    }
                                    className="
                                        flex items-center justify-center h-7 w-7
                                        bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                >
                                    <img src="/icons/copy.svg" className="h-4" />
                                </button>
                            </div>
                        </div>  */}
                    </div>
                    <div className="flex flex-col">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b]">
                            <a
                                href="https://evm-sidechain.xrpl.org/address/0x47DEF30C9F19357fA810703c5c630AD81a757DDf"
                                target="_blank"
                            >
                                <div className="flex items-center">
                                    <img
                                        className="h-6 rounded-lg"
                                        src="/img/3p/xrp.png"
                                    />
                                    <span className="break-all ml-3 mr-4 font-bold ">
                                        Contract - SwapValue
                                    </span>
                                    <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate">
                                        0x47DEF30C9F19357fA810703c5c630AD81a757DDf
                                        (Explorer)
                                    </span>
                                </div>
                            </a>
                            <div>
                                <IconChevronRight color="black" />
                            </div>
                        </div>
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-bl-xl rounded-br-xl">
                            <a
                                href="https://evm-sidechain.xrpl.org/address/0x47DEF30C9F19357fA810703c5c630AD81a757DDf"
                                target="_blank"
                            >
                                <div className="flex items-center">
                                    <img
                                        className="h-6 rounded-lg"
                                        src="/img/3p/tron.png"
                                    />
                                    <span className="break-all ml-3 mr-4 font-bold ">
                                        Contract - SwapValue
                                    </span>
                                    <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate">
                                        0x47DEF30C9F19357fA810703c5c630AD81a757DDf
                                        (Explorer)
                                    </span>
                                </div>
                            </a>
                            <div>
                                <IconChevronRight color="black" />
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col">
                            <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                                <a href='https://bscscan.com/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865' target="_blank">
                                    <div className="flex items-center">
                                        <img className="h-6" src="/img/3p/cake.png" />
                                        <span className="break-all ml-3 mr-4 font-bold ">
                                            Contract - Main Staking (MasterChef V3)
                                        </span>
                                        <span className='text-xs text-gray hover:underline hover:scale-105 transition truncate'>0x0BFb...1865 (Explorer)</span>
                                    </div>
                                    </a>
                                <div>
            
                                <IconChevronRight color="black" />
                                </div>
                            </div>
                        </div> */}
                </div>
            </div>
        </>
    );
}
