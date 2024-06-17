"use client";

import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
// @ts-ignore
import Uauth from "@uauth/js";
import { v5 as uuidv5 } from "uuid";
import {
    addDomainToUser,
    getUserDataByUuid,
    getUserDataByWalletAddress,
} from "../actions";
import { useAppState } from "../hooks/useAppState";
import { useRouter } from "next/navigation";

interface IUnstoppableDomainAuthContext {
    domain: string | null;
    walletAddress: string | null;
    status: "loading" | "authenticated" | "unauthenticated";
}

const DEFAULT_DATA: IUnstoppableDomainAuthContext = {
    domain: null,
    walletAddress: null,
    status: "loading",
};

export const uauth = new Uauth({
    clientID: "61e04be9-ff48-4336-9704-a92b8d09bddc",
    redirectUri:
        process.env.NEXT_PUBLIC_REDIRECT_URL ?? "http://localhost:3000",
    scope: "openid wallet messaging:notifications:optional",
});

const unstoppableDomainAuthContext =
    createContext<IUnstoppableDomainAuthContext>(DEFAULT_DATA);

export const UnstoppableDomainAuthContext = ({
    children,
}: PropsWithChildren) => {
    const [data, setData] = useState(DEFAULT_DATA);

    const [, setAppState] = useAppState();

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const authorization = await uauth.authorization();

                // console.log({ authorization });

                const account = uauth.getAuthorizationAccount(authorization);

                // console.log({ account });

                if (authorization) {
                    const uuidv5OfUserAddress = uuidv5(
                        account.address,
                        uuidv5.URL,
                    );

                    const userDataByWallet = await getUserDataByWalletAddress(
                        account.address,
                    );

                    // console.log({ userDataByWallet });

                    const userData =
                        (await getUserDataByUuid(
                            userDataByWallet?.user.authuuid ||
                                uuidv5OfUserAddress,
                        )) || null;

                    // console.log({ userData });

                    const domain = authorization.idToken.sub;
                    const walletAddress = authorization.idToken.wallet_address;

                    if (!userData && account) {
                        setAppState({
                            unstoppableAuth: {
                                uuid: uuidv5OfUserAddress,
                                token: uuidv5OfUserAddress,
                                walletAddress: account.address,
                                domain,
                            },
                        });

                        setData({
                            domain,
                            status: "authenticated",
                            walletAddress,
                        });
                        // setAppState({
                        //     userInfo: {
                        //         uuid: uuidv5OfUserAddress,
                        //         token: uuidv5OfUserAddress,
                        //         wallets: [
                        //             {
                        //                 uuid: uuidv5OfUserAddress,
                        //                 chain_name: "N/A",
                        //                 public_address: account.address,
                        //             },
                        //         ],
                        //         isUnstoppableAuth: true,
                        //     },
                        // });
                        router.push("/onboard");
                    } else {
                        if (userData && !userData?.domain.includes(domain)) {
                            addDomainToUser(userData?.id, domain);
                        }

                        setAppState({
                            userData,
                        });

                        setData({
                            domain: domain,
                            status: "authenticated",
                            walletAddress,
                        });
                    }
                }
            } catch (e) {
                console.error(e);
                setData({
                    domain: null,
                    status: "unauthenticated",
                    walletAddress: null,
                });
            }
        })();
    }, []);

    return (
        <unstoppableDomainAuthContext.Provider value={data}>
            {children}
        </unstoppableDomainAuthContext.Provider>
    );
};

export const useUnstoppableDomainAuth = () => {
    const data = useContext(unstoppableDomainAuthContext);

    const signIn = (): Promise<{
        isNew: boolean;
        data: any;
    }> => {
        return new Promise((res, rej) => {
            uauth
                .loginWithPopup()
                .then(async (data: { idToken: { wallet_address: string } }) => {
                    // console.log(data, "data");
                    const userWalletAddress = data.idToken.wallet_address;

                    // console.log({ userWalletAddress });

                    const uuidv5OfUserAddress = uuidv5(
                        userWalletAddress,
                        uuidv5.URL,
                    );

                    // console.log({ uuidv5OfUserAddress });

                    const userDataFromWalletAddress =
                        await getUserDataByWalletAddress(userWalletAddress);
                    // console.log({ userDataFromWalletAddress });

                    const userData =
                        (await getUserDataByUuid(
                            userDataFromWalletAddress?.user.authuuid ||
                                uuidv5OfUserAddress,
                        )) || null;

                    // console.log({ userData });

                    res({
                        isNew: !userDataFromWalletAddress,
                        data: userData,
                    });
                })
                .catch((e: unknown) => rej(e));
        });
    };

    const signOut = async () => {
        return await uauth.logout();
    };

    return {
        auth: data,
        signIn,
        signOut,
    };
};
