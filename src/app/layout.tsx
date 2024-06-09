import "./globals.css";

export const metadata = {
    title: "receive.me",
    description: "receive.me",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
