'use client'

export default function ConnectButton() {
    return (
        <a
            href="#"
            onClick={() => {
                document
                    .getElementById(
                        "connect-wallet",
                    )
                    ?.click();
            }}
            className="rounded-md bg-indigo-600 px-6 py-3 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition hover:scale-105 hover:shadow-sm"
        >
            Connect Wallet
        </a>
    )
}