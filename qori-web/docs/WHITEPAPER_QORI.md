# WHITEPAPER

# QORI

## Token Oficial de CriptoLC Exchange

**Versión:** 1.0

**Estado:** Borrador — no constituye oferta pública ni asesoría financiera

**Última alineación con el contrato:** Octubre 2026 (BNB Chain / BEP-20)

**Fecha:** Julio 2026

**Proyecto:** CriptoLC Exchange

---

# Resumen Ejecutivo

QORI es el token oficial del ecosistema CriptoLC Exchange y constituye el activo digital que impulsará todas las operaciones dentro de la plataforma.

El proyecto tiene como objetivo ofrecer una infraestructura financiera moderna para Latinoamérica mediante tecnología blockchain, inteligencia artificial y servicios digitales integrados.

---

# Visión

Convertir a CriptoLC Exchange en una de las plataformas de activos digitales más confiables e innovadoras de América Latina, impulsando la adopción responsable de la tecnología blockchain.

---

# Misión

Desarrollar un ecosistema financiero seguro, transparente y accesible que permita a personas y empresas utilizar activos digitales de forma sencilla y eficiente.

---

# Ecosistema

El ecosistema estará compuesto por:

- Exchange
- Wallet
- Token QORI
- Staking
- Marketplace
- NFT
- API Empresarial
- Inteligencia Artificial
- Aplicación Móvil

Todos los servicios estarán integrados mediante una arquitectura modular y escalable.

---

# Arquitectura Tecnológica

## Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

## Backend

- API REST
- Servicios Blockchain
- Gestión de Usuarios
- Motor de Trading

## Blockchain

- BNB Chain (BNB Smart Chain)
- Token BEP-20 (compatible con ERC-20), contrato en Solidity 0.8.28 basado en OpenZeppelin

## Wallets

- MetaMask
- Trust Wallet
- WalletConnect
- Otras wallets compatibles con EVM

---

# Token QORI

| Concepto | Valor |
|----------|--------|
| Nombre | QORI |
| Símbolo | QORI |
| Blockchain | BNB Chain |
| Estándar | BEP-20 |
| Decimales | 18 |
| Supply Máximo | 1,000,000,000 |
| Emisión adicional | No (el contrato no tiene función de creación de tokens tras el despliegue) |
| Quema | Sí, cada titular puede quemar sus propios tokens |
| Pausa | Limitada: solo el primer año y máximo 7 días por pausa (ver "Controles del contrato") |

---

# Distribución Inicial

| Destino | % |
|---------|--:|
| Liquidez | 40 % |
| Preventa | 20 % |
| Marketing | 15 % |
| Desarrollo | 10 % |
| Reserva | 10 % |
| Equipo | 5 % |

Esta distribución coincide con el contrato `QoriToken.sol`. Versiones anteriores de este documento mostraban otra distribución; la del contrato es la vigente. La preventa solo se abrirá tras la validación legal correspondiente.

## Controles del contrato

Estado: **implementado en el código, sin desplegar y sin auditoría externa**.

- El suministro es fijo (1,000,000,000 QORI) y se crea una sola vez al desplegar. No existe función para crear más tokens.
- **Pausa limitada.** El propietario solo puede pausar las transferencias durante los primeros 365 días desde el despliegue. Una pausa dura como máximo 7 días: pasado ese plazo, cualquier persona puede reanudarlas. Si la ventana de 365 días se cierra con una pausa activa, también puede levantarla cualquiera.
- **Propiedad en dos pasos.** Transferir la propiedad exige que la nueva dirección la acepte. No se puede renunciar a la propiedad mientras el contrato esté pausado.
- **Distribución verificable.** Las seis direcciones de la distribución deben ser distintas, no nulas y distintas del propio contrato.
- **Vesting on-chain.** Equipo, marketing, desarrollo y reserva se entregan a contratos de bloqueo (`QoriVestingWallet`) con *cliff* y liberación lineal: equipo 36 meses con cliff de 12; marketing 24 meses sin cliff; desarrollo 24 meses con cliff de 6; reserva 48 meses con cliff de 12. Son una propuesta editable antes del despliegue.
- **Sin *timelock*.** El contrato no tiene parámetros modificables tras el despliegue, así que un retardo no protegería nada y solo frenaría la respuesta ante una emergencia. La protección es un propietario multifirma más la pausa limitada.

Pendiente antes del lanzamiento (aún **no** hecho): crear la billetera multifirma propietaria, desplegar en testnet y luego en mainnet, bloquear la liquidez en un servicio público al crear el pool, revisión externa independiente del contrato y validación legal previa a cualquier preventa. Detalle y lista de pasos en `docs/LANZAMIENTO.md` del repositorio. Este documento se actualizará cuando cada punto se cumpla.

---

# Casos de Uso

El token QORI permitirá:

- Pago de comisiones.
- Staking.
- Descuentos dentro del Exchange.
- Acceso Premium.
- Gobernanza.
- Recompensas.
- Programas de fidelización.
- Tokenización de activos.
- Servicios empresariales.
- Participación en futuras aplicaciones del ecosistema.

---

# Seguridad

La seguridad constituye uno de los pilares fundamentales del proyecto.

Las medidas contempladas incluyen:

- Auditoría independiente del contrato inteligente.
- Autenticación multifactor (MFA).
- Cifrado de información sensible.
- Monitoreo continuo de eventos de seguridad.
- Gestión de permisos basada en roles.
- Almacenamiento seguro de claves.
- Respaldo y recuperación de información.
- Protección frente a ataques comunes del ecosistema blockchain.

---

# Gobernanza

El ecosistema evolucionará hacia un modelo de gobernanza participativa.

Los poseedores del token QORI podrán participar en procesos de votación relacionados con:

- Incorporación de nuevas funcionalidades.
- Propuestas de desarrollo.
- Uso de fondos del ecosistema.
- Cambios relevantes en la plataforma.
- Prioridades estratégicas.

La implementación de este modelo se realizará de forma gradual conforme evolucione el proyecto.

---

# Riesgos

Todo proyecto basado en blockchain presenta riesgos que deben ser considerados.

Entre los principales se encuentran:

- Volatilidad del mercado.
- Riesgo regulatorio.
- Riesgos tecnológicos.
- Riesgos operativos.
- Riesgo de liquidez.
- Riesgo de adopción.
- Riesgo asociado a ciberataques.

El equipo trabajará continuamente para identificar, mitigar y gestionar estos riesgos.

---

# Cumplimiento Normativo

CriptoLC Exchange buscará operar conforme a la normativa aplicable en las jurisdicciones donde preste servicios.

Entre las medidas previstas se incluyen:

- Procesos KYC cuando sean requeridos.
- Políticas AML.
- Protección de datos personales.
- Gestión de riesgos.
- Transparencia en las operaciones.
- Buenas prácticas de gobierno corporativo.

---

# Roadmap

## Fase I — Fundación (2026)

- Whitepaper
- Landing
- Contrato Inteligente
- Comunidad
- Preventa (sujeta a validación legal)

## Fase II — Lanzamiento (2027)

- Exchange MVP
- Wallet
- Dashboard
- Staking
- APIs

## Fase III — Expansión (2028)

- Aplicación móvil
- Inteligencia Artificial
- Tokenización
- Empresas
- Expansión regional

## Fase IV — Consolidación (2029)

- Gobernanza descentralizada
- Integraciones internacionales
- Nuevos productos financieros
- Crecimiento del ecosistema

---

# Equipo

El equipo fundador estará conformado por profesionales especializados en:

- Blockchain.
- Ingeniería de Software.
- Ciberseguridad.
- Finanzas.
- Transformación Digital.
- Gestión Empresarial.

La información detallada será incorporada en versiones posteriores del Whitepaper.

---

# Conclusiones

QORI representa el núcleo del ecosistema CriptoLC Exchange y ha sido concebido para ofrecer utilidad real, escalabilidad y sostenibilidad a largo plazo.

El proyecto integra infraestructura tecnológica moderna, una economía del token diseñada para favorecer el crecimiento del ecosistema y una visión orientada a la innovación financiera en América Latina.

El desarrollo del proyecto continuará mediante un enfoque progresivo, priorizando la seguridad, la transparencia y la creación de valor para usuarios, empresas y futuros participantes del ecosistema.