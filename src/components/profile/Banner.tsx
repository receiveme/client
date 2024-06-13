"use client";

import { UnstoppableDomainHolderAwardDialog } from "../handle/awards/UnstoppableDomainHolder";

type BannerProps = {
    handle: string;
    banner: string;
    className?: string;
    socials?: Record<string, any>[];
    balance?: number;
    hasDomains?: boolean;
};

export function Banner({
    handle,
    banner,
    className = "",
    socials,
    balance = 0,
    hasDomains,
}: BannerProps) {
    const bannerType = banner?.split("/")[0];
    const color = banner?.split("/")[1];

    let src;
    let bg;

    if (bannerType === "whale") {
        src = "/img/profile/WhaleNew.png";
        bg = color;
    } else if (bannerType === "waves") {
        src = `/img/profile/Waves${
            color[0].toUpperCase() + color.slice(1).toLowerCase()
        }.png`;
    } else if (bannerType === "beach") {
        src = "/img/profile/BeachDay.png";
    } else if (bannerType === "gator") {
        src = `/img/profile/Gator${
            color[0].toUpperCase() + color.slice(1).toLowerCase()
        }.png`;
    }

    return (
        <div className={className}>
            <div className={`relative rounded-xl bg-${bg ?? ""}`}>
                <div className="rounded-xl absolute w-full h-full p-4 flex flex-col justify-end items-end bg-gradient-to-t bg-opacity-20 from-black/[.54] to-transparent">
                    {/* <span className="text-white px-3 py-1 rounded-md bg-[#1c1c1c43] w-fit uppercase text-xs">
                    BALANCE <b>${(balance || 0)?.toFixed(2)}</b>
                </span> */}

                    <div className="flex items-center justify-between w-full">
                        <span className="text-3xl md:text-3xl text-white font-bold">
                            <span className="text-gray-400 font-normal">@</span>
                            {handle}
                        </span>

                        <div>
                            {hasDomains && (
                                <UnstoppableDomainHolderAwardDialog />
                            )}
                        </div>

                        {/* <div className="hidden md:flex gap-3">
                            {socials && socials.length ? (
                                socials.map((social, i) => (
                                    <div className="flex gap-2" key={i}>
                                        <a
                                            href={
                                                social.platform == "github"
                                                    ? `https://github.com/${social.name}/`
                                                    : social.platform ==
                                                      "twitter"
                                                    ? `https://twitter.com/${social.name}`
                                                    : social.platform ==
                                                      "twitch"
                                                    ? `https://twitch.com/${social.name}/`
                                                    : social.platform ==
                                                      "discord"
                                                    ? `discord://-/users/${social.networkid}`
                                                    : ""
                                            }
                                            target="_blank"
                                            className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid p-1 rounded-md flex justify-center items-center bg-white`}
                                        >
                                            <img
                                                src={
                                                    social.platform == "github"
                                                        ? "/img/3p/github.png"
                                                        : social.platform ==
                                                          "twitter"
                                                        ? "/img/3p/twitter.png"
                                                        : social.platform ==
                                                          "twitch"
                                                        ? "/img/3p/twitch.png"
                                                        : "/img/3p/discord.png"
                                                }
                                                className={`w-[20px] h-auto`}
                                            />
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}
                        </div> */}
                    </div>
                </div>
                <img
                    src={src}
                    style={{ objectFit: "contain" }}
                    className="rounded-xl shadow-md w-full"
                />
            </div>

            {/* <div className="md:hidden flex gap-1.5 justify-center items-center mt-3">
                {socials && socials.length ? (
                    socials.map((social, i) => (
                        <a
                            key={i}
                            href={
                                social.platform == "github"
                                    ? `https://github.com/${social.name}/`
                                    : social.platform == "twitter"
                                    ? `https://twitter.com/${social.name}`
                                    : social.platform == "twitch"
                                    ? `https://twitch.com/${social.name}/`
                                    : social.platform == "discord"
                                    ? `discord://-/users/${social.networkid}`
                                    : ""
                            }
                            target="_blank"
                            className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid h-8 w-8 rounded-md flex justify-center items-center bg-white`}
                        >
                            <img
                                src={
                                    social.platform == "github"
                                        ? "/img/3p/github.png"
                                        : social.platform == "twitter"
                                        ? "/img/3p/twitter.png"
                                        : social.platform == "twitch"
                                        ? "/img/3p/twitch.png"
                                        : "/img/3p/discord.png"
                                }
                                className={`w-[16px] h-auto`}
                            />
                        </a>
                    ))
                ) : (
                    <></>
                )}
            </div> */}
        </div>
    );
}
