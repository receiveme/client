import Providers from "../providers";

export const metadata = {
    title: `receive.me`,
    description: "receive.me profile",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Providers>
                <body>{children}</body>
            </Providers>
        </html>
    );
}
