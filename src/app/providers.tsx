"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { AppStateProvider } from "../lib/context_particle";
import Dialogs from "../components/dialogs";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppStateProvider>
            <Dialogs />
            {children}
            <ProgressBar
                height="4px"
                color="#4f46e5"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </AppStateProvider>
    );
};

export default Providers;
