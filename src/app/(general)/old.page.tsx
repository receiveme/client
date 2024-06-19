"use client";

import { useAppState } from "@/src/hooks/useAppState";
import {
    IconChevronRight as ChevronRightIcon,
    IconAlignRight,
    IconArrowRight,
    IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
    const [appState, setAppState] = useAppState();

    return null;
    // return (
    //     <div className="bg-white">
    //         <div className="relative isolate">
    //             <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center pb-24 pt-10 sm:pb-32 lg:flex-row lg:gap-x-8 ">
    //                 <div className="px-6 lg:px-0 lg:pt-4">
    //                     <div className="mx-auto max-w-2xl">
    //                         <div className="max-w-lg">
    //                             <div className="-mt-6">
    //                                 <a
    //                                     href="#"
    //                                     className="inline-flex space-x-6"
    //                                 >
    //                                     <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
    //                                         What&apos;s new
    //                                     </span>
    //                                     <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
    //                                         <IconSparkles
    //                                             className="h-5 w-5 text-gray-400"
    //                                             aria-hidden="true"
    //                                         />
    //                                         <span>
    //                                             Integrated Particle Network
    //                                         </span>
    //                                     </span>
    //                                 </a>
    //                             </div>
    //                             <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:!leading-[75px]">
    //                                 Supercharge your wallets
    //                             </h1>
    //                             <p className="mt-3 text-lg leading-8 text-gray-600 md:mt-6">
    //                                 Create & customize an account with one
    //                                 click. Link any wallet or social with your
    //                                 account.
    //                             </p>
    //                             <div className="mt-6 flex items-center gap-x-8 md:mt-10">
    //                                 {appState.userData ? (
    //                                     <>
    //                                         <Link
    //                                             href="/dashboard"
    //                                             className="text-md rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:scale-105 hover:bg-indigo-500 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //                                         >
    //                                             Go To Dashboard
    //                                         </Link>
    //                                     </>
    //                                 ) : (
    //                                     <a
    //                                         href="#"
    //                                         onClick={() => {
    //                                             document
    //                                                 .getElementById(
    //                                                     "connect-wallet",
    //                                                 )
    //                                                 ?.click();
    //                                         }}
    //                                         className="text-md rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:scale-105 hover:bg-indigo-500 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //                                     >
    //                                         Connect Wallet
    //                                     </a>
    //                                 )}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
    //                     <div className="">
    //                         <img
    //                             src="https://i.imgur.com/eZL8a6p.png"
    //                             alt="rme image"
    //                         />
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    //         </div>
    //     </div>
    // );
}
