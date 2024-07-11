export const getSiwtMessage = (nonce: string) => {
    return `receive.me wants you to sign in with your Tronlink account.\n\nURI: https://receive.me\n\nNonce: ${nonce}`;
};
