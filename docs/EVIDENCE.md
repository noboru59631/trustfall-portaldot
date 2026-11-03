# Evidence Register

## Status vocabulary

- **RPC READ VERIFIED**: a saved read-only RPC response. It does not establish contract deployment, transaction execution, or token settlement.
- **V3 LIVE**: a transaction, receipt, or state independently confirmed through the Portaldot V3 RPC.
- **NOT EXECUTED**: implemented or prepared, but no confirmed V3 transaction exists for that action.
- **SIMULATED**: deterministic local behavior with tests, but no chain state change.
- **DEMO**: interface or source-level candidate prepared for review.
- **UNVERIFIED**: not supported by reviewed primary material or reproducible evidence.

## Current evidence

| Item | Status | Artifact |
| --- | --- | --- |
| Four-outcome funds logic | SIMULATED | `tests/simulator.test.mjs` |
| Mainnet RPC identity and runtime read | RPC READ VERIFIED | `evidence/portaldot-rpc-read.json` records a 2026-10-21 00:56 JST response with Portaldot Mainnet, POT, SS58 42, 14 decimals and runtime spec 1002. No transaction was submitted. |
| V3 testnet EVM chain ID | RPC READ VERIFIED | `evidence/portaldot-v3-evm-rpc-read.json` records an `eth_chainId` response of 420420777 from the organizer-published endpoint. No contract or token activity. |
| V3 escrow deployment | V3 LIVE | Receipt status 1 for `0x8406518fbbba0fdeae2102e113d8e4894a56d3b7855adba30c40f662d473ca6a` at block 292360 created `0xcabcEbe5C50880751Dd990e776828CFac6cF393E`. |
| V3 deadline refund | V3 LIVE | `0xc837efb…acb7` reached `Refunded (4)`, returned 1 tPOT, and left contract `0xcabc…393E` at balance 0. |
| V3 dispute hold | V3 LIVE | `0xfbda236…fcce` reached `Disputed (2)` while retaining 0.001 tPOT in contract `0x9ACd…Ba68`. |
| V3 disputed split | V3 LIVE | `0xa7549a4…1081` reached `Split (5)`: 0.0007 tPOT to Freelancer, 0.0003 tPOT to Client, contract balance 0 at block 311276. |
| Escrow contract source | DEMO | `contracts/trustfall/lib.rs` is an unbuilt, untested candidate; delay, dispute resolution, split payment, and timeout rules are not implemented. |
| USDC transfer on Portaldot | UNVERIFIED | No official asset route confirmed |
| DaaS API integration | UNVERIFIED | No official callable API confirmed |

No seed phrase or private key is stored by this project. The public proof panel is read-only and does not request wallet access.

