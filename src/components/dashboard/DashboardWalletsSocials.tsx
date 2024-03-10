"use client";

import React, { useState } from "react";

import { useAppState } from "@/src/hooks/useAppState";

import particle from "../../lib/particle";
import { createSocials, createWallets } from "@/src/actions";
import { PeraWalletConnect } from "@perawallet/connect";
import { IconLoader2, IconSettings } from "@tabler/icons-react";
import { WalletSettingsModal, WalletSettingsModalNonEVM } from "./WalletSettingsModal";

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
    { id: "particle", name: "Particle Wallet", image: "particle.png" }, // Particle Wallet ... is kinda tricky .. what do we do about this one ? we should make a
    { id: "metamask", name: "Metamask", image: "metamask.png" },
    { id: "tronlink", name: "Tronlink", image: "tron.png" },
    { id: "algorand", name: "MyPera Wallet (Algorand)", image: "mypera.png" },
    {
        id: "unstoppabledomains",
        name: "Unstoppable Domains",
        image: "unstoppabledomains.png",
        disabled: true,
    },
];

export default function DashboardWalletsSocials() {
    const [appState, setAppState] = useAppState();
    const [newWallets, setNewWallets] = useState([]);
    const [newSocials, setNewSocials] = useState([]);

    const { userData } = appState;

    const [metamaskAddress, setMetamaskAddress] = useState<string | null>();
    const [tronlinkAddress, setTronlinkAddress] = useState<string | null>();
    const [algorandAddress, setAlgorandAddress] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const [isWalletSettingsModalOpen, setIsWalletSettingsModalOpen] = useState(false);

    const [isNonEVMWalletSettingsModalOpen, setIsNonEVMWalletSettingsModalOpen] = useState(false);
    const [currentWallet, setCurrentWallet] = useState(null);

    const openWalletModal = async (wallet: any) => {
        setCurrentWallet(wallet);
        setIsWalletSettingsModalOpen(true);
    };

    const openNonEVMWalletModal = async (wallet: any) => {
        setCurrentWallet(wallet);
        setIsNonEVMWalletSettingsModalOpen(true);
    };
    const peraWallet = new PeraWalletConnect();
    const handleSocialLogin = async (social: any) => {
        console.log(`Login for ${social.name} initiated`);

        const user = await particle.auth.login({
            preferredAuthType: social.id,
        });

        const userId = userData?.Profile[0].userid;

        setAppState({ wallets: [], userInfo: user });

        const newSocial = {
            authType: social.id,
            socialUuid: user.uuid,
            socialUsername: user.thirdparty_user_info?.user_info.name,
            socialInfo: user,
            socialImg: user.avatar,
            socialId: String(user.thirdparty_user_info?.user_info.id),
        }

        const fetchSocialDetails = async () => {
            if (newSocial.authType == "github") {
                if (!newSocial.name && newSocial.socialId) {
                    let id = newSocial.socialId;
                    let res = await fetch(
                        `https://api.github.com/user/${id}`,
                    );
                    if (!res.ok) throw new Error("bad");

                    const json = await res.json();

                    newSocial.socialUsername = json.login;
                    newSocial.socialImg = json.avatar_url;
                }
            } else if (newSocial.authType == "twitch") {
                //TODO
            } else if (newSocial.authType == "twitter") {
                //TODO
            }
        }

        await fetchSocialDetails();

        const socialsData = {
            userid: userId,
            networkid: newSocial.authType === "github" ? newSocial.socialId : null,
            imageUrl: newSocial.socialImg ? newSocial.socialImg : null,
            name: newSocial.socialUsername ? newSocial.socialUsername : null,
            particle_token: newSocial.socialInfo.token ? newSocial.socialInfo.token : null,
            particle_uuid: newSocial.socialUuid ? newSocial.socialUuid : null,
            platform: newSocial.authType ? newSocial.authType : null
        }

        setNewSocials(prevSocials => [...prevSocials, socialsData]);
    };

    function connectMetamask() {
        return new Promise((resolve, reject) => {
            window["ethereum"]?.request({ method: "eth_chainId" })
                .then(chainId => {
                    return window["ethereum"]?.request({ method: "eth_requestAccounts" });
                })
                .then(accounts => {
                    if (accounts && accounts.length > 0) {
                        const accountAddress = accounts[0];
                        setMetamaskAddress(accountAddress);

                        const existingWalletIndex = appState.userData.Wallet.findIndex(wallet => wallet.walletProvider === "metamask");

                        let wallets = appState.userData.Wallet

                        if (existingWalletIndex < 0) {
                            wallets.push({
                                walletProvider: "metamask",
                                walletAddress: accountAddress,
                            });
                        }

                        const walletData = {
                            network: "metamask",
                            address: accountAddress,
                        };

                        // Here, we update the state before resolving the promise.
                        setNewWallets(walletData)
                        resolve(walletData); // Resolve the promise with wallet data
                    } else {
                        reject(new Error("No accounts returned from Metamask."));
                    }
                })
                .catch(error => {
                    console.error("METAMASK ERR:", error);
                    reject(new Error("Metamask connection failed: " + error.message));
                });
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

                const wallets = appState.userData.Wallet;

                let walletIndex = wallets.findIndex(
                    (wallet) => wallet.walletProvider == "tron",
                );

                if (walletIndex < 0) {
                    wallets.push({
                        walletProvider: "tronlink",
                        walletAddress: account,
                    });
                }

                if (!account) return reject();

                const walletData = {
                    network: "tronlink",
                    address: account,
                };
                setNewWallets(walletData)
                return resolve(walletData);
            } catch (e) {
                console.log(e);
                return reject();
            }
        });
    }

    async function connectAlgorandWallet() {
        try {
            peraWallet.connect().then((newAccounts: any) => {
                peraWallet.connector?.on(
                    "disconnect",
                    disconnectAlgorandWallet,
                );
                setAlgorandAddress(newAccounts[0]); // @ts-ignore
                // const algorandAccount = localStorage.getItem('walletconnect').accounts[0]
                const wallets = appState.userData.Wallet;
                let walletIndex = wallets.findIndex(
                    (wallet) => wallet.walletProvider == "algo",
                );

                if (walletIndex < 0 && newAccounts.length) {
                    wallets.push({
                        walletProvider: "algorand",
                        walletAddress: newAccounts[0],
                    });
                }

                const walletData = {
                    network: "algorand",
                    address: newAccounts[0],
                };

                setNewWallets(walletData)
                return walletData
            });
        } catch (error) {
            //@ts-ignore
            if (error?.message.includes("Session currently connected"))
                disconnectAlgorandWallet(); //@ts-ignore
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                console.log(error);
            }
        }
    }

    // function connectAlgorandWallet() {
    //     peraWallet
    //       .connect()
    //       .then((newAccounts) => {
    //         // Setup the disconnect event listener
    //         peraWallet.connector?.on("disconnect", disconnectAlgorandWallet);
    //         console.log(newAccounts)
    //         setAlgorandAddress(newAccounts[0]); //@ts-ignore
    //       }).reject((error) => {
    //         // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
    //         // For the async/await syntax you MUST use try/catch
    //         if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
    //           // log the necessary errors
    //         }
    //       });
    //   };

    function disconnectAlgorandWallet() {
        peraWallet.disconnect();
        setAlgorandAddress(null);
    }

    // Function to connect wallets
    const connectWallet = async (wallet: any) => {
        console.log(`Connect ${wallet.name} wallet initiated`);

        if (wallet.id === "particle") {
        } else if (wallet.id === "metamask") {
            await connectMetamask();
        } else if (wallet.id === "tronlink") {
            await connectTronlink();
        } else if (wallet.id === "algorand") {
            await connectAlgorandWallet();
        }
    };

    async function save() {
        const userId = userData?.Profile[0].userid;
        if (newWallets.length > 0) {
            await createWallets(userId, newWallets)
        }

        if (newSocials.length > 0) {
            await createSocials(userId, newSocials);
        }

    }

    return (
        <>
            <WalletSettingsModal
                isOpen={isWalletSettingsModalOpen}
                setIsOpen={setIsWalletSettingsModalOpen}
                wallet={currentWallet}
            />

            <WalletSettingsModalNonEVM
                isOpen={isNonEVMWalletSettingsModalOpen}
                setIsOpen={setIsNonEVMWalletSettingsModalOpen}
                wallet={currentWallet}
            />

            <div className="flex flex-col gap-4">
                <div className="w-full">
                    <h1 className="font-semibold text-lg">Socials</h1>
                    <h3 className="font-regular text-sm mt-1">
                        Link your socials to display them on your profile.
                    </h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
                        {SOCIALS.map((social) => {
                            let socialIndex = userData.Social.findIndex(
                                (linkedSocial) => {
                                    return linkedSocial.platform === social.id
                                }
                            );

                            const linked = socialIndex > -1;

                            return (
                                <button
                                    key={social.id}
                                    disabled={social.disabled || linked}
                                    onClick={() => handleSocialLogin(social)}
                                    className={`transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3 ${linked
                                        ? "border border-green-500/50"
                                        : ""
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
                                        {social.disabled
                                            ? " (Coming Soon)"
                                            : ""}
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
                            // Changed to findIndex because we need to match wallets[].walletProvider
                            let walletIndex = userData.Wallet.findIndex(
                                (linkedWallet) => {
                                    return linkedWallet.network === wallet.id
                                }
                            );

                            const linked = walletIndex > -1;

                            let linkedWallet = linked
                                ? userData.Wallet[walletIndex]
                                : false; // we should do something with this data ...

                            return (
                                <div key={wallet.id}>
                                    <div
                                        onClick={() =>
                                            !linked ? connectWallet(wallet) : {}
                                        }
                                        className={`cursor-pointer transition-all hover:bg-gray-200 flex w-full items-center rounded-md bg-gray-100 shadow-sm px-3 py-3 ${linked
                                            ? "border border-green-500/50"
                                            : ""
                                            } ${wallet.disabled ? "opacity-60" : ""
                                            }`}
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
                                            {wallet.disabled
                                                ? " (Coming Soon)"
                                                : ""}
                                        </span>

                                        {linked && (
                                            <div
                                                onClick={wallet.id == 'metamask' || wallet.id == 'particle' ? (e)=>
                                                    openWalletModal({
                                                        ...wallet,
                                                        ...(linkedWallet as Record<
                                                            string,
                                                            any
                                                        >),
                                                    }) : (e)=> openNonEVMWalletModal({
                                                        ...wallet,
                                                        ...(linkedWallet as Record<
                                                            string,
                                                            any
                                                        >),
                                                    })
                                                }
                                                className="ml-auto p-1.5 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                            >
                                                <IconSettings size="16" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button
                    className="mt-3 hover:scale-[1.01] duration-500 transition w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 px-4 rounded-md text-white font-bold flex items-center justify-center"
                    onClick={save}
                >
                    {isLoading ? (
                        <>
                            <IconLoader2 className="animate-spin" />
                        </>
                    ) : (
                        <>Save</>
                    )}
                </button>
            </div>
        </>
    );
}
