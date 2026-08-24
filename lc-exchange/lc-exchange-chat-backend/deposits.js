import express from "express";
import crypto from "node:crypto";

// ============================================================================
// Seguimiento de depósitos USDT (crear intento -> mostrar QR -> verificar en
// la blockchain real). Guardado en memoria: si el servidor se reinicia se
// pierden los depósitos pendientes. Para producción real, reemplazar el Map
// por una base de datos.
//
// ⚠️ SEGURIDAD: las direcciones de depósito y las API keys de los
// exploradores de blockchain deben configurarse por variable de entorno.
// Si una dirección no está configurada, esa red queda deshabilitada — NUNCA
// se muestra una dirección de ejemplo/inventada como si fuera real, porque
// un cliente podría enviar fondos ahí y perderlos.
// ============================================================================

const DEPOSIT_WINDOW_MINUTES = Number(process.env.DEPOSIT_WINDOW_MINUTES || 20);
const MIN_CONFIRMATIONS = {
  ERC20: Number(process.env.MIN_CONFIRMATIONS_ERC20 || 12),
  BEP20: Number(process.env.MIN_CONFIRMATIONS_BEP20 || 15),
  TRC20: Number(process.env.MIN_CONFIRMATIONS_TRC20 || 19),
};

// Contratos USDT bien conocidos en cada red. Verifica igual en el
// explorador oficial antes de usarlos en producción: si alguno estuviera
// mal, la verificación automática simplemente no encontrará el depósito
// (no hay riesgo de fondos, solo de que la confirmación automática falle).
const USDT_CONTRACTS = {
  ERC20: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  BEP20: "0x55d398326f99059fF775485246999027B3197955",
  TRC20: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
};

const NETWORKS = {
  TRC20: { depositAddress: process.env.DEPOSIT_ADDRESS_TRC20 || null },
  ERC20: { depositAddress: process.env.DEPOSIT_ADDRESS_ERC20 || null },
  BEP20: { depositAddress: process.env.DEPOSIT_ADDRESS_BEP20 || null },
};

const deposits = new Map(); // id -> { network, address, amount, createdAt, expiresAt, status, txHash }

function isNetworkConfigured(network) {
  return Boolean(NETWORKS[network] && NETWORKS[network].depositAddress);
}

// Genera un monto único (con centavos aleatorios) para poder identificar el
// depósito sin depender de un memo/tag, que USDT en ETH/BSC/TRON no tiene.
function buildUniqueAmount(baseAmount, network, address) {
  const pending = [...deposits.values()].filter(
    (d) => d.network === network && d.address === address && d.status === "pending"
  );
  const usedSuffixes = new Set(pending.map((d) => Math.round((d.amount - Math.floor(d.amount)) * 100)));

  for (let attempt = 0; attempt < 50; attempt++) {
    const suffix = 1 + Math.floor(Math.random() * 99); // 0.01 - 0.99
    if (!usedSuffixes.has(suffix)) {
      return Math.floor(baseAmount) + suffix / 100;
    }
  }
  // Fallback muy improbable: usa milisegundos como último recurso de unicidad.
  return Math.floor(baseAmount) + (Date.now() % 100) / 100;
}

async function checkErc20LikeDeposit({ network, address, expectedAmount, sinceMs, apiBaseUrl, apiKeyEnv }) {
  const apiKey = process.env[apiKeyEnv];
  if (!apiKey) return { checked: false, reason: "missing_api_key" };

  const contractAddress = USDT_CONTRACTS[network];
  const url = `${apiBaseUrl}?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&sort=desc&apikey=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`explorer_http_${res.status}`);
  const data = await res.json();
  const txs = Array.isArray(data.result) ? data.result : [];

  for (const tx of txs) {
    if (tx.to?.toLowerCase() !== address.toLowerCase()) continue;
    const decimals = Number(tx.tokenDecimal || 6);
    const amount = Number(tx.value) / 10 ** decimals;
    const timestampMs = Number(tx.timeStamp) * 1000;
    const confirmations = Number(tx.confirmations || 0);

    if (timestampMs < sinceMs) continue;
    if (Math.abs(amount - expectedAmount) > 0.000001) continue;
    if (confirmations < MIN_CONFIRMATIONS[network]) continue;

    return { checked: true, matched: true, txHash: tx.hash, amount, confirmations };
  }

  return { checked: true, matched: false };
}

async function checkTrc20Deposit({ address, expectedAmount, sinceMs }) {
  const apiKey = process.env.TRONGRID_API_KEY;
  const headers = apiKey ? { "TRON-PRO-API-KEY": apiKey } : {};
  const url = `https://api.trongrid.io/v1/accounts/${address}/transactions/trc20?contract_address=${USDT_CONTRACTS.TRC20}&limit=50&only_confirmed=true`;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`explorer_http_${res.status}`);
  const data = await res.json();
  const txs = Array.isArray(data.data) ? data.data : [];

  for (const tx of txs) {
    if (tx.to !== address) continue;
    const decimals = Number(tx.token_info?.decimals ?? 6);
    const amount = Number(tx.value) / 10 ** decimals;
    const timestampMs = Number(tx.block_timestamp);

    if (timestampMs < sinceMs) continue;
    if (Math.abs(amount - expectedAmount) > 0.000001) continue;

    return { checked: true, matched: true, txHash: tx.transaction_id, amount, confirmations: MIN_CONFIRMATIONS.TRC20 };
  }

  return { checked: true, matched: false };
}

async function checkDepositOnChain(intent) {
  const { network, address, amount, createdAt } = intent;
  const sinceMs = new Date(createdAt).getTime();

  try {
    if (network === "ERC20") {
      return await checkErc20LikeDeposit({
        network, address, expectedAmount: amount, sinceMs,
        apiBaseUrl: "https://api.etherscan.io/api", apiKeyEnv: "ETHERSCAN_API_KEY",
      });
    }
    if (network === "BEP20") {
      return await checkErc20LikeDeposit({
        network, address, expectedAmount: amount, sinceMs,
        apiBaseUrl: "https://api.bscscan.com/api", apiKeyEnv: "BSCSCAN_API_KEY",
      });
    }
    if (network === "TRC20") {
      return await checkTrc20Deposit({ address, expectedAmount: amount, sinceMs });
    }
    return { checked: false, reason: "unknown_network" };
  } catch (err) {
    console.error(`Error verificando depósito en ${network}:`, err);
    return { checked: false, reason: "explorer_error" };
  }
}

export const depositsRouter = express.Router();

depositsRouter.post("/deposits", (req, res) => {
  const { network, usdtAmount } = req.body || {};

  if (!network || !NETWORKS[network]) {
    return res.status(400).json({ error: "invalid_network" });
  }
  if (!isNetworkConfigured(network)) {
    return res.status(409).json({ error: "network_not_configured" });
  }
  const baseAmount = Number(usdtAmount);
  if (!baseAmount || baseAmount <= 0) {
    return res.status(400).json({ error: "invalid_amount" });
  }

  const address = NETWORKS[network].depositAddress;
  const amount = buildUniqueAmount(baseAmount, network, address);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + DEPOSIT_WINDOW_MINUTES * 60000).toISOString();

  deposits.set(id, { id, network, address, amount, createdAt, expiresAt, status: "pending", txHash: null });

  res.json({ id, network, address, amount, createdAt, expiresAt });
});

depositsRouter.get("/deposits/:id", async (req, res) => {
  const intent = deposits.get(req.params.id);
  if (!intent) return res.status(404).json({ error: "not_found" });

  if (intent.status !== "pending") {
    return res.json(intent);
  }

  if (new Date(intent.expiresAt).getTime() < Date.now()) {
    intent.status = "expired";
    return res.json(intent);
  }

  const result = await checkDepositOnChain(intent);
  if (result.matched) {
    intent.status = "confirmed";
    intent.txHash = result.txHash;
    intent.confirmedAmount = result.amount;
  } else if (!result.checked) {
    // No se pudo verificar en la blockchain (falta API key, error temporal, etc.):
    // el estado se mantiene "pending" pero se informa que requiere revisión manual.
    return res.json({ ...intent, autoVerification: false, reason: result.reason });
  }

  res.json({ ...intent, autoVerification: true });
});

export function depositsConfigStatus() {
  return Object.fromEntries(
    Object.entries(NETWORKS).map(([network, cfg]) => [network, Boolean(cfg.depositAddress)])
  );
}
