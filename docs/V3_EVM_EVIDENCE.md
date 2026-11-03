# Portaldot V3 EVM Evidence

## Claim status

- **LOCAL EVM VERIFIED**: compiled and executed locally against an EVM with chain ID `420420777`.
- **V3 LIVE**: transactions and state confirmed by the Portaldot V3 RPC.

## Contract

- Source: `contracts/evm/TrustFall.sol`
- Solidity: `0.8.30`
- EVM target: `paris` for conservative Revive/PolkaVM compatibility
- Asset: native testnet tPOT only; this is **not USDC**
- Roles: client, freelancer, independent arbiter
- Terminal states: `Paid`, `Refunded`, `Split`

## Local verification — 2026-11-01 JST

`npm run test:evm` passed 5/5:

1. Delivery approval releases the escrow once and blocks a second payment.
2. Non-delivery refund is blocked before the deadline and succeeds after it.
3. A quality dispute holds the full balance until the arbiter resolves a split.
4. Unauthorized delivery and dispute resolution are rejected.
5. Unexpected direct funding is rejected.

The build uses checks-effects-interactions plus a reentrancy guard. Settlement changes the state before external transfers.

## V3 live deployment and funding — verified 2026-11-02 JST

- Contract: `0xcabcEbe5C50880751Dd990e776828CFac6cF393E`
- Deploy transaction: `0x8406518fbbba0fdeae2102e113d8e4894a56d3b7855adba30c40f662d473ca6a`
- Receipt: status `1`, block `292360`
- Constructor value / current held balance: `1 tPOT`
- State: `Funded (0)`
- Client: `0x9E8F0653354873883FB26E76f1925d36946c8777`
- Freelancer: `0xe6ae12Ce008B6b75aA806852FB4b0A99fc853C68`
- Arbiter: `0x6434860ca1DEE25Da47aBB5F026efaBd9b59702e`
- Refund deadline: `2026-11-03T13:32:48Z` / `2026-11-03 22:32:48 JST`
- Deployment fee: `176.97161300804430773 tPOT`
- The on-chain deployment creation data exactly matches the current source and documented compiler settings.

Reproduce the read-only proof with `npm run build:evm && npm run verify:v3`. See `evidence/portaldot-v3-live-read.json`.

## V3 live settlement — verified 2026-11-03 to 2026-11-04 JST

### Deadline refund

- Contract: `0xcabcEbe5C50880751Dd990e776828CFac6cF393E`
- Transaction: `0xc837efb9566c9bd60c091e1a1373a7b0d6fce0ae74f41cb897e1f79f65c5acb7`
- Block: `307125`
- Receipt status: `1`
- Result: `Refunded (4)`, 1 tPOT returned to Client, contract balance 0

### Dispute and 70/30 resolution

- Contract: `0x9ACdc6a7110f722f85b660cdB495B553F5A1Ba68`
- Dispute transaction: `0xfbda236c4255b52221484c6da9e873eb93210945b7b62191fdef1b39fd63fcce`
- Dispute result: `Disputed (2)`, the full 0.001 tPOT retained
- Resolution transaction: `0xa7549a45985c2bba0a438381b2ed51c729f411574e073ac15c79e6997ccb1081`
- Resolution block: `311276`
- Receipt status: `1`
- Result: `Split (5)`, 0.0007 tPOT to Freelancer, 0.0003 tPOT to Client, contract balance 0

These separate agreements prove deadline refund and one disputed split. Payment, full-refund dispute resolution, other split ratios, Mainnet behavior, USDC settlement, audit status, and callable DaaS integration remain unverified.

| Evidence | Status |
| --- | --- |
| Solidity 0.8.30 compilation | LOCAL EVM VERIFIED |
| 5 settlement/safety tests | LOCAL EVM VERIFIED |
| V3 deployment transaction | V3 LIVE |
| V3 contract address and runtime code | V3 LIVE |
| V3 constructor funding (1 tPOT) | V3 LIVE |
| V3 deadline refund | V3 LIVE |
| V3 dispute hold | V3 LIVE |
| V3 70/30 disputed split | V3 LIVE |
