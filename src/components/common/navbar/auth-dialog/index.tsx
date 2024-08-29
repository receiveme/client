"use client";

import { Button } from "@/src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
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
import { useMetamaskAuth } from "@/src/context/MetamaskAuth.context";
import { useTronlinkAuth } from "@/src/context/TronlinkAuth.context";
import Image from "next/image";

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
    { id: "google", name: "Google", image: "google.png" },
    { id: "discord", name: "Discord", image: "discord.png" },
    { id: "github", name: "GitHub", image: "github.png" },
    { id: "twitter", name: "Twitter", image: "twitter.png" },
    { id: "twitch", name: "Twitch", image: "twitch.png" },
    { id: "linkedin", name: "LinkedIn", image: "linkedin.png" },
    // { id: "paypal", name: "Paypal", image: "paypal.png", disabled: true },
    // {
    //     id: "instagram",
    //     name: "Instagram",
    //     image: "instagram.png",
    //     disabled: true,
    // },
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
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [authLoadingMessage, setAuthLoadingMessage] = useState("");
    const router = useRouter();
    const [appState, setAppState] = useAppState();

    const { signIn } = useUnstoppableDomainAuth();
    // const { signIn: keplrSignIn } = useKeplrAuth();
    const {
        signIn: metamaskSignIn,
        optimismSignIn,
        baseSignIn,
        scrollSignIn,
    } = useMetamaskAuth();

    const { signIn: tronlinkSignIn } = useTronlinkAuth();

    const handleSocialLogin = async (social: (typeof SOCIALS)[number]) => {
        try {
            console.log(`Login for ${social.name} initiated`);

            setIsAuthLoading(true);
            setAuthLoadingMessage("Please wait...");
            const user = await particle.auth.login({
                preferredAuthType: social.id as any,
            });

            window.location.href = "/dashboard";
        } catch (e) {
        } finally {
            setIsAuthLoading(false);
            setAuthLoadingMessage("");
            setIsOpen(false);
        }

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

                    <div className="flex flex-col relative items-center justify-center gap-2 mt-3">
                        {isAuthLoading ? (
                            <div className="flex flex-col items-center h-32 w-80 gap-3">
                                <Image
                                    src="/img/loading.svg"
                                    alt=""
                                    width={64}
                                    height={64}
                                />
                                {authLoadingMessage && (
                                    <p className="text-gray-500 text-center texts-sm font-medium">
                                        {authLoadingMessage}
                                    </p>
                                )}
                                {/* Loading please wait... */}
                            </div>
                        ) : (
                            <>
                                <div className="flex gap-2 flex-wrap items-center justify-center">
                                    {SOCIALS.map((social) => {
                                        return (
                                            <TooltipProvider
                                                delayDuration={100}
                                                key={social.id}
                                            >
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={() => {
                                                                handleSocialLogin(
                                                                    social,
                                                                );
                                                            }}
                                                            wrapperClassname="rounded-full h-12 w-12"
                                                            // disabled={social.disabled}
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
                                <div className="flex justify-center w-full items-center gap-2">
                                    <span className="bg-gray-200 h-[1px] w-full block" />
                                    <span className="font-semibold text-gray-600">
                                        OR
                                    </span>
                                    <span className="bg-gray-200 h-[1px] w-full block" />
                                </div>
                                <div className="flex gap-3">
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="secondary"
                                                    onClick={async () => {
                                                        try {
                                                            setIsLoading?.(
                                                                true,
                                                            );
                                                            setIsAuthLoading(
                                                                true,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "Please wait...",
                                                            );
                                                            setIsOpen(false);
                                                            onButtonsClick?.();
                                                            const user =
                                                                await signIn();
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
                                                                    userData:
                                                                        user.data,
                                                                });
                                                                // router.push(
                                                                //     "/dashboard",
                                                                // );
                                                                setTimeout(
                                                                    () => {
                                                                        window.location.href =
                                                                            "/dashboard";
                                                                    },
                                                                );
                                                            }
                                                            setIsLoading?.(
                                                                false,
                                                            );
                                                        } catch (e) {
                                                            console.error(e);
                                                            setIsLoading?.(
                                                                false,
                                                            );
                                                        } finally {
                                                            setIsAuthLoading(
                                                                false,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "",
                                                            );
                                                            setIsOpen(false);
                                                        }
                                                    }}
                                                    wrapperClassname="rounded-full h-12 w-12"
                                                    // disabled={social.disabled}
                                                >
                                                    <img
                                                        src={`/img/handle/ud.png`}
                                                        alt=""
                                                        className="object-contain rounded-full"
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Unstoppable Domains
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="secondary"
                                                    onClick={async () => {
                                                        try {
                                                            setIsAuthLoading(
                                                                true,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "Please allow and sign message when requested to login...",
                                                            );
                                                            await metamaskSignIn();
                                                        } catch (e) {
                                                        } finally {
                                                            setIsAuthLoading(
                                                                false,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "",
                                                            );
                                                            setIsOpen(false);
                                                        }
                                                    }}
                                                    wrapperClassname="rounded-full h-12 w-12"
                                                    // disabled={social.disabled}
                                                >
                                                    <img
                                                        src={`/img/3p/metamask.png`}
                                                        alt=""
                                                        className="object-contain"
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Metamask
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {/* <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="secondary"
                                                    onClick={async () => {
                                                        try {
                                                            setIsAuthLoading(
                                                                true,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "Please allow and sign message when requested to login...",
                                                            );
                                                            await optimismSignIn();
                                                        } catch (e) {
                                                        } finally {
                                                            setIsAuthLoading(
                                                                false,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "",
                                                            );
                                                            setIsOpen(false);
                                                        }
                                                    }}
                                                    wrapperClassname="rounded-full h-12 w-12"
                                                    // disabled={social.disabled}
                                                >
                                                    <img
                                                        src={`/img/handle/optimism.png`}
                                                        alt=""
                                                        className="object-contain"
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Optimism
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="secondary"
                                                    onClick={async () => {
                                                        try {
                                                            setIsAuthLoading(
                                                                true,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "Please allow and sign message when requested to login...",
                                                            );
                                                            await baseSignIn();
                                                        } catch (e) {
                                                        } finally {
                                                            setIsAuthLoading(
                                                                false,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "",
                                                            );
                                                            setIsOpen(false);
                                                        }
                                                    }}
                                                    wrapperClassname="rounded-full h-12 w-12"
                                                    // disabled={social.disabled}
                                                >
                                                    <img
                                                        src={`/img/handle/base.png`}
                                                        alt=""
                                                        className="object-contain"
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Base
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="secondary"
                                                    onClick={async () => {
                                                        try {
                                                            setIsAuthLoading(
                                                                true,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "Please allow and sign message when requested to login...",
                                                            );
                                                            await scrollSignIn();
                                                        } catch (e) {
                                                        } finally {
                                                            setIsAuthLoading(
                                                                false,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "",
                                                            );
                                                            setIsOpen(false);
                                                        }
                                                    }}
                                                    wrapperClassname="rounded-full h-12 w-12"
                                                    // disabled={social.disabled}
                                                >
                                                    <img
                                                        src={`/img/handle/scroll.png`}
                                                        alt=""
                                                        className="object-contain"
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Scroll
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider> */}
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="secondary"
                                                    onClick={async () => {
                                                        try {
                                                            setIsAuthLoading(
                                                                true,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "Please allow and sign message when requested to login...",
                                                            );
                                                            await tronlinkSignIn();

                                                            setIsAuthLoading(
                                                                false,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "",
                                                            );
                                                        } catch (e) {
                                                        } finally {
                                                            setIsAuthLoading(
                                                                false,
                                                            );
                                                            setAuthLoadingMessage(
                                                                "",
                                                            );
                                                            setIsOpen(false);
                                                        }
                                                    }}
                                                    wrapperClassname="rounded-full h-12 w-12"
                                                >
                                                    <img
                                                        src={`/img/3p/tron.png`}
                                                        alt=""
                                                        className="object-contain"
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Tronlink
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => {}}
                                                    wrapperClassname="rounded-full h-12 w-12 opacity-80 cursor-not-allowed"
                                                >
                                                    <img
                                                        src={`/img/handle/keplr.png`}
                                                        alt=""
                                                        className="object-contain rounded-full"
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Keplr Wallet (Coming soon)
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
