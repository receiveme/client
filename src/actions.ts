"use server"
import prisma from "@/lib/prisma"

export async function createUserDRaftProfile(userInfo: Object, handle: String, profile: Object) {

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


export async function createUserProfile(socials: any, wallets: any, userInfo: Array, handle: String, profile: any) { // TODO; seperate socials & wallets
    console.log("PROFILE", userInfo)
    const { theme, banner } = profile
    const { chain_name, public_address } = userInfo[0].info.wallets[0]
    const infoObj = userInfo[0].info.thirdparty_user_info.user_info.id


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

        for (let i = 0; i < socials.length; i++) {

            try {
                await prisma.social.create({
                    data: {
                        userid: user.id,
                        platform: socials[i].authType,
                        networkid: socials[i].socialId,
                        particle_token: infoObj.token,
                        particle_uuid: infoObj.uuid,
                        name: socials[i].socialUsername,
                        imageurl: socials[i].socialImage
                    },
                });
                console.log(`Social inserted successfully.`);
            } catch (error) {
                console.error(`Error inserting social:`, error);
            }
        }

        for (let i = 0; wallets.length < i; i++) {
            try {
                await prisma.wallet.create({
                    data: {
                        userid: user.id,
                        address: wallets[i].walletAdress,
                        network: wallets[i].walletProvider
                    },
                });

            } catch (error) {
                console.error("Wallet insertion err:", error);
            }
        }

        await prisma.$disconnect();

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}