import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { address: string } },
) => {
    // console.log(params, "params");
    const address = params.address;
    const requestedChain = req.nextUrl.searchParams.get("chain");

    try {
        // console.log(params.address, "requested address");
        const res = await fetch(
            `https://api.unstoppabledomains.com/resolve/owners/${address}/domains`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UNSTOPPABLE_DOMAINS_API_KEY}`,
                },
            },
        );
        const json = await res.json();

        // console.log({ json });

        if (json?.data?.length > 0) {
            const domains = json?.data;

            const domainOnRequestedChain = domains.find(
                (d: any) => d.meta.blockchain.toLowerCase() === requestedChain,
            );

            return NextResponse.json({
                success: true,
                data:
                    domainOnRequestedChain?.meta?.domain ||
                    domains[0]?.meta?.domain,
                // json,
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
