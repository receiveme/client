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

const getTronlinkAddress = async (forceGetAddress = false) => {
    if (!window.tronLink) {
        toast.error("You need to install tronlink wallet.");
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

    useEffect(() => {
        if (authToken === undefined) return;
        if (isParticleLoggedIn) return;

        (async () => {
            try {
                const tronlinkAddress = await getTronlinkAddress();

                console.log(authToken);

                if (authToken) {
                    const data = (
                        await axios.post("/api/auth/verify", {
                            token: authToken,
                        })
                    ).data;

                    if (data.success) {
                        const userData = await getUserData(data.data.id);

                        console.log({ userData });

                        setAppState({
                            userData,
                        });
                        setData({
                            status: "authenticated",
                            walletAddress: data.data.address,
                        });
                    } else {
                        setData({
                            status: "unauthenticated",
                            walletAddress: null,
                        });
                        removeAuthToken();
                    }
                    if (pathname === "/onboard") router.push("/");
                } else if (tronlinkAddress) {
                    const uuidv5OfUserAddress = uuidv5(
                        tronlinkAddress,
                        uuidv5.URL,
                    );

                    console.log(tronlinkAddress);

                    const doesUserExist = await getUserDataByWalletAddress(
                        tronlinkAddress,
                    );

                    console.log({ doesUserExist, uuidv5OfUserAddress }, "tron");

                    if (!doesUserExist) {
                        console.log("inside");
                        setAppState({
                            walletAuth: {
                                uuid: uuidv5OfUserAddress,
                                walletAddress: tronlinkAddress,
                                type: "tronlink",
                            },
                        });

                        setData({
                            status: "authenticated",
                            walletAddress: tronlinkAddress,
                        });
                        router.push("/onboard");
                    } else {
                        if (pathname === "/onboard") router.push("/");

                        console.log(
                            "address but no auth token means was logged out",
                        );
                        // user is valid lets sign him in
                        // we may have a token instead to check signin status
                        // the above condition is for checking only should go to onboarding or not thing
                    }
                    // else {
                    //     setAppState({
                    //         userData,
                    //     });
                    //     setData({
                    //         status: "authenticated",
                    //         walletAddress: metamaskAddress,
                    //     });
                    // }
                } else {
                    if (pathname === "/onboard") router.push("/");
                }
            } catch (e) {
                console.log("=>", e);
                setData({
                    status: "unauthenticated",
                    walletAddress: null,
                });
            }
        })();
    }, [authToken]);

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

    const signIn = async () => {
        try {
            const tronlinkAddress = await getTronlinkAddress(true);

            if (!tronlinkAddress) return;

            console.log(tronlinkAddress, "tronlinkAddress in sigin");

            const data = (
                await axios.get(`/api/auth/wallet/nonce/${tronlinkAddress}`)
            ).data;

            console.log({ data });

            if (data.message === "NEW_USER") {
                return router.push("/onboard");
            }

            const siwtMessage = getSiwtMessage(data.data);

            // const msg = `0x${Buffer.from(siwtMessage, "utf8").toString("hex")}`;
            const msg = siwtMessage;

            // const signature = await window.ethereum.request({
            //     method: "personal_sign",
            //     params: [msg, tronlinkAddress],
            // });
            const signature = await window?.tronLink?.tronWeb.trx.signMessageV2(
                msg,
            );

            const loggedinData = (
                await axios.post(
                    `/api/auth/wallet/nonce/${tronlinkAddress}/tronlink`,
                    {
                        signature,
                    },
                )
            ).data;

            console.log({ loggedinData });

            setAuthToken(loggedinData.data);

            router.push("/dashboard");
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
    };
};
