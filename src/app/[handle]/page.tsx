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
import { CollectablesDialog } from "@/src/components/handle/collectables";
import { getUserDomains as getDomains } from "@/src/actions";
import { Metadata } from "next";

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

        const wallet = user?.Wallet.sort((a, b) => {
            if (a.preferrednetworks.includes("eth")) {
                return -1;
            }
            return 1;
        });

        return { ...user, Wallet: wallet, profiles: user?.Profile[0] };
    } catch (error) {
        // Errrors can happen because /[handle] can be any 404 url
        // e.g. robots.txt, sitemap.xml

        return null;
    } finally {
        await prisma.$disconnect();
    }
}

async function getUserDomains(address: string): Promise<{
    ensDomains: Array<{ domain: string; type: string; blockchain: string }>;
    unsDomains: Array<{ domain: string; type: string; blockchain: string }>;
}> {
    try {
        const domains = await getDomains(address);

        return {
            ensDomains: domains.filter(
                (d: any) => d.type.toLowerCase() === "ens",
            ),
            unsDomains: domains.filter(
                (d: any) => d.type.toLowerCase() === "uns",
            ),
        };
    } catch (error) {
        return {
            ensDomains: [],
            unsDomains: [],
        };
    }
}
export default async function Profile({
    params,
}: {
    params: { handle: string };
}) {
    const handle = params.handle;

    const data = await getUserByHandle(handle);

    const domainData = data?.Wallet?.[0]?.address
        ? await getUserDomains(data?.Wallet?.[0]?.address)
        : {
              ensDomains: [],
              unsDomains: [],
          };

    // let data_each_wallet: any = {};
    // let total_balance: number = 0;

    // for (let wallet of (data?.["Wallet"] || [])) {
    //     // const covalent: any = await getUser({ address: wallet?.["address"] });
    //     // console.log("COVALENT", covalent)
    //     // data_each_wallet[wallet.network] = covalent;
    //     // total_balance += covalent["usd_balance"];
    // }

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
                            domainData={domainData}
                            walletAddress={data?.Wallet?.[0]?.address}
                        />

                        <EditHandleButton handle={data.handle} />

                        <div>
                            <CollectablesDialog data={domainData} />
                        </div>

                        <div className="mt-4 flex w-full max-w-[650px] flex-col gap-3">
                            {/* <Wallet wallet={data.Wallet} /> */}
                            {data?.Wallet?.map((wallet: any, i: number) => {
                                const preferrednetworks =
                                    wallet.preferrednetworks;

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
                                        {/* {wallet.preferrednetworks.map(
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
                                        )}  */}
                                    </div>
                                );
                            })}
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
