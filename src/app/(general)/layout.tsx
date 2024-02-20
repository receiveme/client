import type { Metadata } from "next";

import Head from "next/head";
import { Archivo } from "next/font/google";
import Providers from "../providers";

import "../globals.css";
import Navbar from "@/src/components/navbar";
import Toast from "@/src/components/toast";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s :: receive.me",
        default: "receive.me",
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

            <body className={archivo.className}>
                <main className="min-h-screen flex justify-center">
                    <div className="py-4 px-4 lg:px-0 lg:max-w-[85%] w-full">
                        <Providers>
                            <Navbar />
                            {children}
                        </Providers>
                        {/* <Toast show /> */}
                    </div>
                </main>
            </body>
        </html>
    );
}
