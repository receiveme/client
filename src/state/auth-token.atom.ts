"use client";

import { useEffect, useState } from "react";

export const useAuthToken = () => {
    const [token, setToken] = useState<string | undefined | null>(undefined);

    const setAuthToken = (value: string) => {
        localStorage.setItem("receive.me__auth_token", value);
        setToken(value);
    };

    const removeAuthToken = () => {
        localStorage.removeItem("receive.me__auth_token");
        setToken(null);
    };

    useEffect(() => {
        const authToken = localStorage.getItem("receive.me__auth_token");
        if (authToken) {
            setToken(authToken);
        } else {
            setToken(null);
        }
    }, []);

    return {
        authToken: token,
        setAuthToken,
        removeAuthToken,
    };
};
