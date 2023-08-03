// {
//     "id": "0x83949082002f1a19ee3a8caadefb980b955f2c487b2a4633f428f11fe0f3dd6c#346081",
//     "timestamp": "1653407760",
//     "amount0": "-489410.948255",
//     "amount1": "249.795408163240098401",
//     "transaction": {
//         "id": "0x83949082002f1a19ee3a8caadefb980b955f2c487b2a4633f428f11fe0f3dd6c",
//         "blockNumber": "14836638"
//     },
//     "tick": "200493",
//     "sqrtPriceX96": "1787829209708643762003470022868992"
// }

// ID length is 66
// Split from 67-["] to retrieve the other data
// Transaction ID is the same as the ID
// Timestamp, amount0, amount1, tick, sqrtPriceX96 must be sliced between ["]


export class Swap {
    id: string = "";
    timestamp: string = "";
    amount0: string = "";
    amount1: string = "";
    transaction: Transaction = new Transaction();
    tick: string = "";
    sqrtPriceX96: string = "";
}

export class Transaction {
    id: string = "";
    blockNumber: string = "";
}

export function parseSwap(swap_data: string): Swap {
    const swap = initSwap();
    let index = 0;
    index = parseIDs(swap_data, swap, index);
    console.log("index: " + index.toString());
    index = parseTimestamp(swap_data, swap, index);
    console.log("index: " + index.toString());
    index = parseAmount0(swap_data, swap, index);
    console.log("index: " + index.toString());
    index = parseAmount1(swap_data, swap, index);
    console.log("index: " + index.toString());
    index = parseBlockNumber(swap_data, swap, index);
    console.log("index: " + index.toString());
    index = parseTick(swap_data, swap, index);
    console.log("index: " + index.toString());
    index = parseSqrtPriceX96(swap_data, swap, index);
    console.log("index: " + index.toString());
    return swap;
}

// @ts-ignore
@inline export function parseIDs(swap_data: string, swap: Swap, index: i32): i32 {
    swap.transaction.id = swap_data.slice(7, 73);
    index = swap_data.indexOf("\"", 79);
    swap.id = swap.transaction.id + swap_data.slice(73, index);
    return index;
}

// @ts-ignore
@inline export function parseTimestamp(swap_data: string, swap: Swap, index: i32): i32 {
    const end_index = swap_data.indexOf("\"", index + 25);
    swap.timestamp = swap_data.slice(index + 15, end_index);
    return end_index;
}

// @ts-ignore
@inline export function parseAmount0(swap_data: string, swap: Swap, index: i32): i32 {
    const end_index = swap_data.indexOf("\"", index += 13);
    swap.amount0 = swap_data.slice(index, swap_data.indexOf("\"", index + 1));
    return end_index;
}

// @ts-ignore
@inline export function parseAmount1(swap_data: string, swap: Swap, index: i32): i32 {
    const end_index = swap_data.indexOf("\"", index += 13);
    swap.amount1 = swap_data.slice(index, swap_data.indexOf("\"", index + 1));
    return end_index;
}

// @ts-ignore
@inline export function parseBlockNumber(swap_data: string, swap: Swap, index: i32): i32 {
    const end_index = swap_data.indexOf("\"", index += 106);
    swap.transaction.blockNumber = swap_data.slice(index, swap_data.indexOf("\"", index + 1));
    return end_index;
}

// @ts-ignore
@inline export function parseTick(swap_data: string, swap: Swap, index: i32): i32 {
    const end_index = swap_data.indexOf("\"", index += 11);
    swap.tick = swap_data.slice(index, swap_data.indexOf("\"", index + 1));
    return end_index;
}

// @ts-ignore
@inline export function parseSqrtPriceX96(swap_data: string, swap: Swap, index: i32): i32 {
    swap.sqrtPriceX96 = swap_data.slice(index + 18, swap_data.length - 2);
    return 0;
}

export function initSwap(): Swap {
    const swap = changetype<Swap>(__new(offsetof<Swap>(), idof<Swap>()));
    swap.transaction = changetype<Transaction>(__new(offsetof<Transaction>(), idof<Transaction>()));
    return swap;
}