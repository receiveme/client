"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { AppStateProvider } from "../lib/context_particle";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppStateProvider>
            {children}
            <ProgressBar
                height="4px"
                color="#4f46e5"
                options={{ showSpinner: false }}
                shallowRouting
            />
            <Toaster position="top-right" />
        </AppStateProvider>
    );
};

export default Providers;
