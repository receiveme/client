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
import { useKeplrAuth } from "@/src/context/KeplrAuth.context";
import toast from "react-hot-toast";
import particle from "@/src/lib/particle";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/src/components/ui/tooltip";

interface Props {
    trigger?: ReactNode;
    handle?: string;
    onButtonsClick?: () => void;
    setConnected?: Dispatch<SetStateAction<boolean>>;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    isOpen?: boolean;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

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
    // const { signIn: keplrSignIn } = useKeplrAuth();

    const handleSocialLogin = async (social: (typeof SOCIALS)[number]) => {
        console.log(`Login for ${social.name} initiated`);

        const user = await particle.auth.login({
            preferredAuthType: social.id as any,
        });

        window.location.reload();

        // console.log(user, "user", social);

        // const userId = userData?.Profile[0].userid;

        // setAppState({ wallets: [], userInfo: user });

        // const newSocial: Record<string, any> = {
        //     authType: social.id,
        //     socialUuid: user.uuid,
        //     socialUsername: user.thirdparty_user_info?.user_info.name,
        //     socialInfo: user,
        //     socialImg: user.avatar,
        //     socialId: String(user.thirdparty_user_info?.user_info.id),
        // };

        // const fetchSocialDetails = async () => {
        //     if (newSocial.authType == "github") {
        //         if (!newSocial.name && newSocial.socialId) {
        //             let id = newSocial.socialId;
        //             let res = await fetch(`https://api.github.com/user/${id}`);
        //             if (!res.ok) throw new Error("bad");

        //             const json = await res.json();

        //             newSocial.socialUsername = json.login;
        //             newSocial.socialImg = json.avatar_url;
        //         }
        //     } else if (newSocial.authType == "twitch") {
        //         //TODO
        //     } else if (newSocial.authType == "twitter") {
        //         //TODO
        //     }
        // };

        // await fetchSocialDetails();

        // const socialsData = {
        //     userid: userId,
        //     networkid:
        //         newSocial.authType === "github" ? newSocial.socialId : null,
        //     imageUrl: newSocial.socialImg ? newSocial.socialImg : null,
        //     name: newSocial.socialUsername ? newSocial.socialUsername : null,
        //     particle_token: newSocial.socialInfo.token
        //         ? newSocial.socialInfo.token
        //         : null,
        //     particle_uuid: newSocial.socialUuid ? newSocial.socialUuid : null,
        //     platform: newSocial.authType ? newSocial.authType : null,
        // };

        // setNewSocials((prevSocials) => [...prevSocials, socialsData]);
    };

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

                    <div className="flex flex-col items-center justify-center gap-2 mt-3">
                        <div className="flex gap-2 flex-wrap items-center justify-center">
                            {SOCIALS.map((social) => {
                                return (
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => {
                                                        handleSocialLogin(
                                                            social,
                                                        );
                                                    }}
                                                    key={social.id}
                                                    wrapperClassname="rounded-full h-12 w-12"
                                                    disabled={social.disabled}
                                                >
                                                    <img
                                                        src={`/img/3p/${social.image}`}
                                                        alt=""
                                                        className="object-contain"
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {social.name}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                );
                            })}
                        </div>
                        {/* <ConnectButton.Custom>
                            {({ openConnectModal }) => {
                                const handleConnect = async () => {
                                    alert("clicked");
                                    setIsOpen(false);
                                    openConnectModal!();
                                    onButtonsClick?.();
                                    setConnected?.(true);
                                };
                                return (
                                    <div>
                                        <Button
                                            onClick={() => handleConnect()}
                                            type="button"
                                            id="connect-wallet"
                                        >
                                            Wallet Or Social Login
                                        </Button>
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom> */}
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
                    {/* <button
                        onClick={async () => {
                            try {
                                await keplrSignIn();
                            } catch (e) {
                                console.error(e);
                                toast.error(
                                    "User rejected wallet authorization",
                                );
                            }
                        }}
                    >
                        Connect Keplr
                    </button> */}
                    {/* <button
                        onClick={() => {
                            return new Promise((resolve, reject) => {
                                window["ethereum"]
                                    ?.request({ method: "eth_chainId" })
                                    .then((chainId: any) => {
                                        return window["ethereum"]?.request({
                                            method: "eth_requestAccounts",
                                        });
                                    })
                                    .then((accounts: any[]) => {
                                        console.log({ accounts });
                                        // if (accounts && accounts.length > 0) {
                                        //     const accountAddress = accounts[0];

                                        //     const walletData = {
                                        //         network: "metamask",
                                        //         address: accountAddress,
                                        //     };

                                        //     resolve(walletData);
                                        // } else {
                                        //     reject(
                                        //         new Error(
                                        //             "No accounts returned from Metamask.",
                                        //         ),
                                        //     );
                                        // }
                                    })
                                    .catch((error: Error) => {
                                        console.error("METAMASK ERR:", error);
                                        reject(
                                            new Error(
                                                "Metamask connection failed: " +
                                                    error.message,
                                            ),
                                        );
                                    });
                            });
                        }}
                    >
                        Connect metamask
                    </button> */}
                </DialogContent>
            </Dialog>
        </>
    );
};
