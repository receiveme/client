import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { verifyMetamaskSignature, verifyTronlinkSignature } from "../route";

export const POST = async (
    req: NextRequest,
    {
        params: { address, wallet },
    }: { params: { address: string; wallet: string } },
) => {
    try {
        const body = await req.json();

        if (!body || !body.signature || !body.userId) {
            throw new Error("Invalid request, no signature found");
        }

        let user = await prisma.wallet.findFirst({
            where: {
                address: {
                    equals: address,
                    mode: "insensitive",
                },
            },
            select: {
                user: true,
            },
        });

        if (body.userId) {
            const userExists = await prisma.user.findFirst({
                where: {
                    id: body.userId,
                },
            });

            if (userExists)
                user = {
                    user: userExists,
                };
        }

        if (!user) {
            throw new Error("User not found");
        }

        let recoveredAddress = "";

        if (wallet === "metamask") {
            recoveredAddress = verifyMetamaskSignature(
                user?.user.nonce!,
                body.signature,
            );
        } else if (wallet === "tron") {
            console.log("on tronlink");
            recoveredAddress = await verifyTronlinkSignature(
                user?.user.nonce!,
                body.signature,
            );
        }

        if (recoveredAddress !== address) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "Invalid user signature",
            });
        } else {
            await prisma.user.update({
                where: {
                    id: user?.user.id,
                },
                data: {
                    nonce: randomUUID(),
                },
            });

            const createdWallet = await prisma.wallet.create({
                data: {
                    address,
                    userid: user.user.id,
                    preferrednetworks:
                        wallet == "metamask"
                            ? ["matic", "eth", "base", "scroll", "optimism"]
                            : wallet == "particle"
                            ? ["matic", "eth", "base", "scroll", "optimism"]
                            : wallet == "tron"
                            ? ["tron"]
                            : ["algo"],
                    network: wallet,
                },
            });

            return NextResponse.json({
                success: true,
                data: createdWallet,
                message: "Wallet added successfully",
            });
        }
    } catch (error: any) {
        console.log(error, "error occurred");
        return NextResponse.json({
            success: false,
            data: null,
            message: "Invalid request",
        });
    }
};
