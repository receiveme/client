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
import { uauth } from "..";
import { getUserDataByUuid } from "@/src/actions";
import { useRouter } from "next/navigation";
import { useAppState } from "@/src/hooks/useAppState";
import { ReactNode } from "react";

interface Props {
    trigger: ReactNode;
    handle?: string;
}

export const AuthDialog = ({ trigger, handle }: Props) => {
    const router = useRouter();
    const [, setAppState] = useAppState();
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Continue to Receive.me with
                        </DialogTitle>
                        <DialogDescription>
                            <div className="mt-6 flex flex-col items-center justify-center gap-2">
                                <ConnectButton.Custom>
                                    {({ openConnectModal }) => {
                                        const handleConnect = async () => {
                                            openConnectModal!();
                                            // setConnected(true);
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
                                    onClick={() => {
                                        uauth
                                            .loginWithPopup()
                                            .then(async (data: any) => {
                                                // router.push("/onboard");
                                                const userWalletAddress =
                                                    data.idToken.wallet_address;

                                                const userData =
                                                    (await getUserDataByUuid(
                                                        userWalletAddress,
                                                    )) || null;

                                                if (!userData) {
                                                    router.push(
                                                        `/onboard${
                                                            handle
                                                                ? `?handle=${handle}`
                                                                : ""
                                                        }`,
                                                    );
                                                } else {
                                                    setAppState({
                                                        userData,
                                                    });
                                                }
                                            })
                                            .catch((e: unknown) =>
                                                console.error(e),
                                            );
                                    }}
                                >
                                    Web3 Domains (Unstoppable Domain Auth)
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};
