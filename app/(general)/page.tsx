import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
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
                href="/@nickmura"
                as="/@nickmura"
                className="text-green-500 underline block mt-2"
            >
                /@nickmura
            </Link>
            <Link
                href="/@fakes1lent"
                as="/@fakes1lent"
                className="text-green-500 underline block mt-2"
            >
                /@fakes1lent
            </Link>
        </main>
    );
}
