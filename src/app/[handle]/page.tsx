import { Wallet } from "@/src/components/handle/Wallet";
import prisma from "@/lib/prisma";

import "../globals.css";
import { Banner } from "@/src/components/profile/Banner";

// export async function generateMetadata({ params }: { params: any }) {
//     return {
//         title: params,
//     };
// }

async function getUserByHandle(handle: string) {
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
                        preferrednetworks: true
                    },
                },
            },
        });

        //@ts-ignore
        user.profiles = user.Profile[0];
        console.log(user);
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

export default async function Profile({ params }: any) {
    const handle = params.handle;
    const data = await getUserByHandle(handle);

    if (!data) {
        // Render 404
        return <>could not find</>;
    }

    const bg = data.profiles.theme.includes("/animate")
        ? `from-${data.profiles.theme.replace(
              "/animate",
              "",
          )} background-animate gradient-animation`
        : `from-${data.profiles.theme.replace("/none", "")} `;

    return (
        <>
            <main className="">
                <div
                    className={`w-full bg-gradient-to-b ${bg} to-slate-900 p-2 flex justify-center flex-wrap flex-col gap-2 items-center h-screen `}
                >
                    <div className="max-w-[580px] w-full px-5 flex flex-col items-center mb-24">
                        <Banner
                            handle={data.handle}
                            banner={data.profiles.background}
                            socials={data.Social}
                            className="my-6"
                        />

                        <div className="w-full flex flex-col gap-4 max-w-[650px]">
                            {data.Wallet.map((wallet: any) => (
                                <Wallet
                                    network={
                                        wallet.network == "metamask"
                                            ? "EVM"
                                            : wallet.network
                                    }
                                    address={wallet.address}
                                />
                            ))}
                        </div>

                        <div className="mt-4 flex w-full justify-center items-center">
                            <span className="text-sm text-gray-400 font-bold">
                                @receive.me
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
