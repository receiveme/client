'use client'
import { IconRocket } from "@tabler/icons-react";
import { headers } from "next/headers";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { Wallet } from "@/src/components/handle/Wallet";
import prisma from "@/lib/prisma";

import "../globals.css";


// export async function generateMetadata({ params }: { params: any }) {
//     return {
//         title: params,
//     };
// }



async function getUserByHandle(handle: string) {
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

                },Social: {
                    select: {
                        platform: true,
                        name: true,
                        networkid: true,
                    }
                },Wallet: {
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
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

export default async function Profile() {
    const pathName = usePathname().replace('/', '')

    console.log("GETUSER", pathName)
    const data = await getUserByHandle(pathName);

    if (!data) {
        // Render 404
        return <>could not find</>;
    }
    //@ts-ignore    
    const bg = data.profiles.theme.includes('/animate') ? `from-${data.profiles.theme.replace('/animate', '')} background-animate gradient-animation`: `from-${data.profiles.theme.replace('/none', '')} `
    
    //@ts-ignore
    let bannerSrc = data.profiles.background.includes('whale') ? `/img/profile/WhaleNew.png` : data.profiles.background.includes('waves/blue') ? `/img/profile/WavesBlue.png` : data.profiles.background.includes('waves/red') ? '/img/profile/WavesRed.png' : data.profiles.background.includes('waves/pink') ?  `/img/profile/WavesPink.png`:  data.profiles.background.includes('waves/turquoise') ? `/img/profile/WavesTurquoise.png` : data.profiles.background.includes('waves/yellow') ? `/img/profile/WavesYellow.png` : data.profiles.background.includes('gator/evening') ? `/img/profile/GatorEvening.png` : data.profiles.background.includes(`gator/cool`) ? `/img/profile/GatorCool.png` : data.profiles.background.includes(`gator/night`) ? `/img/profile/GatorNight.png` : data.profiles.background.includes(`gator/sunrise`) ? `/img/profile/GatorSunrise.png` : data.profiles.background.includes(`beach/day`) ? `/img/profile/BeachDay.png` : ``  
    //@ts-ignore
    const socials = data.Social.map((social, i) =>  {
        return (
            <div className="flex gap-2 " key={i}>
                <a
                    href={social.platform == 'github' ? `https://github.com/${social.name}/` : social.platform == 'twitter' ? `https:/twitter.com/${social.name}` : social.platform == 'twitch'  ? `https://twitch.com/${social.name}/` : ''}
                    className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid p-1 rounded-md flex justify-center items-center bg-white`}
                >
                    <img
                        src={social.platform == 'github' ? '/img/3p/github.png' : social.platform == 'twitter' ? '/img/3p/twitter.png' : social.platform == 'twitch' ? '/img/3p/twitch.png' : '/img/3p/discord.png'}
                        className={`h-[20px] w-[20px]`}
                    />
                </a>
            </div>
        )
    }

    )
    //@ts-ignore
    const wallets = data.Wallet.map((wallet, i) => {
        return (
            <Wallet
                network={String(wallet.network) == 'metamask' ? 'EVM' : String(wallet.network)}
                address={String(wallet.network)}
                key={i}
            />
        )
    })      

    return (
        <> 
            <main className="">
                <div
                    className={`w-full bg-gradient-to-b ${bg} to-slate-900 p-2 flex justify-center flex-wrap flex-col gap-2 items-center h-screen `}
                >
                    <div className="max-w-[580px] w-full px-5 flex flex-col items-center mb-24">
                        <div
                            className={`my-6 relative  rounded-xl`}
                        >
                            <div className="rounded-xl absolute w-full h-full p-4 flex items-end justify-between bg-gradient-to-t from-black to-transparent">
                                <span className="text-3xl text-white font-bold">
                                    <span className="text-gray-400 font-normal">
                                        @
                                    </span>
                                    {data.handle}
                                </span>
                                <div className='flex gap-2 items-end'>
                                    {socials}
                                </div>

                            </div>
                            <img
                                src={bannerSrc}
                                className={`rounded-xl shadow-md`}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-4 max-w-[650px]">
                            {wallets}
                        </div>

                        <div className="mt-4">
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
