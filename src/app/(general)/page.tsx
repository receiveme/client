import { Navbar } from "@/src/components/common/navbar";
import { AuthDialog } from "@/src/components/common/navbar/auth-dialog";
import { FuturePlanCard } from "@/src/components/landing/future-plans/Card";
import { HeroSection } from "@/src/components/landing/hero";
import { TwoColumnSection } from "@/src/components/landing/two-column-section";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandPinterest,
    IconBrandTwitter,
} from "@tabler/icons-react";
import { Figtree } from "next/font/google";
import Link from "next/link";
import "@particle-network/connect-react-ui/dist/index.css";

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
            {/* <OldNavbar></OldNavbar> */}
            <Navbar />
            <main className="relative overflow-hidden">
                <div
                    id="home"
                    className="max-w-screen-xl mx-auto px-4 pt-12 scroll-mt-12"
                >
                    <HeroSection />
                </div>
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -left-[25%] lg:-left-24 top-[500px] -z-10 bg-blur-circle" />
                <TwoColumnSection
                    chipText="About Us"
                    description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae amet et laboriosam enim incidunt, aliquam vitae iusto soluta ipsa provident eius quibusdam tenetur doloremque earum deleniti quis? Explicabo amet et"
                    imageSection={
                        <div className="hidden lg:block">
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
                                className="w-[400px] lg:w-[800px] h-auto object-contain"
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
                    }
                    title={
                        <>
                            Welcome To{" "}
                            <span className="text-primary">Recieve.me</span>
                        </>
                    }
                />
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -right-24 top-[1000px] -z-10 bg-blur-circle" />
                <TwoColumnSection
                    chipText="Organization Account"
                    description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae amet et laboriosam enim incidunt, aliquam vitae iusto soluta ipsa provident eius quibusdam tenetur doloremque earum deleniti quis? Explicabo amet et"
                    direction="reverse"
                    imageSection={
                        <>
                            {/* <img
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
                            /> */}
                            {/* main phones image  */}
                            <img
                                src="/img/home/org-profile.png"
                                alt=""
                                className="h-[400px] lg:h-[500px] w-auto object-contain"
                            />
                            {/* <img
                                src="/img/home/socials/discord.png"
                                className="w-20 right-28 skew-x-[-20deg] skew-y-[20deg] top-8 absolute drop-shadow-xl"
                                alt=""
                            />
                            <img
                                src="/img/home/socials/x.png"
                                className="w-14 right-20 bottom-32 rotate-[-15deg] absolute drop-shadow-xl"
                                alt=""
                            /> */}
                        </>
                    }
                    title={
                        <>
                            Get organization account for{" "}
                            <span className="text-primary">your company</span>
                        </>
                    }
                />
                {/* <TwoColumnSection
                    chipText="New Updates"
                    description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae amet et laboriosam enim incidunt, aliquam vitae iusto soluta ipsa provident eius quibusdam tenetur doloremque earum deleniti quis? Explicabo amet et"
                    direction="reverse"
                    imageSection={
                        <>
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
                        </>
                    }
                    title={
                        <>
                            Great Experience With{" "}
                            <br className="hidden lg:block" />
                            <span className="block text-primary">
                                Recieve.me
                            </span>
                        </>
                    }
                /> */}
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -left-24 top-[1700px] -z-10 bg-blur-circle" />
                <div className="max-w-screen-xl mx-auto pt-20">
                    <p
                        id="plans"
                        className="scroll-mt-12 font-bold text-[40px] text-center"
                    >
                        Our Future <span className="text-primary ">Plans</span>
                    </p>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-20 mt-32">
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
                        <div className="pb-8 lg:pb-0 grid place-items-center">
                            <img
                                src="/img/home/svg/arrow.svg"
                                alt=""
                                className="rotate-[90deg] lg:rotate-0"
                            />
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
                <div className="max-w-screen-xl mx-auto px-4 pt-20">
                    <p className="font-bold text-[40px] text-center">
                        Our Supported{" "}
                        <span className="text-primary">Network</span>
                    </p>
                    <div className="mt-20">
                        <div className="flex justify-evenly items-center flex-wrap gap-4">
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
                        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 place-items-center h-full">
                            <div className="bg-white/80 flex flex-col items-center gap-4 p-12 rounded-2xl">
                                <p className="text-3xl font-bold whitespace-nowrap">
                                    You&apos;re still here?
                                </p>
                                <p>What are you waiting for</p>
                                <div>
                                    <AuthDialog
                                        trigger={
                                            <Button size="lg">
                                                Connect wallet
                                            </Button>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute h-[450px] w-[450px] rounded-full blur-[140px] -left-24 top-[3400px] -z-10 bg-blur-circle" />
                <div className="max-w-screen-xl mx-auto px-4 pt-20 pb-28">
                    <p
                        id="faqs"
                        className="scroll-mt-12 font-bold text-[40px] text-center"
                    >
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
            <footer className="bg-primary">
                <div className="pt-6 pb-4">
                    <div className="max-w-screen-xl mx-auto px-4 w-full text-white flex flex-col gap-8 lg:flex-row justify-between items-center">
                        <div className="font-bold text-3xl ">receive.me</div>
                        <div className="flex flex-col lg:flex-row gap-6 lg:justify-center lg:gap-8 font-medium w-full">
                            <div className="flex flex-row gap-3 justify-center lg:gap-8 w-full lg:w-auto">
                                <Link href="#home">Home</Link>
                                <Link href="#about-us">About Us</Link>
                                <Link href="#updates">Updates</Link>
                            </div>
                            <div className="flex flex-row gap-3 justify-center lg:gap-8 w-full lg:w-auto">
                                <Link href="#plans">Plans</Link>
                                <Link href="#faqs">FAQs</Link>
                                <Link href="#">Contact Us</Link>
                            </div>
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
