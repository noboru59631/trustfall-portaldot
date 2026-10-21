# TrustFall

**Pre-contract outcome simulation for a 500 USDC Web3 design engagement.**

Public demo: https://trustfall-portaldot-2026.crypto5555111.chatgpt.site/
Source repository: https://github.com/noboru59631/trustfall-portaldot

Interim materials: [48-second simulated UI walkthrough](demo/trustfall-demo-40s.mp4) · [pitch deck](docs/PITCH_DECK.md) · [submission text](docs/INTERIM_SUBMISSION.md)

TrustFall lets a community and a freelance designer rehearse success, delay, non-delivery, and quality-dispute outcomes before signing. It makes payment, refund, and hold states explicit while keeping unverified chain capabilities visibly separate from the working simulator.

## Status

| Layer | Status |
| --- | --- |
| Interactive simulator | SIMULATED and tested |
| Portaldot read-only RPC | Rechecked on 2026-10-21 JST; chain identity, header, and runtime metadata saved, with no transaction |
| Portaldot V3 testnet EVM RPC | Read-only `eth_chainId` returned 420420777; no contract or token activity |
| ink! escrow source | DEMO candidate, not built, tested, or deployed; incomplete relative to the simulator |
| USDC settlement | UNVERIFIED on Portaldot |
| DaaS callable API | UNVERIFIED |
| EVM endpoint | Documented by the hackathon organizer and read-only chain ID verified; contract deployment unverified |

## Run locally

Serve `dist/` with any static web server, or open `dist/index.html` in a modern browser.

```bash
npm test
npm run check:rpc
```

The RPC check is read-only. It does not use a wallet, secret key, or funds. A successful RPC read proves connectivity and returned chain metadata only; it does not prove a transaction, contract execution, or USDC support.

## Repository map

- `dist/` — deployable static simulator.
- `tests/` — deterministic outcome tests.
- `scripts/rpc-smoke.mjs` — read-only Portaldot RPC evidence collector.
- `contracts/trustfall/` — ink! compatibility candidate.
- `docs/ARCHITECTURE.md` — architecture diagram and trust boundaries.
- `docs/RESEARCH.md` — official-source compatibility matrix.
- `docs/EVIDENCE.md` — evidence register and claim vocabulary.
- `docs/INTERIM_SUBMISSION.md` — copy-ready English interim submission.
- `docs/DEMO_GUIDE.md` — short walkthrough with expected balances.
- `docs/SUBMISSION_CHECKLIST.md` — interim handoff and remaining checks.
- `docs/DEVLOG.md` — dated development record and next proof steps.

## Safety

This prototype intentionally has no wallet connection and accepts no secrets. Never paste a seed phrase or private key into this project. No real-fund transaction is required for the demo.

## Official references

- Portaldot website: https://www.portaldot.world/
- Developer docs: https://portaldot-dev.readthedocs.io/en/latest/
- Chain info: https://portaldot-dev.readthedocs.io/en/latest/chain-info.html
- ink! interfacing: https://portaldot-dev.readthedocs.io/en/latest/python-sdk/usage/ink-contract-interfacing.html
- Official GitHub linked by Portaldot: https://github.com/portaldotVolunteer/Portaldot


