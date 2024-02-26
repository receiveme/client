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
                <a
                    href="/dashboard"
                    className="mb-6 flex w-full items-center justify-center gap-1 rounded-lg bg-indigo-600 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                    <IconEdit size="16" />
                    Edit
                </a>
            ) : (
                <></>
            )}
        </>
    );
}
