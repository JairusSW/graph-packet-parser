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

let parse_offset = 18;

export function parseSwaps(swap_data: string): Swap[] {
    //let lastOffset = 0;
    const swaps = new Array<Swap>();
    while (parse_offset < swap_data.length - 50) {
        const swap = initSwap();
        parse_offset = parseSwap(swap_data, swap, parse_offset);
        /*if (lastOffset === parse_offset) {
            console.log(`Encountered error parsing at [${swap_data.charAt(parse_offset)}] ${swap_data.slice(parse_offset - 10, parse_offset + 10)}`);
            break;
        } else {
            lastOffset = parse_offset;
        }*/
        swaps.push(swap);
    }
    parse_offset = 18;
    return swaps;
}

export function parseSwap(swap_data: string, swap: Swap, offset: i32): i32 {
    offset = parseIDs(swap_data, swap, offset);
    offset = parseTimestamp(swap_data, swap, offset);
    offset = parseAmount0(swap_data, swap, offset);
    offset = parseAmount1(swap_data, swap, offset);
    offset = parseBlockNumber(swap_data, swap, offset);
    offset = parseTick(swap_data, swap, offset);
    offset = parseSqrtPriceX96(swap_data, swap, offset);
    return offset;
}

// @ts-ignore
@inline export function parseIDs(swap_data: string, swap: Swap, index: i32): i32 {
    swap.transaction.id = swap_data.slice(index + 7, index + 73);
    const end_index = swap_data.indexOf("\"", index + 79);
    swap.id = swap.transaction.id + swap_data.slice(index + 73, index);
    return end_index;
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
    const end_index = swap_data.indexOf("\"", index + 18);
    swap.sqrtPriceX96 = swap_data.slice(index + 18, end_index);
    return end_index + 3;
}

export function initSwap(): Swap {
    const swap = changetype<Swap>(__new(offsetof<Swap>(), idof<Swap>()));
    swap.transaction = changetype<Transaction>(__new(offsetof<Transaction>(), idof<Transaction>()));
    return swap;
}