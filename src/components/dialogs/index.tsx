"use client";

import { Wallet } from "../connect-wallet";
import { useWalletModal } from "../connect-wallet/connect-wallet.store";

export default function Dialogs() {
    const walletModal = useWalletModal((state) => state.state);

    return <div>{walletModal && <Wallet />}</div>;
}
