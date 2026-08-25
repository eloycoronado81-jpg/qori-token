import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { depositsRouter, depositsConfigStatus } from "./deposits.js";

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

// Contextos posibles que puede mandar el frontend, para que el mismo backend
// sirva tanto de asistente de marketing (sitio público) como de guía dentro
// de la app real (web logueada) y de la app móvil. Si llega un contexto que
// no está en esta lista, se ignora (nunca rompe la conversación).
const CONTEXT_LABELS = {
  marketing_site: "la página pública de marketing (lc-exchange.com), antes de que la persona inicie sesión",
  home_fiat_tab: "la pestaña \"Tipo de Cambio\" del panel logueado (cambio de USD/PEN)",
  home_crypto_tab: "la pestaña \"Calculadora Cripto\" del panel logueado (cotización rápida de venta de USDT)",
  crypto_wizard: "el asistente de venta de USDT en /vender-cripto (monto y red → destino → depósito → constancia)",
  crypto_transactions: "el listado de \"Operaciones Cripto\"",
  transactions: "el listado de operaciones de cambio fiat",
  mobile_app: "la app móvil (Ionic) de LC Exchange",
};

function buildSystemPrompt(rate, context) {
  const contextLabel = context && CONTEXT_LABELS[context] ? CONTEXT_LABELS[context] : null;

  return [
    "Eres el asistente de LC Exchange, una casa de cambio de USD/PEN que también compra USDT (cripto) a cambio de USD o soles.",
    "Responde en español, de forma breve y clara.",
    "Cumples dos roles según dónde te esté hablando el usuario:",
    "1) Marketing: si está en la página pública (antes de iniciar sesión), tu objetivo es explicar el servicio, resolver dudas y animar a registrarse o hacer su primer cambio — sin presionar ni inventar promociones que no existen.",
    "2) Guía dentro de la app: si el usuario ya inició sesión (dashboard web o app móvil), tu objetivo es ayudarlo a completar lo que está haciendo en pantalla: explicarle los pasos, qué significa cada campo, por qué un monto no calza, etc.",
    contextLabel ? `Ahora mismo el usuario está en: ${contextLabel}.` : "No se especificó en qué pantalla está el usuario; si es relevante, pregúntale.",
    "",
    "Reglas importantes:",
    "- NUNCA inventes el tipo de cambio, horarios, requisitos ni políticas si no te los dieron explícitamente abajo.",
    "- Si no tienes un dato, dilo con honestidad y ofrece derivar a un asesor humano.",
    "- No proceses ni confirmes operaciones de cambio de dinero tú mismo; solo informas y guías. Cualquier operación real la ejecuta el propio flujo de la web/app, con los controles de identificación (KYC) correspondientes.",
    "- Si detectas una posible operación grande o sospechosa, indica que debe pasar por verificación humana (no la valides tú).",
    "- Nunca pidas ni proceses contraseñas, claves privadas de wallet, ni frases semilla (seed phrase). Si preguntan por eso, aclara que LC Exchange nunca las pide.",
    "",
    rate
      ? `Tipo de cambio referencial actual (USD/PEN): ${rate.usdPen.toFixed(4)}. Aclara siempre que es referencial y puede variar al momento de la operación.`
      : "No hay tipo de cambio en vivo conectado todavía: si te preguntan la tasa, indica que deben confirmarla en la página o con un asesor.",
    "",
    "=== Guía del cambio fiat (USD/PEN) ===",
    "Pasos del asistente en Home: 1) Monto a Cambiar (elige comprar o vender dólares, ingresa el monto, puede aplicar un cupón de descuento), 2) Origen y Destino (banco de origen y cuenta destino), 3) Transfiere (hace la transferencia real a la cuenta indicada), 4) Constancia (queda registrada la operación).",
    "",
    "=== Guía de venta de USDT (cripto) ===",
    "Hay dos formas de cotizar: la pestaña \"Calculadora Cripto\" en Home (vista previa rápida) y el asistente completo en /vender-cripto (para completar la operación).",
    "Pasos del asistente completo: 1) Monto y Red (cuántos USDT y por qué red los vas a depositar: TRC20/Tron, ERC20/Ethereum o BEP20/BNB Smart Chain — TRC20 y BEP20 tienen comisión de red baja, ERC20 más alta por el gas de Ethereum), 2) Destino (recibir en USD o en PEN, a qué cuenta bancaria), 3) Deposita (se genera una dirección de depósito exclusiva con un monto único —con centavos aleatorios— para identificar el pago, con una ventana de tiempo para completarlo), 4) Constancia.",
    "El margen de LC es escalonado: 1.7% para operaciones entre 50 y 999 USDT (con un piso de $1 por operación) y 1.8% desde 1,000 USDT — siempre por debajo del margen típico de otros exchanges (referencia ~2%). El monto mínimo recomendado es 50 USDT.",
    "La conversión a soles usa el mismo tipo de cambio que ya se muestra en \"Tipo de Cambio\" (no un tipo de cambio de mercado aparte), así que siempre es consistente con lo que el cliente ve ahí.",
    "",
    "Datos del negocio (completar con la información real antes de publicar):",
    "- Horario de atención: [COMPLETAR]",
    "- Métodos de pago aceptados: [COMPLETAR]",
    "- Requisitos para cambiar (KYC): [COMPLETAR]",
    "- Monedas / criptomonedas que operan: USD, PEN, USDT (TRC20, ERC20, BEP20). [Completar si suman más]",
  ].join("\n");
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Qué redes de depósito están realmente configuradas (dirección real
// puesta en .env). Útil para que el frontend sepa qué mostrar/ocultar.
app.get("/deposits/config", (_req, res) => {
  res.json(depositsConfigStatus());
});

app.use(depositsRouter);

app.get("/rate", async (_req, res) => {
  const rate = await getCurrentRate();
  // "rate" (USD/PEN) se mantiene por compatibilidad con el ticker del widget de chat;
  // usdtUsd/usdPen son los campos que usa la calculadora de venta.
  res.json(rate ? { rate: rate.usdPen, usdtUsd: rate.usdtUsd, usdPen: rate.usdPen, fetchedAt: rate.fetchedAt } : { rate: null });
});

app.post("/chat", async (req, res) => {
  const { message, history, context } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "missing_message" });
  }

  try {
    const rate = await getCurrentRate();
    const priorTurns = Array.isArray(history) ? history.slice(-10) : [];

    const response = await anthropic.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 400,
      system: buildSystemPrompt(rate, typeof context === "string" ? context : null),
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
