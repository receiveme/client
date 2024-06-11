import Link from "next/link";
import { Button } from "../../ui/button";
//@ts-ignore
import Uauth from "@uauth/js";
import { AuthDialog } from "./auth-dialog";

export const uauth = new Uauth({
    clientID: "61e04be9-ff48-4336-9704-a92b8d09bddc",
    redirectUri:
        process.env.NEXT_PUBLIC_REDIRECT_URL ?? "http://localhost:3000",
    scope: "openid wallet messaging:notifications:optional",
});

export const Navbar = () => {
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
                        <AuthDialog
                            trigger={<Button size="lg">Connect Wallet</Button>}
                        />
                    </div>
                </nav>
            </header>
        </>
    );
};
