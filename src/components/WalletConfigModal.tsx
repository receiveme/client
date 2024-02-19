import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

type WalletConfigModalProps = {
    isOpen: boolean;
    setIsOpen: any;

};

export function WalletConfigModal({
    isOpen,
    setIsOpen,

}: WalletConfigModalProps) {
    function closeModal() {
        setIsOpen(false);
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
                                        {/* <QRCodeSVG value={address} size={256} /> */}

                                        <p className="font-medium mt-4">
                                            For EVM based-agnostic chains, what supported networks do you want to show on your profile?
                                        </p>
                                            
                                            <div>
                                                <input type="checkbox" id="ETH" name="ETH" checked />
                                                <label for="ETH">ETH</label>
                                            </div>

                                            <div>
                                                <input type="checkbox" id="avax" name="avax" checked />
                                                <label for="avax">AVAX</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="matic" name="matic" />
                                                <label for="matic">MATIC</label>
                                            </div>
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
