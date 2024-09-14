export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { JWT_OPTIONS } from "../../../_constants";

export const GET = async (
    req: NextRequest,
    { params: { address } }: { params: { address: string } },
) => {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        // const authToken = req.headers.get("Authorization")?.split("Bearer ")[0];

        // const JWT_SECRET = process.env.JWT_SECRET;

        // if (!JWT_SECRET) {
        //     throw new Error("No `JWT_SECRET` environment variable is set");
        // }

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

        if (userId) {
            const userExists = await prisma.user.findFirst({
                where: {
                    id: userId,
                },
            });

            if (userExists) {
                user = {
                    user: userExists,
                };
            }
        }

        if (!user) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "NEW_USER",
            });
        }

        let userNonce = user.user.nonce;

        if (!userNonce) {
            userNonce = randomUUID();

            await prisma.user.update({
                where: {
                    id: user?.user.id,
                },
                data: {
                    nonce: userNonce,
                },
            });
        }

        return NextResponse.json({
            success: true,
            data: userNonce,
            message: "Nonce fetched successfully",
        });
    } catch (error) {
        console.log(error, "error");
        return NextResponse.json({
            success: false,
            data: null,
            message: "Failed to fetch user nonce",
        });
    } finally {
        await prisma.$disconnect();
    }
};
