"use client";

type BannerProps = {
    handle: string;
    banner: string;
    className?: string;
<<<<<<< HEAD
    socials?: Record<string, any>[];
=======
    socials?: Record<string, any>[],
    balance?: number
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
};

export function Banner({
    handle,
    banner,
    className = "",
    socials,
<<<<<<< HEAD
=======
    balance = 0
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
}: BannerProps) {
    const bannerType = banner.split("/")[0];
    const color = banner.split("/")[1];

    let src;
    let bg;

    if (bannerType === "whale") {
        src = "/img/profile/WhaleNew.png";
        bg = color;
    } else if (bannerType === "waves") {
<<<<<<< HEAD
        src = `/img/profile/Waves${
            color[0].toUpperCase() + color.slice(1).toLowerCase()
        }.png`;
    } else if (bannerType === "beach") {
        src = "/img/profile/BeachDay.png";
    } else if (bannerType === "gator") {
        src = `/img/profile/Gator${
            color[0].toUpperCase() + color.slice(1).toLowerCase()
        }.png`;
=======
        src = `/img/profile/Waves${color[0].toUpperCase() + color.slice(1).toLowerCase()
            }.png`;
    } else if (bannerType === "beach") {
        src = "/img/profile/BeachDay.png";
    } else if (bannerType === "gator") {
        src = `/img/profile/Gator${color[0].toUpperCase() + color.slice(1).toLowerCase()
            }.png`;
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
    }

    return (
        <div className={`relative rounded-xl bg-${bg ?? ""} ` + className}>
<<<<<<< HEAD
            <div className="rounded-xl absolute w-full h-full p-4 flex items-end justify-between bg-gradient-to-t bg-opacity-20 from-black/[.54] to-transparent">
                <span className="text-3xl text-white font-bold">
                    <span className="text-gray-400 font-normal">@</span>
                    {handle}
                </span>

                <div className="flex gap-3">
                    {socials &&
                        socials.length &&
                        socials.map((social) => (
                            <div className="flex gap-2">
                                <a
                                    href={
                                        social.platform == "github"
                                            ? `https://github.com/${social.name}/`
                                            : social.platform == "twitter"
                                            ? `https:/twitter.com/${social.name}`
                                            : social.platform == "twitch"
                                            ? `https://twitch.com/${social.name}/`
                                            : ""
                                    }
                                    target="_blank"
                                    className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid p-1 rounded-md flex justify-center items-center bg-white`}
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
                                        className={`w-[20px] h-auto`}
                                    />
                                </a>
                            </div>
                        ))}
=======
            <div className="rounded-xl absolute w-full h-full p-4 flex flex-col justify-between items-end bg-gradient-to-t bg-opacity-20 from-black/[.54] to-transparent">
                <span className="text-white px-3 py-1 rounded-lg bg-[#1c1c1c80] w-fit">Balance: <b>${(balance || 0)?.toFixed(2)}</b></span>

                <div className="flex items-center justify-between w-full">
                    <span className="text-3xl text-white font-bold">
                        <span className="text-gray-400 font-normal">@</span>
                        {handle}
                    </span>

                    {socials &&
                        socials.length ?
                        <div className="flex gap-3">
                            {socials.map((social) => (
                                <div className="flex gap-2">
                                    <a
                                        href={
                                            social.platform == "github"
                                                ? `https://github.com/${social.name}/`
                                                : social.platform == "twitter"
                                                    ? `https:/twitter.com/${social.name}`
                                                    : social.platform == "twitch"
                                                        ? `https://twitch.com/${social.name}/`
                                                        : ""
                                        }
                                        target="_blank"
                                        className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid p-1 rounded-md flex justify-center items-center bg-white`}
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
                                            className={`w-[20px] h-auto`}
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                        : <></>
                    }
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
                </div>
            </div>
            <img
                src={src}
                style={{ objectFit: "contain" }}
                className="rounded-xl shadow-md w-full"
            />
        </div>
    );
}
