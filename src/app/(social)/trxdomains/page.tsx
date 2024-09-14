"use client";

import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import "../../globals.css";
import { GoToSiteModal } from "./components/GoToSiteModal";
import { useEffect, useState } from "react";
import { CheckoutGithubModal } from "./components/CheckoutGithubModal";
import { FollowOnTwitterModal } from "./components/FollowOnTwitterModal copy";

export default function TrxDomains() {
    const [followOnTwitterModalIsOpen, setFollowOnTwitterModalIsOpen] =
        useState(false);
    const [githubModalIsOpen, setGithubModalIsOpen] = useState(false);
    const [siteModalIsOpen, setSiteModalIsOpen] = useState(false);

    const [isTwitterLinkClicked, setIsTwitterLinkClicked] = useState(false);
    const [isGithubLinkClicked, setIsGithubLinkClicked] = useState(false);
    const [isGoToSiteClicked, setIsGoToSiteClicked] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const twitterLinkClicked =
            Boolean(localStorage?.getItem("trxdomains:twitter-link-clicked")) ||
            false;

        setIsTwitterLinkClicked(twitterLinkClicked);

        const githubLinkClicked =
            Boolean(localStorage?.getItem("trxdomains:github-link-clicked")) ||
            false;

        setIsGithubLinkClicked(githubLinkClicked);

        const siteLinkClicked =
            Boolean(localStorage?.getItem("trxdomains:site-link-clicked")) ||
            false;

        setIsGoToSiteClicked(siteLinkClicked);
    }, []);

    return (
        <>
            <style jsx>
                {`
                    .bg-banner-tron {
                        background-image: url(/img/socials/trx.jpg);
                        background-position: center;
                        background-size: contain;
                        background-color: #b80703;
                    }
                `}
            </style>
            <FollowOnTwitterModal
                isOpen={followOnTwitterModalIsOpen}
                setIsOpen={setFollowOnTwitterModalIsOpen}
                setIsTwitterLinkClicked={setIsTwitterLinkClicked}
            />

            <CheckoutGithubModal
                isOpen={githubModalIsOpen}
                setIsOpen={setGithubModalIsOpen}
                setIsGithubLinkClicked={setIsGithubLinkClicked}
            />

            <GoToSiteModal
                isOpen={siteModalIsOpen}
                setIsOpen={setSiteModalIsOpen}
                setIsSiteLinkClicked={setIsGoToSiteClicked}
            />

            <div className="awpswap-socials w-full  h-[100dvh] flex flex-col items-center justify-center">
                <div className="px-4 sm:max-w-xl md:max-w-2xl">
                    <div className="flex flex-col h-fit =w-[45%] w-full =border =border-[#B026BA] rounded-xl relative">
                        <div className="w-full h-52 bg-banner-tron bg-no-repeat rounded-tl-xl rounded-tr-xl">
                            <div className="absolute w-full h-52 top-0 rounded-tl-xl rounded-tr-xl bg-black opacity-70" />
                            <div className="relative z-10 h-full flex flex-col justify-end p-4">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <h1 className="font-inter font-semibold text-2xl">
                                            <a
                                                href="https://trxdomains.xyz/"
                                                target="_blank"
                                            >
                                                Trx Domains
                                            </a>
                                        </h1>
                                        <p className="text-gray-300">
                                            Tron Web3 Domains <br />
                                            Your Perfect Multi-chain Identity
                                            <br />
                                            Get your favorite your domains and
                                            create your identity profile
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* socials section */}
                        <div className="flex flex-col">
                            <a
                                href="https://trxdomains.xyz/"
                                target=""
                                className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                            >
                                <img className="w-6" src="/icons/home.svg" />
                                <span className="ml-3 font-bold">
                                    trxdomains.xyz - Home
                                </span>
                            </a>
                            <a
                                href="http://x.com/trxdomains"
                                target=""
                                className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                            >
                                <img
                                    className="w-6"
                                    src="/img/3p/twitter-white.png"
                                />
                                <span className="ml-3 font-bold">Twitter</span>
                            </a>
                            <a
                                href="https://github.com/TronWeb3Domains"
                                target="_blank"
                                className="p-4 transition flex items-center hover:bg-[#ffffff2b] rounded-bl-xl rounded-br-xl"
                            >
                                <img
                                    className="w-6"
                                    src="/img/3p/github2.png"
                                />
                                <span className="ml-3 font-bold">Github</span>
                            </a>
                        </div>
                    </div>
                    {/* tasks section */}
                    <div className="bg-[#B80703] mt-4 rounded-xl =w-[45%] w-full">
                        <div className="flex flex-col">
                            <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                                <button
                                    onClick={() =>
                                        setFollowOnTwitterModalIsOpen(true)
                                    }
                                >
                                    <span className="flex items-center">
                                        <img
                                            className="h-6 rounded-lg"
                                            src="/img/3p/twitter-white.png"
                                        />
                                        <span className="break-all ml-3 mr-4 font-bold ">
                                            Follow us on twitter
                                        </span>
                                        <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate">
                                            @trxdomains
                                        </span>
                                    </span>
                                </button>
                                <div>
                                    <button
                                        onClick={() => {
                                            setFollowOnTwitterModalIsOpen(true);
                                        }}
                                        className="
                                        flex items-center justify-center h-7 w-7
                                        bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                    >
                                        {isTwitterLinkClicked ? (
                                            <IconCheck color="green" />
                                        ) : (
                                            <IconChevronRight fill="black" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-b-xl">
                            <button onClick={() => setGithubModalIsOpen(true)}>
                                <span className="flex items-center">
                                    <img
                                        className="h-6 rounded-lg"
                                        src="/img/3p/github2.png"
                                    />
                                    <span className="break-all ml-3 mr-4 font-bold ">
                                        Take a look at our github
                                    </span>
                                    <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate">
                                        @TronWeb3Domains
                                    </span>
                                </span>
                            </button>
                            <div>
                                <button
                                    onClick={() => {
                                        setGithubModalIsOpen(true);
                                    }}
                                    className="
                                        flex items-center justify-center h-7 w-7
                                        bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                >
                                    {isGithubLinkClicked ? (
                                        <IconCheck color="green" />
                                    ) : (
                                        <IconChevronRight fill="black" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl">
                                <button
                                    onClick={() => setSiteModalIsOpen(true)}
                                >
                                    <span className="flex items-center">
                                        <img
                                            className="h-6 rounded-lg"
                                            src="/img/3p/website.svg"
                                        />
                                        <span className="break-all ml-3 mr-4 font-bold ">
                                            Acquire a nameservice on our site
                                        </span>
                                        <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate">
                                            Trxdomains.xyz
                                        </span>
                                    </span>
                                </button>
                                <div>
                                    <button
                                        onClick={() => {
                                            setSiteModalIsOpen(true);
                                        }}
                                        className="
                                        flex items-center justify-center h-7 w-7
                                        bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                                    >
                                        {isGoToSiteClicked ? (
                                            <IconCheck color="green" />
                                        ) : (
                                            <IconChevronRight fill="black" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col h-fit =w-[45%] w-full bg-[#ffffff2a] mt-4 rounded-xl relative">
                        <div className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-bl-xl rounded-br-xl">
                            <a
                                href="https://tronscan.io/#/token721/TAtgoVq9xqv1C65hjFTerJQZFt4rbAPea6"
                                target="_blank"
                            >
                                <div className="flex items-center">
                                    <img
                                        className="h-6 rounded-lg"
                                        src="/img/3p/tron.png"
                                    />
                                    <span className="break-all ml-3 mr-4 font-bold ">
                                        Contract - DID Identity (TDID)
                                    </span>
                                    <span className="text-xs text-gray hover:underline hover:scale-105 transition truncate">
                                        TAtgoVq9xqv1C65hjFTerJQZFt4rbAPea6
                                        (Explorer)
                                    </span>
                                </div>
                            </a>
                            <div>
                                <IconChevronRight color="black" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
