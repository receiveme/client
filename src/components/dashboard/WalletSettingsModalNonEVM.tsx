"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

type WalletSettingsModalProps = {
    isOpen: boolean;
    setIsOpen: any;
    wallet: any;
};

export function WalletSettingsModalNonEVM({
    isOpen,
    setIsOpen,
    wallet,
}: WalletSettingsModalProps) {
    function closeModal() {
        setIsOpen(false);
    }

    const [selectedWallets, setSelectedWallets] = useState([
        { key: "eth", state: false, image: "/img/3p/eth.png", name: "ETH" },
        { key: "tron", state: false, image: "/img/3p/tron.png", name: "TRON" },
        {
            key: "avax",
            state: false,
            image: "/img/3p/avaxpng.png",
            name: "AVAX",
        },
    ]);

    const handleWalletSelect = (key: string) => {
        setSelectedWallets((prevState) =>
            prevState.map((wallet) =>
                wallet.key === key
                    ? { ...wallet, state: !wallet.state }
                    : wallet,
            ),
        )
    };


    const verifyMessageTRON = async (address:string) => { // probably still needs more, but good...
        //@ts-ignore
        const tronWeb = window.tronWeb
        const signature = await tronWeb.trx.signMessageV2(address)
        const verifyMessage = await tronWeb.trx.verifyMessageV2(address, signature)

        // todo: send verifyMessage to backend ...shods
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
                                        <div className="flex gap-2 justify-center items-center">
                                            <img
                                                src={`/img/3p/${wallet?.image}`}
                                                alt={`Link ${wallet?.name}`}
                                                className="h-8 w-8"
                                            />
                                            <span>{wallet?.name}</span>
                                        </div>
                                    </Dialog.Title>

                                    <div className="mt-4 text-black">
                                        {wallet?.walletAddress}

                                        {/* <div className="mt-4 flex flex-col gap-2">
                                            {selectedWallets.map(
                                                (selectedWallet) => (
                                                    <div
                                                        key={selectedWallet.key}
                                                        className="cursor-pointer transition-all hover:bg-gray-200 flex items-center justify-between rounded-md bg-gray-100 shadow-sm px-3 py-2"
                                                    >
                                                        <div className="flex items-center">
                                                            <img
                                                                src={
                                                                    selectedWallet.image
                                                                }
                                                                alt={
                                                                    selectedWallet.name
                                                                }
                                                                className="mr-2 h-5 w-5"
                                                            />
                                                            <span className="text-sm font-semibold">
                                                                {
                                                                    selectedWallet.name
                                                                }
                                                            </span>
                                                        </div>
                                                        <button
                                                            className={`w-20 rounded-md px-2 py-1 text-sm font-semibold ${
                                                                selectedWallet.state
                                                                    ? "bg-green-400 hover:bg-green-500"
                                                                    : "bg-gray-200 hover:bg-gray-300"
                                                            }`}
                                                            onClick={() =>
                                                                handleWalletSelect(
                                                                    selectedWallet.key,
                                                                )
                                                            }
                                                        >
                                                            {selectedWallet.state
                                                                ? "Selected"
                                                                : "Select"}
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                        </div> */}
                                    </div>

                                    <div className="mt-4">
                                        <button
                                        onClick={(e)=>verifyMessageTRON(wallet?.walletAddress)}
                                            type="button"
                                            className={`bg-green-400 hover:bg-green-500 w-full justify-center rounded-md border border-transparent px-4 py-3 text-md font-medium transition`}
                                        >
                                            Verify
                                        </button>

                                        <button
                                            type="button"
                                            className="mt-2 w-full justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-3 text-md font-medium text-indigo-700 hover:bg-indigo-200 transition"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
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
