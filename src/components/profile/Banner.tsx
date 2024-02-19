"use client";

type BannerProps = {
    handle: string;
    banner: string;
    className?: string;
    socials?: Record<string, any>[];
};

export function Banner({
    handle,
    banner,
    className = "",
    socials,
}: BannerProps) {
    const bannerType = banner.split("/")[0];
    const color = banner.split("/")[1];

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
        <div className={`relative rounded-xl bg-${bg ?? ""}` + className}>
            <div className="rounded-xl absolute w-full h-full p-4 flex items-end justify-between bg-gradient-to-t bg-opacity-20 from-black/[.54] to-transparent">
                <span className="text-3xl text-white font-bold">
                    <span className="text-gray-400 font-normal">@</span>
                    {handle}
                </span>

                {socials && (
                    <div className="flex gap-2 items-center">
                        <a
                            href={"https://paypal.me/nickmura/"}
                            target="_blank"
                            className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid p-1 rounded-md flex justify-center items-center bg-white`}
                        >
                            <img
                                src="/img/3p/paypal.png"
                                className={`h-[20px] w-[20px]`}
                            />
                        </a>
                    </div>
                )}
            </div>
            <img
                src={src}
                style={{ objectFit: "contain" }}
                className="rounded-xl shadow-md w-full"
            />
        </div>
    );
}
