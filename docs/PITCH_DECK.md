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
- The Portaldot V3 EVM endpoint returned chain ID 420420777 in a read-only call. No transaction or contract execution is claimed.

## 4. Why Portaldot

The proposed next layer is a Portaldot testnet escrow that enforces the same explicit state machine. The current ink! source is a partial, unbuilt candidate. Portaldot's documented Substrate and contracts interfaces make it a research target, and the organizer has published a V3 testnet EVM endpoint. Asset compatibility, contract deployment, and a callable DaaS integration remain unverified.

## 5. Next milestone and support

Complete and test the escrow transitions, verify an appropriate testnet asset route, deploy without real funds, then publish a contract address, transaction hashes, and event evidence. Technical review of Portaldot V3 contract compatibility and a funded test environment would help turn the simulation into verifiable settlement.

**Evidence boundary:** The current 500 USDC balance is simulated. No wallet is connected, no token moved, and no contract has been deployed or executed.

