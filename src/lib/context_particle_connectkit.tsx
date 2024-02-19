'use client'
import { createContext, useEffect, useState } from "react";
import { AppState } from "../types/state/app-state.type";
import { supabase } from "./supabase";
import { AuthCoreContextProvider } from '@particle-network/auth-core-modal';
import { ModalProvider } from "@particle-network/connectkit";
import { Ethereum, EthereumGoerli, Avalanche, AvalancheTestnet, ArbitrumGoerli, ArbitrumNova } from '@particle-network/chains';
import { evmWallets } from '@particle-network/connect';


export const AppContext = createContext<AppState | any>({});

export const AppStateProvider = ({ // TODO MAKE THIS WORK
    children,
}: {
    children: React.ReactNode;
}) => {
    const [appState, setAppState] = useState<AppState>({ user: null });
    return (
        // <AuthCoreContextProvider
        //     options={{
        //         projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
        //         clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
        //         appId: process.env.NEXT_PUBLIC_APP_ID as string,
        //     }}>
        <ModalProvider
            options={{
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
                appId: process.env.NEXT_PUBLIC_APP_ID as string,
                chains: [
                    Ethereum,
                    EthereumGoerli
                ],
                wallet: {    //optional: particle wallet config
                    visible: true, //display wallet button when connect particle success.
                    // supportChains:[
                    //     Ethereum,
                    //     EthereumGoerli
                    // ],
                    customStyle: {}, //optional: custom wallet style
                },
                promptSettingConfig: { //optional: particle security account config
                    //prompt set payment password. 0: None, 1: Once(default), 2: Always
                    promptPaymentPasswordSettingWhenSign: 1,
                    //prompt set master password. 0: None(default), 1: Once, 2: Always
                    promptMasterPasswordSettingWhenLogin: 1
                },
                connectors: evmWallets({
                    projectId: '08e47732f28f0dcaf3411492b7c269ab', //replace with walletconnect projectId
                    showQrModal: false
                }),
            }}
            theme={'light'}
            language={'en'}   //optional：localize, default en
            walletSort={['Particle Auth', 'Wallet']} //optional：walelt orde
        >

            <AppContext.Provider value={{ appState, setAppState }}>
                {children}
            </AppContext.Provider>

        </ModalProvider>


        // </AuthCoreContextProvider>


    );
};
