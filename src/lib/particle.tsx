
import { createContext, useEffect, useState } from "react";
import { AppState } from "../types/state/app-state.type";
import { AuthCoreContextProvider } from '@particle-network/auth-core-modal';

import { ModalProvider } from "@particle-network/connect-react-ui";
import { WalletEntryPosition } from '@particle-network/auth';
import { Ethereum, EthereumGoerli, Avalanche, AvalancheTestnet, ArbitrumGoerli, ArbitrumNova } from '@particle-network/chains';
import { evmWallets } from '@particle-network/connect';


export const AppContext = createContext<AppState | any>({});

export const _AuthCoreContextProvider = () => {
    return {

    }

}