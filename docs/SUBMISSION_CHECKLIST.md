# Interim Submission Checklist

Target: **24 October 2026, 21:00 JST**. Confirm the actual DoraHacks form and deadline before submitting.

The [organizer's event page](https://dorahacks.io/hackathon/portaldot-hacker-house-2026/detail) lists the check-in deadline as 24 October, 12:00 UTC (21:00 JST), and the final deadline as 6 November, 04:00 UTC (13:00 JST). It requests progress, outstanding items, a public repository with README, development record and architecture, testnet deployment information, and a live demo link or short video for check-in.

- [x] English pitch, problem, solution, Portaldot relevance, limits, and next proof milestone: `docs/INTERIM_SUBMISSION.md`.
- [x] Public demo URL and walkthrough: `docs/DEMO_GUIDE.md`.
- [x] Architecture diagram and trust boundaries: `docs/ARCHITECTURE.md`.
- [x] Deterministic outcome tests: eight passing on 21 October 2026.
- [x] Historical read-only Portaldot RPC response: `evidence/portaldot-rpc-read.json`.
- [x] Read-only V3 testnet EVM chain ID response: `evidence/portaldot-v3-evm-rpc-read.json`.
- [ ] Recheck RPC reachability from a network that permits WebSocket connections; record the new result without replacing historical evidence if it fails.
- [x] Verify the public [GitHub repository](https://github.com/noboru59631/trustfall-portaldot) contains the source, docs and evidence, and that no secrets or local hosting credentials were published.
- [ ] Document that testnet contract address and transaction hash are still unavailable; do not substitute RPC metadata for deployment evidence.
- [x] Preserve at least three genuine development commits during the event, as required by the event page.
- [x] Check the deployed demo at a 390px mobile viewport, including scenario navigation, dispute resolution, and no horizontal overflow. Recheck after the final footer link deploy.
- [ ] Open the DoraHacks interim form, confirm its fields and attachment rules, then paste the English submission and links.
- [ ] Get the user's confirmation immediately before actually submitting to DoraHacks.
- [ ] Save the submitted URL, timestamp, and receipt or screenshot after submission.

No contract deployment, Portaldot USDC transfer, callable DaaS API, or EVM contract integration is claimed.
