export type AppState = {
    userData: Record<string, any> | null; // For storing user data
    userInfo: Record<string, any> | null; // For storing user information during onboarding and login
    wallets: Record<string, any>[]; // For storing connected wallets information
    socials: Record<string, any>[]; // For storing connected social accounts information
    globalId: string | null; // For storing a global identifier for the user
    theme?: string | null; // For storing the theme preference
    banner?: string | null; // For storing the banner preference
    logins: string[];
};

export const InitialAppState = {
    userData: null,
    userInfo: null,
    wallets: [],
    socials: [],
    globalId: null,
    theme: null,
    banner: null,
    logins: [],
};
