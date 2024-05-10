import { useConnectKit } from "@particle-network/connect-react-ui";
import { useContext, useEffect } from "react";
import { AppContext } from "../lib/context_particle";
import { useAppState } from "../hooks/useAppState";
import { connect } from "http2";
import { usePathname, useRouter } from "next/navigation";
import { getUserDataByUuid } from "../actions";

const UserInfoSetter = () => {
    const [appState, setAppState] = useAppState();

    const connectKit = useConnectKit();
    // console.log(connectKit, " connectKit");
    const userInfo = connectKit?.particle?.auth.getUserInfo();

    const router = useRouter();

    const pathname = usePathname();

    // console.log({ userInfo: JSON.stringify(userInfo) }, "userinfo setter");

    useEffect(() => {
        if (userInfo) {
            setAppState({ userInfo });
        }
    }, []);

    // checks for tronlink authorization
    useEffect(() => {
        const checkWalletAuthorization = async () => {
            // console.log("running");
            //@ts-ignore
            await window["tronLink"]?.request({
                method: "tron_requestAccounts",
            });
            // console.log("got request");
            //@ts-ignore
            const tronLink = { ...(await window["tronLink"]) };

            const hexTronWalletAddresss = tronLink.tronWeb?.defaultAddress?.hex;
            console.log({ hexTronWalletAddresss });

            if (hexTronWalletAddresss) {
                if (!appState.userData) {
                    const userData = await getUserDataByUuid(
                        hexTronWalletAddresss,
                    );

                    console.log({ userData });

                    if (!userData) {
                        router.push(
                            `/onboard?address=${hexTronWalletAddresss}`,
                        );

                        setAppState({
                            // userInfo,
                            userInfo: {
                                token: null,
                                uuid: hexTronWalletAddresss,
                                wallets: [],
                            },
                        });
                    } else {
                        if (pathname === "/onboard") {
                            router.push("/");
                        }
                        setAppState({
                            userData,
                        });
                    }
                }
            }

            // console.log("got tronlink");
            // console.log({ tronLink, hexTronWalletAddresss });
        };
        checkWalletAuthorization();
    }, []);

    // checks for metamask authorization
    useEffect(() => {
        const checkWalletAuthorization = async () => {
            const chainId = await window["ethereum"]?.request({
                method: "eth_chainId",
            });

            const accounts = await window["ethereum"]
                ?.request({ method: "eth_requestAccounts" }) // @ts-ignore
                .catch((e) => {
                    console.error("METAMASK ERR:", e);
                    // return reject();
                });

            const walletAddresss = accounts[0];

            // console.log(chainId, accounts, "accounts");
            // After connection
            if (walletAddresss) {
                if (!appState.userData) {
                    const userData = await getUserDataByUuid(walletAddresss);

                    // console.log({ userData });

                    if (!userData) {
                        router.push(`/onboard?address=${walletAddresss}`);

                        setAppState({
                            // userInfo,
                            userInfo: {
                                token: null,
                                uuid: walletAddresss,
                                wallets: [],
                            },
                        });
                    } else {
                        if (pathname === "/onboard") {
                            router.push("/");
                        }
                        setAppState({
                            userData,
                        });
                    }
                }
            }
        };
        checkWalletAuthorization();
    }, []);

    return null;
};

export default UserInfoSetter;
