# TrustFall

**Pre-contract outcome simulation for a 500 USDC Web3 design engagement.**

Public demo: https://trustfall-portaldot-2026.crypto5555111.chatgpt.site/
Source repository: https://github.com/noboru59631/trustfall-portaldot

DoraHacks Build: https://dorahacks.io/build/50104

TrustFall lets a community and a freelance designer rehearse success, delay, non-delivery, and quality-dispute outcomes before signing. The 500 USDC outcome lab remains explicitly simulated. A separate read-only panel publishes the Portaldot V3 Testnet transactions that were actually executed.

## Status

| Layer | Status |
| --- | --- |
| Interactive simulator | **SIMULATED** and tested |
| Portaldot read-only RPC | **RPC READ VERIFIED**; no transaction |
| V3 EVM escrow source | **LOCAL EVM VERIFIED**; Solidity 0.8.30, Paris target, 5/5 settlement and safety tests |
| V3 deployment | **V3 LIVE**; receipt status 1 at `0xcabcEbe5C50880751Dd990e776828CFac6cF393E` |
| V3 deadline refund | **V3 LIVE**; `Refunded (4)`, 1 tPOT returned, contract balance 0 |
| V3 dispute hold | **V3 LIVE**; `Disputed (2)`, 0.001 tPOT retained before resolution |
| V3 disputed split | **V3 LIVE**; `Split (5)`, 0.0007 / 0.0003 tPOT, contract balance 0 |
| Native tPOT settlement | Verified for deadline refund and one 70/30 disputed split |
| USDC settlement | **UNVERIFIED**; the EVM candidate does not claim USDC |
| ink! escrow source | Legacy DEMO candidate, not deployed |

## Verified contract behavior

The deployed V3 EVM contract uses distinct client, freelancer, and arbiter roles. Its creation data exactly matches the current Solidity source compiled with the size-optimized settings in `scripts/compile-evm.mjs`.

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

`npm run build:evm && npm run verify:v3` performs read-only V3 checks and writes `evidence/portaldot-v3-live-read.json`. It verifies the deployment receipt, creation data, runtime code presence, ABI getters, roles, state, deadline, balances, and nonces without a wallet or private key.

## Live E2E evidence

Two separate agreements prove two terminal paths without reusing or replaying a transaction.

- Deadline refund: contract `0xcabcEbe5C50880751Dd990e776828CFac6cF393E`, transaction `0xc837efb9566c9bd60c091e1a1373a7b0d6fce0ae74f41cb897e1f79f65c5acb7`, block 307125, `Refunded (4)`, 1 tPOT returned, balance 0.
- Dispute: contract `0x9ACdc6a7110f722f85b660cdB495B553F5A1Ba68`, `openDispute()` transaction `0xfbda236c4255b52221484c6da9e873eb93210945b7b62191fdef1b39fd63fcce`, `Disputed (2)`, 0.001 tPOT retained.
- Resolution: transaction `0xa7549a45985c2bba0a438381b2ed51c729f411574e073ac15c79e6997ccb1081`, block 311276, `Split (5)`, 0.0007 tPOT to Freelancer and 0.0003 tPOT to Client, balance 0.

The public live panel is intentionally read-only. It refreshes the two terminal contract states through the public RPC, links the captured evidence JSON, and never requests a wallet.

This proof does not establish every dispute outcome, a production security audit, Mainnet behavior, USDC settlement, or a callable DaaS integration.

## Repository map

- `dist/` — deployable static simulator.
- `contracts/evm/TrustFall.sol` — native-tPOT V3 EVM escrow candidate.
- `tests/trustfall-evm.test.mjs` — settlement, authorization, conservation, and double-settlement tests.
- `scripts/compile-evm.mjs` — reproducible Solidity 0.8.30 Paris build.
- `scripts/rpc-smoke.mjs` — read-only Portaldot RPC evidence collector.
- `scripts/verify-v3-live.mjs` — reproducible read-only verification of the deployed agreement.
- `evidence/portaldot-v3-live-read.json` — latest V3 deployment/funding/state evidence.
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
