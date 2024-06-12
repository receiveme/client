"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
//@ts-ignore
import Uauth from "@uauth/js";
import { AuthDialog } from "./auth-dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../ui/sheet";
import { useState } from "react";

export const uauth = new Uauth({
    clientID: "61e04be9-ff48-4336-9704-a92b8d09bddc",
    redirectUri:
        process.env.NEXT_PUBLIC_REDIRECT_URL ?? "http://localhost:3000",
    scope: "openid wallet messaging:notifications:optional",
});

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
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
                <nav className="max-w-screen-xl mx-auto px-4 flex text-base justify-between items-center py-3">
                    <div className="font-bold text-3xl text-primary">
                        receive.me
                    </div>
                    <div className="gap-6 font-medium hidden lg:flex">
                        <Link href="#home">Home</Link>
                        <Link href="#about-us">About Us</Link>
                        <Link href="#updates">Updates</Link>
                        <Link href="#plans">Plans</Link>
                        <Link href="#faqs">FAQs</Link>
                        <Link href="#">Contact Us</Link>
                    </div>
                    <div className="hidden lg:block">
                        <AuthDialog
                            trigger={<Button size="lg">Connect Wallet</Button>}
                        />
                    </div>
                    <button
                        className="relative flex h-10 w-10 items-center justify-start rounded-lg px-0 lg:hidden"
                        onClick={() => setIsMenuOpen((p) => !p)}
                    >
                        <span
                            className={`absolute h-[3px] w-8 bg-black transition-transform duration-200  ${
                                isMenuOpen ? "rotate-45" : "translate-y-1.5"
                            }`}
                            style={{
                                transformOrigin: "center",
                            }}
                        ></span>
                        <span
                            className={`duration-duration-200 absolute h-[3px] w-8 bg-black transition-transform  ${
                                isMenuOpen ? "-rotate-45" : "-translate-y-1.5"
                            }`}
                            style={{
                                transformOrigin: "center",
                            }}
                        ></span>
                    </button>
                    <Sheet
                        open={isMenuOpen}
                        onOpenChange={(o) => setIsMenuOpen(o)}
                    >
                        <SheetContent
                            side="top"
                            className="mt-[108px] p-6 pt-2 lg:hidden"
                            sheetOverlayClassName="mt-[108px] lg:hidden"
                            hideCloseButton
                        >
                            <div className="w-full h-full grid place-items-center gap-4 pt-4 border-t border-gray-200">
                                <div className="w-full gap-6 font-medium flex flex-col items-center">
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#home"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#about-us"
                                    >
                                        About Us
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#updates"
                                    >
                                        Updates
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#plans"
                                    >
                                        Plans
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#faqs"
                                    >
                                        FAQs
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        href="#"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                                <div className="border-t border-gray-200 pt-4 w-full grid place-items-center">
                                    <AuthDialog
                                        trigger={
                                            <Button size="lg">
                                                Connect Wallet
                                            </Button>
                                        }
                                    />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </header>
        </>
    );
};
