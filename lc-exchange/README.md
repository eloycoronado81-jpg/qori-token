# LC Exchange - IA / chatbot

Proyecto para `cambiar.lc-exchange.com`, integrado dentro de este repositorio
por pedido de Eloy. Reconstruido a partir del resumen de una conversación
previa (los archivos originales no se llegaron a descargar).

## Contenido

- `lc-exchange-chatbot.html` — Widget de chat flotante para pegar en el sitio
  público. Llama al backend en `lc-exchange-chat-backend/`.
- `lc-exchange-chat-backend/` — Servidor Node/Express que conecta el widget
  con la API de Claude (Anthropic). Ver su `README.md` para instalar y
  desplegar.
- `lc-exchange-internal-panel.html` — Maqueta (mockup) de panel interno para
  detectar operaciones inusuales y sugerir precios. Con datos de ejemplo,
  no conectado a datos reales todavía.
- `lc-exchange-crypto-announcement.html` — Bloque HTML de anuncio para el
  cambio de USDT, con placeholders para completar con los datos reales.

## Pendiente para que Eloy / Cristhian completen

1. Confirmar stack real del sitio (`cambiar.lc-exchange.com`) para saber
   dónde pegar el widget y el anuncio.
2. Desplegar `lc-exchange-chat-backend` (servidor propio o función
   serverless) y actualizar `API_URL` / `RATE_URL` en
   `lc-exchange-chatbot.html` con la URL final.
3. Conectar `getCurrentRate()` en `server.js` a la fuente real de tipo de
   cambio (hoy devuelve `null` a propósito, para no inventar una tasa).
4. Completar los datos de negocio (horarios, métodos de pago, requisitos
   KYC, monedas) en `buildSystemPrompt()` dentro de `server.js`.
5. Antes de automatizar operaciones (no solo informar), validar con
   compliance/legal los controles de identificación y reporte de
   operaciones inusuales exigidos por la SBS/UIF a casas de cambio en Perú.
