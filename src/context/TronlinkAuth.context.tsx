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
import { usePathname, useRouter } from "next/navigation";
import {
    getUserData,
    getUserDataByUuid,
    getUserDataByWalletAddress,
} from "../actions";
import toast from "react-hot-toast";
import { useAuthToken } from "../state/auth-token.atom";
import axios from "axios";
import { getSiweMessage } from "../lib/utils/siwe";
import { useConnectKit } from "@particle-network/connect-react-ui";
import { getSiwtMessage } from "../lib/utils/siwt";

interface ITronlinkAuthContext {
    walletAddress: string | null;
    status: "loading" | "authenticated" | "unauthenticated";
}

const DEFAULT_DATA: ITronlinkAuthContext = {
    walletAddress: null,
    status: "loading",
};

const tronlinkAuthContext = createContext<ITronlinkAuthContext>(DEFAULT_DATA);

export const getTronlinkAddress = async (forceGetAddress = false) => {
    try {
        if (!window.tronLink) {
            if (forceGetAddress) {
                toast.error("You need to install tronlink wallet.");
            }
            return null;
        }

        // wallet not open / connected to site
        if (window.tronLink.tronWeb === false && forceGetAddress) {
            toast.error("Please unlock your tron wallet.");
            return null;
        }

        await window.tronLink.request({
            method: "tron_requestAccounts",
            params: {
                websiteName: "receive.me",
            },
        });

        const selectedAddress = window.tronLink.tronWeb.defaultAddress.base58;

        return selectedAddress;
    } catch (e) {
        return null;
    }
};

export const TronlinkAuthContext = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState(DEFAULT_DATA);

    const [, setAppState] = useAppState();

    const { authToken, removeAuthToken } = useAuthToken();

    const connectKit = useConnectKit();

    const isParticleLoggedIn = connectKit.particle?.auth.isLogin();

    const router = useRouter();

    const pathname = usePathname();

    console.log(authToken);

    // useEffect(() => {
    //     if (authToken === undefined) return;
    //     if (isParticleLoggedIn) return;

    //     (async () => {
    //         try {
    //             const tronlinkAddress = await getTronlinkAddress();

    //             console.log(authToken);

    //             if (authToken) {
    //                 const data = (
    //                     await axios.post("/api/auth/verify", {
    //                         token: authToken,
    //                     })
    //                 ).data;

    //                 if (data.success) {
    //                     const userData = await getUserData(data.data.id);

    //                     console.log({ userData });

    //                     setAppState({
    //                         userData,
    //                     });
    //                     setData({
    //                         status: "authenticated",
    //                         walletAddress: data.data.address,
    //                     });
    //                 } else {
    //                     setData({
    //                         status: "unauthenticated",
    //                         walletAddress: null,
    //                     });
    //                     removeAuthToken();
    //                 }
    //                 if (pathname === "/onboard") router.push("/");
    //             } else if (tronlinkAddress) {
    //                 const uuidv5OfUserAddress = uuidv5(
    //                     tronlinkAddress,
    //                     uuidv5.URL,
    //                 );

    //                 console.log(tronlinkAddress);

    //                 const doesUserExist = await getUserDataByWalletAddress(
    //                     tronlinkAddress,
    //                 );

    //                 console.log({ doesUserExist, uuidv5OfUserAddress }, "tron");

    //                 if (!doesUserExist) {
    //                     console.log("inside");
    //                     setAppState({
    //                         walletAuth: {
    //                             uuid: uuidv5OfUserAddress,
    //                             walletAddress: tronlinkAddress,
    //                             type: "tronlink",
    //                         },
    //                     });

    //                     setData({
    //                         status: "authenticated",
    //                         walletAddress: tronlinkAddress,
    //                     });
    //                     router.push("/onboard");
    //                 } else {
    //                     console.log(pathname);
    //                     if (pathname === "/onboard") router.push("/");

    //                     console.log(
    //                         "address but no auth token means was logged out",
    //                     );
    //                     // user is valid lets sign him in
    //                     // we may have a token instead to check signin status
    //                     // the above condition is for checking only should go to onboarding or not thing
    //                 }
    //                 // else {
    //                 //     setAppState({
    //                 //         userData,
    //                 //     });
    //                 //     setData({
    //                 //         status: "authenticated",
    //                 //         walletAddress: metamaskAddress,
    //                 //     });
    //                 // }
    //             } else {
    //                 if (pathname === "/onboard") router.push("/");
    //             }
    //         } catch (e) {
    //             console.log("=>", e);
    //             setData({
    //                 status: "unauthenticated",
    //                 walletAddress: null,
    //             });
    //         }
    //     })();
    // }, [authToken]);

    return (
        <tronlinkAuthContext.Provider value={data}>
            {children}
        </tronlinkAuthContext.Provider>
    );
};

export const useTronlinkAuth = () => {
    const router = useRouter();
    const data = useContext(tronlinkAuthContext);
    const { setAuthToken, removeAuthToken } = useAuthToken();
    const [appState, setAppState] = useAppState();

    const getTronlinkNonce = async (
        tronlinkAddress: string,
        userId?: string,
    ) => {
        try {
            const data = (
                await axios.get(
                    `/api/auth/wallet/nonce/${tronlinkAddress}${
                        userId ? `?userId=${userId}` : ""
                    }`,
                )
            ).data;

            return data;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const signTronlinkMessage = async (nonce: string) => {
        try {
            const siwtMessage = getSiwtMessage(nonce);

            const msg = siwtMessage;

            const signature = await window?.tronLink?.tronWeb.trx.signMessageV2(
                msg,
            );

            return signature;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const verifyTronlinkSignature = async (
        signature: string,
        tronlinkAddress: string,
    ) => {
        try {
            const data = (
                await axios.post(
                    `/api/auth/wallet/nonce/${tronlinkAddress}/tronlink`,
                    {
                        signature,
                    },
                )
            ).data;

            return data;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const signIn = async () => {
        try {
            const tronlinkAddress = await getTronlinkAddress(true);

            setAppState({
                walletAuth: {
                    ...appState.walletAuth,
                    type: "tronlink",
                },
            });

            if (!tronlinkAddress) return;

            // console.log(tronlinkAddress, "tronlinkAddress in signIn");

            const data = await getTronlinkNonce(tronlinkAddress);

            console.log({ data });

            if (data.message === "NEW_USER") {
                return router.push("/onboard");
            }

            const signature = await signTronlinkMessage(data.data);

            const loggedInData = await verifyTronlinkSignature(
                signature,
                tronlinkAddress,
            );

            // console.log({ loggedInData });

            setAuthToken(loggedInData.data);

            setTimeout(() => {
                // router.push("/dashboard");
                window.location.href = "/dashboard";
            });
        } catch (e) {
            throw e;
        }
    };

    const signOut = async () => {
        removeAuthToken();
    };

    return {
        auth: data,
        signIn,
        signOut,
        verifyTronlinkSignature,
        signTronlinkMessage,
        getTronlinkNonce,
    };
};
