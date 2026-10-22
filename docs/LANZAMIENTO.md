# QORI — Controles del contrato y lista de lanzamiento

Estado: **pre-lanzamiento**. Nada de esto se ha desplegado en mainnet ni auditado externamente.

## Qué controla (y qué no) el owner

| Capacidad | Antes | Ahora |
|---|---|---|
| Crear más tokens | No existía | No existe (suministro fijo, se crea una sola vez) |
| Pausar transferencias | Siempre, sin límite | Solo durante los primeros **365 días** desde el despliegue |
| Duración de una pausa | Ilimitada | Máximo **7 días**: pasado ese plazo **cualquier persona** puede reanudar |
| Pausa activa al cerrarse la ventana | Podía quedar para siempre | Cualquiera puede reanudar |
| Transferir la propiedad | 1 paso | 2 pasos (el nuevo owner debe aceptar) |
| Renunciar a la propiedad | Podía hacerse en pausa (congelando todo) | Bloqueado mientras esté pausado |
| Wallets de la distribución | Podían repetirse | Deben ser distintas y no nulas |

Nota: no se agrega un *timelock*. El contrato no tiene parámetros modificables después del despliegue, así que un retardo no protegería nada; solo impediría reaccionar rápido ante una emergencia. La protección es: owner multifirma + pausa limitada en tiempo y en duración.

## Vesting (contrato `QoriVestingWallet`)

Las asignaciones de equipo, marketing, desarrollo y reserva se entregan a contratos de vesting en vez de a cuentas personales. Nada se libera antes del *cliff*; luego se libera de forma lineal hasta el 100 %.

| Asignación | % | Duración | Cliff |
|---|---|---|---|
| Equipo | 5 % | 36 meses | 12 meses |
| Marketing | 15 % | 24 meses | sin cliff |
| Desarrollo | 10 % | 24 meses | 6 meses |
| Reserva | 10 % | 48 meses | 12 meses |

Estos calendarios son una **propuesta** editable en `ignition/modules/QoriLaunch.ts`. Cualquiera puede verificar en el explorador de BNB Chain los contratos de vesting y su calendario.

## Lista de lanzamiento (en orden)

1. [ ] Crear la multifirma (Safe, p. ej. 3 de 5) y las multifirmas beneficiarias. **Ninguna clave personal como owner.**
2. [ ] Completar `ignition/parameters.example.json` con las direcciones reales y desplegar en **BNB testnet** (`npx hardhat ignition deploy ignition/modules/QoriLaunch.ts --network bscTestnet --parameters <archivo>`).
3. [ ] Revisión externa independiente del contrato y publicación del informe.
4. [ ] Validación legal (SBS/UIF, SMV) **antes** de cualquier preventa. El contrato de preventa no está incluido a propósito.
5. [ ] Desplegar en mainnet, verificar el código fuente en BscScan y publicar la dirección oficial en la web.
6. [ ] Crear el pool de liquidez y **bloquear los tokens LP** en un *locker* público (p. ej. Unicrypt o PinkLock). Publicar el enlace del bloqueo.
7. [ ] Verificar el token con Honeypot.is y GoPlus y publicar el resultado.

## Variables de entorno (no subir al repositorio)

- `BSC_TESTNET_RPC_URL`, `BSC_TESTNET_PRIVATE_KEY`: usar una cuenta de prueba sin fondos reales.
