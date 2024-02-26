'use client'
import "../../globals.css";
import toast from "react-hot-toast"

export default function AWPSwap() {

    function copy(text: string) {
        try {
            navigator.clipboard.writeText(text);
            toast.success("Address is copied to the clipboard");
        } catch (e) {
            console.error(e);
            toast.error("Address cannot be copied");
        }
    }

    return (
        <div
            className="
                awpswap-socials
                w-full h-[100dvh] flex flex-col items-center justify-center"
        >
            <div className="flex flex-col h-fit w-[30%] bg-[#ffffff2a] rounded-xl relative">
                <div className="
                    w-full h-52
                    bg-banner bg-bottom bg-[length:auto] bg-no-repeat rounded-tl-xl rounded-tr-xl"
                >
                    <div className="
                        absolute w-full h-52 top-0
                        rounded-tl-xl rounded-tr-xl bg-black opacity-50"
                    ></div>
                    <div className="relative z-10 h-full flex flex-col justify-end p-4">
                        <h1 className="font-inter font-semibold text-2xl"><a href="https://app.awpswap.io/">AWP Swap</a></h1>
                        <p className="text-gray-300">AWP Swap is a Steam items trading platform that you can trade safely built with the latest Web3 technologies.</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <a
                        href="https://awpswap.io"
                        target="_blank"
                        className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                    >
                        <img className="w-6" src="/icons/home.svg" />
                        <span className="ml-3">awpswap.io</span>
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        className="p-4 transition flex items-center hover:bg-[#ffffff2b]"
                    >
                        <img className="w-6" src="/img/3p/twitter-white.png" />
                        <span className="ml-3">Twitter</span>
                    </a>
                    <a
                        href="https://discord.gg/NtK7RWpMHJ"
                        target="_blank"
                        className="p-4 transition flex items-center hover:bg-[#ffffff2b] rounded-bl-xl rounded-br-xl"
                    >
                        <img className="w-6" src="/img/3p/discord-white.png" />
                        <span className="ml-3">Discord</span>
                    </a>
                </div>
            </div>

            <div className="flex flex-col h-fit w-[30%] bg-[#ffffff2a] mt-4 rounded-xl relative">
                <div className="flex flex-col">
                    <div
                        className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-tl-xl rounded-tr-xl"
                    >
                        <div className="flex items-center">
                            <img className="h-6" src="/img/3p/eth.png" />
                            <span className="break-all ml-3 mr-4">0x60A3166452fF240F5F521C0EFD3259Af56179e63</span>
                        </div>
                        <div>
                            <button
                                onClick={() => copy("0x60A3166452fF240F5F521C0EFD3259Af56179e63")}
                                className="
                                    flex items-center justify-center h-7 w-7
                                    bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                            >
                                <img src="/icons/copy.svg" className="h-4" />
                            </button>
                        </div>
                    </div>
                    <div
                        className="p-4 transition flex justify-between items-center hover:bg-[#ffffff2b] rounded-bl-xl rounded-br-xl"
                    >
                        <div className="flex items-center">
                            <img className="h-6" src="/img/3p/tron.png" />
                            <span className="break-all ml-3 mr-4">TSb4jDB4wY1VExgtZydJF6TKFuwJKdDrK8</span>
                        </div>
                        <div>
                            <button
                                onClick={() => copy("TSb4jDB4wY1VExgtZydJF6TKFuwJKdDrK8")}
                                className="
                                    flex items-center justify-center h-7 w-7
                                    bg-white rounded-md transition hover:bg-gray-200 hover:scale-110"
                            >
                                <img src="/icons/copy.svg" className="h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}