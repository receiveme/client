import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";

type CakeInteractionModalProps = {
    isOpen: boolean;
    setIsOpen: any;
    setMetamaskAddress: any;
};

export function CakeInteractionModal({
    isOpen,
    setIsOpen,
    setMetamaskAddress,
}: CakeInteractionModalProps) {
    function closeModal() {
        setIsOpen(false);
    }

    async function connectMetamask() {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x38" }],
            });
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(accounts);
            if (accounts.length > 0) {
                setMetamaskAddress(accounts[0]);
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

                                    <div className="mt-3 text-black">
                                        Connect your metamask wallet to see if
                                        you have interacted with the $CAKE
                                        contract.
                                    </div>

                                    <div className="mt-3">
                                        <button
                                            type="button"
                                            className="w-full justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-3 text-md font-medium text-indigo-700 hover:bg-indigo-200 transition"
                                            onClick={connectMetamask}
                                        >
                                            Connect
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
