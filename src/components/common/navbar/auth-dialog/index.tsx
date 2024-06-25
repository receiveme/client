"use client";

import { Button } from "@/src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import { ConnectButton } from "@particle-network/connect-react-ui";
import { useRouter } from "next/navigation";
import { useAppState } from "@/src/hooks/useAppState";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useUnstoppableDomainAuth } from "@/src/context/UnstoppableDomainAuth.context";
import { ChainInfo } from "@keplr-wallet/types";
import { Coin, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { AccountData, OfflineSigner } from "@cosmjs/proto-signing";

interface Props {
    trigger?: ReactNode;
    handle?: string;
    onButtonsClick?: () => void;
    setConnected?: Dispatch<SetStateAction<boolean>>;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    isOpen?: boolean;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const getTestnetChainInfo = (): ChainInfo => ({
    chainId: "theta-testnet-001",
    chainName: "theta-testnet-001",
    rpc: "https://rpc.sentry-01.theta-testnet.polypore.xyz/",
    rest: "https://rest.sentry-01.theta-testnet.polypore.xyz/",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmos" + "pub",
        bech32PrefixValAddr: "cosmos" + "valoper",
        bech32PrefixValPub: "cosmos" + "valoperpub",
        bech32PrefixConsAddr: "cosmos" + "valcons",
        bech32PrefixConsPub: "cosmos" + "valconspub",
    },
    currencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
        {
            coinDenom: "THETA",
            coinMinimalDenom: "theta",
            coinDecimals: 0,
        },
        {
            coinDenom: "LAMBDA",
            coinMinimalDenom: "lambda",
            coinDecimals: 0,
        },
        {
            coinDenom: "RHO",
            coinMinimalDenom: "rho",
            coinDecimals: 0,
        },
        {
            coinDenom: "EPSILON",
            coinMinimalDenom: "epsilon",
            coinDecimals: 0,
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
            gasPriceStep: {
                low: 1,
                average: 1,
                high: 1,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
    },
    // coinType: 118,
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
});

export const AuthDialog = ({
    trigger,
    handle,
    onButtonsClick,
    setConnected,
    setIsLoading,
    isOpen: isDialogOpen,
    setIsOpen: setIsDialogOpen,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [appState, setAppState] = useAppState();

    const { signIn } = useUnstoppableDomainAuth();

    if (appState?.userData?.handle) return null;

    return (
        <>
            <Dialog
                open={
                    typeof isDialogOpen !== "undefined" ? isDialogOpen : isOpen
                }
                onOpenChange={(o) => {
                    setIsDialogOpen?.(o);
                    setIsOpen(o);
                }}
            >
                {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center whitespace-nowrap">
                            Continue to Receive.me with
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <ConnectButton.Custom>
                            {({ openConnectModal }) => {
                                const handleConnect = async () => {
                                    setIsOpen(false);
                                    openConnectModal!();
                                    onButtonsClick?.();
                                    setConnected?.(true);
                                };
                                return (
                                    <div>
                                        <Button
                                            onClick={handleConnect}
                                            type="button"
                                            id="connect-wallet"
                                        >
                                            Wallet Or Social Login
                                        </Button>
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom>
                        <div className="flex justify-center w-full items-center gap-2">
                            <span className="bg-gray-200 h-[1px] w-full block" />
                            <span>OR</span>
                            <span className="bg-gray-200 h-[1px] w-full block" />
                        </div>
                        <Button
                            variant="secondary"
                            onClick={async () => {
                                try {
                                    setIsLoading?.(true);
                                    setIsOpen(false);
                                    onButtonsClick?.();

                                    const user = await signIn();

                                    if (user.isNew) {
                                        router.push(
                                            `/onboard${
                                                handle
                                                    ? `?handle=${handle}`
                                                    : ""
                                            }`,
                                        );
                                    } else {
                                        setAppState({
                                            userData: user.data,
                                        });
                                    }
                                    setIsLoading?.(false);
                                } catch (e) {
                                    console.error(e);
                                    setIsLoading?.(false);
                                }
                            }}
                        >
                            Web3 Domains (Unstoppable Domain Auth)
                        </Button>
                    </div>
                    <button
                        onClick={async () => {
                            const { keplr } = window;
                            if (!keplr) {
                                alert("You need to install or unlock Keplr");
                                return;
                            }
                            const testNetInfodata = getTestnetChainInfo();
                            // await keplr.experimentalSuggestChain(
                            //     testNetInfodata,
                            // );

                            await StargateClient.connect(testNetInfodata.rpc);

                            const offlineSigner =
                                window.getOfflineSigner!("theta-testnet-001");
                            const signingClient =
                                await SigningStargateClient.connectWithSigner(
                                    testNetInfodata.rpc,
                                    offlineSigner,
                                );
                            // Get the address and balance of your user
                            const account: AccountData = (
                                await offlineSigner.getAccounts()
                            )[0];
                            console.log({
                                myAddress: account.address,
                                myBalance: (
                                    await signingClient.getBalance(
                                        account.address,
                                        "uatom",
                                    )
                                ).amount,
                            });
                        }}
                    >
                        Connect Keplr
                    </button>
                </DialogContent>
            </Dialog>
        </>
    );
};
