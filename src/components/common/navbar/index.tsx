"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { AuthDialog } from "./auth-dialog";
import { Sheet, SheetContent } from "../../ui/sheet";
import { useEffect, useRef, useState } from "react";
import { useAppState } from "@/src/hooks/useAppState";
import { InitialAppState } from "@/src/types/state/app-state.type";
import { useAccount, useConnectKit } from "@particle-network/connect-react-ui";
import {
    addDomainToUser,
    getUserDataByUuid,
    getUserDataByWalletAddress,
} from "@/src/actions";
import { useRouter } from "next/navigation";
import { useUnstoppableDomainAuth } from "@/src/context/UnstoppableDomainAuth.context";
import { useMetamaskAuth } from "@/src/context/MetamaskAuth.context";
import { useAuthToken } from "@/src/state/auth-token.atom";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
    const [connected, setConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const [appState, setAppState] = useAppState();
    const connectKit = useConnectKit();
    const userInfo = connectKit?.particle?.auth.getUserInfo();

    const ranOnce = useRef(false);

    console.log({ userInfo });
    const account = useAccount() || null;
    console.log({ account });

    // console.log();

    const { signOut: UDSignOut } = useUnstoppableDomainAuth();

    const { signOut: metamaskSignOut } = useMetamaskAuth();

    const { authToken } = useAuthToken();

    // connectKit.particle.auth.logout();

    const signOut = async () => {
        setAppState(InitialAppState(false));

        connectKit.particle.auth.logout();

        UDSignOut();

        metamaskSignOut();
    };

    // console.log({ userInfo }, "on navbar");

    // useEffect(() => {
    //     // console.log("runnning fetch data");
    //     if (!userInfo) return;
    //     if (authToken) return;
    //     if (ranOnce.current) return;
    //     ranOnce.current = true;
    //     const fetchData = async () => {
    //         console.log(appState.userData, "appState.userData");
    //         if (!appState.userData) {
    //             // Assuming userInfo has a uuid property
    //             // const uuid = JSON.parse(localStorage.getItem("globalId"))
    //             //     ? JSON.parse(localStorage.getItem("globalId"))
    //             //     : "n/a";
    //             const userData = userInfo
    //                 ? await getUserDataByUuid(userInfo.uuid)
    //                 : null;

    //             console.log({ userData });

    //             if (!userData && userInfo) {
    //                 setAppState({
    //                     userInfo,
    //                 });
    //                 router.push("/onboard");
    //             } else {
    //                 setAppState({
    //                     userData,
    //                 });
    //             }
    //         }
    //     };

    //     // if (connected) {
    //     fetchData();
    //     // }
    // }, [ranOnce, userInfo]);

    // console.log(appState, "appState");

    return (
        <>
            <header>
                <AuthDialog
                    isOpen={isAuthDialogOpen}
                    setIsOpen={setIsAuthDialogOpen}
                    setIsLoading={setIsLoading}
                    setConnected={setConnected}
                    onButtonsClick={() => {
                        setIsMenuOpen(false);
                        setIsAuthDialogOpen(false);
                    }}
                />
                <div className="bg-primary">
                    <div className="text-white text-sm py-3 text-center max-w-screen-xl mx-auto">
                        Integrated UNS Resolution & partner API
                        <a
                            href="https://devpost.com/software/receive-me-uns-ens-ux-integration?ref_content=user-portfolio&ref_feature=in_progress"
                            target="_blank"
                            className="underline decoration-white underline-offset-2 ml-2"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
                <nav className="max-w-screen-xl mx-auto px-4 flex text-base justify-between items-center py-3">
                    <div className="font-bold text-3xl text-primary">
                        receive.me
                    </div>
                    <div className="gap-6 font-medium hidden lg:flex">
                        <Link href="#home">Home</Link>
                        <Link href="#about-us">About Us</Link>
                        {/* <Link href="#updates">Updates</Link> */}
                        <Link href="#plans">Plans</Link>
                        <Link href="#faqs">FAQs</Link>
                        <Link href="mailto:support@receive.me">Contact Us</Link>
                    </div>
                    <div className="hidden lg:block">
                        {appState?.userData?.handle ? (
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={() =>
                                        window.open(
                                            `/${appState.userData?.handle}`,
                                            "_blank",
                                        )
                                    }
                                >
                                    <span className="font-normal mr-1">@</span>
                                    <span>{appState.userData?.handle}</span>
                                </Button>

                                <Button variant="ghost" onClick={signOut}>
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="lg"
                                onClick={() => {
                                    setIsAuthDialogOpen((p) => !p);
                                    // setIsMenuOpen(false);
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? "Connecting..." : "Get Started"}
                            </Button>
                        )}
                    </div>
                    <button
                        className="relative !flex h-10 w-10 items-center justify-start rounded-lg px-0 lg:!hidden"
                        onClick={() => setIsMenuOpen((p) => !p)}
                    >
                        <span
                            className={`absolute h-[3px] w-8 bg-black transition-transform duration-200  ${
                                isMenuOpen ? "rotate-45" : "translate-y-1.5"
                            }`}
                            style={{
                                transformOrigin: "center",
                            }}
                        ></span>
                        <span
                            className={`duration-duration-200 absolute h-[3px] w-8 bg-black transition-transform  ${
                                isMenuOpen ? "-rotate-45" : "-translate-y-1.5"
                            }`}
                            style={{
                                transformOrigin: "center",
                            }}
                        ></span>
                    </button>
                    <Sheet
                        open={isMenuOpen}
                        onOpenChange={(o) => setIsMenuOpen(o)}
                    >
                        <SheetContent
                            side="top"
                            className="mt-[108px] p-6 pt-2 lg:hidden"
                            sheetOverlayClassName="mt-[108px] lg:hidden"
                            hideCloseButton
                        >
                            <div className="w-full h-full grid place-items-center gap-4 pt-4 border-t border-gray-200">
                                <div className="w-full gap-6 font-medium flex flex-col items-center">
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#home"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#about-us"
                                    >
                                        About Us
                                    </Link>
                                    {/* <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#updates"
                                    >
                                        Updates
                                    </Link> */}
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#plans"
                                    >
                                        Plans
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#faqs"
                                    >
                                        FAQs
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="mailto:support@receive.me"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                                <div className="border-t border-gray-200 pt-4 w-full grid place-items-center">
                                    {appState?.userData?.handle ? (
                                        <div className="flex items-center gap-3">
                                            <Button
                                                onClick={() =>
                                                    window.open(
                                                        `/${appState.userData?.handle}`,
                                                        "_blank",
                                                    )
                                                }
                                            >
                                                <span className="font-normal text-gray-200 mr-2">
                                                    @
                                                </span>
                                                <span>
                                                    {appState.userData?.handle}
                                                </span>
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                onClick={signOut}
                                            >
                                                Sign Out
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            size="lg"
                                            onClick={() => {
                                                setIsAuthDialogOpen((p) => !p);
                                                setIsMenuOpen(false);
                                            }}
                                            disabled={isLoading}
                                        >
                                            {isLoading
                                                ? "Connecting..."
                                                : "Get Started"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </header>
        </>
    );
};
