# TrustFall Demo Guide

Public demo: https://trustfall-portaldot-2026.crypto5555111.chatgpt.site/

English-narrated 48-second video: https://raw.githubusercontent.com/noboru59631/trustfall-portaldot/main/demo/trustfall-demo-narrated.mp4

The narration describes simulated UI states. It does not claim that USDC moved or a contract executed on Portaldot.

Suggested walkthrough (about two minutes):

1. Open the English demo on desktop or mobile. Point to the **SIMULATED** agreement preview and the 500 USDC example amount. No wallet is connected.
2. Select **Success**: community refund 0, freelancer payment 500, held 0.
3. Select **Delay**: the timeline shows a missed deadline, revised time, and approved late delivery; the final payment is 500.
4. Select **Non-delivery**: community refund 500, freelancer payment 0, held 0.
5. Select **Quality dispute**: show `Disputed` as an intermediate hold state with 500 held. Explain that only the Arbiter may then choose **Pay 500**, **Refund 500**, or **Split 350 / 150**. Each simulated ledger totals 500.
6. Scroll to **Portaldot V3 Testnet** and show the two V3 LIVE terminal agreements: `Refunded (4)` and `Split (5)`.
7. Point out the exact refund, dispute, and resolution transaction hashes, the 70/30 distribution, and the zero final balance in both contracts.
8. Open either evidence JSON link, then use **Refresh read-only proof** to re-read both terminal states through the public RPC.
9. State the boundary: native testnet tPOT was verified for these two flows; the 500 USDC lab remains **SIMULATED**, and Mainnet, USDC, every dispute outcome, audit status, and callable DaaS integration are not claimed.

The live demo has evidence and repository links but no wallet prompt or transaction action. Its main link jumps to the read-only live proof.

