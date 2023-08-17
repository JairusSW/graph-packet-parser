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

interface Swap {
    id: string;
    timestamp: string;
    amount0: string;
    amount1: string;
    transaction: Transaction;
    tick: string;
    sqrtPriceX96: string;
}

interface Transaction {
    id: string;
    blockNumber: string;
}

export class SwapParser {
    public offset: u32 = 18;
    public max_len: u32;
    constructor(private swapTextData: string) {
        this.max_len = u32(this.swapTextData.length - 50);
    }
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
        const result = this.swapTextData.slice(this.offset, this.swapTextData.indexOf("\"", this.offset + 1));
        this.offset = end_index;
        return result;
    }
    parseSqrtPriceX96(): string {
        const end_index = this.swapTextData.indexOf("\"", this.offset + 18);
        const result = this.swapTextData.slice(this.offset + 18, end_index);
        this.offset = end_index + 3;
        return result;
    }
    parseToSwaps<T extends Swap>(): T[] {
        const swaps = new Array<T>();
        while (true) {
            const swap = this.parseNextSwap<T>();
            if (!swap) break;
        }
        return swaps;
    }
    parseNextSwap<T extends Swap>(): T | null {
        const swap = instantiate<T>();
        swap.transaction.id = this.parseTransactionID();
        swap.id = this.parseID();
        swap.timestamp = this.parseTimestamp();
        swap.amount0 = this.parseAmount0();
        swap.amount1 = this.parseAmount1();
        swap.transaction.blockNumber = this.parseBlockNumber();
        swap.tick = this.parseTick();
        swap.sqrtPriceX96 = this.parseSqrtPriceX96();
        if (this.offset > this.max_len) return null;
        return swap;
    }
}