# Development Record

## 20–21 October 2026 JST

- Built and published the browser-local 500 USDC outcome simulator with success, delay, non-delivery, and quality-dispute paths.
- Added deterministic tests for fund conservation and payment, refund, hold, and split outcomes.
- Captured and rechecked a read-only Portaldot mainnet metadata response without a key, wallet, or funds.
- Prepared a partial ink! escrow source candidate and documented its missing transitions and lack of build or deployment proof.
- Reviewed the organizer's V3 testnet announcement and captured a read-only EVM `eth_chainId` response of 420420777.
- Revised public wording to separate RPC reads, simulated balances, and unexecuted contract source.

Next: obtain a safe funded test environment and implement, build, and test the complete contract state machine. Any deployment evidence must include an address and transaction hash. No such deployment has occurred yet.

## 2026-11-02 — V3 live proof resumed

- Independently re-read chain ID 420420777, deployment receipt status 1, runtime code, ABI getters, roles, deadline, balances, and nonces through the V3 RPC.
- Verified that the deployment creation data exactly matches `TrustFall.sol` compiled with Solidity 0.8.30, Paris, optimizer runs 1, viaIR, and omitted CBOR metadata.
- Confirmed that 1 tPOT was funded in the constructor and remains held in `Funded (0)`. No second deposit is required or allowed.
- Updated the demo so `Disputed (2)` is shown as an intermediate hold state and Arbiter-only resolution, matching the deployed contract.
- Added a MetaMask-gated refund UI that sends zero value, checks chain/role/state/deadline, estimates gas, waits for the receipt, and exports evidence. No settlement transaction has been signed yet.

## 2026-11-04 — Terminal E2E evidence published

- Verified the captured refund evidence: `Refunded (4)`, 1 tPOT returned, contract balance 0, receipt status 1.
- Verified the captured dispute and resolution evidence: `Disputed (2)` with 0.001 tPOT retained, then `Split (5)` with a 0.0007 / 0.0003 tPOT distribution and contract balance 0.
- Replaced transaction controls in the public demo with a read-only proof panel so successful transactions cannot be replayed from the site.
- Kept every 500 USDC scenario labelled SIMULATED and documented the unverified scope.
