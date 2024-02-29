"use client";

import Head from "next/head";
import { Archivo } from "next/font/google";
import Providers from "../providers";

import "../globals.css";
import "./dashboard.css";

const archivo = Archivo({ subsets: ["latin"] });

import { Fragment, useState } from "react";
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
import DashboardHandleDisplay from "@/src/components/dashboard/DashboardHandleDisplay";
import DashboardSidebarNavigation from "@/src/components/dashboard/DashboardSidebarNavigation";

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
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
