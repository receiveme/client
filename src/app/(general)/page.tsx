"use client";

import { useAppState } from "@/src/hooks/useAppState";
import { supabase } from "@/src/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [appState, setAppState] = useAppState();

    async function signOut() {
        await supabase.auth.signOut();
        setAppState({ user: null });
    }

    return (
        <main>
            <Link href="/login" className="text-green-500 underline block">
                /login
            </Link>
            <Link href="/draft-auth" className="text-green-500 underline block">
                /draft-auth
            </Link>
            <Link
                href="/register"
                className="text-green-500 underline block mt-2"
            >
                /register
            </Link>
            <Link
                href="/onboard"
                className="text-green-500 underline block mt-2"
            >
                /onboard
            </Link>

            <h3 className="mt-3 font-bold text-xl">Debug Info</h3>

            <h4>status: {appState!.user ? "logged in" : "not logged in"}</h4>
            <h4>userid: {appState?.user?.id}</h4>
            <h4>user email: {appState?.user?.email}</h4>
            {appState!.user ? (
                <h5
                    className="text-green-500 underline block mt-2 cursor-pointer"
                    onClick={signOut}
                >
                    sign out
                </h5>
            ) : (
                <></>
            )}
        </main>
    );
}
