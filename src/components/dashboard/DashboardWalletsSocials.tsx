"use client";

import React, { useState } from "react";

import { useAppState } from "@/src/hooks/useAppState";

import particle from "../../lib/particle";

import { PeraWalletConnect } from "@perawallet/connect";

const SOCIALS = [
    { id: "discord", name: "Discord", image: "discord.png" },
    { id: "github", name: "GitHub", image: "github.png" },
    { id: "twitter", name: "Twitter", image: "twitter.png" },
    { id: "twitch", name: "Twitch", image: "twitch.png" },
    { id: "linkedin", name: "LinkedIn", image: "linkedin.png" },
    { id: "paypal", name: "Paypal", image: "paypal.png", disabled: true },
    {
        id: "instagram",
        name: "Instagram",
        image: "instagram.png",
        disabled: true,
    },
];
const WALLETS = [
    { id: "particle", name: "Particle Network", image: "particle.png" },
    { id: "metamask", name: "Metamask", image: "metamask.png" },
    { id: "tronlink", name: "Tronlink", image: "tron.png" },
    { id: "algorand", name: "Algorand (MyPera Wallet)", image: "algorand.png" },
    {
        id: "unstoppabledomains",
        name: "Unstoppable Domains",
        image: "unstoppabledomains.png",
        disabled: true,
    },
];

export default function DashboardWalletsSocials() {
    const [appState, setAppState] = useAppState();
    const { logins } = appState;

    const [metamaskAddress, setMetamaskAddress] = useState<string | null>();
    const [tronlinkAddress, setTronlinkAddress] = useState<string | null>();
    const [algorandAddress, setAlgorandAddress] = useState<string | null>();
    const peraWallet = new PeraWalletConnect();

    const handleSocialLogin = async (social: any) => {
        console.log(`Login for ${social.name} initiated`);

        const user = await particle.auth.login({
            preferredAuthType: social.id,
        });
        const userSocials = appState.socials;

        setAppState({ wallets: [], userInfo: user });

        let userSocialsIndex = userSocials.findIndex(
            (userSocial: any) => userSocial.authType == social.id,
        );

        if (userSocialsIndex < 0) {
            userSocials.push({
                authType: social.id,
                socialUuid: user.uuid,
                socialUsername: user.thirdparty_user_info?.user_info.name,
                socialInfo: user,
                socialImg: user.avatar,
                socialId: String(user.thirdparty_user_info?.user_info.id),
            });
        }

        setAppState({
            socials: userSocials,
            logins: [...appState.logins, social.id],
        });
    };

    function connectMetamask() {
        return new Promise(async (resolve, reject) => {
            const chainId = await window["ethereum"]?.request({
                method: "eth_chainId",
            });
            const accounts = await window["ethereum"]
                ?.request({ method: "eth_requestAccounts" }) // @ts-ignore
                .catch((e) => {
                    console.error("METAMASK ERR:", e);
                    return reject();
                });
            // After connection

            if (accounts?.length && accounts[0] && chainId) {
                setMetamaskAddress(accounts[0]);

                const wallets = appState.wallets;

                let walletIndex = wallets.findIndex(
                    (wallet) => wallet.walletProvider == "metamask",
                );

                if (walletIndex < 0) {
                    wallets.push({
                        walletProvider: "metamask",
                        walletAddress: accounts[0],
                    });
                }

                setAppState({ wallets });
            } else return reject();
        });
    }

    function connectTronlink() {
        return new Promise(async (resolve, reject) => {
            try {
                //@ts-ignore
                await window["tronLink"]?.request({
                    method: "tron_requestAccounts",
                    params: {
                        websiteName: "receive.me",
                    },
                }); //@ts-ignore
                let tronLink = { ...(await window["tronLink"]) };

                // After connection
                let account = tronLink.tronWeb.defaultAddress.base58;
                setTronlinkAddress(account);

                const wallets = appState.wallets;
                let walletIndex = wallets.findIndex(
                    (wallet) => wallet.walletProvider == "tron",
                );
                if (walletIndex < 0) {
                    wallets.push({
                        walletProvider: "tron",
                        walletAddress: account,
                    });
                }

                setAppState({ wallets });

                if (!account) return reject();

                return resolve({ account, chain: "tron" });
            } catch (e) {
                console.log(e);
                return reject();
            }
        });
    }

    async function connectAlgorandWallet() {
        try {
            const connect = await peraWallet
                .connect()
                .then((newAccounts: any) => {
                    // Setup the disconnect event listener
                    peraWallet.connector?.on(
                        "disconnect",
                        disconnectAlgorandWallet,
                    );
                    setAlgorandAddress(newAccounts[0]);

                    const wallets = appState.wallets;
                    let walletIndex = wallets.findIndex(
                        (wallet) => wallet.walletProvider == "algo",
                    );
                    if (walletIndex < 0) {
                        wallets.push({
                            walletProvider: "algo",
                            walletAddress: newAccounts[0],
                        });
                    }

                    setAppState({ wallets });
                });
        } catch (error) {
            //@ts-ignore
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                console.log(error);
            }
        }
    }

    function disconnectAlgorandWallet() {
        peraWallet.disconnect();
        setAlgorandAddress(null);
    }

    // Function to connect wallets
    const connectWallet = async (wallet: any) => {
        console.log(`Connect ${wallet.name} wallet initiated`);

        if (wallet.id === "particle") {
        } else if (wallet.id === "metamask") {
            connectMetamask();
        } else if (wallet.id === "tronlink") {
            connectTronlink();
        } else if (wallet.id === "algorand") {
            connectAlgorandWallet();
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full">
                <h1 className="font-semibold text-lg">Socials</h1>
                <h3 className="font-regular text-sm mt-1">
                    Link your socials to display them on your profile.
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
                    {SOCIALS.map((social) => {
                        const linked = logins.includes(social.id);
                        return (
                            <button
                                key={social.id}
                                disabled={social.disabled || linked}
                                onClick={() => handleSocialLogin(social)}
                                className={`transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3 ${
                                    linked ? "border border-green-500/50" : ""
                                } ${social.disabled ? "opacity-60" : ""}`}
                            >
                                <img
                                    src={`/img/3p/${social.image}`}
                                    alt={`Link ${social.name}`}
                                    className="mr-2 h-auto w-5"
                                />
                                <span className="text-sm font-semibold">
                                    {linked
                                        ? `Linked ${social.name}`
                                        : `Link ${social.name}`}
                                    {social.disabled ? " (Coming Soon)" : ""}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="w-full mt-6">
                <h2 className="font-semibold text-lg">Wallets</h2>
                <h3 className="font-regular text-sm mt-1">
                    Link your wallets and start getting paid.
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-2">
                    {WALLETS.map((wallet) => {
                        const linked = logins.includes(wallet.id);
                        return (
                            <button
                                key={wallet.id}
                                onClick={() => connectWallet(wallet)}
                                disabled={wallet.disabled || linked}
                                className={`transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3 ${
                                    linked ? "border border-green-500/50" : ""
                                } ${wallet.disabled ? "opacity-60" : ""}`}
                            >
                                <img
                                    src={`/img/3p/${wallet.image}`}
                                    alt={`Link ${wallet.name}`}
                                    className="mr-2 h-5 w-5"
                                />
                                <span className="text-sm font-semibold">
                                    {linked
                                        ? `Linked ${wallet.name}`
                                        : `Link ${wallet.name}`}
                                    {wallet.disabled ? " (Coming Soon)" : ""}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
