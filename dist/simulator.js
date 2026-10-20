export const CONTRACT_AMOUNT = 500;

export const scenarios = {
  success: {
    name: "Success",
    headline: "Approved delivery pays the freelancer",
    outcome: "PAYMENT",
    tone: "success",
    balances: { community: 0, freelancer: 500, held: 0 },
    steps: [
      ["Agreement created", "Scope, deadline and acceptance rules are locked."],
      ["500 USDC funded", "Funds move into the simulated escrow."],
      ["Design delivered", "The freelancer submits the final design package."],
      ["Community approves", "Acceptance releases the full payment."],
    ],
  },
  delay: {
    name: "Delivery delay",
    headline: "A grace period keeps funds protected",
    outcome: "PAYMENT AFTER GRACE",
    tone: "warning",
    balances: { community: 0, freelancer: 500, held: 0 },
    steps: [
      ["Agreement created", "A deadline and a 48-hour grace period are recorded."],
      ["500 USDC funded", "Neither party can spend the held amount."],
      ["Deadline missed", "Payment remains locked; no automatic penalty is invented."],
      ["Revision accepted", "Both parties accept a new delivery time."],
      ["Late delivery approved", "The full 500 USDC is released."],
    ],
  },
  missing: {
    name: "Non-delivery",
    headline: "No delivery returns funds to the community",
    outcome: "REFUND",
    tone: "danger",
    balances: { community: 500, freelancer: 0, held: 0 },
    steps: [
      ["Agreement created", "Refund conditions are visible before funding."],
      ["500 USDC funded", "Funds are held while work is expected."],
      ["Deadline + grace expire", "No deliverable or extension is recorded."],
      ["Agreement cancelled", "The full amount returns to the community."],
    ],
  },
  dispute: {
    name: "Quality dispute",
    headline: "Disputed work stays held pending resolution",
    outcome: "HOLD",
    tone: "hold",
    balances: { community: 0, freelancer: 0, held: 500 },
    steps: [
      ["Agreement created", "Acceptance criteria and evidence rules are recorded."],
      ["500 USDC funded", "Funds enter escrow before work begins."],
      ["Design delivered", "The freelancer submits files and a delivery note."],
      ["Quality disputed", "Neither payment nor refund is automatic."],
      ["Resolution pending", "500 USDC remains held until both parties or a mediator decide."],
    ],
  },
};

export function resolveScenario(scenarioId, resolution = "hold") {
  const scenario = scenarios[scenarioId];
  if (!scenario) throw new Error(`Unknown scenario: ${scenarioId}`);
  if (scenarioId !== "dispute" || resolution === "hold") return structuredClone(scenario);

  const resolutions = {
    pay: {
      headline: "The dispute resolves with full payment",
      outcome: "PAYMENT",
      tone: "success",
      balances: { community: 0, freelancer: 500, held: 0 },
      finalStep: ["Resolution signed", "The mediator-approved outcome releases 500 USDC."],
    },
    refund: {
      headline: "The dispute resolves with a full refund",
      outcome: "REFUND",
      tone: "danger",
      balances: { community: 500, freelancer: 0, held: 0 },
      finalStep: ["Resolution signed", "The mediator-approved outcome refunds 500 USDC."],
    },
    split: {
      headline: "The dispute resolves with a negotiated split",
      outcome: "SPLIT",
      tone: "warning",
      balances: { community: 150, freelancer: 350, held: 0 },
      finalStep: ["Resolution signed", "350 USDC pays the freelancer and 150 USDC is refunded."],
    },
  };

  const selected = resolutions[resolution];
  if (!selected) throw new Error(`Unknown resolution: ${resolution}`);
  return {
    ...structuredClone(scenario),
    ...selected,
    steps: [...scenario.steps.slice(0, -1), selected.finalStep],
  };
}

export function totalBalance(balances) {
  return balances.community + balances.freelancer + balances.held;
}

