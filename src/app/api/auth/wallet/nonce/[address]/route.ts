import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params: { address } }: { params: { address: string } },
) => {
    try {
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
        return NextResponse.json({
            success: false,
            data: null,
            message: "Failed to fetch user nonce",
        });
    } finally {
        await prisma.$disconnect();
    }
};
