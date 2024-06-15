import { Button } from "../../ui/button";
import { Chip } from "../../ui/chip";
import { NameSearch } from "./name-search";

export const HeroSection = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-20">
                <div className="basis-[55%]">
                    <Chip className="mb-2">Receive Me</Chip>
                    <p
                        className="text-4xl sm:text-5xl font-medium tracking-tight"
                        style={{ lineHeight: 1.345 }}
                    >
                        We Provide Easy Solution To
                        <br className="hidden lg:block" /> Link All Of Your{" "}
                        <span className="relative whitespace-nowrap bg-primary/40 border-2 border-dashed px-3 border-primary">
                            <span className="dot1 bg-primary rounded-full h-2 w-2 absolute -top-1 -left-1"></span>
                            <span className="dot2 bg-primary rounded-full h-2 w-2 absolute -top-1 -right-1"></span>
                            <span className="dot3 bg-primary rounded-full h-2 w-2 absolute -bottom-1 -left-1"></span>
                            <span className="dot4 bg-primary rounded-full h-2 w-2 absolute -bottom-1 -right-1"></span>
                            Wallets
                        </span>{" "}
                        Easily In One Place
                    </p>
                    <div className="mt-4 ">
                        <NameSearch />
                    </div>
                    <div className="text-lg mt-4 text-gray-600">
                        Receive.me is a platform for linking your wallets easily
                        & help you manage your payments in one place.
                    </div>
                </div>
                <div className="basis-[45%] relative w-[70%] max-w-96 ml-full lg:ml-0 lg:w-auto">
                    <img
                        src="/img/home/svg/grid.svg"
                        alt=""
                        className="-z-10 absolute top-0 left-0 w-[50%] lg:w-auto"
                    />
                    <div className="z-10 absolute -top-4 lg:top-0 right-8 lg:h-44 lg:w-44 w-[40%] h-[40%] max-w-36 max-h-36 bg-white/40 backdrop-blur-sm rounded-full shadow-black/10 shadow-inner drop-shadow-xl" />
                    <div className="z-10 absolute bottom-0 right-20 lg:h-32 lg:w-32 h-[25%] w-[25%] max-w-28 max-h-28 bg-white/40 backdrop-blur-sm rounded-full shadow-black/10 shadow-inner drop-shadow-xl" />
                    <div className="hero-svg-mask">
                        <img src="/img/home/nick2.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};
