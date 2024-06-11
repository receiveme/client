import { Navbar } from "@/src/components/common/navbar";
import { FuturePlanCard } from "@/src/components/landing/future-plans/Card";
import { HeroSection } from "@/src/components/landing/hero";
import { SupportedWallets } from "@/src/components/landing/supported-wallet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import { Chip } from "@/src/components/ui/chip";
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
            <Navbar />
            <main className="relative overflow-x-hidden">
                <div className="max-w-screen-xl mx-auto pt-12">
                    <HeroSection />
                </div>
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -left-24 top-[500px] -z-10 bg-blur-circle" />
                <div className="max-w-screen-xl mx-auto flex justify-between items-center gap-32">
                    <div className="basis-1/2 relative">
                        <img
                            src="/img/home/socials/github.png"
                            className="w-20 left-40 top-12 absolute drop-shadow-lg"
                            alt=""
                        />
                        <img
                            src="/img/home/socials/twitch.png"
                            className="w-24 left-24 top-40 -rotate-[15deg] absolute drop-shadow-lg"
                            alt=""
                        />
                        <img
                            src="/img/home/socials/linkedin.png"
                            className="w-16 left-16 bottom-36 absolute drop-shadow-xl"
                            alt=""
                        />
                        {/* main phones image  */}
                        <img
                            src="/img/home/phones.png"
                            alt=""
                            className="w-[800px] h-auto object-contain"
                        />
                        <img
                            src="/img/home/socials/discord.png"
                            className="w-20 right-28 skew-x-[-20deg] skew-y-[20deg] top-8 absolute drop-shadow-xl"
                            alt=""
                        />
                        <img
                            src="/img/home/socials/x.png"
                            className="w-14 right-20 bottom-32 rotate-[-15deg] absolute drop-shadow-xl"
                            alt=""
                        />
                    </div>
                    <div className="basis-1/2">
                        <div className="">
                            <Chip className="mb-2">About Us</Chip>
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
                            <Chip className="mb-2">New Updates</Chip>
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
                        <div className="h-[500px] overflow-hidden relative">
                            <div className="bg-gradient-to-b from-transparent absolute bottom-0 left-0 right-0 h-60 z-10 via-transparent to-white" />
                            <div className="relative rotating-wallets">
                                <div className="">
                                    <img
                                        src="/img/home/wallet-screenshots/1.png"
                                        alt=""
                                        className="h-[250px] w-auto object-contain absolute rotate-0 top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 origin-[center_400px]"
                                    />
                                    <img
                                        src="/img/home/wallet-screenshots/3.png"
                                        alt=""
                                        className="h-[250px] w-auto object-contain absolute rotate-[60deg] top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 origin-[center_400px]"
                                    />
                                    <img
                                        src="/img/home/wallet-screenshots/2.png"
                                        alt=""
                                        className="h-[250px] w-auto object-contain absolute rotate-[120deg] top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 origin-[center_400px]"
                                    />
                                    <img
                                        src="/img/home/wallet-screenshots/4.png"
                                        alt=""
                                        className="h-[250px] w-auto object-contain absolute rotate-[180deg] top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 origin-[center_400px]"
                                    />
                                    <img
                                        src="/img/home/wallet-screenshots/5.png"
                                        alt=""
                                        className="h-[250px] w-auto object-contain absolute rotate-[240deg] top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 origin-[center_400px]"
                                    />
                                    <img
                                        src="/img/home/wallet-screenshots/6.png"
                                        alt=""
                                        className="h-[250px] w-auto object-contain absolute rotate-[300deg] top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 origin-[center_400px]"
                                    />
                                </div>
                            </div>
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
                {/* <div className="max-w-screen-xl mx-auto pt-20">
                    <SupportedWallets />
                </div> */}
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
