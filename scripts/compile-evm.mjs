import { readFile, mkdir, writeFile } from "node:fs/promises";
import solc from "solc";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("contracts/evm/TrustFall.sol", root), "utf8");
const input = {
  language: "Solidity",
  sources: { "TrustFall.sol": { content: source } },
  settings: {
    evmVersion: "paris",
    // Match the size-optimized settings used for the V3 deployment.
    optimizer: { enabled: true, runs: 1 },
    viaIR: true,
    metadata: { appendCBOR: false, bytecodeHash: "none" },
    outputSelection: { "*": { "*": ["abi", "evm.bytecode.object"] } }
  }
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const errors = (output.errors ?? []).filter((item) => item.severity === "error");
if (errors.length) throw new Error(errors.map((item) => item.formattedMessage).join("\n"));
const artifact = output.contracts["TrustFall.sol"].TrustFall;
await mkdir(new URL("artifacts/evm/", root), { recursive: true });
await writeFile(new URL("artifacts/evm/TrustFall.abi.json", root), JSON.stringify(artifact.abi, null, 2));
await writeFile(new URL("artifacts/evm/TrustFall.bin", root), artifact.evm.bytecode.object);
console.log(`solc ${solc.version()} · evm paris · bytecode ${artifact.evm.bytecode.object.length} hex chars`);
