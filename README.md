# TrustFall

**Pre-contract outcome simulation for a 500 USDC Web3 design engagement.**

Public demo: https://trustfall-portaldot-2026.crypto5555111.chatgpt.site/
Source repository: https://github.com/noboru59631/trustfall-portaldot

DoraHacks Build: https://dorahacks.io/build/50104

TrustFall lets a community and a freelance designer rehearse success, delay, non-delivery, and quality-dispute outcomes before signing. The public UI remains a simulation until each flow has a matching Portaldot V3 transaction.

## Status

| Layer | Status |
| --- | --- |
| Interactive simulator | **SIMULATED** and tested |
| Portaldot read-only RPC | **RPC READ VERIFIED**; no transaction |
| V3 EVM escrow source | **LOCAL EVM VERIFIED**; Solidity 0.8.30, Paris target, 5/5 settlement and safety tests |
| V3 deployment | **NOT EXECUTED**; no contract address or transaction hash claimed |
| V3 payment/refund/dispute | **NOT EXECUTED** |
| Native tPOT settlement | Implemented in the EVM candidate; live V3 proof pending |
| USDC settlement | **UNVERIFIED**; the EVM candidate does not claim USDC |
| ink! escrow source | Legacy DEMO candidate, not deployed |

## Verified contract behavior

The EVM candidate uses distinct client, freelancer, and arbiter roles.

- Approved delivery pays once; a second settlement reverts.
- Non-delivery refund is unavailable until the recorded deadline.
- A dispute holds all funds until the arbiter pays, refunds, or splits them.
- Unauthorized delivery and resolution calls revert.
- Unexpected direct deposits revert.
- State changes occur before transfers and settlement functions have a reentrancy guard.

See [V3 EVM evidence](docs/V3_EVM_EVIDENCE.md).

## Run locally

Serve `dist/` with any static web server, or open `dist/index.html` in a modern browser.

```bash
npm install
npm test
npm run test:evm
npm run check:rpc
```

`npm run test:evm` compiles with Solidity 0.8.30 and `evmVersion: paris` before running a local EVM configured with chain ID 420420777. Local verification is not V3 LIVE evidence.

The RPC check is read-only. It does not use a wallet, secret key, or funds.

## Repository map

- `dist/` — deployable static simulator.
- `contracts/evm/TrustFall.sol` — native-tPOT V3 EVM escrow candidate.
- `tests/trustfall-evm.test.mjs` — settlement, authorization, conservation, and double-settlement tests.
- `scripts/compile-evm.mjs` — reproducible Solidity 0.8.30 Paris build.
- `scripts/rpc-smoke.mjs` — read-only Portaldot RPC evidence collector.
- `contracts/trustfall/` — legacy ink! compatibility candidate.
- `docs/V3_EVM_EVIDENCE.md` — current proof register and missing live steps.
- `docs/ARCHITECTURE.md` — architecture and trust boundaries.
- `docs/EVIDENCE.md` — claim vocabulary.

## Safety

Never paste a seed phrase or private key into this project. Use testnet tPOT only. No Mainnet transaction is required or authorized by this repository.

## Official references

- Portaldot website: https://www.portaldot.world/
- Developer docs: https://portaldot-dev.readthedocs.io/en/latest/
- Chain info: https://portaldot-dev.readthedocs.io/en/latest/chain-info.html
- Official GitHub linked by Portaldot: https://github.com/portaldotVolunteer/Portaldot
