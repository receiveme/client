import type { Metadata } from "next";

import Head from "next/head";
import { Archivo } from "next/font/google";
import Providers from "../providers";

import "../globals.css";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s :: receive.me",
        default: "receive.me",
    },
    description: 'Receive.me is a platform for linking your wallets easily & help you manage your payments in one place.',
    openGraph: {
        images: ["/img/home/receivemebannerwhite.jpg"],
    },
    twitter: {
        images: ["/img/home/receivemebannerwhite.jpg"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                q
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/icons/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <title>receive.me</title>
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <body className={archivo.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
