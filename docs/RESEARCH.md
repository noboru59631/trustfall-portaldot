# Portaldot Technical Verification

Research date: 2026-10-21 JST. Portaldot developer materials and the organizer's DoraHacks event page are treated as primary sources for their respective claims.

The saved mainnet RPC evidence was refreshed at 2026-10-21 00:56 JST. A first rerun failed within the restricted environment; the permitted read-only retry succeeded. A chain read does not demonstrate contract deployment or token settlement.

| Capability | Status | Evidence | TrustFall decision |
| --- | --- | --- | --- |
| Official source repository | VERIFIED | https://github.com/portaldotVolunteer/Portaldot | Reference only; no forked code copied. |
| Substrate base | VERIFIED | Official repository README describes Portaldot as Substrate-based. | Use Substrate RPC concepts and SS58 accounts. |
| Public RPC | VERIFIED | https://portaldot-dev.readthedocs.io/en/latest/chain-info.html lists `wss://mainnet.portaldot.io`. | Read-only smoke test; no transaction signing. |
| Native token | VERIFIED | Chain Info lists POT with 14 decimals and SS58 format 42. | Do not represent the 500 USDC demo as native POT. |
| WASM / ink! contracts | DOCUMENTED | https://portaldot-dev.readthedocs.io/en/latest/python-sdk/usage/ink-contract-interfacing.html documents deploy, dry-run and call flows. | Include reviewable ink! candidate source; do not claim deployment. |
| Contracts pallet | DOCUMENTED | Official module index exposes contracts RPC, storage, events and extrinsics. | Plausible integration target pending runtime/artifact compatibility proof. |
| V3 testnet EVM endpoint | DOCUMENTED + RPC READ VERIFIED | The organizer's [event page](https://dorahacks.io/hackathon/portaldot-hacker-house-2026/detail) lists `https://test-evm-rpc-v3.portaldot.dev` and chain ID 420420777. A read-only `eth_chainId` returned `0x190f1ca9` (420420777); see `evidence/portaldot-v3-evm-rpc-read.json`. | No contract deployment or token transfer is inferred. |
| DaaS protocol | DESCRIBED | https://www.portaldot.world/ describes Default-as-a-Service and its conceptual modules. | Explain conceptual fit only. |
| Public DaaS API | UNVERIFIED | No callable DaaS API schema, endpoint, authentication guide, or contract address was found in reviewed official developer docs. | Adapter remains a placeholder; no LIVE badge. |
| JavaScript `@portaldot/sdk` | UNVERIFIED | The developers page shows an install snippet, but the linked docs primarily document Python and no package implementation was verified. | Avoid adding it as a dependency. |
| Public V3 testnet | DOCUMENTED | The organizer's event page lists `wss://test-node-v3.portaldot.dev` and test-token distribution for registered builders. | No wallet, test token, or transaction is used in this review. |

## Important inference

Portaldot's official contract guide demonstrates payable ink! deployment and calls using the Python Substrate interface. This supports a future escrow proof, but it does not by itself prove that this repository's ink! 4.3 candidate artifact is compatible with the current Portaldot runtime.

The candidate contract was not built or tested here. Its current methods also do not cover the simulator's grace period, timeout, mediated dispute resolution, or split payment.

