import { IconRocket } from "@tabler/icons-react";
import Image from "next/image";
import { headers } from "next/headers";
import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { Wallet } from "@/src/components/handle/Wallet";

export function generateMetadata({ params }: { params: any }) {
    return {
        title: params.handle,
    };
}
function metamaskConnect() {
    return new Promise(async (resolve, reject) => {
        const chainId = await window["ethereum"]?.request({ method: 'eth_chainId' });
        const accounts = await window["ethereum"]?.
            request({method: 'eth_requestAccounts'})//@ts-ignore
            .catch(e => { 
                console.error(e);
                return reject();
            });
    
        // After connection
        if (accounts?.length && accounts[0] && chainId) {
            // Get chain name by chain ID


        }
    })
}

async function getHandleData(handle: string) {
    const query = await supabase
        .from("handles")
        .select(
            `
            *,
            profiles (
                theme,
                banner
            )
        `,
        )
        .eq("handle", handle)
        .single();

    return query.data;
}

export default async function Profile({ params }: any) {
    const handle = params.handle;
    const data = await getHandleData(handle);

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
                                    {handle}
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
