const RPC_URL = "https://test-evm-rpc-v3.portaldot.dev/";
const CHAIN_ID = 420420777;
const STATE_NAMES = ["Funded", "Delivered", "Disputed", "Paid", "Refunded", "Split"];
const STATE_SELECTOR = "0xc19d93fb";
const PROOFS = [
  {
    address: "0xcabcEbe5C50880751Dd990e776828CFac6cF393E",
    expectedState: 4,
    stateOutput: document.querySelector("#refund-live-state"),
    balanceOutput: document.querySelector("#refund-live-balance"),
    statusOutput: document.querySelector("#refund-rpc-status"),
  },
  {
    address: "0x9ACdc6a7110f722f85b660cdB495B553F5A1Ba68",
    expectedState: 5,
    stateOutput: document.querySelector("#split-live-state"),
    balanceOutput: document.querySelector("#split-live-balance"),
    statusOutput: document.querySelector("#split-rpc-status"),
  },
];

const refreshButton = document.querySelector("#refresh-chain");
const readout = document.querySelector("#rpc-readout");
let requestId = 0;

async function rpc(method, params = []) {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++requestId, method, params }),
  });
  if (!response.ok) throw new Error(`RPC HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.error) throw new Error(payload.error.message);
  return payload.result;
}

function formatTPOT(value) {
  const whole = value / 10n ** 18n;
  const fraction = (value % 10n ** 18n).toString().padStart(18, "0").replace(/0+$/, "");
  return `${whole}${fraction ? `.${fraction}` : ""} tPOT`;
}

async function readProof(proof) {
  const [stateHex, balanceHex] = await Promise.all([
    rpc("eth_call", [{ to: proof.address, data: STATE_SELECTOR }, "latest"]),
    rpc("eth_getBalance", [proof.address, "latest"]),
  ]);
  const state = Number(BigInt(stateHex));
  const balance = BigInt(balanceHex);
  const matches = state === proof.expectedState && balance === 0n;
  proof.stateOutput.textContent = `${STATE_NAMES[state] ?? "Unknown"} (${state})`;
  proof.balanceOutput.textContent = formatTPOT(balance);
  proof.statusOutput.textContent = matches ? "V3 LIVE" : "CHECK RESULT";
  proof.statusOutput.className = `chip ${matches ? "live" : "demo"}`;
  return matches;
}

async function refresh() {
  refreshButton.disabled = true;
  readout.textContent = "Reading chain ID and both terminal contracts through the public RPC…";
  for (const proof of PROOFS) {
    proof.statusOutput.textContent = "READING";
    proof.statusOutput.className = "chip verified";
  }
  try {
    const chainId = Number(BigInt(await rpc("eth_chainId")));
    if (chainId !== CHAIN_ID) throw new Error(`unexpected chain ID ${chainId}`);
    const results = await Promise.all(PROOFS.map(readProof));
    readout.textContent = results.every(Boolean)
      ? `Public RPC verified chain ${chainId}: Refunded (4), Split (5), and 0 tPOT remaining in both escrows.`
      : "The public RPC returned a state that differs from the captured terminal evidence. Review the displayed values.";
  } catch (error) {
    for (const proof of PROOFS) {
      proof.statusOutput.textContent = "SAVED PROOF";
      proof.statusOutput.className = "chip verified";
    }
    readout.textContent = `Live RPC refresh unavailable (${error.message}). The linked receipt evidence remains available for review.`;
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", refresh);
refresh();
