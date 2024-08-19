import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s :: receive.me",
        default: "receive.me",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
