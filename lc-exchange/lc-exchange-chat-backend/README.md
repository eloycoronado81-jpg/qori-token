# LC Exchange - Chat backend

Servidor pequeño en Node/Express que recibe los mensajes del widget de chat
(`lc-exchange-chatbot.html`) y los responde usando la API de Claude (Anthropic).

## 1. Instalar

```bash
cd lc-exchange-chat-backend
npm install
cp .env.example .env
```

Completa `.env`:
- `ANTHROPIC_API_KEY`: se genera en https://console.anthropic.com (la crea Eloy, no la comparte por chat).
- `ALLOWED_ORIGIN`: el dominio real del sitio (para que solo esa web pueda llamar al backend).

## 2. Correr en local

```bash
npm start
```

Por defecto queda en `http://localhost:3001`. Prueba con:

```bash
curl http://localhost:3001/health
curl -X POST http://localhost:3001/chat -H "Content-Type: application/json" \
  -d '{"message":"¿Cuál es el horario de atención?"}'
```

## 3. Desplegar

Cualquiera de estas opciones funciona, la carpeta no depende de una en particular:

- **Servidor propio / VPS**: subir la carpeta, `npm install --production`, correr con
  `npm start` detrás de un proceso persistente (pm2, systemd, etc.) y un proxy HTTPS.
- **Netlify / Vercel (función serverless)**: adaptar `server.js` a una función
  (`/api/chat`) siguiendo la guía de la plataforma; la lógica de `buildSystemPrompt`
  y la llamada a `anthropic.messages.create` se reusan igual.

Al terminar, confirma la URL pública final (ej. `https://api.lc-exchange.com/chat`)
y actualízala en `lc-exchange-chatbot.html` (`API_URL` y `RATE_URL`).

## 4. Pendiente antes de publicar

- [ ] Conectar `getCurrentRate()` en `server.js` a la fuente real de tipo de cambio
      (hoy devuelve `null` a propósito para no mostrar un dato inventado).
- [ ] Completar los datos del negocio en `buildSystemPrompt()` (horario, métodos de
      pago, requisitos KYC, monedas).
- [ ] Revisar con el área legal/compliance que el asistente no ejecute operaciones
      por su cuenta (solo informa) y que los reportes de operaciones inusuales sigan
      pasando por un humano, por las obligaciones de SBS/UIF aplicables a casas de
      cambio en Perú.
