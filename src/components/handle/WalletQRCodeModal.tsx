import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

type WalletQRCodeModalProps = {
    address: string;
    network: string;
    isOpen: boolean;
    setIsOpen: any;
};

export function WalletQRCodeModal({
    address,
    network = "",
    isOpen,
    setIsOpen,
}: WalletQRCodeModalProps) {
    console.log({ network });

    function closeModal() {
        setIsOpen(false);
    }

    let explorerLink;
    if (network.toUpperCase() == "TRON") {
        explorerLink = `https://tronscan.org/address/${address}`;
    } else if (network.toUpperCase() == "ETH") {
        explorerLink = `https://etherscan.io/address/${address}`;
    } else if (network.toUpperCase() == "BNB") {
        explorerLink = `https://bscscan.com/address/${address}`;
    } else if (network.toUpperCase() == "MATIC") {
        explorerLink = `https://polygonscan.com/address/${address}`;
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
                                        QR Code
                                    </Dialog.Title>

                                    <div className="mt-6 flex flex-col items-center justify-center">
                                        <QRCodeSVG value={address} size={256} />

                                        <p className="font-medium mt-4">
                                            {network.toUpperCase() ==
                                            "(ETH) EVM"
                                                ? "EVM (ETH, AVAX...)"
                                                : network.toUpperCase()}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {address}
                                        </p>

                                        <p className="text-xs italic text-gray-500 mb-3">
                                            Send{" "}
                                            {network.toUpperCase() == "TRON"
                                                ? "TRC20 & other tokens/value on TRON network to this address."
                                                : network.toUpperCase() == "ETH"
                                                ? "ERC20 & other tokens/value on Ethereum network to this address."
                                                : network.toUpperCase() ==
                                                  "AVAX"
                                                ? "ERC20 tokens on AVAX network to this address."
                                                : network.toUpperCase() == "BNB"
                                                ? "BRC20 & other tokens/value on BSC network to this address."
                                                : network.toUpperCase() ==
                                                  "MATIC"
                                                ? "ERC20 tokens/value on Matic network to this address."
                                                : network.toUpperCase() ==
                                                  "BASE"
                                                ? "ERC20 tokens/value on Base network to this address."
                                                : ""}
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="w-full justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-3 text-md font-medium text-indigo-700 hover:bg-indigo-200 transition"
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
