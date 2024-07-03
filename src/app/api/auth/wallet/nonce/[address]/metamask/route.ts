import prisma from "@/lib/prisma";
import { getSiweMessage } from "@/src/lib/utils/siwe";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { JWT_OPTIONS } from "../../../../_constants";

export const POST = async (
    req: NextRequest,
    { params: { address } }: { params: { address: string } },
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

        const recoveredAddress = recoverPersonalSignature({
            data: getSiweMessage(user?.user.nonce),
            signature: body.signature,
        });

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
        return NextResponse.json({
            success: false,
            data: null,
            message: "Invalid request",
        });
    }
};
