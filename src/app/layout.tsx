'use client'
import "./globals.css";
import type { AppProps } from "next/app";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import Navbar from "@/components/navbar";

import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

export default function App({ Component, pageProps }: any) {
    const blank = !!Component?.blank;
    const hideNavbar = !!Component?.hideNavbar;

    return (
        <>
            <div className={archivo.className}>
                {!blank ? (
                    <div className="min-h-screen flex justify-center">
                        <div className="py-4 px-4 lg:px-0 lg:max-w-[85%] w-full">
                            {!hideNavbar && <Navbar />}
                            <Component {...pageProps} />
                        </div>
                    </div>
                ) : (
                    <Component {...pageProps} />
                )}

                <ProgressBar
                    height="4px"
                    color="#fffd00"
                    options={{ showSpinner: false }}
                    shallowRouting
                />
            </div>
        </>
    );
}

import { Html, Head, Main, NextScript } from "next/document";

export  function Document() {
    return (
        <Html lang="en">
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

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

