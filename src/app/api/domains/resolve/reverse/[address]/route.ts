import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { address: string } },
) => {
    // console.log(params, "params");
    const address = params.address;
    try {
        // console.log(params.address, "requested address");
        const res = await fetch(
            `https://api.unstoppabledomains.com/resolve/reverse/${address}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UNSTOPPABLE_DOMAINS_API_KEY}`,
                },
            },
        );
        const json = await res.json();

        // console.log({ json });

        if (json?.meta?.domain) {
            return NextResponse.json({
                success: true,
                data: json?.meta?.domain,
            });
        }
    } catch (error) {
        console.log("error ", error);
    }
    return NextResponse.json({
        success: false,
        message: "Error occured, please try again later!",
    });
};
