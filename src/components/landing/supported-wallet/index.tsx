export const SupportedWallets = () => {
    return (
        <>
            <p className="font-bold text-[40px] text-center">
                Connect With Any Kind Of{" "}
                <span className="text-primary ">Wallet</span>
            </p>
            <div className="mt-12">
                <div className="flex justify-evenly items-stretch">
                    <img
                        src="/img/home/wallets/tronlink.png"
                        alt=""
                        className="max-w-[250px] object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                    />
                    <img
                        src="/img/home/wallets/metamask.png"
                        alt=""
                        className="max-w-[250px] object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                    />
                    <img
                        src="/img/home/wallets/binance.png"
                        alt=""
                        className="max-w-[250px] object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                    />
                    <img
                        src="/img/home/wallets/coinbase.png"
                        alt=""
                        className="max-w-[250px] object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                    />
                    <img
                        src="/img/home/wallets/myalgo.png"
                        alt=""
                        className="max-w-[250px] object-contain bg-transparent hover:bg-orange-200/60 border border-transparent p-6 rounded-xl hover:border-orange-400"
                    />
                </div>
            </div>
        </>
    );
};
