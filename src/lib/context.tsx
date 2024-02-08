import { createContext, useEffect, useState } from "react";
import { AppState } from "../types/state/app-state.type";
import { supabase } from "./supabase";

export const AppContext = createContext<AppState | any>({});

export const AppStateProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [appState, setAppState] = useState<AppState>({ user: null });

    useEffect(() => {
        async function getUser() {
            // await supabase.auth.signInWithPassword({
            //     email: "abzy@email.com",
            //     password: "hello122",
            // });

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                setAppState({ user: user });
            }
        }

        getUser();
    }, []);

    return (
        <AppContext.Provider value={{ appState, setAppState }}>
            {children}
        </AppContext.Provider>
    );
};
