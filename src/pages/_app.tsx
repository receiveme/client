import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import Navbar from "@/components/navbar";

import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

export default function App({ Component, pageProps }: any) {
    const blank = !!Component.blank;
    const hideNavbar = !!Component.hideNavbar;

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
