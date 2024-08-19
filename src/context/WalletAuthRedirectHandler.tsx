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
import { getMetamaskAddress, useMetamaskAuth } from "./MetamaskAuth.context";
import { getTronlinkAddress, useTronlinkAuth } from "./TronlinkAuth.context";

export const WalletAuthRedirectHandler = () => {
    const [appState, setAppState] = useAppState();

    const { authToken, removeAuthToken } = useAuthToken();

    const connectKit = useConnectKit();

    const isParticleLoggedIn = connectKit.particle?.auth.isLogin();

    const router = useRouter();

    const pathname = usePathname();

    // const { auth: metamaskAuthData } = useMetamaskAuth();
    // const { auth: tronlinkAuthData } = useTronlinkAuth();

    // console.log(authToken);

    // console.log({
    //     metamaskAuthData,
    //     tronlinkAuthData,
    // });

    console.log(
        {
            authToken,
        },
        "this",
    );

    useEffect(() => {
        console.log("ran useEffect authtoken");
        if (authToken === undefined) {
            return;
        }

        if (authToken === null) {
            if (pathname === "/onboard" || pathname === "/dashboard")
                router.push("/");

            return;
        }

        if (isParticleLoggedIn) return;

        (async () => {
            try {
                const metamaskAddress = await getMetamaskAddress();
                const tronlinkAddress = await getTronlinkAddress();

                console.log({ metamaskAddress, tronlinkAddress });

                const currentWalletAddress = metamaskAddress || tronlinkAddress;

                if (authToken) {
                    const data = (
                        await axios.post("/api/auth/verify", {
                            token: authToken,
                        })
                    ).data;

                    if (data.success) {
                        const userData = await getUserData(data.data.id);

                        // console.log({ userData });

                        setAppState({
                            userData,
                        });
                        if (pathname === "/onboard") router.push("/dashboard");
                        // setData({
                        //     status: "authenticated",
                        //     walletAddress: data.data.address,
                        // });
                    } else {
                        // setData({
                        //     status: "unauthenticated",
                        //     walletAddress: null,
                        // });
                        removeAuthToken();
                        if (pathname === "/onboard") router.push("/");
                    }
                } else if (currentWalletAddress) {
                    const uuidv5OfUserAddress = uuidv5(
                        currentWalletAddress,
                        uuidv5.URL,
                    );

                    console.log(metamaskAddress);

                    const doesUserExist = await getUserDataByWalletAddress(
                        currentWalletAddress,
                    );

                    console.log({ doesUserExist, uuidv5OfUserAddress });

                    if (!doesUserExist) {
                        console.log("inside");
                        setAppState({
                            walletAuth: {
                                ...appState.walletAuth,
                                uuid: uuidv5OfUserAddress,
                                walletAddress: currentWalletAddress,
                            },
                        });

                        // setData({
                        //     status: "authenticated",
                        //     walletAddress: metamaskAddress,
                        // });
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
                // setData({
                //     status: "unauthenticated",
                //     walletAddress: null,
                // });
            }
        })();
    }, [authToken]);

    return null;
};
