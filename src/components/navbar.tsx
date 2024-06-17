"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
    IconBolt,
    IconChevronDown,
    IconGraph,
    IconStack,
    IconUserBolt,
    IconWallet,
    IconQrcode,
} from "@tabler/icons-react";
import Link from "next/link";
import "@particle-network/connect-react-ui/dist/index.css";
import {
    ConnectButton,
    useAccount,
    useConnectKit,
} from "@particle-network/connect-react-ui";
import {
    addDomainToUser,
    getUserData,
    getUserDataByUuid,
    getUserDataByWalletAddress,
} from "../actions";
import { useRouter } from "next/navigation";
import { useAppState } from "../hooks/useAppState";
import { InitialAppState } from "../types/state/app-state.type";
import { useUnstoppableDomainAuth } from "../context/UnstoppableDomainAuth.context";

const features = [
    {
        name: "Page",
        description: "A personal page for you and your handle",
        href: "#",
        icon: IconUserBolt,
    },
    {
        name: "Wallets",
        description: "Link wallets and payment methods to get paid easily",
        href: "#",
        icon: IconWallet,
    },
    {
        name: "QR Code Pass",
        description: "Add QR Code Pass to your phone for quick access",
        href: "#",
        icon: IconQrcode,
    },
    {
        name: "Analytics",
        description: "Get a better understanding of your traffic",
        href: "#",
        icon: IconGraph,
    },
];

const callsToAction = [
    { name: "See demo", href: "#", icon: IconStack },
    { name: "Start Now", href: "#", icon: IconBolt },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [tronlinkAddress, setTronlinkAddress] = useState(false);
    const account = useAccount() || null;
    const connectKit = useConnectKit();
    const userInfo = connectKit?.particle?.auth.getUserInfo();
    const router = useRouter();
    const [connected, setConnected] = useState(false);

    const [appState, setAppState] = useAppState();

    const { auth, signIn, signOut: UDSignOut } = useUnstoppableDomainAuth();

    async function signOut() {
        setAppState(InitialAppState(false));

        connectKit.particle.auth.logout();

        UDSignOut();
        // uauth.logout();
    }

    // useEffect(() => {
    //     // Seems non-functional, eventually will be replaced by endpoint
    //     if (!account && !userInfo) {
    //         localStorage.removeItem("userInfo");
    //     }
    //     if (
    //         //@ts-ignore
    //         !JSON.parse(localStorage.getItem("userInfo")) &&
    //         account &&
    //         userInfo
    //     ) {
    //         localStorage.setItem(
    //             "userInfo",
    //             JSON.stringify([{ accountInfo: account, info: userInfo }]),
    //         );
    //     }
    // }, [account, userInfo]);

    const fetchUserDataByUuid = async (uuid: string) => {
        return await getUserDataByUuid(uuid);
    };

    useEffect(() => {
        // const fetchUserData = async (uuid) => {
        //     return await getUserData(uuid); // Assuming getUserData is defined elsewhere
        // };

        const fetchData = async () => {
            if (!appState.userData) {
                // Assuming userInfo has a uuid property
                // const uuid = JSON.parse(localStorage.getItem("globalId"))
                //     ? JSON.parse(localStorage.getItem("globalId"))
                //     : "n/a";
                const userData = userInfo
                    ? await fetchUserDataByUuid(userInfo.uuid)
                    : null;

                if (!userData && userInfo && account) {
                    setAppState({
                        userInfo,
                    });
                    router.push("/onboard");
                } else {
                    setAppState({
                        userData,
                    });
                }
            }
        };

        if (connected) {
            fetchData();
        }
    }, [connected, userInfo]);

    console.log({ auth });

    return (
        <div className="sticky top-4 z-50 mb-4 w-full">
            <nav
                className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 shadow-md lg:px-6"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Receive.me</span>
                        <img
                            className="h-10 w-auto"
                            src="/img/logo/logo_tag_white.png"
                            alt="receive.me"
                        />
                    </Link>
                </div>

                <div className=" flex lg:flex lg:flex-1 lg:justify-end gap-x-4">
                    {!!appState.userData ? (
                        <>
                            <button
                                onClick={() =>
                                    window.open(
                                        `/${appState.userData?.handle}`,
                                        "_blank",
                                    )
                                }
                                className="h-full rounded-md bg-white px-4 py-3 text-sm font-bold text-black transition hover:scale-105"
                                type="button"
                            >
                                <span className="font-normal text-gray-400">
                                    @
                                </span>
                                <span>{appState.userData?.handle}</span>
                            </button>

                            <button
                                onClick={signOut}
                                className="flex h-full items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-105"
                                type="button"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <ConnectButton.Custom>
                                {({ openConnectModal }) => {
                                    const handleConnect = async () => {
                                        openConnectModal!();
                                        setConnected(true);
                                    };
                                    return (
                                        <div>
                                            <button
                                                onClick={handleConnect}
                                                className="flex h-full items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-105"
                                                type="button"
                                                id="connect-wallet"
                                            >
                                                Connect Wallet
                                            </button>
                                        </div>
                                    );
                                }}
                            </ConnectButton.Custom>
                            <button
                                onClick={async () => {
                                    const data = await signIn();

                                    if (data.isNew) {
                                        router.push("/onboard");
                                    } else {
                                        setAppState({
                                            userData: data.data,
                                        });
                                    }
                                    // uauth.login();
                                    // uauth
                                    //     .loginWithPopup()
                                    //     .then(async (data: any) => {
                                    //         console.log(data, "data");
                                    //         // router.push("/onboard");
                                    //         const userWalletAddress =
                                    //             data.idToken.wallet_address;
                                    //         const uuidv5OfUserAddress = uuidv5(
                                    //             userWalletAddress,
                                    //             uuidv5.URL,
                                    //         );
                                    //         const userDataFromWalletAddress =
                                    //             await getUserDataByWalletAddress(
                                    //                 userWalletAddress,
                                    //             );
                                    //         const userData =
                                    //             (await getUserDataByUuid(
                                    //                 uuidv5OfUserAddress,
                                    //             )) || null;
                                    //         if (!userData) {
                                    //             router.push("/onboard");
                                    //         } else {
                                    //             setAppState({
                                    //                 userData,
                                    //             });
                                    //         }
                                    //     })
                                    //     .catch((e: unknown) =>
                                    //         console.error(e),
                                    //     );
                                }}
                            >
                                Login with UD
                            </button>
                        </>
                    )}
                </div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-200/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">receive.me</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <IconChevronDown
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50">
                                                Features
                                                <IconChevronDown
                                                    className={classNames(
                                                        open
                                                            ? "rotate-180"
                                                            : "",
                                                        "h-5 w-5 flex-none",
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[
                                                    ...features,
                                                    ...callsToAction,
                                                ].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-200 hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50"
                                >
                                    Wallets
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50"
                                >
                                    Premium
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
