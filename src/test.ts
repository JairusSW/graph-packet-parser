import { parseSwaps } from "./Swap";
import { swaps } from "./swap_data";

const start_time = Date.now();
let parsed_swaps = parseSwaps(swaps);
const end_time = Date.now();
for (let i = 0; i < parsed_swaps.length; i++) {
    const swap = parsed_swaps[i];
    /*console.log(
`{
"id": "${swap.id}",
"timestamp": "${swap.timestamp}",
"amount0": "${swap.amount0}",
"amount1": "${swap.amount1}",
"transaction": {
    "id": "${swap.transaction.id}",
    "blockNumber": "${swap.transaction.blockNumber}"
},
"tick": "${swap.tick}",
"sqrtPriceX96": "${swap.sqrtPriceX96}"
}`);*/
}
console.log(`Parsed ${parsed_swaps.length} swaps in approximately ${end_time - start_time}ms`);
console.log(`Size: ${swaps.length} bytes`)