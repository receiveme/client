import { Button } from "@/src/components/ui/button";
import { Figtree } from "next/font/google";
import Link from "next/link";

export const figtree = Figtree({ subsets: ["latin"] });

export default function Home() {
    return (
        <div className={figtree.className}>
            <header>
                <div className="bg-primary">
                    <div className="text-white text-sm py-3 text-center max-w-screen-xl mx-auto">
                        Integrated Particle Network{" "}
                        <a
                            href="#"
                            className="underline decoration-white underline-offset-2"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
                <nav className="max-w-screen-xl mx-auto flex text-base justify-between items-center py-3">
                    <div className="font-semibold text-3xl text-primary">
                        receive.me
                    </div>
                    <div className="flex gap-6 font-medium">
                        <Link href="#">Home</Link>
                        <Link href="#">About Us</Link>
                        <Link href="#">Updates</Link>
                        <Link href="#">Plans</Link>
                        <Link href="#">FAQs</Link>
                        <Link href="#">Contact Us</Link>
                    </div>
                    <div>
                        <Button size="lg">Connect Wallet</Button>
                    </div>
                </nav>
            </header>
            <main className="max-w-screen-xl mx-auto">
                <div className="flex items-center pt-20 justify-between">
                    <div className="basis-1/2">
                        <div className="rounded-full w-min whitespace-nowrap mb-4 px-3 py-1 uppercase bg-gray-300 text-sm font-semibold text-black">
                            Receive Me
                        </div>
                        <p className="text-5xl font-medium leading-snug tracking-tight">
                            We Provide Easy Solution To
                            <br /> Link All Of Your{" "}
                            <span className="relative whitespace-nowrap bg-gray-200 border-2 border-dashed px-3 border-gray-600">
                                <span className="dot1 bg-gray-800 rounded-full h-2 w-2 absolute -top-1 -left-1"></span>
                                <span className="dot2 bg-gray-800 rounded-full h-2 w-2 absolute -top-1 -right-1"></span>
                                <span className="dot3 bg-gray-800 rounded-full h-2 w-2 absolute -bottom-1 -left-1"></span>
                                <span className="dot4 bg-gray-800 rounded-full h-2 w-2 absolute -bottom-1 -right-1"></span>
                                Wallets Easily
                            </span>{" "}
                            In One Place
                        </p>
                        <div className="mt-4 bg-gray-200 w-full flex items- rounded-full">
                            <input
                                type="text"
                                placeholder="Write here..."
                                className="bg-transparent w-full pl-6 pr-2 outline-none"
                            />
                            <Button className="py-3 h-full" size="lg">
                                Search
                            </Button>
                        </div>
                        <div className="text-lg mt-4 text-gray-600">
                            Receive.me is a platform for linking your wallets
                            easily & help you manage your payments in one place.
                        </div>
                    </div>
                    <div className="basis-1/2"></div>
                </div>
            </main>
        </div>
    );
}
