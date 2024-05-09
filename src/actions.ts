"use server";
import prisma from "@/lib/prisma";

type supportedWallet = {
    key: string;
    state: boolean;
    image: string;
    name: string;
};
type SupportedWallets = supportedWallet[];

export async function updateUserWallet(
    address: string,
    wallet: any,
    preferrednetworks: SupportedWallets,
    visible: boolean,
) {
    console.log(preferrednetworks);
    let networks = preferrednetworks
        .filter((network) => network.state == true)
        .map((network) => network.key);
    // for (let i = 0; preferrednetworks.length; i++) {
    //     if (preferrednetworks[i]?.state) networks.push(preferrednetworks[i].key)
    // }
    console.log(networks);
    try {
        const userWallet = await prisma.wallet.update({
            where: {
                id: wallet.id,
            },
            data: {
                preferrednetworks: networks,
                visible: visible,
            },
        });

        await prisma.$disconnect();
        console.log(userWallet);
        return userWallet; // Return only the Social array
    } catch (error) {
        console.error("Error retrieving user socials:", error);
        await prisma.$disconnect();
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

        await prisma.$disconnect();
        return userSocials.Social; // Return only the Social array
    } catch (error) {
        console.error("Error retrieving user socials:", error);
        await prisma.$disconnect();
        throw error;
    }
}

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
}

export async function getUserDataByUuid(userId: string) {
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
}

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
        return user?.id;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

export async function createSocials(userId: string, data: any[]) {
    try {
        const dataToInsert = data.map((social) => ({
            userid: userId,
            particle_token: social.particle_token,
            particle_uuid: social.particle_uuid,
            name: social.name,
            platform: social.platform,
            imageurl: social.imageurl,
        }));

        dataToInsert.forEach(async (social) => {
            const already = await prisma.social.findFirst({ where: social });

            if (!already) {
                await prisma.social.create({
                    data: social,
                });
            }
        });

        return dataToInsert;
    } catch (error) {
        console.error("Failed to create social:", error);
    }
}

export async function createWallets(userId: string, walletsData: any[]) {
    try {
        // Map over the walletsData to add the userId to each wallet object
        const dataToInsert = walletsData.map((wallet) => ({
            userid: userId,
            address: wallet.address,
            network: wallet.network,
        }));

        dataToInsert.forEach(async (wallet) => {
            const already = await prisma.wallet.findFirst({ where: wallet });

            if (!already) {
                await prisma.wallet.create({
                    data: wallet,
                });
            }
        });

        return dataToInsert;
    } catch (error) {
        console.error("Failed to create wallets:", error);
        throw error; // Rethrow the error to handle it or log it outside this function
    }
}
