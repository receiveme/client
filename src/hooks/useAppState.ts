import { useContext } from "react";
import { AppContext } from "../lib/context_particle";
import { AppState } from "../types/state/app-state.type";

export const useAppState = (): [
    AppState,
    (state: Partial<AppState>) => void,
] => {
    const { appState, setAppState: _setAppState } = useContext(AppContext);

    function setAppState(state: Partial<AppState>) {
        _setAppState({
            ...appState,
            ...state,
        });
    }

    return [appState, setAppState];
};
