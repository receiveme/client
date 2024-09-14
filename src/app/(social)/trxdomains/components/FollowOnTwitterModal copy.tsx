import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

export const FollowOnTwitterModal = ({
    isOpen,
    setIsOpen,
    setIsTwitterLinkClicked,
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setIsTwitterLinkClicked: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsOpen(false)}
            >
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
                                    Follow @trxdomains on twitter
                                </Dialog.Title>

                                <div className="mt-4 text-black">
                                    You will be redirected to twitter account
                                    for trxdomains.
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className={`w-full justify-center rounded-md border border-transparent  "bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-3 text-md font-medium transition`}
                                        onClick={() => {
                                            localStorage.setItem(
                                                "trxdomains:twitter-link-clicked",
                                                "true",
                                            );

                                            window.open(
                                                "https://twitter.com/intent/follow?screen_name=trxdomains",
                                                "_blank",
                                            );
                                            setIsOpen(false);
                                            setIsTwitterLinkClicked(true);
                                        }}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
