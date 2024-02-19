'use server'

import calculateWalletBalance from "@/src/helpers/walletBalance";

export async function getUser({ address, chain = "eth-mainnet" }: { address: string, chain?: string }) {
    // Get user details via Covalent API
    let raw_response: any = await fetch(`${process.env.BACKEND_URL}/covalent/wallet-balance?address=${address}&chain=${chain}`);
    raw_response = await raw_response.json();

    if (!raw_response?.success) return {}
    raw_response = raw_response.data;

    raw_response["usd_balance"] = calculateWalletBalance(raw_response["items"]);

    // Return the user data
    return raw_response;
}