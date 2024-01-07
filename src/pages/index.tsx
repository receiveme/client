import { FormatTitle } from "@/helpers/title";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>{FormatTitle("Home")}</title>
            </Head>

            <main>
                <Link href="/login" className="text-green-500 underline block">
                    /login
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
                <Link
                    href="/profile/fs1lent"
                    className="text-green-500 underline block mt-2"
                >
                    /profile/fs1lent
                </Link>
                <Link
                    href="/profile/nickmura"
                    className="text-green-500 underline block mt-2"
                >
                    /profile/nickmura
                </Link>
            </main>
        </>
    );
}
