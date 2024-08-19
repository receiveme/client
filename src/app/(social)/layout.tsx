import { Metadata } from "next";

export const metadata: Metadata = {
    title: `receive.me`,
    description: "receive.me Social",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="text-white">
            <>{children}</>
        </div>
    );
}
