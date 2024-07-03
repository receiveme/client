import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_OPTIONS } from "../_constants";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        if (
            !body ||
            !body.token ||
            typeof body.token !== "string" ||
            body.token.length > 1024
        ) {
            throw new Error("Invalid token");
        }

        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            throw new Error("No `JWT_SECRET` environment variable is set");
        }

        const payload = verify(body.token, JWT_SECRET, JWT_OPTIONS);

        return NextResponse.json({
            success: true,
            data: payload,
            message: "Token valid",
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Invalid token",
            data: null,
        });
    }
};
