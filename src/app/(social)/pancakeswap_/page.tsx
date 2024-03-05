"use client";

import "../../globals.css";
import toast from "react-hot-toast";

import CAKESTAKEABI from './cakepool.json';


import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CakeInteractionModal } from "./CakeInteractionModal";
import { ethers } from "ethers";

export default function PancakeSwap() {
    const [isCakeInteractionModalOpen, setIsCakeInteractionModalOpen] =
        useState(false);
    const [metamaskAddress, setMetamaskAddress] = useState("");

    function copy(text: string) {
        try {
            navigator.clipboard.writeText(text);
            toast.success("Address is copied to the clipboard");
        } catch (e) {
            console.error(e);
            toast.error("Address cannot be copied");
        }
    }

    async function checkCAKESTAKE(address: string) {
        let provider = new ethers.providers.JsonRpcProvider(
            "https://binance.nodereal.io",
        );
        // let signer = await provider.getSigner();
        let contract = new ethers.Contract(
            "0x45c54210128a065de780C4B0Df3d16664f7f859e",
            CAKESTAKEABI,
           provider,
        );
        // let _contract = contract.connect(provider);
        const userInfo = await contract.userInfo(address);
        console.log(userInfo)
    }

    return (
        <>
            <CakeInteractionModal
                isOpen={isCakeInteractionModalOpen}
                setIsOpen={setIsCakeInteractionModalOpen}
                metamaskAddress={metamaskAddress}
                setMetamaskAddress={setMetamaskAddress}
            />

            <div className="w-full h-[100dvh] flex flex-col items-center justify-center bg-[#261640]">
                <div className="flex flex-col h-fit w-[45%] bg-[#543785] rounded-xl relative">
                    <div
                        className="
                    w-full h-52 bg-no-repeat rounded-tl-xl rounded-tr-xl"
                        style={{
                            backgroundImage:
                                "url(/img/socials/pcake-banner.png)",
                        }}
                    >
                        <div
                            className="
                        absolute w-full h-52 top-0
                        rounded-tl-xl rounded-tr-xl bg-black opacity-50"
                        ></div>
                        <div className="relative z-10 h-full flex flex-col justify-end p-4">
                            <h1 className="font-inter font-semibold text-2xl">
                                <a
                                    href="https://pancakeswap.finance/"
                                    target="_blank"
                                >
                                    PancakeSwap
                                </a>
                            </h1>
                            <p className="text-gray-300">
                                PancakeSwap, a DeFi platform on Binance Smart
                                Chain, is a decentralized exchange (DEX)
                                enabling users to swap cryptocurrencies, provide
                                liquidity, and earn CAKE tokens. Dive into
                                decentralized finance with PancakeSwap&apos;s
                                seamless, rewarding experience!
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <a
                            href="https://pancakeswap.finance/"
                            target="_blank"
                            className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                        >
                            <img className="w-6" src="/icons/home.svg" />
                            <span className="ml-3">pancakeswap.finance</span>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                        >
                            <img
                                className="w-6"
                                src="/img/3p/twitter-white.png"
                            />
                            <span className="ml-3">Twitter</span>
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
                            <span className="ml-3">Discord</span>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col h-fit w-[45%] bg-[#22c7d3] mt-4 gap-2 rounded-xl relative">
                    <div className="flex flex-col">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                            <div className="flex items-center">
                                <img className="h-6" src="/img/3p/cake.png" />
                                <span className="break-all ml-3 mr-4 font-bold">
                                    Check if you HODL or owned any $CAKE
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() =>
                                        setIsCakeInteractionModalOpen(true)
                                    }
                                    className="
                                    flex items-center justify-center h-7 w-7
                                    bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                >
                                    <IconChevronRight fill="black" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                            <div className="flex items-center">
                                <img className="h-6" src="/img/3p/cake.png" />
                                <span className="break-all ml-3 mr-4 font-bold">
                                    Check if you staked/pooled any $CAKE
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() =>
                                        setIsCakeInteractionModalOpen(true)
                                    }
                                    className="
                                    flex items-center justify-center h-7 w-7
                                    bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                >
                                    <IconChevronRight fill="black" />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
