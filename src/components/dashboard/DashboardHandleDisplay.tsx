"use client";

import { useAppState } from "@/src/hooks/useAppState";

export default function DashboardHandleDisplay() {
    const [appState] = useAppState();
    const handle = appState.userData?.handle;

    return <>{handle}</>;
}
