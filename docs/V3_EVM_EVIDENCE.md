# Portaldot V3 EVM Evidence

## Claim status

- **LOCAL EVM VERIFIED**: compiled and executed locally against an EVM with chain ID `420420777`.
- **V3 LIVE**: reserved for transactions confirmed by the Portaldot V3 RPC.
- No item below is marked V3 LIVE yet.

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

## Required before V3 LIVE

- Confirm MetaMask is on RPC `https://test-evm-rpc-v3.portaldot.dev/`, chain ID `420420777`.
- Record the deployer, freelancer, and arbiter addresses.
- Record the deployment transaction hash and contract address.
- Query the contract bytecode and immutable role/value fields through the V3 RPC.
- Execute and record separate success, timeout-refund, and dispute-resolution agreements.
- Publish transaction receipts and final balances.

| Evidence | Status |
| --- | --- |
| Solidity 0.8.30 compilation | LOCAL EVM VERIFIED |
| 5 settlement/safety tests | LOCAL EVM VERIFIED |
| V3 deployment transaction | NOT EXECUTED |
| V3 contract address | NOT AVAILABLE |
| V3 payment/refund/dispute transactions | NOT EXECUTED |
