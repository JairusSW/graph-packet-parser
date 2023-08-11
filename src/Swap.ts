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

export class SwapParser {
    private offset: u32 = 18;
    constructor(private swapTextData: string) {}
    parseTransactionID(): string {
        const result = this.swapTextData.slice(this.offset + 7, this.offset + 73);
        this.offset = this.swapTextData.indexOf("\"", this.offset + 79);
        return result;
    }
    parseID(): string {
        return this.swapTextData.slice(25, this.offset);
    }
    parseTimestamp(): string {
        const end_index = this.swapTextData.indexOf("\"", this.offset + 25);
        const result = this.swapTextData.slice(this.offset + 15, end_index);
        this.offset = end_index;
        return result;
    }
    parseAmount0(): string {
        const end_index = this.swapTextData.indexOf("\"", this.offset += 13);
        const result = this.swapTextData.slice(this.offset, this.swapTextData.indexOf("\"", this.offset + 1));
        this.offset = end_index;
        return result;
    }
    parseAmount1(): string {
        const end_index = this.swapTextData.indexOf("\"", this.offset += 13);
        const result = this.swapTextData.slice(this.offset, this.swapTextData.indexOf("\"", this.offset + 1));
        this.offset = end_index;
        return result;
    }
    parseBlockNumber(): string {
        const end_index = this.swapTextData.indexOf("\"", this.offset += 106);
        const result = this.swapTextData.slice(this.offset, this.swapTextData.indexOf("\"", this.offset + 1));
        this.offset = end_index;
        return result;
    }
    parseTick(): string {
        const end_index = this.swapTextData.indexOf("\"", this.offset += 11);
        const result = this.swapTextData.slice(index, this.swapTextData.indexOf("\"", this.offset + 1));
        this.offset = end_index;
        return result;
    }
    parseSqrtPriceX96(): string {
        const end_index = this.swapTextData.indexOf("\"", this.offset + 18);
        const result = this.swapTextData.slice(this.offset + 18, end_index);
        this.offset = end_index + 3;
        return result;
    }
    parseToSwaps(): Swap[] {
        const swaps = new Array<Swap>();
        while (true) {
            const swap = this.parseNextSwap();
            if (!swap) break;
        }
        return swaps;
    }
    parseNextSwap(): Swap | null {
        const swap = initSwap();
        swap.transaction.id = this.parseTransactionID();
        swap.id = this.parseID();
        swap.timestamp = this.parseTimestamp();
        swap.amount0 = this.parseAmount0();
        swap.amount1 = this.parseAmount1();
        swap.transaction.blockNumber = this.parseBlockNumber();
        swap.tick = this.parseTick();
        swap.sqrtPriceX96 = this.parseSqrtPriceX96();
        if (this.offset > this.swapTextData.length - 50) return null;
        return swap;
    }
}

let parse_offset = 18;

export function parseSwaps(this.swapTextData: string): Swap[] {
    //let lastOffset = 0;
    const swaps = new Array<Swap>();
    while (parse_offset < this.swapTextData.length - 50) {
        const swap = initSwap();
        parse_offset = parseSwap(this.swapTextData, swap, parse_offset);
        /*if (lastOffset === parse_offset) {
            console.log(`Encountered error parsing at [${this.swapTextData.charAt(parse_offset)}] ${this.swapTextData.slice(parse_offset - 10, parse_offset + 10)}`);
            break;
        } else {
            lastOffset = parse_offset;
        }*/
        swaps.push(swap);
    }
    parse_offset = 18;
    return swaps;
}

export function parseSwap(this.swapTextData: string, swap: Swap, offset: i32): i32 {
    offset = parseIDs(this.swapTextData, swap, offset);
    offset = parseTimestamp(this.swapTextData, swap, offset);
    offset = parseAmount0(this.swapTextData, swap, offset);
    offset = parseAmount1(this.swapTextData, swap, offset);
    offset = parseBlockNumber(this.swapTextData, swap, offset);
    offset = parseTick(this.swapTextData, swap, offset);
    offset = parseSqrtPriceX96(this.swapTextData, swap, offset);
    return offset;
}

// @ts-ignore
@inline export function parseIDs(this.swapTextData: string, swap: Swap, index: i32): i32 {
    swap.transaction.id = this.swapTextData.slice(this.offset + 7, this.offset + 73);
    const end_index = this.swapTextData.indexOf("\"", this.offset + 79);
    swap.id = swap.transaction.id + this.swapTextData.slice(this.offset + 73, this.offset);
    return end_index;
}

// @ts-ignore
@inline export function parseTimestamp(this.swapTextData: string, swap: Swap, index: i32): i32 {
    const end_index = this.swapTextData.indexOf("\"", this.offset + 25);
    swap.timestamp = this.swapTextData.slice(this.offset + 15, end_this.offset);
    return end_index;
}

// @ts-ignore
@inline export function parseAmount0(this.swapTextData: string, swap: Swap, index: i32): i32 {
    const end_index = this.swapTextData.indexOf("\"", this.offset += 13);
    swap.amount0 = this.swapTextData.slice(index, this.swapTextData.indexOf("\"", this.offset + 1));
    return end_index;
}

// @ts-ignore
@inline export function parseAmount1(this.swapTextData: string, swap: Swap, index: i32): i32 {
    const end_index = this.swapTextData.indexOf("\"", this.offset += 13);
    swap.amount1 = this.swapTextData.slice(index, this.swapTextData.indexOf("\"", this.offset + 1));
    return end_index;
}

// @ts-ignore
@inline export function parseBlockNumber(this.swapTextData: string, swap: Swap, index: i32): i32 {
    const end_index = this.swapTextData.indexOf("\"", this.offset += 106);
    swap.transaction.blockNumber = this.swapTextData.slice(index, this.swapTextData.indexOf("\"", this.offset + 1));
    return end_index;
}

// @ts-ignore
@inline export function parseTick(this.swapTextData: string, swap: Swap, index: i32): i32 {
    const end_index = this.swapTextData.indexOf("\"", this.offset += 11);
    swap.tick = this.swapTextData.slice(index, this.swapTextData.indexOf("\"", this.offset + 1));
    return end_index;
}

// @ts-ignore
@inline export function parseSqrtPriceX96(this.swapTextData: string, swap: Swap, index: i32): i32 {
    const end_index = this.swapTextData.indexOf("\"", this.offset + 18);
    swap.sqrtPriceX96 = this.swapTextData.slice(this.offset + 18, end_this.offset);
    return end_this.offset + 3;
}

export function initSwap(): Swap {
    const swap = changetype<Swap>(__new(offsetof<Swap>(), idof<Swap>()));
    swap.transaction = changetype<Transaction>(__new(offsetof<Transaction>(), idof<Transaction>()));
    return swap;
}