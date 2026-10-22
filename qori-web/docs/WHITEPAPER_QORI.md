# WHITEPAPER

# QORI

## Capa de inteligencia financiera

**Versión:** 1.0

**Estado:** Borrador — no constituye oferta pública ni asesoría financiera

**Última alineación con el contrato:** Octubre 2026 (BNB Chain / BEP-20)

**Fecha:** Julio 2026

**Proyecto:** CriptoLC Exchange

---

# Resumen Ejecutivo

QORI es una **capa de inteligencia financiera**: convierte información financiera compleja en decisiones personalizadas, explicables y controladas por riesgo, conectando de forma progresiva cripto, inversiones y finanzas personales en un solo sistema.

QORI no busca competir con exchanges como Binance o Coinbase en escala, liquidez o custodia. Juega otro partido: ayudar a la persona a entender qué ocurre con su dinero, qué opciones existen, cuánto riesgo está tomando y qué podría hacer, sobre todo cuando cuenta con poco capital.

El token QORI no es el producto. Es la llave de acceso a los niveles avanzados del sistema. Su utilidad depende de que el servicio sea valioso por sí mismo.

**Estado actual:** prototipo. El sitio web es una demostración, el contrato del token está escrito y probado pero no desplegado ni auditado externamente, y ninguna de las etapas descritas abajo está en producción.

---

# El problema

Hoy una persona necesita una plataforma para comprar activos, otra para ver gráficos, otra para noticias, otra para medir el sentimiento del mercado y otra para administrar sus billeteras. Después tiene que interpretar todo por sí misma, sin saber cuánto riesgo asume.

Con poco capital el problema es mayor: las comisiones, los mínimos de orden y el deslizamiento pueden consumir la ganancia esperada, y casi ninguna herramienta lo calcula. Además, existen tokens fraudulentos que no permiten vender, y la mayoría de las herramientas no avisan antes de comprar.

---

# Propuesta de valor

El usuario no debería entrar pensando: "voy a comprar QORI porque subirá". Debe entrar pensando: "QORI me ayuda a entender qué está pasando con mi dinero, qué oportunidades existen, cuánto riesgo estoy tomando y qué podría hacer".

Principios del sistema:

- **Explicable.** Cada resultado muestra de dónde salen los datos, qué supuestos se usaron y qué no se sabe.
- **Controlado por riesgo.** La capa de riesgo manda sobre las demás: ninguna alternativa se muestra sin sus límites, y ninguna acción se ejecuta fuera de los límites que el propio usuario definió.
- **Honesto con los resultados.** Los análisis incluyen comisiones y deslizamiento, y se muestran los escenarios adversos, no solo los favorables.
- **Sin custodia.** QORI no guarda ni mueve los fondos del usuario.
- **Sin promesas de rentabilidad.** Nadie puede garantizar ganancias. QORI ayuda a decidir mejor; no asegura resultados.

---

# Cómo funciona

El sistema se diseña como una cadena de etapas:

**Datos → Búsqueda → Estrategia → Riesgo → Consenso → QORI AI → Escenarios → Decisión → Resultado → Aprendizaje**

| Etapa | Qué hace | Estado |
|-------|----------|-------|
| Datos | Reúne precios, volumen, noticias y datos on-chain de fuentes públicas | Diseño |
| Búsqueda | Encuentra información relevante para la pregunta del usuario | Diseño |
| Estrategia | Evalúa estrategias con pruebas históricas (backtest) que incluyen costos | Prototipo fuera del sitio |
| Riesgo | Verifica contratos, calcula pérdida máxima y tamaño de posición | Prototipo fuera del sitio |
| Consenso | Contrasta señales de varias fuentes y muestra cuando no coinciden | Diseño |
| QORI AI | Explica el resultado en lenguaje claro y responde preguntas | Diseño |
| Escenarios | Presenta rangos de resultados posibles, favorables y adversos | Diseño |
| Decisión | La persona elige; QORI no decide por ella | Diseño |
| Resultado | Registra lo ocurrido frente a lo previsto | Diseño |
| Aprendizaje | Compara lo previsto con lo ocurrido para mejorar los modelos | Diseño |

La ejecución de órdenes, si llega a ofrecerse, será la última capa: en el exchange del usuario, con claves de solo operar (nunca de retirar), con tope de capital y empezando en modo demostración.

---

# Ejemplo de uso

Un usuario pregunta: "Tengo S/10,000. Quiero invertir durante 12 meses y no quiero perder más del 10 %. ¿Qué alternativas tengo?". QORI no debería responder "compra BTC". Debería construir la respuesta en cuatro pasos y dejar la decisión a la persona.

## 1. Perfil del usuario

| Dato | Ejemplo |
|------|---------|
| Capital | S/ 10,000 |
| Horizonte | 12 meses |
| Riesgo | Moderado |
| Pérdida máxima tolerada | 10 % |

## 2. Inteligencia QORI

Reúne y contrasta información del mercado y del propio usuario:

- Contexto de mercado
- Volatilidad
- Tendencia
- Liquidez
- Indicadores técnicos
- Señales on-chain, cuando correspondan
- Noticias y sentimiento
- Correlaciones entre activos
- Exposición que el usuario ya tiene

## 3. Motor de riesgo

- Escenarios favorable, base y adverso
- Pérdida potencial en cada escenario
- Concentración de la cartera
- Tamaño máximo de posición
- Nivel de confianza, basado en la evidencia disponible

## 4. Alternativas de QORI

QORI presenta, por ejemplo, la Alternativa A, la B y la C, de menor a mayor riesgo. De cada una explica:

- **Por qué** aparece como opción para este perfil.
- **Riesgo:** cuánto se podría perder y con qué frecuencia ocurrió algo así en el pasado.
- **Qué tendría que ocurrir para invalidar la tesis**, es decir, la señal que indicaría que el análisis dejó de ser válido.
- **Costos:** comisiones, diferencias de cambio y deslizamiento.

**Y el usuario decide.**

Lo que QORI no puede hacer: garantizar que la pérdida no supere el 10 %. Ningún activo con potencial de ganancia lo garantiza. QORI trata ese número como un límite de riesgo que se estudia y se explica, no como una promesa. Esto es información y educación, no asesoría de inversión personalizada.

---

# Por qué QORI

| Mercado tradicional | QORI |
|---------------------|------|
| Mucha información | Información convertida en decisiones |
| Herramientas genéricas | Análisis adaptado al perfil de cada persona |
| Indicadores aislados | Contraste entre varios modelos, mostrando cuándo no coinciden |
| Trading primero | Riesgo primero |
| El usuario recibe una señal | QORI explica por qué, el riesgo y los escenarios |
| El mismo sistema para todos | Un perfil financiero individual (*Financial Passport*) |
| Se cobra por operar | Token vinculado a la utilidad del sistema |

El *Financial Passport* reúne los datos del perfil del usuario para personalizar el análisis. Se tratará conforme a la normativa de protección de datos personales: solo con consentimiento y sin venta de información a terceros.

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

# Utilidad del token QORI

El token es una llave de acceso, no una inversión. Su uso previsto:

- **Niveles de acceso.** Un nivel gratuito con las funciones básicas y niveles avanzados (más análisis, más escenarios, más historial) que se desbloquean con QORI o con pago normal en soles o dólares.
- **Descuentos.** Menores costos en los servicios del sistema para quien lo utilice.
- **Participación futura.** Posibilidad de opinar sobre prioridades del producto, de forma gradual.

Lo que QORI no promete: que el token suba de precio, que genere rendimientos ni que garantice ganancias de quienes usen la herramienta. Las funciones básicas deben ser útiles sin necesidad de comprar el token.

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

La gobernanza participativa es un objetivo de largo plazo y no está implementada. Si se habilita, los poseedores podrían opinar sobre prioridades del producto, siempre dentro de los límites legales y de seguridad. Hasta entonces, las decisiones las toma el equipo fundador.

---

# Riesgos

Todo proyecto basado en blockchain y en análisis financiero presenta riesgos que deben ser considerados:

- **Los modelos pueden fallar.** Un análisis histórico no predice el futuro, y los datos pueden ser incorrectos o llegar tarde.
- **Pérdida de capital.** Quien invierte en activos digitales puede perder parte o todo su dinero.
- **Volatilidad del mercado y del propio token QORI.**
- **Riesgo regulatorio.** En Perú no existe una regulación específica para ofrecer tokens al público y las reglas sobre asesoría de inversión y publicidad financiera pueden cambiar.
- **Riesgos tecnológicos y de seguridad**, incluidos errores en contratos y ciberataques.
- **Riesgo de liquidez y de adopción.**
- **Riesgo operativo.** El proyecto está en fase de prototipo.

---

# Cumplimiento Normativo

QORI buscará operar conforme a la normativa aplicable en las jurisdicciones donde preste servicios. Entre las medidas previstas:

- **Sin promesas de rentabilidad** en el sitio, la publicidad ni el producto.
- **Información y educación, no asesoría personalizada**, salvo que se obtengan las autorizaciones que correspondan.
- **Validación legal previa** (SBS, UIF y SMV) antes de abrir una preventa, de ofrecer ejecución con dinero real o de promocionar el token.
- Procesos de conocimiento del cliente (KYC) y prevención de lavado de activos cuando sean requeridos.
- Protección de datos personales.

---

# Roadmap

Las fechas son objetivos, no compromisos.

## Fase I — Fundación (2026)

- Whitepaper y sitio en modo demostración
- Contrato del token con controles reforzados (hecho; pendiente de auditoría externa)
- Validación legal inicial

## Fase II — Información, análisis y riesgo (2027)

- Datos reales de mercado
- Simulador de estrategias con costos incluidos
- Escáner de riesgo de contratos
- Calculadora de tamaño de posición

## Fase III — Escenarios y ejecución en demo (2028)

- Respuestas explicadas y escenarios con QORI AI
- Ejecución solo en modo demostración, con historial público
- Niveles de acceso con QORI, sujetos a validación legal

## Fase IV — Consolidación (2029)

- Ejecución con dinero real bajo límites del usuario, si la validación legal lo permite
- Ampliación a otras clases de inversión y finanzas personales
- Auditorías periódicas y métricas públicas de uso

---

# Equipo

El equipo fundador y su experiencia se publicarán en versiones posteriores del whitepaper, junto con la información de la empresa responsable.

---

# Conclusiones

QORI propone ser una capa de inteligencia financiera que ayude a las personas, especialmente a las que cuentan con poco capital, a entender el riesgo y a decidir mejor. No compite en escala con los grandes exchanges: compite en claridad, honestidad con los resultados y control del riesgo.

El proyecto avanzará por etapas, primero con información, análisis y riesgo, y solo después con ejecución, siempre priorizando la seguridad, la transparencia y el cumplimiento normativo.
