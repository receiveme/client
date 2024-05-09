import { create } from "zustand";

// Wallet Store
interface WalletStore {
    wallet: Array<any>;
    chain: Array<number>;
    addWallet: (wallet: any, j: number) => void;
    removeWallet: (wallet: any) => void;
    selectWallet: (wallet: any) => void; // First wallet in wallets array is primary
}

export const useWalletStore = create<WalletStore>((set) => ({
    wallet: [],
    chain: [],
    addWallet: (wallet, chain) => {
        set((state) => {
            if (state.wallet?.includes(wallet))
                return {
                    wallet: state.wallet,
                    chain: state.chain,
                };

            return {
                wallet: [...state.wallet, wallet],
                chain: [...state.chain, chain],
            };
        });
    },
    removeWallet: (wallet) => {
        set((state) => {
            let wallets = [...state.wallet],
                chains = [...state.chain];

            let walletIndex = wallets.indexOf(wallet);
            wallets.splice(walletIndex, 1);
            chains.splice(walletIndex, 1);

            return { wallet: wallets, chain: chains };
        });
    },
    selectWallet: (wallet) => {
        set((state) => {
            let wallets = [...state.wallet],
                chains = [...state.chain];

            let walletIndex = wallets.indexOf(wallet);

            // Switch first wallet with selected wallet in array
            let wallet_clone = wallets[0],
                chain_clone = chains[0];

            wallets[0] = wallet;
            chains[0] = chains[walletIndex];
            wallets[walletIndex] = wallet_clone;
            chains[walletIndex] = chain_clone;

            return { wallet: wallets, chain: chains };
        });
    },
}));

/* * Modal States */
// Wallet Modal
interface WalletModalStore {
    state: boolean;
    setState: (i: boolean) => void;
}

export const useWalletModal = create<WalletModalStore>((set) => ({
    state: false,
    setState: (state) => set(() => ({ state })),
}));
