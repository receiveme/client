"use client";

import { useAppState } from "@/src/hooks/useAppState";

export default function DashboardHandleDisplay() {
    const [appState] = useAppState();
    return <>{appState.userData?.handle}</>;
}
