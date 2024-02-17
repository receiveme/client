"use server"
import prisma from "@/lib/prisma"

export async function createUserProfile(userInfo: Object, handle: String, profile: Object) {

    const { theme, banner } = profile
    const { chain_name, public_address } = userInfo[0].info.wallets[0]

    try {
        const user = await prisma.user.create({
            data: {
                handle: handle,
            },
        });

        await prisma.profile.create({
            data: {
                userid: user.id, // Use the existing user's ID
                theme: theme,   // Optional, specify the theme if provided
                background: banner, // Optional, specify the background if provided
            },
        });

        await prisma.wallet.create({
            data: {
                address: public_address,
                network: chain_name, // Optional, can be null or omitted if not provided
                userid: user.id, // Optional, can be null. Make sure the userId exists if provided
            },
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}