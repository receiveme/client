"use client";

import { useQuery } from "@tanstack/react-query";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from "../../ui/dialog";
import { IconUser } from "@tabler/icons-react";
import { useMemo } from "react";

interface Props {
    data?: {
        ensDomains: Array<{ domain: string; type: string; blockchain: string }>;
        unsDomains: Array<{ domain: string; type: string; blockchain: string }>;
    };
}

export const CollectablesDialog = ({ data }: Props) => {
    const isLoading = !data;

    console.log({ data });

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="bg-[#4C47F7] rounded-xl px-4 py-2 hover:bg-[#4C47F7]/80 text-white font-medium">
                        View Collectables
                    </button>
                </DialogTrigger>
                <DialogContent className="text-center w-full sm:max-w-md lg:max-w-md">
                    <div className="overflow-hidden">
                        <div>
                            <img
                                src="/img/handle/ud-logo-text.svg"
                                className="mx-auto h-16"
                                alt=""
                            />
                        </div>
                        <div className="flex gap-4 overflow-x-auto sleek-scrollbar">
                            {isLoading ? (
                                <>
                                    <div className="basis-1/2 h-52 relative p-4 flex flex-col bg-[#0E66FC] items-start rounded-xl justify-end animate-pulse">
                                        <div className="absolute h-10 w-10 top-4 left-4 bg-blue-400 rounded"></div>
                                        <p className="relative z-10 h-6 bg-blue-400 rounded w-3/4"></p>
                                    </div>
                                    <div className="basis-1/2 h-52 relative p-4 flex flex-col bg-[#0E66FC] items-start rounded-xl justify-end animate-pulse">
                                        <div className="absolute h-10 w-10 top-4 left-4 bg-blue-400 rounded"></div>
                                        <p className="relative z-10 h-6 bg-blue-400 rounded w-3/4"></p>
                                    </div>
                                </>
                            ) : data?.unsDomains?.length === 0 ? (
                                <p className="basis-full text-center">
                                    No data found
                                </p>
                            ) : (
                                data?.unsDomains?.map((d) => {
                                    return (
                                        <div
                                            key={d.domain}
                                            className="h-52 basis-1/2 relative p-4 flex flex-col bg-[#0E66FC] items-start rounded-xl justify-end"
                                        >
                                            <img
                                                src="/img/handle/ud-logo-white.svg"
                                                className="absolute h-14 w-14 top-2 left-2"
                                                alt=""
                                            />
                                            <img
                                                src="/img/handle/person.svg"
                                                className="absolute h-[90%] mx-auto w-auto bottom-0 inset-x-0 "
                                                alt=""
                                            />
                                            <p className="relative z-10 text-white font-semibold break-words whitespace-break-spaces text-left text-lg">
                                                {d.domain.split(".").join(" .")}
                                            </p>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="mt-6">
                        <div>
                            <img
                                src="/img/handle/ens-logo-text.png"
                                className="mx-auto h-16"
                                alt=""
                            />
                        </div>
                        <div className="flex gap-4 overflow-x-auto sleek-scrollbar">
                            {isLoading ? (
                                <>
                                    <div className="basis-1/2 h-52 relative p-4 flex flex-col bg-[#0E66FC] items-start rounded-xl justify-end animate-pulse">
                                        <div className="absolute h-10 w-10 top-4 left-4 bg-blue-400 rounded"></div>
                                        <p className="relative z-10 h-6 bg-blue-400 rounded w-3/4"></p>
                                    </div>
                                    <div className="basis-1/2 h-52 relative p-4 flex flex-col bg-[#0E66FC] items-start rounded-xl justify-end animate-pulse">
                                        <div className="absolute h-10 w-10 top-4 left-4 bg-blue-400 rounded"></div>
                                        <p className="relative z-10 h-6 bg-blue-400 rounded w-3/4"></p>
                                    </div>
                                </>
                            ) : data?.ensDomains?.length === 0 ? (
                                <p className="basis-full text-center">
                                    No data found
                                </p>
                            ) : (
                                data?.ensDomains?.map((d) => {
                                    return (
                                        <div
                                            key={d.domain}
                                            className="h-52 basis-1/2 relative p-4 flex flex-col bg-gradient-to-br from-[#6E8EF5] to-[#46B7F0] items-start rounded-xl justify-end"
                                        >
                                            <img
                                                src="/img/handle/ens-logo-white.svg"
                                                className="absolute h-10 w-10 top-3 left-3 "
                                                alt=""
                                            />
                                            <p className="relative z-10 text-white font-semibold text-lg">
                                                {d.domain}
                                            </p>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
