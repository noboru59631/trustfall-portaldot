import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ganache from "ganache";
import { BrowserProvider, ContractFactory } from "ethers";

const abi = JSON.parse(await readFile(new URL("../artifacts/evm/TrustFall.abi.json", import.meta.url), "utf8"));
const bytecode = `0x${await readFile(new URL("../artifacts/evm/TrustFall.bin", import.meta.url), "utf8")}`;

async function fixture() {
  const eip1193 = ganache.provider({ logging: { quiet: true }, chain: { chainId: 420420777 } });
  const provider = new BrowserProvider(eip1193);
  const client = await provider.getSigner(0);
  const freelancer = await provider.getSigner(1);
  const arbiter = await provider.getSigner(2);
  const outsider = await provider.getSigner(3);
  const latest = await provider.getBlock("latest");
  const balance = async (address) => BigInt(await eip1193.request({
    method: "eth_getBalance",
    params: [address, "latest"]
  }));

  async function deploy(refundDelay = 3600n, value = 1_000_000n) {
    const factory = new ContractFactory(abi, bytecode, client);
    const contract = await factory.deploy(
      await freelancer.getAddress(),
      await arbiter.getAddress(),
      BigInt(latest.timestamp) + refundDelay,
      { value }
    );
    await contract.waitForDeployment();
    return contract;
  }

  return { eip1193, provider, client, freelancer, arbiter, outsider, balance, deploy };
}

async function rejects(action) {
  await assert.rejects(async () => {
    const result = await action();
    if (result?.wait) await result.wait();
  });
}

test("delivery approval pays once and conserves funds", async () => {
  const { client, freelancer, balance, deploy } = await fixture();
  const contract = await deploy();
  const address = await contract.getAddress();
  await (await contract.connect(freelancer).markDelivered()).wait();
  const before = await balance(await freelancer.getAddress());
  await (await contract.connect(client).approve()).wait();
  const after = await balance(await freelancer.getAddress());
  assert.equal(await contract.state(), 3n);
  assert.equal(await balance(address), 0n);
  assert.equal(after - before, 1_000_000n);
  await rejects(() => contract.connect(client).approve());
});

test("non-delivery refund is blocked early and succeeds after deadline", async () => {
  const { eip1193, client, balance, deploy } = await fixture();
  const contract = await deploy(60n);
  await rejects(() => contract.connect(client).claimRefundAfterDeadline());
  await eip1193.request({ method: "evm_increaseTime", params: [61] });
  await eip1193.request({ method: "evm_mine", params: [] });
  const currentBlock = await eip1193.request({ method: "eth_getBlockByNumber", params: ["latest", false] });
  assert.ok(BigInt(currentBlock.timestamp) >= await contract.refundAfter());
  await (await contract.connect(client).claimRefundAfterDeadline({ gasLimit: 200_000n })).wait();
  assert.equal(await contract.state(), 4n);
  assert.equal(await balance(await contract.getAddress()), 0n);
  await rejects(() => contract.connect(client).claimRefundAfterDeadline());
});

test("quality dispute holds funds until arbiter resolves a split", async () => {
  const { client, freelancer, arbiter, balance, deploy } = await fixture();
  const contract = await deploy();
  const address = await contract.getAddress();
  await (await contract.connect(freelancer).markDelivered()).wait();
  await (await contract.connect(client).openDispute()).wait();
  assert.equal(await contract.state(), 2n);
  assert.equal(await balance(address), 1_000_000n);
  const freelancerBefore = await balance(await freelancer.getAddress());
  const clientBefore = await balance(await client.getAddress());
  await (await contract.connect(arbiter).resolveDispute(700_000n)).wait();
  assert.equal(await contract.state(), 5n);
  assert.equal(await balance(address), 0n);
  assert.equal((await balance(await freelancer.getAddress())) - freelancerBefore, 700_000n);
  assert.equal((await balance(await client.getAddress())) - clientBefore, 300_000n);
});

test("role checks reject unauthorized delivery and dispute resolution", async () => {
  const { client, freelancer, outsider, deploy } = await fixture();
  const contract = await deploy();
  await rejects(() => contract.connect(outsider).markDelivered());
  await (await contract.connect(freelancer).markDelivered()).wait();
  await (await contract.connect(client).openDispute()).wait();
  await rejects(() => contract.connect(client).resolveDispute(1n));
  await rejects(() => contract.connect(outsider).resolveDispute(1n));
});

test("unexpected direct funding is rejected", async () => {
  const { client, deploy } = await fixture();
  const contract = await deploy();
  const address = await contract.getAddress();
  await rejects(() => client.sendTransaction({ to: address, value: 1n }));
});

