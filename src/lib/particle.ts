import { ParticleNetwork } from "@particle-network/auth";
import { Avalanche } from "@particle-network/chains";

const particle = new ParticleNetwork({
    projectId: "19880450-9512-4857-a7a9-c29d16110034",
    clientKey: "cbIQ6bvFEBm8ZgVkpox4q0mpxJtxAgqj3ra4VQtf",
    appId: "124f61c4-f5ca-486c-a686-ae80b6966b72",
    chainName: Avalanche.name,
    chainId: Avalanche.id,
    wallet: {
        displayWalletEntry: true,
        uiMode: "dark",
    },
});

export default particle;
