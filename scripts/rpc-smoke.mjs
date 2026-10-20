import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const endpoint = process.env.PORTALDOT_RPC || "wss://mainnet.portaldot.io";
const evidencePath = resolve(dirname(fileURLToPath(import.meta.url)), "../evidence/portaldot-rpc-read.json");

function rpc(ws, id, method, params = []) {
  return new Promise((resolveResult, reject) => {
    const timeout = setTimeout(() => reject(new Error(`${method} timed out`)), 15000);
    const listener = (event) => {
      const message = JSON.parse(event.data.toString());
      if (message.id !== id) return;
      clearTimeout(timeout);
      ws.removeEventListener("message", listener);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolveResult(message.result);
    };
    ws.addEventListener("message", listener);
    ws.send(JSON.stringify({ jsonrpc: "2.0", id, method, params }));
  });
}

const ws = new WebSocket(endpoint);
await new Promise((resolveOpen, reject) => {
  const timeout = setTimeout(() => reject(new Error("WebSocket connection timed out")), 15000);
  ws.addEventListener("open", () => { clearTimeout(timeout); resolveOpen(); }, { once: true });
  ws.addEventListener("error", () => { clearTimeout(timeout); reject(new Error("WebSocket connection failed")); }, { once: true });
});

const [chain, name, version, properties, header, runtimeVersion] = await Promise.all([
  rpc(ws, 1, "system_chain"),
  rpc(ws, 2, "system_name"),
  rpc(ws, 3, "system_version"),
  rpc(ws, 4, "system_properties"),
  rpc(ws, 5, "chain_getHeader"),
  rpc(ws, 6, "state_getRuntimeVersion"),
]);
ws.close();

const evidence = {
  status: "RPC READ VERIFIED",
  scope: "Read-only RPC connectivity and metadata; no transaction was signed or submitted.",
  checkedAt: new Date().toISOString(),
  endpoint,
  chain,
  node: { name, version },
  properties,
  latestHeader: header,
  runtimeVersion,
};
await mkdir(dirname(evidencePath), { recursive: true });
await writeFile(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
console.log(JSON.stringify(evidence, null, 2));

