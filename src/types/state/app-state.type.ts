export type AppState = {
    userData: Record<string, any> | null; // For storing user data
    userInfo: Record<string, any> | null; // For storing user information during onboarding and login
    wallets: Record<string, any>[]; // For storing connected wallets information
    socials: Record<string, any>[]; // For storing connected social accounts information
    globalId: string | null; // For storing a global identifier for the user
    theme?: string | null; // For storing the theme preference
    banner?: string | null; // For storing the banner preference
    logins: string[];
    server: boolean;
    org: { staker: boolean; balance: number | string };
    unstoppableAuth: {
        uuid: string;
        token: string;
        walletAddress: string;
        domain: string;
    };
};

export const InitialAppState = (server = true) => ({
    userData: null,
    userInfo: null,
    wallets: [],
    socials: [],
    globalId: null,
    theme: null,
    banner: null,
    logins: [],
    server,
    org: { staker: false, balance: 0 },
});

// export type AppState = {
//     userData: Record<string, any> | null; // For storing user data
//     userInfo: Record<string, any> | null; // For storing user information during onboarding and login
//     wallets: Record<string, any>[]; // For storing connected wallets information
//     socials: Record<string, any>[]; // For storing connected social accounts information
//     globalId: string | null; // For storing a global identifier for the user
//     theme?: string | null; // For storing the theme preference
//     banner?: string | null; // For storing the banner preference
//     logins: string[];
//     server: boolean;
// };

// export const InitialAppState = (server = true) => ({
//     userData: null,
//     userInfo: null,
//     wallets: [],
//     socials: [],
//     globalId: null,
//     theme: null,
//     banner: null,
//     logins: [],
//     server,
// });
