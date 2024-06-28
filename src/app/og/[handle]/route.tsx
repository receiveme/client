import axios from "axios";
import {
    createCanvas,
    registerFont,
    loadImage,
    CanvasRenderingContext2D,
} from "canvas";
import { NextRequest, NextResponse } from "next/server";

// Optionally register a custom font
registerFont("./public/fonts/figtree.ttf", { family: "figtree" });

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

// used for rounding the center image of the user
// Function to draw rounded rectangle
function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    radius: number,
) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
}

// since we have dark and light bg we need to have the proper color for the user handle text
// Function to calculate average brightness of the image
function getAverageBrightness(
    ctx: CanvasRenderingContext2D,
    imgWidth: number,
    imgHeight: number,
) {
    const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
    const data = imageData.data;
    let sum = 0;
    let count = 0;

    for (let i = 0; i < data.length; i += 4) {
        // Calculate the perceived luminance
        const luminance =
            0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        sum += luminance;
        count++;
    }

    return sum / count;
}

export const GET = async (
    req: NextRequest,
    { params: { handle } }: { params: { handle: string } },
) => {
    try {
        const text =
            handle.length > 20
                ? `@${handle.slice(0, 6)}...${handle.slice(-6)}`
                : `@${handle}`;

        const res = await axios.get(process.env.BASE_URL + `/api/og/${handle}`);

        // console.log(res.data);

        const userDetail = res.data;
        // console.log(userDetail);

        const userBackgroundColor =
            ClassnameToHexcode[userDetail.theme.split("/")[0]];

        // console.log({ userBackgroundColor });

        const width = 1200;
        const height = 630;

        const canvas = createCanvas(width, height);
        const context = canvas.getContext("2d");

        // Set background color
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);

        // Create a linear gradient
        // Note: 'to bottom right' in CSS corresponds to starting at (0, 0) and ending at (width, height) in canvas
        const gradient = context.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, userBackgroundColor); // Start color: light grey
        gradient.addColorStop(1, "#0f172a"); // End color: dark blue

        // Apply gradient as background
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);

        // Load and draw the image centered and scaled with rounded corners
        const image = await loadImage(
            `./public${getUserImage(userDetail.background)}`,
        ); // Adjust the path as necessary
        const imgWidth = width * 0.6; // 60% of the canvas width
        const imgHeight = height * 0.5; // 50% of the canvas height
        const imgX = (width - imgWidth) / 2; // Centered on the X axis
        const imgY = (height - imgHeight) / 2; // Centered on the Y axis
        const borderRadius = 40; // Set the border radius here

        // Apply clipping path with rounded corners
        roundRect(context, imgX, imgY, imgWidth, imgHeight, borderRadius);
        context.drawImage(image, imgX, imgY, imgWidth, imgHeight);

        // // Optional: Load an image as background
        // const background = await loadImage("./public/img/profile/GatorNight.png");
        // context.drawImage(background, 0, 0, width, height);

        const avgBrightness = getAverageBrightness(context, width, height);
        const textColor = avgBrightness > 128 ? "#000000" : "#ffffff"; // Adjust threshold as needed

        // Apply gradient as background (optional, depending on design needs)
        //   const gradient = context.createLinearGradient(0, 0, width, height);
        //   gradient.addColorStop(0, '#fefefe');  // Start color
        //   gradient.addColorStop(1, '#0f172a');  // End color
        //   context.fillStyle = gradient;
        //   context.fillRect(0, 0, width, height);

        // Add text with dynamic color based on image brightness
        context.font = "48px figtree black";
        // context.font
        context.fillStyle = textColor;
        context.textAlign = "center";
        context.fillText(text, width / 2, height / 2 + 40);

        // context.font = "28px black Figtree";
        // context.fillStyle = textColor + "80";
        // context.textAlign = "center";
        // context.fillText("On receive.me", width / 2, height / 2 + 60);

        // Add text
        // context.font = '48px 800 "figtree" ';
        // context.fillStyle = "#222";
        // context.textAlign = "center";
        // context.fillText(text, 600, 315);

        const buffer = canvas.toBuffer("image/png");

        //   res.setHeader('Content-Type', 'image/png');
        //   res.send(buffer);

        return new Response(buffer);
    } catch (error) {
        console.log(error);
        return NextResponse.json("Couldn't generate og image");
    }
};
