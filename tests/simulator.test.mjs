import test from "node:test";
import assert from "node:assert/strict";
import { CONTRACT_AMOUNT, scenarios, resolveScenario, totalBalance } from "../dist/simulator.js";

test("all base scenarios conserve the 500 USDC principal", () => {
  for (const scenario of Object.values(scenarios)) {
    assert.equal(totalBalance(scenario.balances), CONTRACT_AMOUNT);
  }
});

test("success pays the freelancer", () => {
  assert.deepEqual(resolveScenario("success").balances, { community: 0, freelancer: 500, held: 0 });
});

test("delay pays after the agreed grace period", () => {
  const result = resolveScenario("delay");
  assert.equal(result.outcome, "PAYMENT AFTER GRACE");
  assert.deepEqual(result.balances, { community: 0, freelancer: 500, held: 0 });
});

test("non-delivery refunds the community", () => {
  assert.deepEqual(resolveScenario("missing").balances, { community: 500, freelancer: 0, held: 0 });
});

test("quality dispute defaults to hold", () => {
  assert.deepEqual(resolveScenario("dispute").balances, { community: 0, freelancer: 0, held: 500 });
});

test("quality dispute can resolve to a negotiated split", () => {
  const result = resolveScenario("dispute", "split");
  assert.deepEqual(result.balances, { community: 150, freelancer: 350, held: 0 });
  assert.equal(totalBalance(result.balances), CONTRACT_AMOUNT);
});

test("quality dispute can resolve to payment or refund", () => {
  assert.deepEqual(resolveScenario("dispute", "pay").balances, { community: 0, freelancer: 500, held: 0 });
  assert.deepEqual(resolveScenario("dispute", "refund").balances, { community: 500, freelancer: 0, held: 0 });
});

test("unknown scenarios and resolutions are rejected", () => {
  assert.throws(() => resolveScenario("lost"), /Unknown scenario/);
  assert.throws(() => resolveScenario("dispute", "burn"), /Unknown resolution/);
});

