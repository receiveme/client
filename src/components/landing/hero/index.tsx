import WordRotate from "../../common/word-rotate";
import { Button } from "../../ui/button";
import { Chip } from "../../ui/chip";
import HeroAnimation from "./HeroAnimation";
import { NameSearch } from "./name-search";

export const HeroSection = () => {
    return (
        <>
            {/* kept for seo hidden from user but search engines search for h1 tag  */}
            <h1 className="fixed top-[-1000px] left-[-1000px]">
                Link all of your wallets easily in one place
            </h1>
            <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-0 lg:gap-16">
                <div className="basis-[55%]">
                    <Chip className="mb-2 ">Receive Me</Chip>
                    <div
                        className="flex flex-wrap gap-3 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight"
                        style={{ lineHeight: 1.345 }}
                    >
                        {/* We Provide Easy Solution To */}
                        {/* <br className="hidden lg:block" /> */}
                        Link All Of Your{" "}
                        <div className="min-w-[190px] max-w-[190px]">
                            <div className="w-min transition-all relative whitespace-nowrap bg-primary/40 border-2 border-dashed px-3 border-primary">
                                <span className="dot1 bg-primary rounded-full h-2 w-2 absolute -top-1 -left-1"></span>
                                <span className="dot2 bg-primary rounded-full h-2 w-2 absolute -top-1 -right-1"></span>
                                <span className="dot3 bg-primary rounded-full h-2 w-2 absolute -bottom-1 -left-1"></span>
                                <span className="dot4 bg-primary rounded-full h-2 w-2 absolute -bottom-1 -right-1"></span>
                                <WordRotate
                                    words={[
                                        "Wallets",
                                        "Socials",
                                        "Links",
                                        "Crypto",
                                        "NFTs",
                                    ]}
                                />
                            </div>
                        </div>
                        Easily In One Place
                    </div>
                    <div className="mt-4 ">
                        <NameSearch />
                    </div>
                    <div className="text-lg mt-4 text-gray-600">
                        Receive.me is a platform for linking your wallets easily
                        & help you manage your payments in one place.
                    </div>
                </div>
                <div className="basis-[55%] relative w-full lg:w-auto lg:min-h-[555px]">
                    <HeroAnimation />
                </div>
            </div>
        </>
    );
};
