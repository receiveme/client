"use client";

import { createContext, useEffect, useState } from "react";
import { AppState, InitialAppState } from "../types/state/app-state.type";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";
import { ModalProvider } from "@particle-network/connect-react-ui";
import { WalletEntryPosition } from "@particle-network/auth";
import {
    Ethereum,
    // EthereumGoerli,
    Avalanche,
    AvalancheTestnet,
    ArbitrumNova,
    BNBChain,
    BNBChainTestnet,
} from "@particle-network/chains";
import { evmWallets } from "@particle-network/connect";
import UserInfoSetter from "./UserInfoSetter";
import particle from "./particle";
// import {} from ""

export const AppContext = createContext<AppState | any>({});

export const AppStateProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [appState, setAppState] = useState<AppState>(InitialAppState());

    useEffect(() => {
        const appStateLS = localStorage.getItem("app-state");
        setAppState(
            appStateLS ? JSON.parse(appStateLS) : InitialAppState(false),
        );
    }, []);

    // Save the app state to local storage every time it is updated
    useEffect(() => {
        let currentAppState = appState;

        if (currentAppState.server) return;

        if (!currentAppState.userInfo && currentAppState.userData) {
            currentAppState.userInfo = particle.auth.getUserInfo();
        }

        localStorage.setItem("app-state", JSON.stringify(currentAppState));
    }, [appState, setAppState]);

    console.log("running");

    return (
        <AuthCoreContextProvider
            options={{
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
                appId: process.env.NEXT_PUBLIC_APP_ID as string,
            }}
        >
            <ModalProvider
                options={{
                    projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
                    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
                    appId: process.env.NEXT_PUBLIC_APP_ID as string,
                    chains: [
                        Ethereum,
                        // EthereumGoerli,
                        Avalanche,
                        AvalancheTestnet,
                        BNBChain,
                        BNBChainTestnet,
                    ],
                    particleWalletEntry: {
                        //optional: particle wallet config
                        displayWalletEntry: true, //display wallet button when connect particle success.
                        defaultWalletEntryPosition: WalletEntryPosition.BR,
                        supportChains: [
                            Ethereum,
                            // EthereumGoerli,
                            Avalanche,
                            AvalancheTestnet,
                            ArbitrumNova,
                            BNBChain,
                            BNBChainTestnet,
                        ],
                        customStyle: {}, //optional: custom wallet style
                    },
                    securityAccount: {
                        //optional: particle security account config
                        //prompt set payment password. 0: None, 1: Once(default), 2: Always
                        promptSettingWhenSign: 0,
                        //prompt set master password. 0: None(default), 1: Once, 2: Always
                        promptMasterPasswordSettingWhenLogin: 0,
                    },
                    wallets: evmWallets({
                        projectId: "08e47732f28f0dcaf3411492b7c269ab", //replace with walletconnect projectId
                        showQrModal: false,
                    }),
                }}
                theme={"auto"}
                language={"en"} //optional：localize, default en
                walletSort={["Particle Auth", "Wallet"]} //optional：walelt order
                particleAuthSort={[
                    //optional：display particle auth items and order
                    "email",
                    "google",
                    "apple",
                    "github",
                    "discord",
                ]}
            >
                <AppContext.Provider value={{ appState, setAppState }}>
                    {children}
                    <UserInfoSetter />
                </AppContext.Provider>
            </ModalProvider>
        </AuthCoreContextProvider>
    );
};
