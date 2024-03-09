"use client";

import "../../globals.css";
import toast from "react-hot-toast";

import CAKESTAKEABI from "./cakestake.json";

import { IconChevronRight, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CakeInteractionModal } from "./CakeInteractionModal";
import { ethers } from "ethers";

export default function PancakeSwap() {
    const [isCakeInteractionModalOpen, setIsCakeInteractionModalOpen] =
        useState(false);
    const [metamaskAddress, setMetamaskAddress] = useState("");
    const [type, setType] = useState<"own" | "stake">("own");

    return (
        <>
            <CakeInteractionModal
                isOpen={isCakeInteractionModalOpen}
                setIsOpen={setIsCakeInteractionModalOpen}
                metamaskAddress={metamaskAddress}
                setMetamaskAddress={setMetamaskAddress}
                type={type}
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
                            href="https://docs.pancakeswap.finance/"
                            target="_blank"
                            className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                        >
                            <img className="w-6" src="/icons/docs.png" />
                            <span className="ml-3">pancakeswap.finance Docs</span>
                        </a>
                        <a
                            href="https://github.com/pancakeswap"
                            target="_blank"
                            className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                        >
                            <img className="w-6" src="/icons/github.svg" />
                            <span className="ml-3">Github</span>
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
                            href="https://discord.com/invite/pancakeswap"
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
                                <span className="break-all ml-3 mr-4 font-bold ">
                                    Check if you HODL or owned any $CAKE
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setType("own");
                                        setIsCakeInteractionModalOpen(true);
                                    }}
                                    className="
                                    flex items-center justify-center h-7 w-7
                                    bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                >
                                    {metamaskAddress && window && sessionStorage.getItem('cake_balance') ? <>
                                        <IconCheck color="green" />
                                    </>:<>
                                        <IconChevronRight fill="black" />
                                    </>}
                                    
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                            <div className="flex items-center">
                                <img className="h-6" src="/img/3p/cake.png" />
                                <span className="break-all ml-3 mr-4 font-bold ">
                                    Check if you staked/pooled any $CAKE
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setType("stake");
                                        setIsCakeInteractionModalOpen(true);
                                    }}
                                    className="
                                    flex items-center justify-center h-7 w-7
                                    bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                >
                                {window !== undefined ? <>
                                    {sessionStorage.getItem('isStaker') ? <>
                                        <IconCheck color="green" />
                                    </>:<>
                                        <IconChevronRight fill="black" />
                                    </>}
                                </> : <></>}
                                </button>
                            </div>
                        </div>
                    </div>

                    
                </div>
                <div className="flex flex-col h-fit w-[45%] bg-white text-black mt-4 gap-2 rounded-xl relative" id="links">
                    <div className="flex flex-col">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                            <a href='https://bscscan.com/address/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82' target="_blank">
                                <div className="flex items-center">
                                    <img className="h-6" src="/img/3p/cake.png" />
                                    <span className="break-all ml-3 mr-4 font-bold ">
                                        Contract - $CAKE Token 
                                    </span>
                                    <span className='text-xs text-gray hover:underline hover:scale-105 transition truncate'>0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82 (Explorer)</span>
                                </div>
                                </a>
                            <div>
                                
                            <IconChevronRight color="black" />

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                            <a href='https://bscscan.com/address/0x5aF6D33DE2ccEC94efb1bDF8f92Bd58085432d2c' target="_blank">
                                <div className="flex items-center">
                                    <img className="h-6" src="/img/3p/cake.png" />
                                    <span className="break-all ml-3 mr-4 font-bold ">
                                        Contract - Lottery 
                                    </span>
                                    <span className='text-xs text-gray hover:underline hover:scale-105 transition truncate'>0x5aF6D33DE2ccEC94efb1bDF8f92Bd58085432d2c (Explorer)</span>
                                </div>
                                </a>
                            <div>
                                
                            <IconChevronRight color="black" />

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
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
                    </div>
                    {/*
                    <div className="flex flex-col">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                            <div className="flex items-center">
                                <img className="h-6" src="/img/3p/cake.png" />
                                <span className="break-all ml-3 mr-4 font-bold ">
                                    Check if you staked/pooled any $CAKE
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setType("stake");
                                        setIsCakeInteractionModalOpen(true);
                                    }}
                                    className="
                                    flex items-center justify-center h-7 w-7
                                    bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                >
                                {sessionStorage.getItem('isStaker') ? <>
                                        <IconCheck color="green" />
                                    </>:<>
                                        <IconChevronRight fill="black" />
                                    </>}
                                </button> 
                            </div>
                        </div>
                    </div> */}

                    
                </div>
            </div>
        </>
    );
}
