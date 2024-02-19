"use client";

import Head from "next/head";
import { Archivo } from "next/font/google";
import Providers from "../providers";

import "../globals.css";
import "./dashboard.css";

const archivo = Archivo({ subsets: ["latin"] });

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    Icon12Hours,
    IconChartAreaLine,
    IconPalette,
    IconSocial,
    IconUserBolt,
} from "@tabler/icons-react";

import "@particle-network/connect-react-ui/dist/index.css";
import { ConnectButton } from "@particle-network/connect-react-ui";
import { DashboardProfile } from "@/src/components/dashboard/DashboardProfile";

const navigation = [
    { name: "Appearance", href: "#", icon: IconPalette },
    { name: "Wallets & Socials", href: "#", icon: IconSocial, link: true },
    { name: "My Profile", href: "#", icon: IconUserBolt, profile: true },
    {
        name: "Analytics",
        href: "#",
        icon: IconChartAreaLine,
        disabled: true,
    },
];

const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [current, setCurrent] = useState("Appearance");
    const [handle, setHandle] = useState("");

    useEffect(() => {
        if (sessionStorage) {
            const storageHandle = sessionStorage.getItem("handle") || "hello";
            setHandle(storageHandle);
        }
    });

    return (
        <html lang="en">
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link rel="manifest" href="/icons/site.webmanifest" />
                <link rel="shortcut icon" href="/icons/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta
                    name="msapplication-config"
                    content="/icons/browserconfig.xml"
                />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <body className={archivo.className + " h-full"}>
                <Providers>
                    <div>
                        <Transition.Root show={sidebarOpen} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-50 lg:hidden"
                                onClose={setSidebarOpen}
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition-opacity ease-linear duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-gray-900/80" />
                                </Transition.Child>

                                <div className="fixed inset-0 flex">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition ease-in-out duration-300 transform"
                                        enterFrom="-translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transition ease-in-out duration-300 transform"
                                        leaveFrom="translate-x-0"
                                        leaveTo="-translate-x-full"
                                    >
                                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-in-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in-out duration-300"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                                    <button
                                                        type="button"
                                                        className="-m-2.5 p-2.5"
                                                        onClick={() =>
                                                            setSidebarOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        <span className="sr-only">
                                                            Close sidebar
                                                        </span>
                                                        <Icon12Hours
                                                            className="h-6 w-6 text-white"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            </Transition.Child>
                                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                                <div className="flex h-16 shrink-0 items-center">
                                                    <img
                                                        className="h-10 w-auto"
                                                        src="/img/logo/logo_tag_white.png"
                                                        alt="receive.me"
                                                    />
                                                </div>
                                                <nav className="flex flex-1 flex-col">
                                                    <ul
                                                        role="list"
                                                        className="flex flex-1 flex-col gap-y-7"
                                                    >
                                                        <li>
                                                            <ul
                                                                role="list"
                                                                className="-mx-2 space-y-1"
                                                            >
                                                                {navigation.map(
                                                                    (item) => (
                                                                        <li
                                                                            key={
                                                                                item.name
                                                                            }
                                                                        >
                                                                            <a
                                                                                href={
                                                                                    item.href
                                                                                }
                                                                                onClick={() =>
                                                                                    setCurrent(
                                                                                        item.name,
                                                                                    )
                                                                                }
                                                                                className={classNames(
                                                                                    current ===
                                                                                        item.name
                                                                                        ? "bg-gray-50 text-indigo-600"
                                                                                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                                                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition",
                                                                                    item.disabled
                                                                                        ? "opacity-10 text-gray-300 hover:text-gray-600 "
                                                                                        : "",
                                                                                )}
                                                                            >
                                                                                <item.icon
                                                                                    className={classNames(
                                                                                        current ===
                                                                                            item.name
                                                                                            ? "text-indigo-600"
                                                                                            : "text-gray-400 group-hover:text-indigo-600",
                                                                                        "h-6 w-6 shrink-0 transition",
                                                                                    )}
                                                                                    aria-hidden="true"
                                                                                />
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </a>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition.Root>

                        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        className="h-10 w-auto"
                                        src="/img/logo/logo_tag.png"
                                        alt="receive.me"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul
                                        role="list"
                                        className="flex flex-1 flex-col gap-y-7"
                                    >
                                        <li>
                                            <ul
                                                role="list"
                                                className="-mx-2 space-y-1"
                                            >
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            onClick={() =>
                                                                item.profile
                                                                    ? window.open(
                                                                        `/${handle}`,
                                                                        "_blank",
                                                                    )
                                                                    : !item.disabled
                                                                        ? setCurrent(
                                                                            item.name,
                                                                        )
                                                                        : null
                                                            }
                                                            className={classNames(
                                                                current ===
                                                                    item.name
                                                                    ? "bg-gray-50 text-indigo-600"
                                                                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition",
                                                                item.disabled
                                                                    ? "!text-gray-400 !hover:text-gray-500"
                                                                    : "",
                                                            )}
                                                        >
                                                            <item.icon
                                                                className={classNames(
                                                                    current ===
                                                                        item.name
                                                                        ? "text-indigo-600"
                                                                        : "text-gray-400 group-hover:text-indigo-600",
                                                                    "h-6 w-6 shrink-0 transition",
                                                                    item.disabled
                                                                        ? "!text-gray-300 !hover:text-gray-400 !group-hover:text-gray-400"
                                                                        : "",
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="lg:pl-72 h-full">
                            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                                <button
                                    type="button"
                                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <span className="sr-only">
                                        Open sidebar
                                    </span>
                                    <Icon12Hours
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Separator */}
                                <div
                                    className="h-6 w-px bg-gray-200 lg:hidden"
                                    aria-hidden="true"
                                />

                                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                                    <div className="flex items-center justify-between gap-x-4 lg:gap-x-6 w-full">
                                        <div className="flex gap-3 items-center">
                                            <div className="h-full px-4 py-2 rounded-lg bg-gray-100">
                                                <span className="font-bold">
                                                    <span className="text-gray-400 font-normal">
                                                        @
                                                    </span>
                                                    {handle}
                                                </span>
                                            </div>
                                        </div>

                                        <ConnectButton />
                                    </div>
                                </div>
                            </div>

                            <main className="py-6">
                                <div className="px-4 sm:px-6 lg:px-8 h-full w-full">
                                    {current === "Appearance" && (
                                        <DashboardProfile handle={handle} />
                                    )}
                                </div>
                            </main>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
