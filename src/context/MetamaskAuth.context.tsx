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

interface IMetamaskAuthContext {
    walletAddress: string | null;
    status: "loading" | "authenticated" | "unauthenticated";
}

const DEFAULT_DATA: IMetamaskAuthContext = {
    walletAddress: null,
    status: "loading",
};

const metamaskAuthContext = createContext<IMetamaskAuthContext>(DEFAULT_DATA);

const getMetamaskAddress = async () => {
    if (!window.ethereum.isMetaMask)
        return toast.error("You need to install metamask.");

    await window["ethereum"]?.request({
        method: "eth_requestAccounts",
    });

    const selectedAddress = window.ethereum.selectedAddress;

    return selectedAddress;
};

export const MetamaskAuthContext = ({ children }: PropsWithChildren) => {
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
                const metamaskAddress = await getMetamaskAddress();

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
                } else if (metamaskAddress) {
                    const uuidv5OfUserAddress = uuidv5(
                        metamaskAddress,
                        uuidv5.URL,
                    );

                    console.log(metamaskAddress);

                    const doesUserExist = await getUserDataByWalletAddress(
                        metamaskAddress,
                    );

                    console.log({ doesUserExist, uuidv5OfUserAddress });

                    if (!doesUserExist) {
                        console.log("inside");
                        setAppState({
                            walletAuth: {
                                uuid: uuidv5OfUserAddress,
                                walletAddress: metamaskAddress,
                                type: "metamask",
                            },
                        });

                        setData({
                            status: "authenticated",
                            walletAddress: metamaskAddress,
                        });
                        router.push("/onboard");
                    } else {
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
        <metamaskAuthContext.Provider value={data}>
            {children}
        </metamaskAuthContext.Provider>
    );
};

export const useMetamaskAuth = () => {
    const router = useRouter();
    const data = useContext(metamaskAuthContext);
    const { setAuthToken, removeAuthToken } = useAuthToken();

    const signIn = async () => {
        try {
            const metamaskAddress = await getMetamaskAddress();

            const data = (
                await axios.get(`/api/auth/wallet/nonce/${metamaskAddress}`)
            ).data;

            if (data.message === "NEW_USER") {
                return router.push("/onboard");
            }

            const siweMessage = getSiweMessage(data.data);

            const msg = `0x${Buffer.from(siweMessage, "utf8").toString("hex")}`;

            const signature = await window.ethereum.request({
                method: "personal_sign",
                params: [msg, metamaskAddress],
            });

            const loggedinData = (
                await axios.post(
                    `/api/auth/wallet/nonce/${metamaskAddress}/metamask`,
                    {
                        signature,
                    },
                )
            ).data;

            setAuthToken(loggedinData.data);

            window.location.reload();
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
