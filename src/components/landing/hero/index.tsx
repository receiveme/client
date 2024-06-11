import { Button } from "../../ui/button";
import { Chip } from "../../ui/chip";
import { NameSearch } from "./name-search";

export const HeroSection = () => {
    return (
        <>
            <div className="flex items-center justify-between gap-20">
                <div className="basis-[55%]">
                    <Chip className="mb-2">Receive Me</Chip>
                    <p className="text-5xl font-medium leading-snug tracking-tight">
                        We Provide Easy Solution To
                        <br /> Link All Of Your{" "}
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
                <div className="basis-[45%] relative">
                    <img
                        src="/img/home/svg/grid.svg"
                        alt=""
                        className="-z-10 absolute top-0 left-0"
                    />
                    <div className="z-10 absolute top-0 right-8 h-44 w-44 bg-white/40 backdrop-blur-sm rounded-full shadow-black/10 shadow-inner drop-shadow-xl" />
                    <div className="z-10 absolute bottom-0 right-20 h-32 w-32 bg-white/40 backdrop-blur-sm rounded-full shadow-black/10 shadow-inner drop-shadow-xl" />
                    <div className="hero-svg-mask">
                        <img src="/img/home/nick2.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};
