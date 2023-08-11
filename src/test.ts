import { SwapParser } from "./Swap";
const swaps = '{"data":{"swaps":[{"id":"0x048ca158346638ec4fdde3ed2d48bef4780e94b9f6e8cebdc7f4a8010f556971#149253","timestamp":"1674648456","amount0":"-0.101898876022884747","amount1":"157.975015","transaction":{"id":"0x048ca158346638ec4fdde3ed2d48bef4780e94b9f6e8cebdc7f4a8010f556971","blockNumber":"38508153"},"tick":"-202888","sqrtPriceX96":"3115031348980421727231748"},{"id":"0xcaff424317352b1aac3f55086d58cf723df2d2187acbec0bbe541c7cb22a04fc#149254","timestamp":"1674648458","amount0":"-0.198048461170833148","amount1":"307.144059","transaction":{"id":"0xcaff424317352b1aac3f55086d58cf723df2d2187acbec0bbe541c7cb22a04fc","blockNumber":"38508154"},"tick":"-202883","sqrtPriceX96":"3115749614570460988489386"}]}}'
const parser = new SwapParser(swaps);

const swap = parser.parseNextSwap()!;
console.log(
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
}`);