import { useContext, useState } from "react";
import { AppContext } from "../lib/context";
import { AppState } from "../types/state/app-state.type";

export const useAppState = (): ReturnType<typeof useState<AppState>> => {
    const { appState, setAppState } = useContext(AppContext);

    return [appState, setAppState];
};
