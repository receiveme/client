"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { AppStateProvider } from "../lib/context_particle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UnstoppableDomainAuthContext } from "../context/UnstoppableDomainAuth.context";
import { KeplrAuthContext } from "../context/KeplrAuth.context";
import { MetamaskAuthContext } from "../context/MetamaskAuth.context";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppStateProvider>
                <UnstoppableDomainAuthContext>
                    <KeplrAuthContext>
                        <MetamaskAuthContext>
                            {children}
                            <ProgressBar
                                height="4px"
                                color="#4f46e5"
                                options={{ showSpinner: false }}
                                shallowRouting
                            />
                        </MetamaskAuthContext>
                    </KeplrAuthContext>
                </UnstoppableDomainAuthContext>
            </AppStateProvider>
        </QueryClientProvider>
    );
};

export default Providers;
