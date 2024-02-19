import { Wallet } from "@/src/components/handle/Wallet";
import prisma from "@/lib/prisma";
<<<<<<< HEAD
import "../globals.css";
import { Banner } from "@/src/components/profile/Banner";

// export async function generateMetadata({ params }: { params: any }) {
//     return {
//         title: params,
//     };
// }
=======

import "../globals.css";
import { Banner } from "@/src/components/profile/Banner";
import { getUser } from "@/src/actions/getUser";
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f

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
<<<<<<< HEAD
=======
        console.log(user);
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

export default async function Profile({ params }: any) {
<<<<<<< HEAD
    const handle = params.handle;
    const data = await getUserByHandle(handle);
=======
    const handle: any = params.handle;
    const data: any = await getUserByHandle(handle);

    let data_each_wallet: any = {};
    let total_balance: number = 0;

    for (let wallet of (data?.["Wallet"] || [])) {
        const covalent: any = await getUser({ address: wallet?.["address"] });
        data_each_wallet[wallet.network] = covalent;
        total_balance += covalent["usd_balance"];
    }
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f

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
<<<<<<< HEAD
                            className="my-6"
                        />
                        <div className="w-full flex flex-col gap-4 max-w-[650px]">
                            {data.Wallet.map((wallet: any, i) => {
                                const preferrednetworks = wallet.preferrednetworks
                                return (
                                    <div className="network-map">
                                        {wallet.preferrednetworks.map((e, i) => {
                                            return (
                                                <Wallet
                                                    address={wallet.address}
                                                    key={i}
                                                    preferrednetwork={preferrednetworks[i]}
                                                />
                                            )
                                        })}
                                    </div>
                                )
                            })}
=======
                            balance={total_balance}
                            className="my-6"
                        />

                        <div className="w-full flex flex-col gap-4 max-w-[650px]">
                            {data.Wallet.map((wallet: any, i: any) => (
                                <Wallet
                                    network={
                                        wallet.network == "metamask"
                                            ? "EVM"
                                            : wallet.network == 'particle' ?
                                                'EVM' : wallet.network
                                    }
                                    address={wallet.address}
                                    balance={data_each_wallet[wallet.network]}
                                />

                            ))}
>>>>>>> 952d83df628f624b9a565a41c86ac815ca82824f
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
