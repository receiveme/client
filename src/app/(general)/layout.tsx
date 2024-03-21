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
                    

                    href="/favicon.ico"
                />
                <title>receive.me</title>
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
                <main className="flex min-h-screen flex-col items-center justify-center">
                    <div
                        className="flex w-full flex-col gap-2 bg-orange-100 p-3 text-sm text-orange-700 md:flex-row md:justify-center"
                        role="alert"
                    >
                        <p className="font-bold">Warning</p>
                        <p>
                            This is an experimental build, Features may be
                            unresponsive. If issues persist, clear your local
                            storage or try again later.
                        </p>
                    </div>

                    <div className="w-full px-4 py-4 lg:max-w-[85%] lg:px-0">
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
