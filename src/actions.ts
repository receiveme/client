"use server";
import prisma from "@/lib/prisma";

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
};

export async function getUserData(userId) {
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
        console.log(userData);
        await prisma.$disconnect();

        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        await prisma.$disconnect();
        throw error;
    }
};

export async function getUserDataByUuid(userId) {
    try {
        const userData = await prisma.user.findFirst({
            where: {
                authuuid: userId,
            },
            include: {
                Profile: true,
                Social: true,
                Wallet: true,
            },
        });
        console.log(userData);
        await prisma.$disconnect();

        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        await prisma.$disconnect();
        throw error;
    }
};

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
};

export async function createUserProfile(
    socials: any,
    wallets: any,
    userInfo: any,
    handle: String,
    profile: any,
) {
    // TODO; seperate socials & wallets
    const { theme, banner } = profile;
    console.log(userInfo);
    const info_token = userInfo.token;
    const uuid = userInfo.uuid;
    const particleWalletAddress = userInfo.wallets[0].public_address;
    try {
        const user = await prisma.user.create({
            data: {
                //@ts-ignore
                handle: handle.toLowerCase(),
                authuuid: uuid,
            },
        });

        await prisma.profile.create({
            data: {
                userid: user.id, // Use the existing user's ID
                theme: theme, // Optional, specify the theme if provided
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
                            name: socials[i].socialUsername
                                ? socials[i].socialUsername
                                : "",
                            imageurl: socials[i].socialImage
                                ? socials[i].socialImg
                                : "",
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
                            preferrednetworks:
                                wallets[i].walletProvider == "metamask"
                                    ? ["eth", "avax", "bnb"]
                                    : wallets[i].walletProvider == "particle"
                                        ? ["eth", "avax", "bnb"]
                                        : wallets[i].walletProvider == "tron"
                                            ? ["tron"]
                                            : ["algo"],
                        },
                    });
                    console.log("successuflly inserted wallet");
                } catch (error) {
                    console.error("Wallet insertion err:", error);
                }
            }
        }
        if (particleWalletAddress) {
            try {
                await prisma.wallet.create({
                    data: {
                        userid: user.id,
                        network: "particle",
                        address: String(particleWalletAddress),
                        preferrednetworks: ["eth", "avax", "bnb"],
                    },
                });
                console.log("successuflly inserted particle wallet");
            } catch (error) {
                console.error("Wallet insertion err:", error);
            }
        }

        await prisma.$disconnect();
        return user.id;
    } catch (error) {
        console.error("Error creating user:", error);
        await prisma.$disconnect();
        throw error;
    }
};

export async function getUserByHandle(handle: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                handle: handle,
            },
            include: {
                Profile: {
                    select: {
                        theme: true,
                        background: true,
                    },
                },
                Social: {
                    select: {
                        platform: true,
                        name: true,
                        networkid: true,
                    },
                },
                Wallet: {
                    select: {
                        address: true,
                        network: true,
                    },
                },
            },
        });

        //@ts-ignore
        user.profiles = user.Profile[0];
        console.log(user);
        return user.id;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
};

export async function createSocial(userId: string, data: any) {
    try {
        const social = await prisma.social.create({
            data: {
                userid: userId,
                particle_token: data.particle_token,
                particle_uuid: data.particle_uuid,
                name: data.name,
                platform: data.platform,
                imageurl: data.imageurl
            }
        });

        //@ts-ignore
        return social
    } catch (error) {
        console.error("Failed to create social:", error);
    }
};