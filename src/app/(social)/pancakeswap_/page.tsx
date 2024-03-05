"use client";

import "../../globals.css";
import toast from "react-hot-toast";

import CAKEABI from "./cakeabi.json";

import { Contract, ethers } from "ethers";
import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { CakeInteractionModal } from "./CakeInteractionModal";

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
    async function checkCAKEBNB(address: string) {
        let provider = new ethers.JsonRpcProvider(
            "https://binance.nodereal.io",
        );
        let contract = new Contract(
            "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
            CAKEABI,
            provider,
        );
        const balance = await contract.balanceOf(address);
    }

    return (
        <>
            <CakeInteractionModal
                isOpen={isCakeInteractionModalOpen}
                setIsOpen={setIsCakeInteractionModalOpen}
                setMetamaskAddress={setMetamaskAddress}
            />

            <div
                className="
            awpswap-socials
            w-full h-[100dvh] flex flex-col items-center justify-center"
            >
                <div className="flex flex-col h-fit w-[45%] bg-[#ffffff2a] rounded-xl relative">
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
                                decentralized finance with PancakeSwap's
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

                <div className="flex flex-col h-fit w-[45%] bg-[#ffffff2a] mt-4 rounded-xl relative">
                    <div className="flex flex-col">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                            <div className="flex items-center">
                                <img className="h-6" src="/img/3p/cake.png" />
                                <span className="break-all ml-3 mr-4">
                                    Check if you have interacted with $CAKE
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
