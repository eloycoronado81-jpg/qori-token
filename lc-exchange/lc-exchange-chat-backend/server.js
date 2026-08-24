import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";

const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("Falta ANTHROPIC_API_KEY en el entorno (.env). El servidor no puede responder al chat sin esto.");
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// Tasa de mercado en vivo desde CoinGecko (USDT/USD y USDT/PEN), con una
// caché corta en memoria para no golpear el límite de la API pública en
// cada request. Si CoinGecko falla, devuelve null (nunca un dato inventado).
let rateCache = { data: null, fetchedAt: 0 };
const RATE_CACHE_TTL_MS = 30000;

async function getCurrentRate() {
  const now = Date.now();
  if (rateCache.data && now - rateCache.fetchedAt < RATE_CACHE_TTL_MS) {
    return rateCache.data;
  }

  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd,pen");
    if (!res.ok) throw new Error(`coingecko_${res.status}`);
    const data = await res.json();
    const usdtUsd = data?.tether?.usd;
    const usdtPen = data?.tether?.pen;
    if (!usdtUsd || !usdtPen) throw new Error("missing_fields");

    const result = { usdtUsd, usdPen: usdtPen / usdtUsd, fetchedAt: new Date().toISOString() };
    rateCache = { data: result, fetchedAt: now };
    return result;
  } catch (err) {
    console.error("Error obteniendo tasa de CoinGecko:", err);
    return null;
  }
}

function buildSystemPrompt(rate) {
  return [
    "Eres el asistente de atención al cliente de LC Exchange, una casa de cambio.",
    "Responde en español, de forma breve y clara.",
    "",
    "Reglas importantes:",
    "- NUNCA inventes el tipo de cambio, horarios, requisitos ni políticas si no te los dieron explícitamente abajo.",
    "- Si no tienes un dato, dilo con honestidad y ofrece derivar a un asesor humano.",
    "- No proceses ni confirmes operaciones de cambio de dinero tú mismo; solo informas. Cualquier operación real la ejecuta una persona o un sistema separado con los controles de identificación (KYC) correspondientes.",
    "- Si detectas una posible operación grande o sospechosa, indica que debe pasar por verificación humana (no la valides tú).",
    "",
    rate
      ? `Tipo de cambio referencial actual (USD/PEN): ${rate.usdPen.toFixed(4)}. Aclara siempre que es referencial y puede variar al momento de la operación.`
      : "No hay tipo de cambio en vivo conectado todavía: si te preguntan la tasa, indica que deben confirmarla en la página o con un asesor.",
    "",
    "Datos del negocio (completar con la información real antes de publicar):",
    "- Horario de atención: [COMPLETAR]",
    "- Métodos de pago aceptados: [COMPLETAR]",
    "- Requisitos para cambiar (KYC): [COMPLETAR]",
    "- Monedas / criptomonedas que operan: [COMPLETAR]",
  ].join("\n");
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/rate", async (_req, res) => {
  const rate = await getCurrentRate();
  // "rate" (USD/PEN) se mantiene por compatibilidad con el ticker del widget de chat;
  // usdtUsd/usdPen son los campos que usa la calculadora de venta.
  res.json(rate ? { rate: rate.usdPen, usdtUsd: rate.usdtUsd, usdPen: rate.usdPen, fetchedAt: rate.fetchedAt } : { rate: null });
});

app.post("/chat", async (req, res) => {
  const { message, history } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "missing_message" });
  }

  try {
    const rate = await getCurrentRate();
    const priorTurns = Array.isArray(history) ? history.slice(-10) : [];

    const response = await anthropic.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 400,
      system: buildSystemPrompt(rate),
      messages: [...priorTurns, { role: "user", content: message }],
    });

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    res.json({ reply });
  } catch (err) {
    console.error("Error llamando a Anthropic:", err);
    res.status(500).json({ error: "chat_failed" });
  }
});

app.listen(PORT, () => {
  console.log(`lc-exchange-chat-backend escuchando en el puerto ${PORT}`);
});
