import { parseSwap } from "./Swap";

const swaps = '{"data":{"swaps":[{"id":"0x83949082002f1a19ee3a8caadefb980b955f2c487b2a4633f428f11fe0f3dd6c#346081","timestamp":"1653407760","amount0":"-489410.948255","amount1":"249.795408163240098401","transaction":{"id":"0x83949082002f1a19ee3a8caadefb980b955f2c487b2a4633f428f11fe0f3dd6c","blockNumber":"14836638"},"tick":"200493","sqrtPriceX96":"1787829209708643762003470022868992"},{"id":"0xd823dd14c1bbd6307820fe4524641ffd85ccf27b21959c99353cdaa0d7facb3a#347442","timestamp":"1653574937","amount0":"-93545.109464","amount1":"49.67917064647613","transaction":{"id":"0xd823dd14c1bbd6307820fe4524641ffd85ccf27b21959c99353cdaa0d7facb3a","blockNumber":"14848437"},"tick":"200886","sqrtPriceX96":"1823248510413210145276430360520710"}]}}'

const swap = '{"id":"0x83949082002f1a19ee3a8caadefb980b955f2c487b2a4633f428f11fe0f3dd6c#346081","timestamp":"1653407760","amount0":"-489410.948255","amount1":"249.795408163240098401","transaction":{"id":"0x83949082002f1a19ee3a8caadefb980b955f2c487b2a4633f428f11fe0f3dd6c","blockNumber":"14836638"},"tick":"200493","sqrtPriceX96":"1787829209708643762003470022868992"}'

export function test(): void {
    const parsed = parseSwap(swap);

    console.log(
        `{
    "id": "${parsed.id}",
    "timestamp": "${parsed.timestamp}",
    "amount0": "${parsed.amount0}",
    "amount1": "${parsed.amount1}",
    "transaction": {
        "id": "${parsed.transaction.id}",
        "blockNumber": "${parsed.transaction.blockNumber}"
    },
    "tick": "${parsed.tick}",
    "sqrtPriceX96": "${parsed.sqrtPriceX96}"
}`);
}