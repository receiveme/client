import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: NextRequest,
    {
        params: { address, wallet },
    }: { params: { address: string; wallet: string } },
) => {
    try {
        const body = await req.json();

        if (!body || !body.userId) {
            throw new Error("Invalid request, no signature found");
        }

        const user = await prisma.wallet.findFirst({
            where: {
                AND: [
                    {
                        address: {
                            equals: address,
                            mode: "insensitive",
                        },
                    },
                    {
                        user: {
                            id: body.userId,
                        },
                    },
                ],
            },
            select: {
                user: true,
            },
        });

        // if (body.userId) {
        //     const userExists = await prisma.user.findFirst({
        //         where: {
        //             id: body.userId,
        //         },
        //     });

        //     if (userExists)
        //         user = {
        //             user: userExists,
        //         };
        // }

        if (!user) {
            throw new Error("User not found");
        }

        const deleteResult = await prisma.wallet.deleteMany({
            where: {
                userid: body.userId,
                address: address,
            },
        });

        return NextResponse.json({
            success: true,
            data: deleteResult,
            message: "Wallet deleted successfully",
        });
    } catch (error: any) {
        console.log(error, "error occurred");
        return NextResponse.json({
            success: false,
            data: null,
            message: "Invalid request",
        });
    }
};
