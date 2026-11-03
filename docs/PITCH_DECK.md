# TrustFall | Portaldot Hacker House 2026

Interim pitch deck. Status: browser simulation, not an on-chain escrow.

## 1. The problem

A Web3 community hiring a freelance designer can agree on scope and price while leaving the difficult outcomes vague. A late delivery, no delivery, or a quality dispute can turn a 500 USDC job into a conflict over who controls the money.

## 2. The product

TrustFall lets both sides preview the agreement before signing. The [live demo](https://trustfall-portaldot-2026.crypto5555111.chatgpt.site/) shows success, delay, non-delivery, and quality dispute. A dispute can remain held or resolve through full payment, full refund, or a 350/150 split. Every displayed ledger conserves the example 500 USDC.

## 3. Proof today

- Responsive English prototype published and tested across desktop and mobile.
- Eight deterministic tests pass, including 500 USDC conservation.
- Public [source and evidence](https://github.com/noboru59631/trustfall-portaldot) include the README, development log, architecture, and read-only RPC responses.
- Portaldot V3 Testnet chain ID 420420777 now has two verified terminal agreements: a 1 tPOT deadline refund and a disputed 0.001 tPOT 70/30 split, both ending with zero contract balance.

## 4. Why Portaldot

The proposed next layer is a Portaldot testnet escrow that enforces the same explicit state machine. The current ink! source is a partial, unbuilt candidate. Portaldot's documented Substrate and contracts interfaces make it a research target, and the organizer has published a V3 testnet EVM endpoint. Asset compatibility, contract deployment, and a callable DaaS integration remain unverified.

## 5. Next milestone and support

Extend verification beyond the two proven terminal paths, complete an independent security review, and investigate an official testnet asset route before any USDC or Mainnet claim. A callable DaaS integration also needs separate implementation evidence.

**Evidence boundary:** The 500 USDC balance remains simulated. The V3 LIVE panel is separate and proves only the published native-tPOT refund and one disputed split. It is not Mainnet, USDC, a security audit, or complete branch coverage.

