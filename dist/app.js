import { CONTRACT_AMOUNT, scenarios, resolveScenario, totalBalance } from "./simulator.js";

const scenarioButtons = [...document.querySelectorAll("[data-scenario]")];
const resolutionPanel = document.querySelector("#resolution-panel");
const timeline = document.querySelector("#timeline");
const outcome = document.querySelector("#outcome");
const outcomeLabel = document.querySelector("#outcome-label");
const outcomeHeadline = document.querySelector("#outcome-headline");
const communityAmount = document.querySelector("#community-amount");
const freelancerAmount = document.querySelector("#freelancer-amount");
const heldAmount = document.querySelector("#held-amount");
const conservation = document.querySelector("#conservation");
const replayButton = document.querySelector("#replay");
let activeScenario = "success";
let activeResolution = "hold";

function money(value) {
  return `${value.toLocaleString("en-US")} USDC`;
}

function render() {
  const state = resolveScenario(activeScenario, activeResolution);
  scenarioButtons.forEach((button) => {
    const selected = button.dataset.scenario === activeScenario;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  resolutionPanel.hidden = activeScenario !== "dispute";
  document.querySelectorAll("[data-resolution]").forEach((button) => {
    button.classList.toggle("active", button.dataset.resolution === activeResolution);
  });

  outcome.dataset.tone = state.tone;
  outcomeLabel.textContent = state.outcome;
  outcomeHeadline.textContent = state.headline;
  communityAmount.textContent = money(state.balances.community);
  freelancerAmount.textContent = money(state.balances.freelancer);
  heldAmount.textContent = money(state.balances.held);
  conservation.textContent = totalBalance(state.balances) === CONTRACT_AMOUNT
    ? "✓ Funds conserved: 500 USDC"
    : "Balance mismatch";

  timeline.replaceChildren(...state.steps.map(([title, detail], index) => {
    const item = document.createElement("li");
    item.style.setProperty("--delay", `${index * 90}ms`);
    item.innerHTML = `<span class="step-index">${String(index + 1).padStart(2, "0")}</span><div><strong>${title}</strong><p>${detail}</p></div>`;
    return item;
  }));
}

scenarioButtons.forEach((button) => button.addEventListener("click", () => {
  activeScenario = button.dataset.scenario;
  activeResolution = "hold";
  render();
}));

document.querySelectorAll("[data-resolution]").forEach((button) => button.addEventListener("click", () => {
  activeResolution = button.dataset.resolution;
  render();
}));

replayButton.addEventListener("click", () => {
  timeline.classList.remove("animate");
  requestAnimationFrame(() => timeline.classList.add("animate"));
});

render();

