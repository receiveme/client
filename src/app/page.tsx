import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <Navbar></Navbar>
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
        </main>
    );
}
