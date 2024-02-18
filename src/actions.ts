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
        await prisma.$disconnect();
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function getUserSocials(userId) {
    try {
        const userSocials = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                Social: true, // Selects all fields from Social
            },
        });
        return userSocials.Social; // Return only the Social array
    } catch (error) {
        console.error("Error retrieving user socials:", error);
        throw error;
    }
}

export async function getUserWallets(userId) {
    try {
        const userWallets = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                Wallet: true, // Selects all fields from Wallet
            },
        });
        return userWallets.Wallet; // Return only the Wallet array
    } catch (error) {
        console.error("Error retrieving user wallets:", error);
        throw error;
    }
}


export async function createUserProfileDraft(socials: any, wallets: any, userInfo: Object, handle: String, profile: Object) { // TODO; seperate socials & wallets

    const { theme, banner } = profile
    const { chain_name, public_address } = userInfo[0].info.wallets[0]
    console.log("SOCIALS", socials)
    const infoObj = userInfo[0].info
    const validSocials = {}
    //check social values
    infoObj.googleId ? validSocials["googleId"] = infoObj.google_id : null
    infoObj.discordId ? validSocials["discordId"] = infoObj.discord_id : null
    infoObj.twitterId ? validSocials["twitterId"] = infoObj.twitter_id : null
    infoObj.githubId ? validSocials["githubId"] = infoObj.github_id : null
    infoObj.linkedId ? validSocials["linkedId"] = infoObj.linked_id : null
    infoObj.twitchId ? validSocials["twitchId"] = infoObj.twitch_id : null

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

        await prisma.$disconnect();

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}