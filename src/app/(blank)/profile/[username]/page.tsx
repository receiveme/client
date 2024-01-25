import { IconRocket } from "@tabler/icons-react";
import Image from "next/image";
import { headers } from "next/headers";

export function generateMetadata({ params }: { params: any }) {
    return {
        title: params.username,
    };
}

export default function Profile({ params }: any) {
    const username = params.username;

    return (
        <>
            <main className="">
                <div className="w-full bg-gradient-to-b from-yellow-300 to-slate-900 p-2 flex justify-center flex-wrap flex-col gap-2 items-center h-screen">
                    <div className="max-w-[580px] w-[580px] flex flex-col items-center mb-24">
                        <div className="my-6 relative">
                            <div className="rounded-xl absolute w-full h-full p-4 flex items-end justify-between bg-gradient-to-t from-black to-transparent">
                                <span className="text-3xl text-white font-bold">
                                    <span className="text-gray-400 font-normal">
                                        @
                                    </span>
                                    {username}
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
                                className="rounded-xl shadow-md"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-4 max-w-[650px]">
                            <div className="flex bg-white rounded-lg shadow-sm py-2 px-1">
                                <div className="flex items-center justify-center ml-2">
                                    <img
                                        src="/img/3p/eth.png"
                                        className={`w-[28px] h-[auto]`}
                                    />
                                </div>
                                <div className="ml-3 w-full flex flex-col flex-shrink-1">
                                    <p className="text-sm font-bold overflow-ellipsis">
                                        ETH
                                    </p>
                                    <span className="text-xs font-light">
                                        0x032123213
                                    </span>
                                </div>
                                <div className="ml-auto mr-1 flex gap-1.5">
                                    <button className="bg-[#eee] rounded-md px-3 py-2 hover:scale-[1.05] transition h-full">
                                        <img
                                            src="https://img.icons8.com/?size=256&amp;id=86216&amp;format=png"
                                            alt="add"
                                            className="w-[24px]"
                                        />
                                    </button>
                                    <button className="bg-[#eee] rounded-md px-3 py-2 hover:scale-[1.05] transition h-full">
                                        <img
                                            src="https://img.icons8.com/?size=256&amp;id=85970&amp;format=png"
                                            alt="add"
                                            className="w-[24px]"
                                        />
                                    </button>
                                </div>
                            </div>
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
