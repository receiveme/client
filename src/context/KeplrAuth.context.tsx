"use client";

import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { v5 as uuidv5 } from "uuid";
import { useAppState } from "../hooks/useAppState";
import { useRouter } from "next/navigation";
import { getUserDataByUuid, getUserDataByWalletAddress } from "../actions";
import { AccountData, BroadcastMode, ChainInfo } from "@keplr-wallet/types";
import {
    SigningStargateClient,
    StargateClient,
    QueryClient,
} from "@cosmjs/stargate";
import toast from "react-hot-toast";

interface IKeplrAuthContext {
    walletAddress: string | null;
    status: "loading" | "authenticated" | "unauthenticated";
}

const DEFAULT_DATA: IKeplrAuthContext = {
    walletAddress: null,
    status: "loading",
};

export const getTestnetChainInfo = (): ChainInfo => ({
    chainId: "theta-testnet-001",
    chainName: "theta-testnet-001",
    rpc: "https://rpc.sentry-01.theta-testnet.polypore.xyz/",
    rest: "https://rest.sentry-01.theta-testnet.polypore.xyz/",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmos" + "pub",
        bech32PrefixValAddr: "cosmos" + "valoper",
        bech32PrefixValPub: "cosmos" + "valoperpub",
        bech32PrefixConsAddr: "cosmos" + "valcons",
        bech32PrefixConsPub: "cosmos" + "valconspub",
    },
    currencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
        {
            coinDenom: "THETA",
            coinMinimalDenom: "theta",
            coinDecimals: 0,
        },
        {
            coinDenom: "LAMBDA",
            coinMinimalDenom: "lambda",
            coinDecimals: 0,
        },
        {
            coinDenom: "RHO",
            coinMinimalDenom: "rho",
            coinDecimals: 0,
        },
        {
            coinDenom: "EPSILON",
            coinMinimalDenom: "epsilon",
            coinDecimals: 0,
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
            gasPriceStep: {
                low: 1,
                average: 1,
                high: 1,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
    },
    // coinType: 118,
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
});

const keplrAuthContext = createContext<IKeplrAuthContext>(DEFAULT_DATA);

export const KeplrAuthContext = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState(DEFAULT_DATA);

    const [, setAppState] = useAppState();

    const router = useRouter();

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { keplr } = window;
    //             if (!keplr) {
    //                 // alert("You need to install Keplr");
    //                 return;
    //             }
    //             const testNetInfodata = getTestnetChainInfo();

    //             // console.log({ res });
    //             await keplr.experimentalSuggestChain(testNetInfodata);

    //             // console.log({ testNetInfodata });

    //             // StargateClient.
    //             const data = await StargateClient.connect(testNetInfodata.rpc);

    //             // console.log(data, "StargateClient connect response");

    //             const offlineSigner =
    //                 window.getOfflineSigner!("theta-testnet-001");

    //             // console.log({ offlineSigner });

    //             // const signingClient =
    //             await SigningStargateClient.connectWithSigner(
    //                 testNetInfodata.rpc,
    //                 offlineSigner,
    //             );

    //             // Get the address and balance of your user
    //             const account: AccountData = (
    //                 await offlineSigner.getAccounts()
    //             )[0];

    //             // console.log({ account });

    //             const walletAddress = account.address;

    //             if (account.address) {
    //                 const uuidv5OfUserAddress = uuidv5(
    //                     account.address,
    //                     uuidv5.URL,
    //                 );

    //                 const userDataByWallet = await getUserDataByWalletAddress(
    //                     account.address,
    //                 );

    //                 const userData =
    //                     (await getUserDataByUuid(
    //                         userDataByWallet?.user.authuuid ||
    //                             uuidv5OfUserAddress,
    //                     )) || null;

    //                 if (!userData && account) {
    //                     setAppState({
    //                         keplrAuth: {
    //                             uuid: uuidv5OfUserAddress,
    //                             walletAddress,
    //                         },
    //                     });

    //                     setData({
    //                         status: "authenticated",
    //                         walletAddress,
    //                     });
    //                     router.push("/onboard");
    //                 } else {
    //                     setAppState({
    //                         userData,
    //                     });

    //                     setData({
    //                         status: "authenticated",
    //                         walletAddress,
    //                     });
    //                 }
    //             }
    //         } catch (e) {
    //             console.log("=>", e);
    //             setData({
    //                 status: "unauthenticated",
    //                 walletAddress: null,
    //             });
    //         }
    //     })();
    // }, []);

    return (
        <keplrAuthContext.Provider value={data}>
            {children}
        </keplrAuthContext.Provider>
    );
};

export const useKeplrAuth = () => {
    const data = useContext(keplrAuthContext);
    const testNetInfodata = getTestnetChainInfo();

    const signIn = async () => {
        try {
            if (!window.keplr) return toast.error("You need to install keplr.");
            await window.keplr?.enable(testNetInfodata.chainId);

            window.location.reload();
        } catch (e) {
            throw e;
        }
    };

    const signOut = async () => {
        try {
            // return await uauth.logout();
            await window.keplr?.disable(testNetInfodata.chainId);
        } catch {
            return null;
        }
    };

    return {
        auth: data,
        signIn,
        signOut,
    };
};
