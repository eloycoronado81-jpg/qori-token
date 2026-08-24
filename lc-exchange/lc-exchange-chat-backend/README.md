# LC Exchange - Chat backend

Servidor pequeño en Node/Express que:
- recibe los mensajes del widget de chat (`lc-exchange-chatbot.html`) y los
  responde usando la API de Claude (Anthropic);
- expone la tasa de mercado en vivo (`/rate`) que usan el widget de chat y
  `lc-exchange-sell-calculator.html`;
- gestiona los depósitos USDT de `lc-exchange-sell-calculator.html`: crea un
  "intento de depósito" con dirección + monto único, y verifica en la
  blockchain real (Etherscan / BscScan / TronGrid) si ya llegó.

## 1. Instalar

```bash
cd lc-exchange-chat-backend
npm install
cp .env.example .env
```

Completa `.env`:
- `ANTHROPIC_API_KEY`: se genera en https://console.anthropic.com (la crea Eloy, no la comparte por chat).
- `ALLOWED_ORIGIN`: el dominio real del sitio (para que solo esa web pueda llamar al backend).
- `DEPOSIT_ADDRESS_TRC20` / `DEPOSIT_ADDRESS_ERC20` / `DEPOSIT_ADDRESS_BEP20`: tus
  direcciones de wallet **reales**. ⚠️ Si una queda vacía, esa red simplemente no
  se ofrece para depósitos — nunca se muestra una dirección inventada.
- `ETHERSCAN_API_KEY` / `BSCSCAN_API_KEY` / `TRONGRID_API_KEY`: gratuitas, para que
  el sistema pueda confirmar solo (sin key, esa red queda en revisión manual).

## 2. Correr en local

```bash
npm start
```

Por defecto queda en `http://localhost:3001`. Prueba con:

```bash
curl http://localhost:3001/health
curl -X POST http://localhost:3001/chat -H "Content-Type: application/json" \
  -d '{"message":"¿Cuál es el horario de atención?"}'

curl http://localhost:3001/deposits/config
curl -X POST http://localhost:3001/deposits -H "Content-Type: application/json" \
  -d '{"network":"TRC20","usdtAmount":1000}'
curl http://localhost:3001/deposits/<id-devuelto-arriba>
```

## 3. Desplegar

Cualquiera de estas opciones funciona, la carpeta no depende de una en particular:

- **Servidor propio / VPS**: subir la carpeta, `npm install --production`, correr con
  `npm start` detrás de un proceso persistente (pm2, systemd, etc.) y un proxy HTTPS.
- **Netlify / Vercel (función serverless)**: adaptar `server.js` a funciones
  siguiendo la guía de la plataforma; la lógica de `buildSystemPrompt`,
  `getCurrentRate` y `deposits.js` se reusa igual. Ojo: el seguimiento de
  depósitos usa un `Map` en memoria — en serverless (instancias efímeras) hace
  falta reemplazarlo por una base de datos real (ver pendiente #2 abajo).

Al terminar, confirma la URL pública final y actualiza en los widgets:
- `lc-exchange-chatbot.html`: `API_URL` y `RATE_URL`.
- `lc-exchange-sell-calculator.html`: `RATE_API_URL` y `DEPOSIT_API_URL` (la
  base del backend, sin `/deposits` al final).

## 4. Pendiente antes de publicar

- [ ] **Verificar dos veces** las direcciones de wallet en `.env` (probar
      primero con un monto pequeño). Un error acá significa fondos perdidos.
- [ ] Cambiar el `Map` en memoria de `deposits.js` por una base de datos real
      antes de operar a producción (hoy, si el servidor se reinicia, se
      pierden los depósitos pendientes).
- [ ] Completar los datos del negocio en `buildSystemPrompt()` (horario, métodos de
      pago, requisitos KYC, monedas).
- [ ] Agregar autenticación a un endpoint interno para que el equipo pueda
      confirmar manualmente un depósito cuando la verificación automática no
      encuentre la transacción (hoy esos casos quedan como "revisión manual"
      sin una forma de marcarlos confirmados desde el backend).
- [ ] Revisar con el área legal/compliance que el asistente no ejecute operaciones
      por su cuenta (solo informa) y que los reportes de operaciones inusuales sigan
      pasando por un humano, por las obligaciones de SBS/UIF aplicables a casas de
      cambio en Perú.
