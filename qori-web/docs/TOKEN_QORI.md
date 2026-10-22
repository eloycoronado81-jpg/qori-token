# TOKEN QORI

## Documento Técnico Oficial

Versión: 1.0

Estado: Borrador Oficial

Proyecto: CriptoLC Exchange

Fecha: Julio 2026

---

# 1. Información General

| Parámetro | Valor |
|------------|----------------|
| Nombre | QORI |
| Símbolo | QORI |
| Blockchain | BNB Chain |
| Estándar | BEP-20 (compatible con ERC-20) |
| Decimales | 18 |
| Supply Máximo | 1,000,000,000 |
| Supply Inicial | 1,000,000,000 |
| Mint | No existe función de mint: el suministro se crea una sola vez en el constructor |
| Quema | Sí (ERC20Burnable) |
| Pausa | Sí (ERC20Pausable), limitada: solo el owner, solo durante 365 días desde el despliegue, máximo 7 días por pausa (después cualquiera puede reanudar). Sin timelock: no hay parámetros modificables |
| Propietario | Ownable2Step (parámetro `initialOwner`; transferencia en dos pasos). Objetivo: multifirma |

---

# 2. Objetivo del Token

QORI constituye el activo digital principal del ecosistema CriptoLC Exchange.

Su finalidad es servir como medio de intercambio interno, activo de gobernanza y token de utilidad para todos los productos desarrollados por la plataforma.

---

# 3. Funciones del Token

El token permitirá:

- Pago de comisiones
- Descuentos
- Staking
- Gobernanza
- Recompensas
- Cashback
- Acceso Premium
- Tokenización
- Pagos empresariales
- Participación en nuevos productos

---

# 4. Tokenomics

Distribución inicial:

| Destino | % | Tokens |
|---------|---:|----------------:|
| Liquidez | 40 % | 400,000,000 |
| Preventa | 20 % | 200,000,000 |
| Marketing | 15 % | 150,000,000 |
| Desarrollo | 10 % | 100,000,000 |
| Reserva | 10 % | 100,000,000 |
| Equipo | 5 % | 50,000,000 |

Esta tabla coincide con `contracts/QoriToken.sol` y con sus tests. Pendiente antes del lanzamiento: vesting on-chain y bloqueo de liquidez.

---

# 5. Política Monetaria

- Supply fijo.
- No existirán emisiones futuras.
- Sin inflación programada.
- Transparencia en la asignación.
- Posible mecanismo de quema sujeto a gobernanza.

---

# 6. Seguridad

El contrato inteligente será auditado antes del lanzamiento en producción.

Se contemplan las siguientes medidas:

- Auditoría independiente.
- Gestión segura de claves.
- Pruebas en testnet.
- Revisión del código.
- Control de permisos.
- Monitoreo continuo.

---

# 7. Roadmap Técnico

## Etapa 1

- Diseño del token
- Whitepaper
- Tokenomics

## Etapa 2

- Desarrollo del contrato BEP-20 (Solidity)
- Testnet
- Auditoría

## Etapa 3

- Mainnet
- Liquidez
- Integración con Exchange

## Etapa 4

- Gobernanza
- Staking
- Nuevas utilidades

---

# 8. Integración

El token será compatible con:

- MetaMask
- Trust Wallet
- WalletConnect
- CriptoLC Exchange
- APIs del ecosistema

---

# 9. Estado del Proyecto

| Actividad | Estado |
|-----------|:------:|
| Diseño | ✅ |
| Tokenomics | ✅ |
| Documento Técnico | ✅ |
| Whitepaper | ✅ |
| Smart Contract | 🟡 Reforzado y con pruebas (32 en verde), sin auditoría externa |
| Auditoría | ⏳ |
| Testnet | ⏳ |
| Mainnet | ⏳ |
| Liquidez | ⏳ |
| Lanzamiento | ⏳ |