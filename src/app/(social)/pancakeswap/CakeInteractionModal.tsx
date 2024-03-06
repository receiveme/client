"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import CAKEABI from "./cakeabi.json";
import CAKESTAKEABI from "./cakepool.json";
import { Contract, ethers } from "ethers";

type CakeInteractionModalProps = {
    isOpen: boolean;
    setIsOpen: any;
    metamaskAddress: string;
    setMetamaskAddress: any;
    type: "own" | "stake";
};

export function CakeInteractionModal({
    isOpen,
    setIsOpen,
    metamaskAddress,
    setMetamaskAddress,
    type,
}: CakeInteractionModalProps) {
    const [balance, setBalance] = useState("");
    const [userInfo, setUserInfo] = useState<number|null>(null);

    function closeModal() {
        setIsOpen(false);
    }

    async function checkCAKEBNB(address: string) {
        console.log(123)
        let provider = new ethers.providers.JsonRpcProvider(
            "https://binance.nodereal.io",
        );
        let contract = new ethers.Contract(
            "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
            CAKEABI,
            provider,
        );

        const _balance = await contract.balanceOf(address);

        // Convert bigint to normal price
        console.log(ethers.utils.formatEther(_balance));
        setBalance(ethers.utils.formatEther(_balance));
        sessionStorage.setItem('cake_balance', ethers.utils.formatEther(_balance))
    }

    async function checkCAKESTAKE(address: string) {
        console.log(address)
        let provider = new ethers.providers.JsonRpcProvider(
            "https://binance.nodereal.io",
        );
        // let signer = await provider.getSigner();
        let contract = new ethers.Contract(
            "0x45c54210128a065de780C4B0Df3d16664f7f859e",
            CAKESTAKEABI,
            provider,
        );

        let calculateOverdueFee = await contract.calculateOverdueFee(address); // Closer to binary return statement ...

        let isStaker = parseInt(calculateOverdueFee?._hex)
        if (isStaker) localStorage.setItem('isStaker', 'true')
        setUserInfo(isStaker);
    }

    async function connectMetamask() {
        try {
            try {
                await window["ethereum"].request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x38" }],
                });
            } catch (err: any) {
                if (err.code === 4902) {
                    try {
                        await window["ethereum"].request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0x38",
                                    chainName: "Binance Smart Chain",
                                    nativeCurrency: {
                                        name: "Binance Coin",
                                        symbol: "BNB",
                                        decimals: 18,
                                    },
                                    rpcUrls: [
                                        "https://bsc-dataseed.binance.org/",
                                    ],
                                    blockExplorerUrls: ["https://bscscan.com"],
                                },
                            ],
                        });
                    } catch (addError) {
                        console.error(addError);
                    }
                }
            }
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            if (accounts.length > 0) {
                setMetamaskAddress(accounts[0]);
                checkCAKEBNB(accounts[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-center shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-bold leading-6 text-gray-900"
                                    >
                                        $CAKE
                                    </Dialog.Title>

                                    {!!metamaskAddress ? (
                                        <>
                                            <div className="mt-4">
                                                <div className="text-sm font-bold text-black">
                                                    Address
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {metamaskAddress}
                                                </div>

                                                <div className="text-black text-md mt-4">
                                                    {balance ? <>
                                                    🎉 {balance} $CAKE 🎉
                                                    <span></span>
                                                    </> : <>
                                                    0 $CAKE
                                                    </>} 
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mt-4 text-black">
                                            Connect your metamask wallet to see
                                            if you HODL or STAKE any
                                            $CAKE!
                                        </div>

                                    )}
                                        {userInfo && userInfo == null ? <>
                                            <div className="mt-4 text-black">
                                            🎉 Verified Staker & Holder 🎉
                                        </div>
                                        </> : userInfo == null ? <>
                                            
                                        </> : 
                                        
                                        <>
                                            <div className='mt-5 text-black'>No stake from your address, in PancakeSwap's pools </div>
                                        </>}
                                    <div className="mt-4">
                                    <button
                                            type="button"
                                            className={`w-full justify-center rounded-md border border-transparent ${
                                                !metamaskAddress
                                                    ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                                                    : "bg-green-200 hover:bg-green-300 text-green-700"
                                            } px-4 py-3 text-md font-medium transition`}
                                            onClick={
                                                type === "own"
                                                    ? connectMetamask
                                                    :()=> checkCAKESTAKE(metamaskAddress)
                                            }
                                        >
                                            {!!metamaskAddress ? (
                                                <>Connected</>
                                            ) : (
                                                <>Connect</>
                                            )}
                                        </button>
                                        {metamaskAddress ? <>
                                            <button
                                                type="button"
                                                className={`w-full justify-center rounded-md border border-transparent ${!metamaskAddress ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                                                        : "bg-green-200 hover:bg-green-300 text-green-700"
                                                } px-4 py-3 text-md font-medium transition`}
                                                onClick={()=> checkCAKESTAKE(metamaskAddress)}
                                            >

                                            {metamaskAddress ? (
                                                <>Check if staked CAKE</>
                                            ) : (
                                                <>
                                                
                                                </>
                                            )}
                                            </button>

                                            </> : <>
                                            
                                            </>}
                                        

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
