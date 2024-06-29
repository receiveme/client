import axios from "axios";
import { promises } from "fs";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import path from "path";
import { fileURLToPath } from "url";

const ClassnameToHexcode: Record<string, string> = {
    "yellow-300": "#fde047",
    "green-300": "#86efac",
    "blue-300": "#93c5fd",
    "red-300": "#fca5a5",
    "orange-300": "#fdba74",
};

const getUserImage = (background: string) => {
    let src = "";
    const [bannerType, color] = background.split("/");

    if (bannerType === "whale") {
        src = "/img/profile/WhaleNew.png";
        // bg = color;
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

    return src;
};

const DARK_BACKGROUND_IMAGES = [
    "/img/profile/GatorEvening.png",
    "/img/profile/GatorNight.png",
    "/img/profile/WhaleNew.png",
];

const getTextColorBasedOnImage = (image: string) => {
    if (DARK_BACKGROUND_IMAGES.includes(image)) {
        return "#ffffff";
    }

    return "#000000";
};

export async function GET(
    req: NextRequest,
    { params: { handle } }: { params: { handle: string } },
) {
    try {
        const fontData = promises
            .readFile(
                path.join(
                    fileURLToPath(import.meta.url),
                    "../../../../../public/fonts/Figtree-Black.ttf",
                ),
            )
            .then((value) => value.buffer);
        // await fetch(
        //     new URL("./Figtree-Black.ttf", import.meta.url),
        // ).then((res) => res.arrayBuffer());

        const text =
            handle.length > 20
                ? `${handle.slice(0, 6)}...${handle.slice(-6)}`
                : `${handle}`;

        const res = await axios.get(process.env.BASE_URL + `/api/og/${handle}`);

        const userDetail = res.data;

        const userBackgroundColor =
            ClassnameToHexcode[userDetail.theme.split("/")[0]];

        const imageUrl = getUserImage(userDetail.background);

        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 40,
                        color: "black",
                        backgroundImage: `linear-gradient(to bottom right, ${userBackgroundColor}, #0f172a)`,
                        width: "100%",
                        height: "100%",
                        padding: "50px 200px",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            backgroundImage: `url(https://receive.me/${imageUrl})`,
                            display: "flex",
                            width: "90%",
                            height: "60%",
                            backgroundPosition: "0% 0%",
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            alignItems: "flex-end",
                            justifyContent: "flex-start",
                            // border: "1px solid red",
                            borderRadius: "20px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1",
                                padding: "20px",
                                fontFamily: "figtree-black",
                            }}
                        >
                            <div
                                style={{
                                    color: `${getTextColorBasedOnImage(
                                        imageUrl,
                                    )}95`,
                                }}
                            >
                                @
                            </div>
                            <div
                                style={{
                                    color: getTextColorBasedOnImage(imageUrl),
                                }}
                            >
                                {text}
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: "figtree-black",
                        data: await fontData,
                        style: "normal",
                    },
                ],
            },
        );
    } catch (e) {
        console.log(e, "e");
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 40,
                        color: "black",
                        background: "white",
                        width: "100%",
                        height: "100%",
                        padding: "50px 200px",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    👋 receive.me
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    }
}
