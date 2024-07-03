import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params: { handle } }: { params: { handle: string } },
) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        handle,
                    },
                    {
                        domain: {
                            has: handle,
                        },
                    },
                ],
            },
            include: {
                Profile: {
                    select: {
                        theme: true,
                        background: true,
                    },
                },
            },
            cacheStrategy: { ttl: 60 },

        });

        // console.log(user?.Profile[0]);

        return NextResponse.json(user?.Profile[0]);
    } catch (e) {
        return NextResponse.json({});
    } finally {
        await prisma.$disconnect();
    }
};
