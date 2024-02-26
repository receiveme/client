"use client";

import { IconEdit } from "@tabler/icons-react";

type HandleEditButtonProps = {
    id: string;
    onEdit: (id: string) => void;
};

export default function EditHandleButton(handle: any) { {/* app-state-marker */}
    return (
        <>
            {handle ==
            JSON.parse(
                localStorage.getItem("userData") ??
                    '{"handle": "-----------------"}',
            ).handle ? (
                <div className="flex w-full justify-end">
                    <button className="gap-2 text-sm font-bold text-gray-400">
                        <IconEdit />
                        Edit
                    </button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
