"use client";

import { useAppState } from "@/src/hooks/useAppState";
import { IconEdit } from "@tabler/icons-react";
import Link from "next/link";

export default function EditHandleButton({ handle }: any) {
    const [appState] = useAppState();

    return (
        <>
            {handle == appState.userData?.handle ? (
                <Link
                    href="/dashboard"
                    className="mb-6 flex w-full items-center justify-center gap-1 rounded-lg bg-indigo-600 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                    <IconEdit size="16" />
                    Edit
                </Link>
            ) : (
                <></>
            )}
        </>
    );
}
