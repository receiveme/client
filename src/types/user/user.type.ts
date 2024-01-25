export type UserWallet = {
    id: string;

    wallet: "eth" | "trx" | "alg" | "sol" | "kla";

    address: string;
};

export type UserSocial = {
    social: "paypal" | "github" | "twitter" | "ens";

    id: string;

    user: string;
};

export type UserProfile = {
    theme: number;

    backgroundId: number;

    bannerId: number;

    bannerImage: string;
};

export type User = {
    // Identification

    id: string;

    handle: string;

    joined: Date;

    // Business Logic

    socials: UserSocial[];

    wallets: UserWallet[];

    profile: UserProfile;

    email: string;

    // Authentication

    authType: "google" | "apple" | "discord" | "github" | "email";

    authToken: string;

    authMain: string;

    authSecret: string;
};
