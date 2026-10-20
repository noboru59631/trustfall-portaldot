# Evidence Register

## Status vocabulary

- **RPC READ VERIFIED**: a saved read-only RPC response. It does not establish contract deployment, transaction execution, or token settlement.
- **SIMULATED**: deterministic local behavior with tests, but no chain state change.
- **DEMO**: interface or source-level candidate prepared for review.
- **UNVERIFIED**: not supported by reviewed primary material or reproducible evidence.

## Current evidence

| Item | Status | Artifact |
| --- | --- | --- |
| Four-outcome funds logic | SIMULATED | `tests/simulator.test.mjs` |
| Mainnet RPC identity and runtime read | RPC READ VERIFIED (historical) | `evidence/portaldot-rpc-read.json` records a 2026-10-21 00:06 JST response with Portaldot Mainnet, POT, SS58 42, 14 decimals and runtime spec 1002. A 2026-10-21 rerun failed to connect from this environment. |
| V3 testnet EVM chain ID | RPC READ VERIFIED | `evidence/portaldot-v3-evm-rpc-read.json` records an `eth_chainId` response of 420420777 from the organizer-published endpoint. No contract or token activity. |
| Escrow contract source | DEMO | `contracts/trustfall/lib.rs` is an unbuilt, untested candidate; delay, dispute resolution, split payment, and timeout rules are not implemented. |
| Contract deployment | UNVERIFIED | No transaction submitted |
| USDC transfer on Portaldot | UNVERIFIED | No official asset route confirmed |
| DaaS API integration | UNVERIFIED | No official callable API confirmed |

No seed phrase, private key, wallet connection, token, or real asset is used anywhere in this project.

