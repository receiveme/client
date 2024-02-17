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

                    }
                }
            }
        });


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

    return (
        <>
            <main className="">
                <div
                    className={`w-full bg-gradient-to-b from-${data.profiles.theme} to-slate-900 p-2 flex justify-center flex-wrap flex-col gap-2 items-center h-screen`}
                >
                    <div className="max-w-[580px] w-full px-5 flex flex-col items-center mb-24">
                        <div
                            className={`my-6 relative bg-${data.profiles.banner} rounded-xl`}
                        >
                            <div className="rounded-xl absolute w-full h-full p-4 flex items-end justify-between bg-gradient-to-t from-black to-transparent">
                                <span className="text-3xl text-white font-bold">
                                    <span className="text-gray-400 font-normal">
                                        @
                                    </span>
                                    {data.handle}
                                </span>

                                <div className="flex gap-2 items-center">
                                    <a
                                        href={"https://paypal.me/nickmura/"}
                                        className={`transition duration-200 hover:scale-[1.1] hover:shadow-md border border-solid p-1 rounded-md flex justify-center items-center bg-white`}
                                    >
                                        <img
                                            src="/img/3p/paypal.png"
                                            className={`h-[20px] w-[20px]`}
                                        />
                                    </a>
                                </div>
                            </div>
                            <img
                                src="/img/profile/WhaleNew.png"
                                className={`rounded-xl shadow-md`}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-4 max-w-[650px]">
                            <Wallet
                                network="eth"
                                address="0xc49C0eEd65b1d4C757Bd064dC83e10f88DF16BB1"
                            />
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