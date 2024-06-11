"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { AppStateProvider } from "../lib/context_particle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppStateProvider>
                {children}
                <ProgressBar
                    height="4px"
                    color="#4f46e5"
                    options={{ showSpinner: false }}
                    shallowRouting
                />
            </AppStateProvider>
        </QueryClientProvider>
    );
};

export default Providers;
