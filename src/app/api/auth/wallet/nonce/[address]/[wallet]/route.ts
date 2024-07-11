import prisma from "@/lib/prisma";
import { getSiweMessage } from "@/src/lib/utils/siwe";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { JWT_OPTIONS } from "../../../../_constants";
import TronWeb from "tronweb";
import { getSiwtMessage } from "@/src/lib/utils/siwt";

const verifyMetamaskSignature = (nonce: string, signature: string) => {
    return recoverPersonalSignature({
        data: getSiweMessage(nonce),
        signature: signature,
    });
};

const verifyTronlinkSignature = async (nonce: string, signature: string) => {
    return await TronWeb.Trx.verifyMessageV2(getSiwtMessage(nonce), signature);
};

export const POST = async (
    req: NextRequest,
    {
        params: { address, wallet },
    }: { params: { address: string; wallet: string } },
) => {
    try {
        const body = await req.json();

        if (!body || !body.signature) {
            throw new Error("Invalid request, no signature found");
        }

        const user = await prisma.wallet.findFirst({
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

        if (!user) {
            throw new Error("User not found");
        }

        let recoveredAddress = "";

        if (wallet === "metamask") {
            recoveredAddress = verifyMetamaskSignature(
                user?.user.nonce,
                body.signature,
            );
        } else if (wallet === "tronlink") {
            console.log("on tronlink");
            recoveredAddress = await verifyTronlinkSignature(
                user?.user.nonce,
                body.signature,
            );
        }

        console.log(recoveredAddress);

        // recoverPersonalSignature({
        //     data: getSiweMessage(user?.user.nonce),
        //     signature: body.signature,
        // });

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

            const JWT_SECRET = process.env.JWT_SECRET;

            if (!JWT_SECRET) {
                throw new Error("No `JWT_SECRET` environment variable is set");
            }

            const data = {
                id: user.user.id,
                address,
            };

            const token = sign(data, JWT_SECRET, JWT_OPTIONS);

            return NextResponse.json({
                success: true,
                data: token,
                message: "You are logged in!",
            });
        }
    } catch (error: any) {
        console.log(error, "error occured");
        return NextResponse.json({
            success: false,
            data: null,
            message: "Invalid request",
        });
    }
};
