import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "../globals.css";

export const metadata = {
    title: `receive.me`,
    description: 'receive.me Social',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link rel="manifest" href="/icons/site.webmanifest" />
                <link rel="shortcut icon" href="/icons/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta
                    name="msapplication-config"
                    content="/icons/browserconfig.xml"
                />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <body className="text-white ">
                {children}
                <Toaster position="top-right" />
            </body>
        </html>
    )
}