import { FuturePlanCard } from "@/src/components/landing/future-plans/Card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import {
    IconBrandFacebook,
    IconBrandFacebookFilled,
    IconBrandInstagram,
    IconBrandPinterest,
    IconBrandTwitter,
    IconBrandTwitterFilled,
} from "@tabler/icons-react";
import { Figtree } from "next/font/google";
import Link from "next/link";

export const figtree = Figtree({ subsets: ["latin"] });

const FAQS = [
    {
        q: "What is receive.me?",
        a: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est dolor laudantium hic iure facilis corrupti nobis itaque. Dolores accusantium reiciendis impedit! Et perspiciatis quae error nesciunt veritatis assumenda explicabo.",
    },
    {
        q: "What networks do you support?",
        a: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est dolor laudantium hic iure facilis corrupti nobis itaque. Dolores accusantium reiciendis impedit! Et perspiciatis quae error nesciunt veritatis assumenda explicabo.",
    },
    {
        q: "Is it free?",
        a: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est dolor laudantium hic iure facilis corrupti nobis itaque. Dolores accusantium reiciendis impedit! Et perspiciatis quae error nesciunt veritatis assumenda explicabo.",
    },
    {
        q: "Can we login with ENS?",
        a: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est dolor laudantium hic iure facilis corrupti nobis itaque. Dolores accusantium reiciendis impedit! Et perspiciatis quae error nesciunt veritatis assumenda explicabo.",
    },
    {
        q: "Can we connect social networks?",
        a: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est dolor laudantium hic iure facilis corrupti nobis itaque. Dolores accusantium reiciendis impedit! Et perspiciatis quae error nesciunt veritatis assumenda explicabo.",
    },
];

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
                    <div className="font-bold text-3xl text-primary">
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
            <main className="relative overflow-x-hidden">
                <div className="max-w-screen-xl mx-auto flex items-center pt-20 justify-between gap-20">
                    <div className="basis-[55%]">
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
                    <div className="basis-[45%]">
                        <img
                            src="/img/home/nick.png"
                            className="hero-svg-mask"
                            alt=""
                        />
                    </div>
                </div>
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -left-24 top-[500px] -z-10 bg-blur-circle" />
                <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                    <div className="basis-1/2">
                        <img
                            src="/img/home/phones.png"
                            alt=""
                            className="w-[800px] h-auto object-contain"
                        />
                    </div>
                    <div className="basis-1/2 end">
                        <div className="">
                            <div className="rounded-full w-min whitespace-nowrap mb-4 px-3 py-1 uppercase bg-gray-300 text-sm font-semibold text-black">
                                About Us
                            </div>
                            <p className="font-bold text-[40px]">
                                Welcome To{" "}
                                <span className="text-primary">Recieve.me</span>
                            </p>
                            <p className="text-gray-600 mt-4 max-w-lg text-lg">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Molestiae amet et laboriosam
                                enim incidunt, aliquam vitae iusto soluta ipsa
                                provident eius quibusdam tenetur doloremque
                                earum deleniti quis? Explicabo amet et
                            </p>
                            <div className="mt-4">
                                <Button size="lg">Discover</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -right-24 top-[1000px] -z-10 bg-blur-circle" />
                <div className="max-w-screen-xl mx-auto flex justify-between items-center mt-20">
                    <div className="basis-1/2 end">
                        <div className="">
                            <div className="rounded-full w-min whitespace-nowrap mb-4 px-3 py-1 uppercase bg-gray-300 text-sm font-semibold text-black">
                                New Updates
                            </div>
                            <p className="font-bold text-[40px]">
                                Great Experience With <br />
                                <span className="block text-primary -mt-3">
                                    Recieve.me
                                </span>
                            </p>
                            <p className="text-gray-600 mt-4 max-w-lg text-lg">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Molestiae amet et laboriosam
                                enim incidunt, aliquam vitae iusto soluta ipsa
                                provident eius quibusdam tenetur doloremque
                                earum deleniti quis? Explicabo amet et
                            </p>
                            <div className="mt-4">
                                <Button size="lg">Discover</Button>
                            </div>
                        </div>
                    </div>
                    <div className="basis-1/2">
                        <div className="flex items-end">
                            <img
                                src="/img/home/wallet-1.png"
                                alt=""
                                className="h-[200px] w-auto object-contain"
                            />
                            <img
                                src="/img/home/wallet-2.png"
                                alt=""
                                className="h-[250px] w-auto object-contain"
                            />
                            <img
                                src="/img/home/wallet-3.png"
                                alt=""
                                className="h-[200px] w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -left-24 top-[1700px] -z-10 bg-blur-circle" />
                <div className="max-w-screen-xl mx-auto pt-20">
                    <p className="font-bold text-[40px] text-center">
                        Our Future <span className="text-primary ">Plans</span>
                    </p>
                    <div className="flex justify-center items-center gap-20 mt-32">
                        <div className="">
                            <FuturePlanCard
                                description="Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptatem dolorum
                                eaque fugiat eos sunt sint delectus
                                asperiores nostrum iste, voluptate odio
                                debitis minus et molestias pariatur nisi
                                quos minima amet."
                                number="01"
                                title="Pre-Approval"
                            />
                        </div>
                        <div className=" grid place-items-center">
                            <img src="/img/home/svg/arrow.svg" alt="" />
                        </div>
                        <div className="">
                            <FuturePlanCard
                                description="Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptatem dolorum
                                eaque fugiat eos sunt sint delectus
                                asperiores nostrum iste, voluptate odio
                                debitis minus et molestias pariatur nisi
                                quos minima amet."
                                number="02"
                                title="Schedule"
                            />
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl mx-auto pt-20">
                    <p className="font-bold text-[40px] text-center">
                        Connect With Any Kind Of{" "}
                        <span className="text-primary ">Wallet</span>
                    </p>
                    <div className="mt-12">
                        <div className="flex justify-evenly items-stretch">
                            <img
                                src="/img/home/wallets/tronlink.png"
                                alt=""
                                className="object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                            />
                            <img
                                src="/img/home/wallets/metamask.png"
                                alt=""
                                className="object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                            />
                            <img
                                src="/img/home/wallets/binance.png"
                                alt=""
                                className="object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                            />
                            <img
                                src="/img/home/wallets/coinbase.png"
                                alt=""
                                className="object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                            />
                            <img
                                src="/img/home/wallets/myalgo.png"
                                alt=""
                                className="object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -right-24 top-[2400px] -z-10 bg-blur-circle" />
                <div className="max-w-screen-xl mx-auto pt-20">
                    <p className="font-bold text-[40px] text-center">
                        Our Supported{" "}
                        <span className="text-primary">Network</span>
                    </p>
                    <div className="mt-20">
                        <div className="flex justify-evenly items-center">
                            <img
                                src="/img/home/networks/bitcoin.png"
                                alt=""
                                className="w-[200px]"
                            />
                            <img
                                src="/img/home/networks/ethereum.png"
                                alt=""
                                className="w-[200px]"
                            />
                            <img
                                src="/img/home/networks/solana.png"
                                alt=""
                                className="w-[200px]"
                            />
                            <img
                                src="/img/home/networks/tron.png"
                                alt=""
                                className="w-[200px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="pt-32">
                    <div
                        className="h-[480px] bg-center bg-no-repeat bg-cover"
                        style={{
                            backgroundImage: "url(/img/home/banner.png)",
                        }}
                    >
                        <div className="max-w-screen-xl mx-auto grid grid-cols-4 place-items-center h-full">
                            <div className="bg-white/80 flex flex-col items-center gap-4 p-12 rounded-2xl">
                                <p className="text-3xl font-bold whitespace-nowrap">
                                    You&apos;re still here?
                                </p>
                                <p>What are you waiting for</p>
                                <div>
                                    <Button size="lg">Connect wallet</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -left-24 top-[3400px] -z-10 bg-blur-circle" />
                <div className="max-w-screen-xl mx-auto pt-20">
                    <p className="font-bold text-[40px] text-center">
                        Frequently Asked{" "}
                        <span className="text-primary ">Questions</span>
                    </p>
                    <div className="mt-6">
                        <Accordion type="single" collapsible>
                            {FAQS.map((faq, i) => {
                                return (
                                    <AccordionItem key={i} value={faq.q}>
                                        <AccordionTrigger>
                                            {faq.q}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {faq.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </div>
                </div>
            </main>
            <footer className="mt-28 bg-primary">
                <div className="pt-6 pb-4">
                    <div className="max-w-screen-xl mx-auto text-white flex justify-between items-center">
                        <div className="font-bold text-3xl ">receive.me</div>
                        <div className="flex gap-8 font-medium">
                            <Link href="#">Home</Link>
                            <Link href="#">About Us</Link>
                            <Link href="#">Updates</Link>
                            <Link href="#">Plans</Link>
                            <Link href="#">FAQs</Link>
                            <Link href="#">Contact Us</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="#" className="border p-1.5 rounded-lg">
                                <IconBrandFacebook />
                            </a>
                            <a href="#" className="border p-1.5 rounded-lg">
                                <IconBrandTwitter />
                            </a>
                            <a href="#" className="border p-1.5 rounded-lg">
                                <IconBrandPinterest />
                            </a>
                            <a href="#" className="border p-1.5 rounded-lg">
                                <IconBrandInstagram />
                            </a>
                        </div>
                    </div>
                    <div className="text-center text-white border-t border-dotted mt-6 pt-4">
                        &copy; {new Date().getFullYear()} Receive.me | All
                        rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
