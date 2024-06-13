"use client";

import { IconCopy, IconQrcode } from "@tabler/icons-react";
import { useMemo, useState } from "react";
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
    // address: string;
    // preferrednetwork: string | string[];
    wallet:
        | {
              address: string;
              network: string | null;
              preferrednetworks: string[];
          }[]
        | undefined;
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

const formatData = (data: WalletProps["wallet"]) => {
    const formattedData: {
        address: string;
        network: string | null;
        chain: string;
    }[] = [];

    data?.map((d) => {
        d.preferrednetworks.map((pn) => {
            formattedData.push({
                address: d.address,
                network: d.network,
                chain: pn,
            });
        });
    });

    return formattedData;
};

const formatCryptoAddress = (address: string) => {
    return `${address.substring(0, 8)}.....${address.slice(-10)}`;
};

export function Wallet({ wallet }: WalletProps) {
    const [walletAddress, setWalletAddress] = useState(
        wallet?.[0]?.address || "",
    );

    const [selectedNetwork, setSelectedNetwork] = useState(
        wallet?.[0]?.network || "",
    );
    const [showSelectedNetworks, setShowSelectedNetworks] = useState(false);

    const formattedData = useMemo(() => formatData(wallet), []);

    const [copied, setCopied] = useState(false);

    const { data: resolvedDomain } = useQuery<string>({
        queryKey: [
            "/api/domains/resolve/multiple",
            { address: walletAddress, selectedNetwork },
        ],
        queryFn: async () => {
            const res = await fetch(
                `/api/domains/resolve/multiple/${walletAddress}?chain=${selectedNetwork}`,
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
            textArea.value = walletAddress;

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

        navigator.clipboard.writeText(walletAddress).then(
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
                network={selectedNetwork}
                address={walletAddress}
            />

            <div className="flex bg-white rounded-xl shadow-sm py-2 px-2">
                <div className="flex items-center justify-center ml-2">
                    <div className={"basis-20"}>
                        <img
                            onClick={() => setShowSelectedNetworks(true)}
                            src={getNetworkImage(selectedNetwork)}
                            className={`w-[32px] h-[auto] selected-network-item`}
                        />
                    </div>
                </div>
                <div className="ml-3 w-full flex flex-col flex-shrink-1">
                    <div className="flex items-center">
                        <Select
                            options={formattedData?.map((network, i) => {
                                return {
                                    value: network,
                                    label: (
                                        <p className="text-sm font-bold overflow-ellipsis">
                                            {network.chain.toUpperCase()}
                                        </p>
                                    ),
                                };
                            })}
                            onChange={(s) => {
                                setSelectedNetwork(s.value.chain);
                                setShowSelectedNetworks(true);
                                setWalletAddress(s.value.address);
                            }}
                            selectedItemRenderer={(selected) => {
                                return (
                                    <p className="text-base font-bold overflow-ellipsis">
                                        {resolvedDomain ||
                                            selected.value.chain.toUpperCase()}
                                    </p>
                                );
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="block text-sm">
                            {formatCryptoAddress(walletAddress)}
                        </span>
                        <button
                            onClick={copyAddress}
                            className={`text-gray-500 rounded-md p-1 hover:scale-[1.05] transition h-full ${
                                copied ? "bg-green-400 text-white" : ""
                            }`}
                        >
                            <IconCopy className="w-4 h-4" />
                        </button>
                    </div>
                    {/* <span className="block xs:hidden text-xs font-light">
                        {walletAddress}
                    </span> */}
                </div>
                <div className="ml-auto mr-1 flex gap-1.5">
                    {/* <button
                        onClick={copyAddress}
                        className={`bg-[#eee] rounded-md px-3 py-2 hover:scale-[1.05] transition h-full ${
                            copied ? "bg-green-400 text-white" : ""
                        }`}
                    >
                        <IconCopy className="w-4 h-4" />
                    </button> */}

                    <button
                        onClick={showQRCode}
                        className={`bg-[#eee] rounded-lg p-2 hover:scale-[1.05] transition h-full`}
                    >
                        <IconQrcode className="h-8 w-8" />
                    </button>
                </div>
            </div>
        </>
    );
}
