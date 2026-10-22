# QORI Token

Token QORI (BEP-20 / ERC-20) y sitio web del proyecto **QORI – FC Global / CriptoLC Exchange**.

> **Estado: pre-lanzamiento.** El contrato no está desplegado ni auditado. No hay oferta pública de venta. Nada de este repositorio es asesoría financiera.

## Estructura

| Carpeta | Contenido |
|---|---|
| `contracts/` | `QoriToken.sol` (ERC-20 + Burnable + Pausable + Ownable, OpenZeppelin, suministro fijo de 1,000,000,000) |
| `test/` | Tests del contrato (`node:test` + viem) |
| `qori-web/` | Sitio web (React + Vite + Tailwind), se despliega en Netlify |
| `qori-web/docs/` | Whitepaper y documento técnico (alineados con el contrato) |

## Probar el contrato

```shell
npm install
npx hardhat test
```

## Probar el sitio

```shell
cd qori-web
npm install
npm run dev
```

## Antes del lanzamiento (pendiente)

- Ya implementado en el contrato: pausa limitada (365 días, máx. 7 días por pausa), propiedad en dos pasos y vesting on-chain (ver `docs/LANZAMIENTO.md`).
- Crear la billetera multifirma propietaria, desplegar en testnet y bloquear públicamente la liquidez al crear el pool.
- Contrato de preventa propio y validación legal (SBS/UIF, SMV).
- Auditoría independiente publicada y código verificado en el explorador.
- Autenticación real para el panel de usuario (hoy es solo una demostración).
