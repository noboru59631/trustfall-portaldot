import { mkdir, readFile, writeFile } from "node:fs/promises";
import { ContractFactory, Interface, formatEther } from "ethers";

const RPC_URL = process.env.PORTALDOT_V3_RPC || "https://test-evm-rpc-v3.portaldot.dev/";
const CONTRACT = "0xcabcEbe5C50880751Dd990e776828CFac6cF393E";
const DEPLOY_TX = "0x8406518fbbba0fdeae2102e113d8e4894a56d3b7855adba30c40f662d473ca6a";
const STATE_NAMES = ["Funded", "Delivered", "Disputed", "Paid", "Refunded", "Split"];
const root = new URL("../", import.meta.url);
const abi = JSON.parse(await readFile(new URL("artifacts/evm/TrustFall.abi.json", root), "utf8"));
const bytecode = `0x${(await readFile(new URL("artifacts/evm/TrustFall.bin", root), "utf8")).trim()}`;
const iface = new Interface(abi);
let requestId = 0;

async function rpc(method, params = []) {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++requestId, method, params }),
  });
  const payload = await response.json();
  if (payload.error) throw new Error(`${method}: ${payload.error.message}`);
  return payload.result;
}

async function call(name) {
  const raw = await rpc("eth_call", [{ to: CONTRACT, data: iface.encodeFunctionData(name) }, "latest"]);
  return iface.decodeFunctionResult(name, raw)[0];
}

const [clientVersion, chainIdHex, latestBlockNumberHex, receipt, transaction, code] = await Promise.all([
  rpc("web3_clientVersion"),
  rpc("eth_chainId"),
  rpc("eth_blockNumber"),
  rpc("eth_getTransactionReceipt", [DEPLOY_TX]),
  rpc("eth_getTransactionByHash", [DEPLOY_TX]),
  rpc("eth_getCode", [CONTRACT, "latest"]),
]);

if (!receipt || !transaction) throw new Error("Deployment transaction or receipt is unavailable");
const [client, freelancer, arbiter, amount, refundAfter, state, latestBlock] = await Promise.all([
  call("client"),
  call("freelancer"),
  call("arbiter"),
  call("amount"),
  call("refundAfter"),
  call("state"),
  rpc("eth_getBlockByNumber", ["latest", false]),
]);
const addresses = [client, freelancer, arbiter, CONTRACT];
const accounts = await Promise.all(addresses.map(async (address) => {
  const [balanceHex, nonceHex] = await Promise.all([
    rpc("eth_getBalance", [address, "latest"]),
    rpc("eth_getTransactionCount", [address, "latest"]),
  ]);
  return {
    address,
    balanceWei: BigInt(balanceHex).toString(),
    balanceTPOT: formatEther(balanceHex),
    nonce: Number(BigInt(nonceHex)),
  };
}));

const factory = new ContractFactory(abi, bytecode);
const expectedDeploy = await factory.getDeployTransaction(freelancer, arbiter, refundAfter, { value: amount });
const deployFeeWei = BigInt(receipt.gasUsed) * BigInt(receipt.effectiveGasPrice);
const latestTimestamp = Number(BigInt(latestBlock.timestamp));
const deadlineTimestamp = Number(refundAfter);
const record = {
  schemaVersion: 1,
  capturedAt: new Date().toISOString(),
  network: {
    name: "Portaldot V3 Testnet",
    rpcUrl: RPC_URL,
    clientVersion,
    chainId: Number(BigInt(chainIdHex)),
    latestBlock: Number(BigInt(latestBlockNumberHex)),
    latestTimestamp,
    latestTimestampIso: new Date(latestTimestamp * 1000).toISOString(),
  },
  deployment: {
    transactionHash: DEPLOY_TX,
    blockNumber: Number(BigInt(receipt.blockNumber)),
    receiptStatus: Number(BigInt(receipt.status)),
    contractAddress: receipt.contractAddress,
    sender: transaction.from,
    nonce: Number(BigInt(transaction.nonce)),
    valueWei: BigInt(transaction.value).toString(),
    valueTPOT: formatEther(transaction.value),
    gasUsed: BigInt(receipt.gasUsed).toString(),
    effectiveGasPriceWei: BigInt(receipt.effectiveGasPrice).toString(),
    feeWei: deployFeeWei.toString(),
    feeTPOT: formatEther(deployFeeWei),
    sourceCreationDataMatchesTransaction: expectedDeploy.data.toLowerCase() === transaction.input.toLowerCase(),
  },
  contract: {
    address: CONTRACT,
    codePresent: code !== "0x",
    codeBytes: (code.length - 2) / 2,
    client,
    freelancer,
    arbiter,
    amountWei: amount.toString(),
    amountTPOT: formatEther(amount),
    refundAfter: deadlineTimestamp,
    refundAfterIso: new Date(deadlineTimestamp * 1000).toISOString(),
    refundAvailableAtCapture: latestTimestamp >= deadlineTimestamp,
    state: Number(state),
    stateName: STATE_NAMES[Number(state)],
    balanceWei: accounts.find(({ address }) => address.toLowerCase() === CONTRACT.toLowerCase()).balanceWei,
    balanceTPOT: accounts.find(({ address }) => address.toLowerCase() === CONTRACT.toLowerCase()).balanceTPOT,
  },
  accounts,
  evidenceStatus: {
    deployment: "V3 LIVE",
    funding: "V3 LIVE (constructor value)",
    payment: "NOT EXECUTED",
    refund: "NOT EXECUTED",
    dispute: "NOT EXECUTED",
  },
};

await mkdir(new URL("evidence/", root), { recursive: true });
const outputUrl = new URL("evidence/portaldot-v3-live-read.json", root);
await writeFile(outputUrl, `${JSON.stringify(record, null, 2)}\n`);
console.log(JSON.stringify({
  chainId: record.network.chainId,
  receiptStatus: record.deployment.receiptStatus,
  sourceCreationDataMatchesTransaction: record.deployment.sourceCreationDataMatchesTransaction,
  codeBytes: record.contract.codeBytes,
  state: `${record.contract.state} (${record.contract.stateName})`,
  contractBalanceTPOT: record.contract.balanceTPOT,
  refundAfterIso: record.contract.refundAfterIso,
  output: outputUrl.pathname,
}, null, 2));
