import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { address: string } },
) => {
    // console.log(params, "params");
    const address = params.address;
    const requestedChain = req.nextUrl.searchParams.get("chain");
    const all = req.nextUrl.searchParams.get("all") === "true";

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

        const domains = json?.data;

        if (all) {
            return NextResponse.json({
                success: true,
                data:
                    domains?.map((d: any) => ({
                        domain: d.meta.domain,
                        type: d.meta.type,
                        blockchain: d.meta.blockchain,
                    })) || [],
            });
        }

        let domainOnRequestedChain = domains?.find(
            (d: any) => d.meta.blockchain.toLowerCase() === requestedChain,
        );

        if (requestedChain === "matic") {
            domainOnRequestedChain = domains?.find(
                (d: any) =>
                    d.meta.blockchain.toLowerCase() === requestedChain &&
                    d.meta.domain.endsWith(".polygon"),
            );
        }

        return NextResponse.json({
            success: true,
            data:
                domainOnRequestedChain?.meta?.domain ||
                domains[0]?.meta?.domain,
            // json,
        });
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({
            success: false,
            message: "Error occured, please try again later!",
        });
    }
};
