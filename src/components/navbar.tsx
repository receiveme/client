"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
    IconArrowRight,
    IconBolt,
    IconChevronDown,
    IconGraph,
    IconShieldBolt,
    IconStack,
    IconUserBolt,
    IconUsers,
    IconWallet,
    IconQrcode,
    IconLogout,
} from "@tabler/icons-react";
import Link from "next/link";
import "@particle-network/connect-react-ui/dist/index.css";
import {
    ConnectButton,
    useAccount,
    useConnectKit,
} from "@particle-network/connect-react-ui";
import { getUserData } from "../actions";
import { useRouter, usePathname } from "next/navigation";

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

const socialPaths = [
    "/awpswap"
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [tronlinkAddress, setTronlinkAddress] = useState(false);
    const [uuid, setUuid] = useState({});
    const account = useAccount() || null;
    const connectKit = useConnectKit();
    // const connectAccount = useAccount();
    const userInfo = connectKit?.particle?.auth?.getUserInfo();
    const router = useRouter();
    const pathname = usePathname()
    const [connected, setConnected] = useState(false);

    async function signOut() {
        localStorage.clear();
        connectKit.particle?.auth?.logout();
    }

    useEffect(() => {
        // Seems non-functional, eventually will be replaced by endpoint
        if (!account && !userInfo) {
            localStorage.removeItem("userInfo");
        }
        if (
            //@ts-ignore
            !JSON.parse(localStorage.getItem("userInfo")) &&
            account &&
            userInfo
        ) {
            localStorage.setItem(
                "userInfo",
                JSON.stringify([{ accountInfo: account, info: userInfo }]),
            );
        }
    }, [account, userInfo]);

    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                const fetchUserData = async (uuid: any) => {
                    return await getUserData(uuid); // Assuming getUserData is defined elsewhere
                };

                const fetchData = async () => {
                    if (userInfo && userInfo.uuid) {
                        // Assuming userInfo has a uuid property
                        const uuid = JSON.parse(localStorage.getItem("globalId") || "{}")
                            ? JSON.parse(localStorage.getItem("globalId") || "{}")
                            : "n/a";

                        setUuid(uuid);

                        const userData = await fetchUserData(uuid);
                        if (!userData && !socialPaths.includes(pathname)) {
                            router.push("/onboard");
                        } else {
                            localStorage.setItem("userData", JSON.stringify(userData));
                        }
                    }
                };

                if (
                    (connected && userInfo) ||
                    (userInfo && !JSON.parse(localStorage.getItem("userData") || "{}"))
                ) {
                    fetchData();
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, [connected, userInfo, typeof window !== 'undefined']);

    return (
        <div className="w-full mb-4">
            <nav
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 w-full rounded-2xl shadow-md flex items-center justify-between p-4 lg:px-6"
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
                    {uuid ? (
                        <>
                            <button
                                onClick={() =>
                                    window.open(
                                        `/${JSON.parse(
                                            localStorage.getItem(
                                                "userData",
                                            ) ?? '{"handle": "hello"}',
                                        ).handle
                                        }`,
                                        "_blank",
                                    )
                                }
                                className="bg-white rounded-md h-full py-3 px-4 text-black font-bold text-sm transition hover:scale-105"
                                type="button"
                            >
                                <span className="text-gray-400 font-normal">
                                    @
                                </span>
                                <span>

                                </span>
                            </button>

                            <button
                                onClick={signOut}
                                className="bg-white rounded-md h-full px-6 py-3 flex justify-center items-center text-black font-bold text-sm transition hover:scale-105"
                                type="button"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <ConnectButton.Custom>
                            {({ openConnectModal }) => {
                                const handleConnect = () => {
                                    openConnectModal();
                                    setConnected(true);
                                };
                                return (
                                    <div>
                                        <button
                                            onClick={handleConnect}
                                            className="bg-white rounded-md h-full px-6 py-3 flex justify-center items-center text-black font-bold text-sm transition hover:scale-105"
                                            type="button"
                                            id="connect-wallet"
                                        >
                                            Connect Wallet
                                        </button>
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom>
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
                            <span className="sr-only">Your Company</span>
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
