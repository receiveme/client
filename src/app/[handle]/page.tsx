import { Wallet } from "@/src/components/handle/Wallet";
import prisma from "@/lib/prisma";
import "../globals.css";
import { Banner } from "@/src/components/profile/Banner";
import { getUser } from "@/src/actions/getUser";
import { IconEdit } from "@tabler/icons-react";
import EditHandleButton from "@/src/components/handle/EditButton";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Button } from "@/src/components/ui/button";

async function getUserByHandle(handle: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                // domain: handle,
                OR: [
                    {
                        handle,
                    },
                    {
                        domain: {
                            has: handle,
                        },
                    },
                ],
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
                    where: { visible: true },
                    select: {
                        address: true,
                        network: true,
                        preferrednetworks: true,
                    },
                },
            },
        });

        return { ...user, profiles: user?.Profile[0] };
    } catch (error) {
        // Errrors can happen because /[handle] can be any 404 url
        // e.g. robots.txt, sitemap.xml

        return null;
    } finally {
        await prisma.$disconnect();
    }
}

export default async function Profile({
    params,
}: {
    params: { handle: string };
}) {
    const handle = params.handle;

    const data = await getUserByHandle(handle);

    // let data_each_wallet: any = {};
    // let total_balance: number = 0;

    // for (let wallet of (data?.["Wallet"] || [])) {
    //     // const covalent: any = await getUser({ address: wallet?.["address"] });
    //     // console.log("COVALENT", covalent)
    //     // data_each_wallet[wallet.network] = covalent;
    //     // total_balance += covalent["usd_balance"];
    // }

    console.log(data, "data from get user");

    if (!data || !data.profiles) {
        // Render 404
        return <>could not find</>;
    }

    const bg = data?.profiles?.theme?.includes("/animate")
        ? `from-${data?.profiles.theme.replace(
              "/animate",
              "",
          )} background-animate gradient-animation`
        : `from-${data?.profiles?.theme?.replace("/none", "")} `;

    const hasDomains = data.domain?.length !== 0;

    // const { data: resolvedDomain } = useQuery<string>({
    //     queryKey: [
    //         "/api/domains/resolve/multiple",
    //         { address, preferrednetwork },
    //     ],
    //     queryFn: async () => {
    //         const res = await fetch(
    //             `/api/domains/resolve/multiple/${address}?chain=${preferrednetwork}`,
    //         );
    //         const json = await res.json();

    //         if (json?.data) {
    //             return json?.data;
    //         }

    //         return null;
    //     },
    //     staleTime: Number.POSITIVE_INFINITY,
    // });

    return (
        <>
            <main className="">
                <div
                    className={`w-full bg-gradient-to-br ${bg} flex h-screen flex-col flex-wrap items-center justify-center gap-2 to-slate-900 p-2 `}
                >
                    <div className="mb-24 flex w-full max-w-[580px] flex-col items-center px-3 lg:px-5">
                        <Banner
                            handle={data.handle!}
                            banner={data?.profiles?.background!}
                            socials={data.Social}
                            className="my-4"
                            hasDomains={hasDomains}
                        />

                        <EditHandleButton handle={data.handle} />

                        <div>
                            <button className="bg-[#4C47F7] rounded-xl px-4 py-2 hover:bg-[#4C47F7]/80 text-white font-medium">
                                View Collectibles
                            </button>
                        </div>

                        <div className="mt-4 flex w-full max-w-[650px] flex-col gap-3">
                            <Wallet wallet={data.Wallet} />
                            {/* {data?.Wallet?.map((wallet: any, i: number) => {
                                const preferrednetworks =
                                    wallet.preferrednetworks;

                                if (preferrednetworks.includes("matic")) {
                                }

                                return (
                                    <div
                                        className="flex flex-col gap-3"
                                        key={i}
                                    >
                                        <Wallet
                                            address={wallet.address}
                                            preferrednetwork={
                                                preferrednetworks.length === 1
                                                    ? preferrednetworks[0]
                                                    : preferrednetworks
                                            }
                                        />
                                         {wallet.preferrednetworks.map(
                                            (__n: any, i: number) => {
                                                console.log(
                                                    preferrednetworks,
                                                    "preferrednetworks",
                                                    wallet,
                                                );
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
                            })} */}
                        </div>

                        <div className="mt-6">
                            <div className="hidden md:flex gap-3">
                                {data.Social && data.Social.length ? (
                                    data.Social.map((social, i) => (
                                        <div className="flex gap-2" key={i}>
                                            <a
                                                href={
                                                    social.platform == "github"
                                                        ? `https://github.com/${social.name}/`
                                                        : social.platform ==
                                                          "twitter"
                                                        ? `https://twitter.com/${social.name}`
                                                        : social.platform ==
                                                          "twitch"
                                                        ? `https://twitch.com/${social.name}/`
                                                        : social.platform ==
                                                          "discord"
                                                        ? `discord://-/users/${social.networkid}`
                                                        : ""
                                                }
                                                target="_blank"
                                                className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid p-1 rounded-lg flex justify-center items-center bg-white`}
                                            >
                                                <img
                                                    src={
                                                        social.platform ==
                                                        "github"
                                                            ? "/img/3p/github.png"
                                                            : social.platform ==
                                                              "twitter"
                                                            ? "/img/3p/twitter.png"
                                                            : social.platform ==
                                                              "twitch"
                                                            ? "/img/3p/twitch.png"
                                                            : "/img/3p/discord.png"
                                                    }
                                                    className={`w-[20px] h-auto`}
                                                />
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 flex w-full items-center justify-center">
                            <span className="text-sm font-bold text-gray-300">
                                @Receive.me
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
