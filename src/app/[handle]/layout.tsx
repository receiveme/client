import Head from "next/head";
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
            <Head>
                <title>receive.me</title>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link rel="icon" href="/favicon.ico" />

                <meta name="msapplication-TileColor" content="#da532c" />
                <meta
                    name="msapplication-config"
                    content="/icons/browserconfig.xml"
                />

                <meta name="theme-color" content="#ffffff" />
            </Head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
