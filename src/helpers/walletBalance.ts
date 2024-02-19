export default function calculateWalletBalance(items: Array<any> = []): number {
    let total = 0;
    for (let item of items) total += item?.["quote"] || 0;
    return total;
}