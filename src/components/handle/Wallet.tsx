"use client";

import { IconCopy, IconQrcode } from "@tabler/icons-react";
import { useState } from "react";
import Toast from "../toast";
import { WalletQRCodeModal } from "./WalletQRCodeModal";
<<<<<<< HEAD
import Algorand from "../../../public/img/3p/algorand.png"
import Eth from "../../../public/img/3p/eth.png"
import Polygon from "../../../public/img/3p/polygonsvg.png"
import Avax from "../../../public/img/3p/avaxpng.png"
import Tron from "../../../public/img/3p/tron.png"
// import styles from "Wallet.module.css"
import "../../app/globals.css"

type WalletProps = {
    address: string;
    preferrednetwork: any
};

export function Wallet({ address, preferrednetwork }: WalletProps) {
    const originalWalletAddress = address;
    const [selectedNetwork, setSelectedNetwork] = useState(0)
    const [walletAddress, setWalletAddress] = useState(address);
    const [showSelectedNetworks, setShowSelectedNetworks] = useState(false);
=======

type WalletProps = {
    network: string,
    address: string,
    balance: any,
};

export function Wallet({ network, address, balance = 0 }: WalletProps) {
    const originalWalletAddress = address;

    const [walletAddress, setWalletAddress] = useState(address);
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f

    if (walletAddress.length > 50) {
        setWalletAddress(
            `${walletAddress.substring(0, 8)}.....${walletAddress.slice(-10)}`,
        );
    }

    const [copied, setCopied] = useState(false);

    function copyAddress() {
        if (!navigator.clipboard) {
            var textArea = document.createElement("textarea");
            textArea.value = originalWalletAddress;

            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand("copy");
                var msg = successful ? "successful" : "unsuccessful";
                console.log("Fallback: Copying text command was " + msg);
            } catch (err) {
                console.error("Fallback: Oops, unable to copy", err);
            }

            document.body.removeChild(textArea);

            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
            return;
        }

        navigator.clipboard.writeText(originalWalletAddress).then(
            function () {
                console.log("Async: Copying to clipboard was successful!");
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            },
            function (err) {
                console.error("Async: Could not copy text: ", err);
            },
        );
    }

    const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

    function showQRCode() {
        setIsQRCodeModalOpen(true);
    }

    return (
        <>
            <Toast
                show={copied}
                setShow={setCopied}
                type="success"
                title="Copied address"
            />

            <WalletQRCodeModal
                isOpen={isQRCodeModalOpen}
                setIsOpen={setIsQRCodeModalOpen}
<<<<<<< HEAD
                network={preferrednetwork}
=======
                network={network}
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
                address={originalWalletAddress}

            />

            <div className="flex bg-white rounded-lg shadow-sm py-2 px-1">
                <div className="flex items-center justify-center ml-2">
<<<<<<< HEAD
                    <div className={"preferred-networks"}>
                        {/* <div className={showSelectedNetworks ? "preferred-networks-dropdown" : "preferred-networks-dropdown-hide"}>
                            {preferrednetworks.map((network, i) => {
                                return (
                                    <img
                                        key={i}
                                        onClick={() => {
                                            const index = preferrednetworks.findIndex((e, i) => {
                                                return e === network
                                            })
                                            setSelectedNetwork(index)
                                            setShowSelectedNetworks(false)
                                        }}
                                        src={
                                            preferrednetworks[i] === "eth"
                                                ? Eth.src
                                                : preferrednetworks[i] === "tron"
                                                    ? Tron.src
                                                    : preferrednetworks[i] === "avax"
                                                        ? Avax.src
                                                        : preferrednetworks[i] === "algorand"
                                                            ? Algorand.src
                                                            : null
                                        }
                                        className={`w-[28px] h-[auto] network-dropdown-item`}
                                    />
                                )
                            })
                            }
                        </div> */}
                        <img
                            onClick={() => setShowSelectedNetworks(true)}
                            src={
                                preferrednetwork === "eth"
                                    ? Eth.src
                                    : preferrednetwork === "tron"
                                        ? Tron.src
                                        : preferrednetwork === "avax"
                                            ? Avax.src
                                            : preferrednetwork === "algorand"
                                                ? Algorand.src
                                                : preferrednetwork === "polygon"
                                                    ? Polygon.src
                                                    : null
                            }
                            className={`w-[28px] h-[auto] selected-network-item`}
                        />
                    </div>

                </div>
                <div className="ml-3 w-full flex flex-col flex-shrink-1">
                    <p className="text-sm font-bold overflow-ellipsis">
                        {preferrednetwork.toUpperCase()}
                    </p>
                    <span className="text-xs font-light">{walletAddress}</span>
                </div>
=======
                    <img
                        src={
                            network == "ETH"
                                ? "/img/3p/eth.png"
                                : network == "tron"
                                    ? "/img/3p/tron.png"
                                    : "/img/3p/eth.png"
                        }
                        className={`w-[28px] h-[auto]`}
                    />
                </div>
                <div className="ml-3 w-full flex flex-col flex-shrink-1">
                    <p className="text-sm font-bold overflow-ellipsis">
                        {network.toUpperCase()}
                    </p>
                    <span className="text-xs font-light">{walletAddress}</span>
                </div>

                <div className="ml-auto mr-2 flex gap-1.5 items-center">
                    <span className="text-gray-400 text-sm">${(balance?.["usd_balance"] || 0)?.toFixed(2)}</span>
                </div>

>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
                <div className="ml-auto mr-1 flex gap-1.5">
                    <button
                        onClick={copyAddress}
                        className={`bg-[#eee] rounded-md px-3 py-2 hover:scale-[1.05] transition h-full ${copied ? "bg-green-400 text-white" : ""
                            }`}
                    >
                        <IconCopy className="w-4 h-4" />
                    </button>

                    <button
                        onClick={showQRCode}
                        className={`bg-[#eee] rounded-md px-3 py-2 hover:scale-[1.05] transition h-full`}
                    >
                        <IconQrcode className="h-4 w-4" />
                    </button>
                </div>
<<<<<<< HEAD
            </div >
=======
            </div>
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
        </>
    );
}
