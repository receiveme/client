"use server"
import prisma from "@/lib/prisma"

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

        await prisma.$disconnect();
        return userSocials.Social; // Return only the Social array
    } catch (error) {
        console.error("Error retrieving user socials:", error);
        await prisma.$disconnect();
        throw error;
    }
}

export async function getUserData(userId) {
    console.log("get suer", userId)
    try {
        const userData = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                Profile: true,
                Social: true,
                Wallet: true,
            },
        });
        await prisma.$disconnect();

        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        await prisma.$disconnect();
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
        await prisma.$disconnect();
        return userWallets.Wallet; // Return only the Wallet array
    } catch (error) {
        console.error("Error retrieving user wallets:", error);
        await prisma.$disconnect();
        throw error;
    }
}

export async function createUserProfile(socials: any, wallets: any, userInfo: any, handle: String, profile: any) { // TODO; seperate socials & wallets
    const { theme, banner } = profile
    const info_token = userInfo[0].info.token
    const uuid = userInfo[0].info.uuid
    console.log(wallets)
    try {
        const user = await prisma.user.create({
            data: {
                handle: handle,
                authuuid: uuid
            },
        });

        console.log("THEME", theme);
        console.log("BANNER", banner);

        await prisma.profile.create({
            data: {
                userid: user.id, // Use the existing user's ID
                theme: theme,   // Optional, specify the theme if provided
                background: banner, // Optional, specify the background if provided
            },
        });

        if (socials.length > 0) {
            for (let i = 0; i < socials.length; i++) {
                try {
                    await prisma.social.create({
                        data: {
                            userid: user.id,
                            platform: socials[i].authType,
                            networkid: String(socials[i].socialId),
                            particle_token: String(info_token),
                            particle_uuid: String(uuid),
                            name: socials[i].socialUsername ? socials[i].socialUsername : "",
                            imageurl: socials[i].socialImage ? socials[i].socialImg : ""
                        },
                    });
                    console.log(`Social inserted successfully.`);
                } catch (error) {
                    console.error(`Error inserting social:`, error);
                }
            }
        }

        if (wallets.length > 0) {
            for (let i = 0; i < wallets.length; i++) {
                try {
                    await prisma.wallet.create({
                        data: {
                            userid: user.id,
                            network: wallets[i].walletProvider,
                            address: wallets[i].walletAddress,
                        },
                    });
                    console.log('successuflly inserted wallet')
                } catch (error) {
                    console.error("Wallet insertion err:", error);
                }
            }
        }

        await prisma.$disconnect();
        console.log("USER RETURN", user)
        return user.id;
    } catch (error) {
        console.error('Error creating user:', error);
        await prisma.$disconnect();
        throw error;
    }
}

export async function getUserByHandle(handle: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                handle: handle
            },
            include: {
                Profile: {
                    select: {
                        theme: true,
                        background: true,

                    },

                }, Social: {
                    select: {
                        platform: true,
                        name: true,
                        networkid: true,
                    }
                }, Wallet: {
                    select: {
                        address: true,
                        network: true
                    }
                }
            }
        });

        //@ts-ignore    
        user.profiles = user.Profile[0]
        console.log(user);
        return user.id;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}