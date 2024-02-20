import { Wallet } from "@/src/components/handle/Wallet";
import prisma from "@/lib/prisma";
import "../globals.css";
import { Banner } from "@/src/components/profile/Banner";
import { getUser } from "@/src/actions/getUser";

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
                        preferrednetworks: true,
                    },
                },
            },
        });

        //@ts-ignore
        user.profiles = user.Profile[0];
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

export default async function Profile({ params }: any) {
    const handle: any = params.handle;
    const data: any = await getUserByHandle(handle);

    let data_each_wallet: any = {};
    let total_balance: number = 0;

    // for (let wallet of (data?.["Wallet"] || [])) {
    //     // const covalent: any = await getUser({ address: wallet?.["address"] });
    //     // console.log("COVALENT", covalent)
    //     // data_each_wallet[wallet.network] = covalent;
    //     // total_balance += covalent["usd_balance"];
    // }

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
                        <div className="w-full flex flex-col gap-3 max-w-[650px]">
                            {data.Wallet.map((wallet: any, i) => {
                                const preferrednetworks =
                                    wallet.preferrednetworks;
                                return (
                                    <div className="flex flex-col gap-3">
                                        {wallet.preferrednetworks.map(
                                            (e, i) => {
                                                return (
                                                    <Wallet
                                                        address={wallet.address}
                                                        key={i}
                                                        preferrednetwork={
                                                            preferrednetworks[i]
                                                        }
                                                    />
                                                );
                                            },
                                        )}
                                    </div>
                                );
                            })}
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
