"use server"
import prisma from "@/lib/prisma"

// export async function createUserDRaftProfile(userInfo: Object, handle: String, profile: Object) {

//     const { theme, banner } = profile
//     console.log("PROP IN", userInfo)
//     const { chain_name, public_address } = userInfo[0].info.wallets[0]

//     try {
//         const user = await prisma.user.create({
//             data: {
//                 handle: handle,
//             },
//         });

//         await prisma.profile.create({
//             data: {
//                 userid: user.id, // Use the existing user's ID
//                 theme: theme,   // Optional, specify the theme if provided
//                 background: banner, // Optional, specify the background if provided
//             },
//         });

//         await prisma.wallet.create({
//             data: {
//                 address: public_address,
//                 network: chain_name, // Optional, can be null or omitted if not provided
//                 userid: user.id, // Optional, can be null. Make sure the userId exists if provided
//             },
//         });
//         await prisma.$disconnect();
//         return user;
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw error;
//     }
// }

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
        console.log("SUCCESS", userData)
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

    try {
        const user = await prisma.user.create({
            data: {
                handle: handle,
                authuuid: socials[0].socialUuid
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

        for (let i = 0; i < wallets.length; i++) {
            try {
                await prisma.wallet.create({
                    data: {
                        userid: user.id,
                        network: wallets[i].walletProvider,
                        address: wallets[i].walletAddress,
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
        await prisma.$disconnect();
        throw error;
    }
}