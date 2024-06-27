import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params: { address } }: { params: { address: string } },
) => {
    try {
        const req = await axios.get(
            `https://api.poap.tech/actions/scan/${address}`,
            {
                headers: {
                    Accept: "application/json",
                    "x-api-key": process.env.POAP_API_KEY,
                },
            },
        );
        return NextResponse.json(req.data);
    } catch (error) {
        return NextResponse.json([]);
    }
};
