# LC Exchange - IA / chatbot

Proyecto para `cambiar.lc-exchange.com`, integrado dentro de este repositorio
por pedido de Eloy. Reconstruido a partir del resumen de una conversación
previa (los archivos originales no se llegaron a descargar).

## Contenido

- `lc-exchange-chatbot.html` — Widget de chat flotante para pegar en el sitio
  público. Llama al backend en `lc-exchange-chat-backend/`.
- `lc-exchange-sell-calculator.html` — Calculadora de venta (USDT → USD/PEN)
  para publicar en https://lc-exchange.com/. Autónoma (sin dependencias),
  con precio en vivo desde CoinGecko, cálculo de descuento/comisión de red,
  comparación "más barato que Binance P2P" (USD y PEN) y panel de utilidad
  estimada (ocultable con el ícono 👁️). Incluye un Paso 5 opcional para
  depositar USDT (QR + dirección + monto único + cronómetro) y verificar el
  pago contra la blockchain real — se activa configurando `DEPOSIT_API_URL`
  hacia `lc-exchange-chat-backend`. Ver los comentarios al inicio del
  archivo para configurar márgenes, comisiones por red, WhatsApp y correo de
  soporte antes de publicar.
- `lc-exchange-chat-backend/` — Servidor Node/Express que conecta el widget
  de chat con la API de Claude (Anthropic) y expone `/rate` con el precio de
  CoinGecko cacheado (útil para no golpear la API pública directo desde el
  navegador en ambos widgets). Ver su `README.md` para instalar y desplegar.
- `lc-exchange-internal-panel.html` — Maqueta (mockup) de panel interno para
  detectar operaciones inusuales y sugerir precios. Con datos de ejemplo,
  no conectado a datos reales todavía.
- `lc-exchange-crypto-announcement.html` — Bloque HTML de anuncio para el
  cambio de USDT, con placeholders para completar con los datos reales.

## Pendiente para que Eloy / Cristhian completen

1. Confirmar stack real del sitio (`lc-exchange.com`) para saber dónde pegar
   el widget de chat, la calculadora y el anuncio.
2. Revisar/ajustar en `lc-exchange-sell-calculator.html` los márgenes reales
   (`USDT_BUY_DISCOUNT_PCT`, `FX_MARGIN_PCT`), las comisiones por red
   (`NETWORK_FEES_USDT`, hoy con valores de ejemplo) y los datos de contacto
   (WhatsApp, correo).
3. Desplegar `lc-exchange-chat-backend` (servidor propio o función
   serverless) y actualizar `API_URL` / `RATE_URL` en
   `lc-exchange-chatbot.html`, y `RATE_API_URL` / `DEPOSIT_API_URL` en
   `lc-exchange-sell-calculator.html`, con la URL final (recomendado si el
   tráfico es alto, para no depender del límite gratuito de CoinGecko desde
   el navegador de cada visitante; y obligatorio para que funcione el Paso 5
   de depósitos).
4. Poner las direcciones de wallet **reales** en `DEPOSIT_ADDRESS_*` del
   backend y probar con un depósito pequeño antes de anunciar la función.
5. Completar los datos de negocio (horarios, métodos de pago, requisitos
   KYC, monedas) en `buildSystemPrompt()` dentro de `server.js`.
6. Antes de automatizar operaciones (no solo informar/cotizar), validar con
   compliance/legal los controles de identificación y reporte de
   operaciones inusuales exigidos por la SBS/UIF a casas de cambio en Perú.
