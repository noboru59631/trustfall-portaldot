# TrustFall Architecture

```mermaid
flowchart LR
  U[Community + freelancer] --> UI[Agreement simulator]
  UI --> SM[Deterministic outcome state machine]
  SM -. design reference .-> C[ink! escrow candidate: partial]
  C -. unbuilt and not deployed .-> PC[pallet-contracts]
  PC --> P[Portaldot / Substrate]
  RPC[Historical read-only RPC response] --> P
  EVM[V3 testnet EVM chain ID read] --> P
  D[DaaS adapter placeholder] -. official callable API unverified .-> SM
```

## Boundary

- `dist/simulator.js` is the tested source of truth for the public simulator.
- The browser demo never requests a wallet, seed, private key, or real funds.
- `contracts/trustfall` is a partial compatibility candidate, not a complete implementation of the simulator. It has not been built, tested, or deployed in this review.
- `scripts/rpc-smoke.mjs` performs read-only JSON-RPC calls and saves evidence.
- A production design would add a verified stablecoin asset, contract events, wallet signing, mediator governance, timeout enforcement, and audited upgrade controls.

