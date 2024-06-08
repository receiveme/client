"use client";

import { IconCopy, IconQrcode } from "@tabler/icons-react";
import { useState } from "react";
import Toast from "../toast";
import { WalletQRCodeModal } from "./WalletQRCodeModal";
import Algorand from "../../../public/img/networks/algo.png";
import Eth from "../../../public/img/networks/eth.png";
import Avax from "../../../public/img/networks/avax.png";
import Tron from "../../../public/img/networks/trx.png";
import Bnb from "../../../public/img/networks/bnb.png";
import Matic from "../../../public/img/networks/matic.png";
// import styles from "Wallet.module.css"
import "../../app/globals.css";
import { useQuery } from "@tanstack/react-query";
import { Select } from "../select";

type WalletProps = {
    address: string;
    preferrednetwork: string | string[];
};

const getNetworkImage = (network: string) => {
    return network === "eth"
        ? Eth.src
        : network === "tron"
        ? Tron.src
        : network === "avax"
        ? Avax.src
        : network === "algorand"
        ? Algorand.src
        : network === "polygon" || network == "matic"
        ? Matic.src
        : network === "bnb"
        ? Bnb.src
        : "";
};

export function Wallet({ address, preferrednetwork }: WalletProps) {
    const originalWalletAddress = address;
    const [walletAddress, setWalletAddress] = useState(
        `${address.substring(0, 8)}.....${address.slice(-10)}`,
    );

    const [selectedNetwork, setSelectedNetwork] = useState("");
    const [showSelectedNetworks, setShowSelectedNetworks] = useState(false);

    const [copied, setCopied] = useState(false);

    const { data: resolvedDomain } = useQuery<string>({
        queryKey: [
            "/api/domains/resolve/multiple",
            { address, preferrednetwork, selectedNetwork },
        ],
        queryFn: async () => {
            const res = await fetch(
                `/api/domains/resolve/multiple/${address}?chain=${
                    isPrefferedNetworkArray ? selectedNetwork : preferrednetwork
                }`,
            );
            const json = await res.json();

            if (json?.data) {
                return json?.data;
            }

            return null;
        },
        staleTime: Number.POSITIVE_INFINITY,
    });

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

    const isPrefferedNetworkArray = Array.isArray(preferrednetwork);

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
                network={selectedNetwork}
                address={originalWalletAddress}
            />

            <div className="flex bg-white rounded-lg shadow-sm py-2 px-1">
                <div className="flex items-center justify-center ml-2">
                    <div className={"preferred-networks basis-20"}>
                        {isPrefferedNetworkArray ? (
                            <div className="flex items-center">
                                <Select
                                    options={preferrednetwork.map(
                                        (network, i) => {
                                            return {
                                                value: network,
                                                label: (
                                                    <img
                                                        key={i}
                                                        src={getNetworkImage(
                                                            network,
                                                        )}
                                                        className={`w-[28px] h-[auto]`}
                                                    />
                                                ),
                                            };
                                        },
                                    )}
                                    onChange={(s) => {
                                        setSelectedNetwork(s.value);
                                        setShowSelectedNetworks(true);
                                    }}
                                />
                            </div>
                        ) : (
                            <img
                                onClick={() => setShowSelectedNetworks(true)}
                                src={getNetworkImage(preferrednetwork)}
                                className={`w-[28px] h-[auto] selected-network-item`}
                            />
                        )}
                    </div>
                </div>
                <div className="ml-3 w-full flex flex-col flex-shrink-1">
                    <p className="text-sm font-bold overflow-ellipsis">
                        {resolvedDomain ||
                            (Array.isArray(preferrednetwork)
                                ? selectedNetwork.toUpperCase()
                                : preferrednetwork?.toUpperCase())}
                    </p>
                    <span className="hidden xs:block text-xs font-light">
                        {originalWalletAddress}
                    </span>
                    <span className="block xs:hidden text-xs font-light">
                        {walletAddress}
                    </span>
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
                        className={`bg-[#eee] rounded-md px-3 py-2 hover:scale-[1.05] transition h-full`}
                    >
                        <IconQrcode className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </>
    );
}
