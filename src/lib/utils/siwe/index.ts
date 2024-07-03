export const getSiweMessage = (nonce: string) => {
    return `receive.me wants you to sign in with your Ethereum account.\n\nURI: https://receive.me\n\nNonce: ${nonce}`;
};
