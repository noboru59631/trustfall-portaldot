# Interim Submission Checklist

Target: **24 October 2026, 21:00 JST**. Confirm the actual DoraHacks form and deadline before submitting.

The [organizer's event page](https://dorahacks.io/hackathon/portaldot-hacker-house-2026/detail) lists the check-in deadline as 24 October, 12:00 UTC (21:00 JST), and the final deadline as 6 November, 04:00 UTC (13:00 JST). Its check-in instructions allow a live demo link or short video. The current **Submit Build** form nevertheless marks a demo video link, pitch deck link, testnet deployment details, and several personal fields as required. Treat the form as a blocking requirement until the organizer clarifies any exceptions.

- [x] English pitch, problem, solution, Portaldot relevance, limits, and next proof milestone: `docs/INTERIM_SUBMISSION.md`.
- [x] Public demo URL and walkthrough: `docs/DEMO_GUIDE.md`.
- [x] Public 48-second simulated UI walkthrough: `demo/trustfall-demo-40s.mp4`.
- [x] Public interim pitch deck: `docs/PITCH_DECK.md`.
- [x] Architecture diagram and trust boundaries: `docs/ARCHITECTURE.md`.
- [x] Deterministic outcome tests: eight passing on 21 October 2026.
- [x] Refreshed read-only Portaldot mainnet RPC response: `evidence/portaldot-rpc-read.json`.
- [x] Read-only V3 testnet EVM chain ID response: `evidence/portaldot-v3-evm-rpc-read.json`.
- [x] Verify the public [GitHub repository](https://github.com/noboru59631/trustfall-portaldot) contains the source, docs and evidence, and that no secrets or local hosting credentials were published.
- [ ] Document that testnet contract address and transaction hash are still unavailable; do not substitute RPC metadata for deployment evidence.
- [ ] Obtain the user's Discord ID, SS58 testnet wallet address, skills, event source, and any optional Telegram ID. Never request or use a private key or seed phrase.
- [ ] Provide a public demo video under three minutes and a public pitch deck link, or obtain organizer confirmation that the live demo link is accepted in their place.
- [ ] Choose or create a DoraHacks Build and select a track. The form currently requires both before review.
- [x] Preserve at least three genuine development commits during the event, as required by the event page.
- [x] Check the deployed demo at a 390px mobile viewport, including scenario navigation, dispute resolution, and no horizontal overflow. Recheck after the final footer link deploy.
- [x] Inspect the current DoraHacks Submit Build form and its required fields without submitting.
- [ ] Enter the English check-in answers and public links after the missing fields are resolved.
- [ ] Get the user's confirmation immediately before actually submitting to DoraHacks.
- [ ] Save the submitted URL, timestamp, and receipt or screenshot after submission.

No contract deployment, Portaldot USDC transfer, callable DaaS API, or EVM contract integration is claimed.

