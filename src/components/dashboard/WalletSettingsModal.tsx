"use client";

import { Dialog, Transition } from "@headlessui/react";
import { verify } from "crypto";
import { ethers } from "ethers";
import { Fragment, useEffect, useState } from "react";

type WalletSettingsModalProps = {
    isOpen: boolean;
    setIsOpen: any;
    wallet: any;
};

export function WalletSettingsModal({
    isOpen,
    setIsOpen,
    wallet,
}: WalletSettingsModalProps) {

    function closeModal() {
        setIsOpen(false);
    };

    // const walletOptions = ;

    // wallet?.preferrednetworks.forEach((e, i) => {
    //     const currentOption = e
    //     const currentIndex = walletOptions.findIndex((e, i) => {
    //         return e.key === currentOption
    //     })
    //     if (currentIndex > -1) {
    //         walletOptions[currentIndex].state = true;
    //     }
    // });


    const [selectedWallets, setSelectedWallets] = useState([]);
    const [walletVisiblity, setWalletVisibility] = useState<boolean>(true);

    useEffect(() => {
        const initialWallets = [
            { key: "eth", state: false, image: "/img/3p/eth.png", name: "ETH" },
            { key: "avax", state: false, image: "/img/3p/avaxpng.png", name: "AVAX" },
            { key: "matic", state: false, image: "/img/3p/matic.png", name: "POLYGON" },
            { key: "bnb", state: false, image: "/img/3p/bnb.png", name: "BSC" },
        ].map(walletObj => {
            return ({
                ...walletObj,
                state: wallet?.preferrednetworks?.includes(walletObj.key) ?? false
            })
        });

        setSelectedWallets(initialWallets);
    }, [wallet?.preferrednetworks]);

    const handleWalletSelect = (key: string) => {

        setSelectedWallets(prevState => prevState.map(wallet => {
            if (wallet.key === key) {
                return { ...wallet, state: !wallet.state }; // Toggle the state for the matched wallet
            }
            return wallet;
        }));
    };

    const verifyMessageEVM = async (address: string) => {
        const provider = new ethers.providers.Web3Provider(window["ethereum"])
        const signer = provider.getSigner()
        const verifyMessage = await signer.signMessage(`${address}`)
        // todo: add selected networks to address... 

        // todo: send this to backend ...shods
    };

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
                                        <span className='text-sm text-gray'>{wallet?.address}</span>
                                        {/* <span>d fkjdjkdsfjkdsf</span> */}
                                        <p className='text-sm text-start mt-2'>Select different networks to be visible on your profile, then sign a message.</p>
                                        <div className="mt-4 flex flex-col gap-2">
                                            <div

                                                className="cursor-pointer transition-all hover:bg-gray-200 flex items-center justify-between rounded-md bg-gray-100 shadow-sm px-3 py-2"
                                            >
                                                <div className="flex items-center">
                                                    {/* <img
                                                                src={
                                                                    selectedWallet.image
                                                                }
                                                                alt={
                                                                    selectedWallet.name
                                                                }
                                                                className="mr-2 h-5 w-5"
                                                            /> */}
                                                    <span className="text-sm font-semibold">
                                                        VISIBLE
                                                    </span>
                                                </div>
                                                <button onClick={(e) => setWalletVisibility(!walletVisiblity)} className={`w-20 rounded-md px-2 py-1 text-sm font-semibold uppercase ${walletVisiblity
                                                    ? "bg-green-400 hover:bg-green-500"
                                                    : "bg-gray-200 hover:bg-gray-300"
                                                    }`}>
                                                    {walletVisiblity == true ? 'ON' : 'OFF'}
                                                </button>
                                            </div>
                                            {console.log("RENDER SLEECTE", selectedWallets)}
                                            {selectedWallets.map(
                                                (selectedWallet, i) => {
                                                    return (
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
                                                                className={`w-20 rounded-md px-2 py-1 text-sm font-semibold ${selectedWallet.state
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
                                                    )
                                                })}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            onClick={(e) => verifyMessageEVM(wallet?.walletAddress)}
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

    const [tronlinkAddress, setTronlinkAddress] = useState<string | null>()
    const [algorandAddress, setAlgorandAddress] = useState<string | null>()

    const [walletVisiblity, setWalletVisibility] = useState<boolean>(true)

    const existingPreferredNetworks = wallet?.preferrednetworks;


    const handleWalletSelect = (key: string) => {
        setSelectedWallets(prevState => prevState.map(wallet => {
            if (wallet.key === key) {
                return { ...wallet, state: !wallet.state }; // Toggle the state for the matched wallet
            }
            return wallet; // Return other wallets unchanged
        }));
    };

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

                // const wallets = appState.userData.Wallet;

                // let walletIndex = wallets.findIndex(
                //     (wallet) => wallet.walletProvider == "tron",
                // );

                // if (walletIndex < 0) {
                //     wallets.push({
                //         walletProvider: "tronlink",
                //         walletAddress: account,
                //     });
                // }

                // if (!account) return reject();

                // const walletData = {
                //     network: "tronlink",
                //     address: account,
                // };
                // setNewWallets(prevWallets => [...prevWallets, walletData]);
                // return resolve(walletData);
            } catch (e) {
                console.log(e);
                return reject();
            }
        });
    }

    // async function connectAlgorandWallet() {
    //     try {
    //         peraWallet.connect().then((newAccounts: any) => {
    //             peraWallet.connector?.on(
    //                 "disconnect",
    //                 disconnectAlgorandWallet,
    //             );
    //             setAlgorandAddress(newAccounts[0]); // @ts-ignore
    //             // const algorandAccount = localStorage.getItem('walletconnect').accounts[0]
    //             const wallets = appState.userData.Wallet;
    //             let walletIndex = wallets.findIndex(
    //                 (wallet) => wallet.walletProvider == "algo",
    //             );

    //             if (walletIndex < 0 && newAccounts.length) {
    //                 wallets.push({
    //                     walletProvider: "algorand",
    //                     walletAddress: newAccounts[0],
    //                 });
    //             }

    //             const walletData = {
    //                 network: "algorand",
    //                 address: newAccounts[0],
    //             };

    //             setNewWallets(prevWallets => [...prevWallets, walletData]);
    //             return walletData
    //         });
    //     } catch (error) {
    //         //@ts-ignore
    //         if (error?.message.includes("Session currently connected"))
    //             disconnectAlgorandWallet(); //@ts-ignore
    //         if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
    //             console.log(error);
    //         }
    //     }
    // }


    // function disconnectAlgorandWallet() {
    //     peraWallet.disconnect();
    //     setAlgorandAddress(null);
    // }


    const connectWallet = async (wallet: any) => {
        console.log(wallet)
        console.log(`Connect ${wallet.name} wallet initiated`);

        if (wallet.id === "particle") {
        } else if (wallet.id === "metamask") {

        } else if (wallet.network === "tronlink") {
            await connectTronlink();
        } else if (wallet.id === "algorand") {
            // await connectAlgorandWallet();
        }
    };

    const verifyMessageTRON = async (address: string) => { // probably still needs more, but good...
        console.log(address)
        //@ts-ignore
        const tronWeb = window.tronWeb
        const signature = await tronWeb.trx.signMessageV2(address)
        const verifyMessage = await tronWeb.trx.verifyMessageV2(address, signature)
        console.log(verifyMessage, signature)
        // todo: send signature to backend ...shods
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
                                        <span className='text-sm text-gray'>{wallet?.address}</span>
                                        {/* <span>d fkjdjkdsfjkdsf</span> */}

                                        <p className='text-sm text-start mt-2'>Sign a message to verify your wallet as valid.</p>

                                        <div className="cursor-pointer transition-all hover:bg-gray-200 flex items-center justify-between rounded-md bg-gray-100 shadow-sm px-3 py-2">
                                            <div className="flex items-center">

                                                <span className="text-sm font-semibold">
                                                    VISIBLE
                                                </span>
                                            </div>
                                            <button onClick={(e) => setWalletVisibility(!walletVisiblity)} className={`w-20 rounded-md px-2 py-1 text-sm font-semibold uppercase ${walletVisiblity
                                                ? "bg-green-400 hover:bg-green-500"
                                                : "bg-gray-200 hover:bg-gray-300"
                                                }`}>
                                                {walletVisiblity == true ? 'ON' : 'OFF'}
                                            </button>


                                        </div>
                                    </div>

                                    <div className="mt-4 gap-y-4 ">
                                        {!tronlinkAddress ? <>

                                            <button
                                                onClick={(e) => connectWallet(wallet)}
                                                type="button"
                                                className={`bg-green-400 hover:bg-green-500 w-full justify-center rounded-md border border-transparent px-4 py-3 text-md font-medium transition mb-1`}>
                                                Connect {wallet?.name}
                                            </button>

                                            <button
                                                disabled
                                                onClick={(e) => verifyMessageTRON(wallet?.address)}
                                                type="button"
                                                className={`bg-green-400 opacity-70 w-full justify-center rounded-md border border-transparent px-4 py-3 text-md font-medium transition`}
                                            >
                                                Verify
                                            </button>
                                        </> : <>
                                            <button
                                                disabled
                                                type="button"
                                                className={`bg-green-400 w-full justify-center rounded-md border border-transparent px-4 py-3 text-md font-medium transition mb-1 disabled opacity-70`}>
                                                Connected
                                            </button>

                                            <button
                                                onClick={(e) => verifyMessageTRON(wallet?.address)}
                                                type="button"
                                                className={`bg-green-400 hover:bg-green-500 w-full justify-center rounded-md border border-transparent px-4 py-3 text-md font-medium transition`}
                                            >
                                                Verify
                                            </button>

                                        </>}

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
