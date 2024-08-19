import { Metadata } from "next";

export const metadata: Metadata = {
    title: `receive.me`,
    description: "receive.me profile",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
