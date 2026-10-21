# TrustFall — Interim Submission

Public repository: https://github.com/noboru59631/trustfall-portaldot

Live demo: https://trustfall-portaldot-2026.crypto5555111.chatgpt.site/

Demo video (48 seconds, simulated UI walkthrough): https://raw.githubusercontent.com/noboru59631/trustfall-portaldot/main/demo/trustfall-demo-40s.mp4

Interim pitch deck: https://github.com/noboru59631/trustfall-portaldot/blob/main/docs/PITCH_DECK.md

## One-line pitch

TrustFall lets a Web3 community and a freelancer rehearse every money outcome of a 500 USDC creative contract before either side signs.

## Problem

Small Web3 teams often jump from a chat agreement straight to a payment transaction. The happy path is obvious; the difficult paths are not. Delivery delays, non-delivery, and subjective quality disputes create confusion exactly when trust is lowest.

## Solution

TrustFall is a pre-contract outcome simulator. Before funding, both parties can inspect four explicit scenarios—success, delivery delay, non-delivery, and quality dispute—and see whether 500 USDC is paid, refunded, or held. The prototype makes state transitions and fund conservation visible rather than hiding them behind legal or blockchain terminology.

## Portaldot relevance

The proposed settlement layer would implement the simulator's state machine in an ink! escrow contract, subject to Portaldot runtime and asset compatibility. The current contract source is only a partial candidate. Portaldot's developer materials document its mainnet WebSocket endpoint, POT token metadata, and ink! interaction. The hackathon organizer also lists a V3 testnet and EVM RPC endpoint; a read-only `eth_chainId` returned the published chain ID 420420777. This is connectivity evidence, not a deployed contract. TrustFall aligns conceptually with Portaldot's DaaS narrative; a callable DaaS API remains unverified.

## What works now

- Responsive public simulator with four contract outcomes.
- Explicit DEMO, SIMULATED, RPC READ VERIFIED, and UNVERIFIED labels.
- Tested conservation of the full 500 USDC principal across every outcome.
- A refreshed read-only Portaldot mainnet RPC response and a repeatable script requiring no key or funds.
- Reviewable, unbuilt ink! escrow candidate and architecture documentation.

## What is not claimed

- No deployed escrow contract.
- No real or test USDC transfer.
- No EVM contract deployment or public DaaS API integration.
- No proof that the ink! candidate compiles or covers the simulator's delay, split, and dispute-resolution paths.
- No wallet connection, secret key, or real funds.

## Outstanding items for check-in

The project has no Portaldot testnet contract address, transaction hash, or explorer link. The ink! candidate needs full state transitions, local build and tests, a verified asset route, and a safe testnet deployment. We provide the live simulator and read-only RPC evidence now, and identify deployment as the next proof milestone rather than presenting metadata reads as contract activity.

## Form-ready check-in answers

**Project name:** TrustFall

**One-sentence overview:** TrustFall helps a Web3 community and a freelancer preview payment, refund, hold, and split outcomes for a 500 USDC design agreement before signing.

**Current project progress:** We published a responsive English simulator covering success, delay, non-delivery, and quality dispute, including four dispute resolutions. Eight deterministic tests pass, including conservation of the 500 USDC example balance. The public repository contains the README, source, architecture, development record, research, and read-only RPC evidence. A refreshed mainnet metadata read returned Portaldot chain identity and runtime information; a separate read-only call to the organizer-published V3 testnet EVM endpoint returned chain ID 420420777. Neither call executed a contract or moved tokens.

**Outstanding items:** Complete and build the escrow contract, implement timeout and mediated split rules, establish a safe testnet asset route, deploy to the V3 testnet, and capture contract address and transaction hashes. The current demo is simulated and uses no wallet or funds. A short video walkthrough and interim pitch deck are public; neither is evidence of on-chain execution.

**Testnet deployment details:** No contract has been deployed. No contract address, transaction hash, or explorer link is available. Read-only RPC evidence is provided separately and must not be presented as deployment evidence.

## Demo flow

1. Start with the 500 USDC design agreement preview.
2. Run Success and show the full freelancer payment.
3. Run Non-delivery and show the full community refund.
4. Run Quality dispute and show the full amount held.
5. Try a negotiated split and show that the ledger still totals 500 USDC.
6. Finish on the evidence section and explain the status labels.

## Next proof milestone

Confirm an official funded test environment and exact contracts-pallet/ink! artifact compatibility, then deploy the smallest payable escrow, capture contract address, extrinsic hashes, events, block hashes, and reproduce payment/refund paths without real funds.


