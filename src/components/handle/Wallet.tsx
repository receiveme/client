"use client";

import { IconCopy, IconQrcode } from "@tabler/icons-react";
import { useState } from "react";
import Toast from "../toast";
import { WalletQRCodeModal } from "./WalletQRCodeModal";

type WalletProps = {
    network: string;
    address: string;
};

export function Wallet({ network, address }: WalletProps) {
    

    const originalWalletAddress = address;
    
    const [walletAddress, setWalletAddress] = useState(address);

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
                network={network}
                address={originalWalletAddress}
            />

            <div className="flex bg-white rounded-lg shadow-sm py-2 px-1">
                <div className="flex items-center justify-center ml-2">
                    <img
                        src={network == 'ETH' ? "/img/3p/eth.png" : network == 'tron' ? '/img/3p/tron.png': '/img/3p/eth.png'}
                        className={`w-[28px] h-[auto]`}
                    />
                </div>
                <div className="ml-3 w-full flex flex-col flex-shrink-1">
                    <p className="text-sm font-bold overflow-ellipsis">{network.toUpperCase()}</p>
                    <span className="text-xs font-light">{walletAddress}</span>
                </div>
                <div className="ml-auto mr-1 flex gap-1.5">
                    <button
                        onClick={copyAddress}
                        className={`bg-[#eee] rounded-md px-3 py-2 hover:scale-[1.05] transition h-full ${
                            copied ? "bg-green-400 text-white" : ""
                        }`}
                    >
                        <IconCopy className="w-4 h-4" />
                    </button>

                    <button
                        onClick={showQRCode}
                        className="bg-[#eee] rounded-md px-3 py-2 hover:scale-[1.05] transition h-full"
                    >
                        <IconQrcode className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </>
    );
}
