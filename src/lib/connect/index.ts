/**
 * Functions that contain methods to connect wallets
 */
export const metamask = () => {
    return new Promise(async (resolve, reject) => {
        const chainId = await window["ethereum"]?.request({
            method: "eth_chainId",
        });
        const accounts = await window["ethereum"]
            ?.request({ method: "eth_requestAccounts" })
            .catch((e: unknown) => {
                console.error(e);
                return reject();
            });

        // After connection
        if (accounts?.length && accounts[0] && chainId) {
            return resolve({ account: accounts[0], chainId });
        } else return reject();
    });
};

export const tron = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // @ts-ignore
            await window["tronLink"].request({
                method: "tron_requestAccounts",
                params: {},
            });
            // @ts-ignore
            let tronLink = { ...(await window["tronLink"]) };
            let account = tronLink.tronWeb.defaultAddress.hex;
            if (!account) return reject();
            return resolve({ account });
        } catch (e) {
            console.log(e);
            return reject();
        }
    });
};
