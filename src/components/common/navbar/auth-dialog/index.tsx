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

interface Props {
    trigger?: ReactNode;
    handle?: string;
    onButtonsClick?: () => void;
    setConnected?: Dispatch<SetStateAction<boolean>>;
    isOpen?: boolean;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const AuthDialog = ({
    trigger,
    handle,
    onButtonsClick,
    setConnected,
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
                        <DialogDescription>
                            <div className="mt-6 flex flex-col items-center justify-center gap-2">
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
