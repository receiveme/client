"use client";

import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import "../../globals.css";
import toast from "react-hot-toast";
import { FollowOnTwitterModal } from "./components/FollowOnTwitterModal";
import { useEffect, useState } from "react";
import { JoinDiscordModal } from "./components/GithubModal";
import { AddSteamModal } from "./components/InteractWithApp";



export default function AWPSwap() {
    const [followOnTwitterModalIsOpen, setFollowOnTwitterModalIsOpen] =
        useState(false);
    const [joinDiscordModalIsOpen, setJoinDiscordModalIsOpen] = useState(false);
    const [addSteamModalIsOpen, setAddSteamModalIsOpen] = useState(false);

    const [isTwitterLinkClicked, setIsTwitterLinkClicked] = useState(false);
    const [isDiscordLinkClicked, setIsDiscordLinkClicked] = useState(false);
    const [isSteamProfileClicked, setIsSteamProfileClicked] = useState(false);
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
            Boolean(localStorage?.getItem("dcloud:twitter-link-clicked")) ||
            false;

        setIsTwitterLinkClicked(twitterLinkClicked);

        const discordLinkClicked =
            Boolean(localStorage?.getItem("dcloud:github-link-clicked")) ||
            false;

        setIsDiscordLinkClicked(discordLinkClicked);

        const steamLinkClicked =
        Boolean(localStorage?.getItem("dcloud:interact-link-clicked")) ||
        false;

        setIsSteamProfileClicked(steamLinkClicked);
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

            <AddSteamModal
                isOpen={addSteamModalIsOpen}
                setIsOpen={setAddSteamModalIsOpen}
                setIsLinkClicked={setIsSteamProfileClicked}
            />

            
            <div className="dcloud-socials w-full  h-[100dvh] flex flex-col items-center justify-center">
                <div className="px-4 sm:max-w-xl md:max-w-2xl">
                    <div className="flex flex-col h-fit =w-[45%] w-full =border -border-[#B026BA] rounded-xl relative">
                        <div className="w-full h-52 bg-dcloudbanner  bg-cover bg-no-repeat rounded-tl-xl rounded-tr-xl"
                            style={{
                                backgroundPosition: "0px 50%",
                            }}
                        >
                            <div className="absolute w-full h-52 top-0 rounded-tl-xl rounded-tr-xl bg-black opacity-50" />
                            <div className="relative z-10 h-full flex flex-col justify-end p-4">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <h1 className="font-inter font-semibold text-2xl">
                                            <a
                                                href="https://cctechmx.org/"
                                                target="_blank"
                                            >
                                                dCloud
                                            </a>
                                        </h1>
                                        <p className="text-gray-300">
                                            dCloud Decentralized Storage
                                        </p>
                                    </div>
                                    {/* <div className="min-w-[150px] flex justify-center items-end gap-2"></div> */}
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
                                href="https://cctechmx.org"
                                target=""
                                className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                            >
                                <img className="w-6" src="/icons/home.svg" />
                                <span className="ml-3 font-bold">
                                    dCloud Website
                                </span>
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.justshare"
                                target=""
                                className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                            >
                                <img
                                    className="w-6"
                                    src="/img/3p/gplay.png"
                                />
                                <span className="ml-3 font-bold">
                                    dCloud - Google Play
                                </span>
                            </a>
                            <a
                                href="https://twitter.com/dcloudstorage"
                                target="_blank"
                                className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                            >
                                <img
                                    className="w-6"
                                    src="/img/3p/twitter-white.png"
                                />
                                <span className="ml-3 font-bold">dCloud - Twitter</span>
                            </a>
                            <a
                                href="https://github.com/simbadMarino/dCloud"
                                target="_blank"
                                className="p-4 transition flex items-center hover:bg-[#ffffff2b] rounded-bl-xl rounded-br-xl"
                            >
                                <img
                                    className="w-6"
                                    src="/icons/docs.png"
                                />
                                <span className="ml-3 font-bold">
                                    dCloud - GitHub
                                </span>
                            </a>
                        </div>


                    </div>
                    {/* tasks section */}
                    <div className="bg-[#264bba] mt-4 rounded-xl =w-[45%] w-full">
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
                                            @dCloudStorage
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

                        


                        <div className="flex flex-col">
                            <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                                  <button
                                    onClick={() =>
                                        setAddSteamModalIsOpen(true)
                                    }>
                                    <span className="flex items-center">
                                        <img
                                            className="h-6 rounded-lg"
                                            src="/img/3p/cloud.png"
                                        />
                                        <span className="break-all ml-3 mr-4 font-bold ">
                                            Interact with dCloud and provide feedback
                                        </span>
                                        <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate mr-4">
                                            cctechmx.org
                                        </span>
                                    </span>

                                    
                                </button>
                                <div>
                                    <button
                                        onClick={() => {
                                            setAddSteamModalIsOpen(true);
                                        }}
                                        className="
                                        flex items-center justify-center h-7 w-7
                                        bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                    >
                                        {isSteamProfileClicked ? (
                                            <IconCheck color="green" />
                                        ) : (
                                            <IconChevronRight fill="black" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                        </div>

                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-b-xl">
                            <button
                                onClick={() => setJoinDiscordModalIsOpen(true)}
                            >


                                <span className="flex items-center">
                                        <img
                                            className="h-6 rounded-lg"
                                            src="/img/3p/github2.png"
                                        />
                                        <span className="break-all ml-3 mr-4 font-bold ">
                                            Read & contribute to our source code
                                        </span>
                                        <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate">
                                            GitHub - dCloud
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

                    
                    <div className="flex flex-col h-fit =w-[45%] w-full bg-[#ffffff2a] mt-4 rounded-xl relative">
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
                        <div className="">
                        </div>
                        <div className="flex flex-col">
                            {/* <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b]">
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
                            </div> */}

                        </div>
  
                    </div>
                </div>
            </div>
        </>
    );
}
