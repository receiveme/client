"use client";

import toast from "react-hot-toast";
import { useWalletModal, useWalletStore } from "./connect-wallet.store";
import { metamask, tron } from "@/src/lib/connect";
import { Dialog } from "@headlessui/react";
import { useEffect } from "react";
import { useAppState } from "@/src/hooks/useAppState";
import { useRouter } from "next/navigation";

export function Wallet() {
    const isOpen = useWalletModal((state) => state.state);
    const setIsOpen = useWalletModal((state) => state.setState);
    const addWallet = useWalletStore((state) => state.addWallet);
    const selectWallet = useWalletStore((state) => state.selectWallet);

    const [appState, setAppState] = useAppState();

    const router = useRouter();

    const metamaskConnect = async () => {
        const loadingToast = toast.loading(
            "Connecting to your metamask account...",
        );
        metamask()
            .then((res: any) => {
                toast.remove(loadingToast);
                toast.success("Metamask account is successfully connected");
                localStorage.setItem("metamask-account", res["account"]);
                addWallet(res["account"], parseInt(res["chainId"]));
                selectWallet(res["account"]);

                router.push(`/onboard?address=${res["account"]}`);

                setAppState({
                    // userInfo,
                    userInfo: {
                        token: null,
                        uuid: res["account"],
                        wallets: [],
                    },
                });
                // Close the modal
            })
            .catch(() => {
                toast.remove(loadingToast);
                toast.error("Metamask connection request has been rejected");
            });
        setIsOpen(false);
    };

    const tronConnect = async () => {
        const loadingToast = toast.loading(
            "Connecting to your tronlink account...",
        );
        tron()
            .then((res: any) => {
                console.log(res, "tron res");
                toast.remove(loadingToast);
                toast.success("TronLink account is successfully connected");
                localStorage.setItem("tron-account", res["account"]);
                addWallet(res["account"], 0xffffff);
                selectWallet(res["account"]);

                router.push(`/onboard?address=${res["account"]}`);

                setAppState({
                    // userInfo,
                    userInfo: {
                        token: null,
                        uuid: res["account"],
                        wallets: [],
                    },
                });

                // Close the modal
                setIsOpen(false);
            })
            .catch(() => {
                toast.remove(loadingToast);
                toast.error("TronLink connection request has been rejected");
            });

        // Close the modal
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/20">
                <Dialog.Panel className="max-w-lg w-full space-y-4 border bg-white p-4 rounded-xl">
                    <Dialog.Title className="font-bold">
                        <h1 className="text-center text-2xl font-bold my-4">
                            Connect a Wallet
                        </h1>
                    </Dialog.Title>

                    <div
                        className="
                    flex justify-center gap-8 items-center
                    max-xs:flex-col"
                    >
                        {/* Networks */}
                        <div
                            onClick={tronConnect}
                            className="
                            bg-neutral-100 rounded-xl
                            flex flex-col justify-center items-center
                            mt-4 w-28 cursor-pointer
                            transition-all hover:bg-neutral-50 hover:scale-110"
                        >
                            <img
                                src="/img/3p/tronlink.png"
                                alt="Tron Link"
                                className="w-16 aspect-square mt-4"
                            />
                            <span className="my-4 font-medium">TronLink</span>
                        </div>

                        <div
                            onClick={metamaskConnect}
                            className="
                            bg-neutral-100 rounded-xl
                            flex flex-col justify-center items-center
                            mt-4 w-28 cursor-pointer
                            transition-all hover:bg-neutral-50 hover:scale-110"
                        >
                            <img
                                src="/img/3p/metamask.png"
                                alt="Metamask"
                                className="w-16 aspect-square mt-4"
                            />
                            <span className="my-4 font-medium">Metamask</span>
                        </div>
                    </div>

                    <div className="border-t-[1px] border-neutral-200 w-[calc(100%-50px)] m-auto flex justify-center max-xs:mt-5">
                        <p className="text-center text-gray-600 flex items-center mt-4 whitespace-nowrap max-xs:whitespace-normal">
                            New to Web3?&nbsp;&nbsp;
                            <a
                                href="https://learn.metamask.io/lessons/what-is-a-crypto-wallet"
                                target="_blank"
                                className="font-semibold flex items-center whitespace-nowrap max-xs:whitespace-normal"
                            >
                                Learn more about wallets&nbsp;
                                <img
                                    src="/icons/question-circle.svg"
                                    className="text-gray-600"
                                />
                            </a>
                        </p>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>

        // <div
        //     onClick={(e) => {
        //         if (e.target == e.currentTarget) set(false);
        //     }}
        //     className="
        //         fixed z-50 bg-[#000000E2] w-full h-full top-0 left-0
        //         flex items-center justify-center"
        // >
        //     <div
        //         className="
        //         bg-[#27272E] rounded-xl
        //         relative h-[320px] w-[80%] max-w-[600px]
        //         flex flex-col justify-center
        //         max-xs:py-4 max-xs:h-fit"
        //     >

        //     </div>
        // </div>
    );
}
