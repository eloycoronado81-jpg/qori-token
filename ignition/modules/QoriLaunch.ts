import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DAY = 24n * 60n * 60n;

/**
 * Despliegue de QORI con vesting on-chain.
 *
 * 1. Crea 4 contratos de vesting (equipo, marketing, desarrollo, reserva).
 * 2. Crea el token entregando esas asignaciones a los contratos de vesting.
 *
 * Parametros (archivo JSON con --parameters):
 *  - owner:                multifirma (Safe) duena del token. NO usar una cuenta personal.
 *  - liquidityWallet:      recibe el 40 % (debe bloquearse en un locker publico al crear el pool).
 *  - presaleWallet:        recibe el 20 % (contrato de preventa, solo tras validacion legal).
 *  - teamBeneficiary, marketingBeneficiary, developmentBeneficiary, reserveBeneficiary:
 *                          multifirmas que reciben lo liberado de cada vesting.
 *  - vestingStart:         timestamp UNIX de inicio del vesting (por defecto, el despliegue).
 *
 * Calendario por defecto (editable): duracion total y cliff, en dias.
 *   equipo:      1095 d (36 meses), cliff 365 d (12 meses)
 *   marketing:    730 d (24 meses), cliff   0
 *   desarrollo:   730 d (24 meses), cliff 180 d (6 meses)
 *   reserva:     1460 d (48 meses), cliff 365 d (12 meses)
 */
export default buildModule("QoriLaunchModule", (m) => {
  const owner = m.getParameter("owner");
  const liquidityWallet = m.getParameter("liquidityWallet");
  const presaleWallet = m.getParameter("presaleWallet");

  const teamBeneficiary = m.getParameter("teamBeneficiary");
  const marketingBeneficiary = m.getParameter("marketingBeneficiary");
  const developmentBeneficiary = m.getParameter("developmentBeneficiary");
  const reserveBeneficiary = m.getParameter("reserveBeneficiary");

  const vestingStart = m.getParameter("vestingStart");

  const teamVesting = m.contract(
    "QoriVestingWallet",
    [teamBeneficiary, vestingStart, 1095n * DAY, 365n * DAY],
    { id: "TeamVesting" },
  );

  const marketingVesting = m.contract(
    "QoriVestingWallet",
    [marketingBeneficiary, vestingStart, 730n * DAY, 0n],
    { id: "MarketingVesting" },
  );

  const developmentVesting = m.contract(
    "QoriVestingWallet",
    [developmentBeneficiary, vestingStart, 730n * DAY, 180n * DAY],
    { id: "DevelopmentVesting" },
  );

  const reserveVesting = m.contract(
    "QoriVestingWallet",
    [reserveBeneficiary, vestingStart, 1460n * DAY, 365n * DAY],
    { id: "ReserveVesting" },
  );

  const token = m.contract("QoriToken", [
    owner,
    liquidityWallet,
    presaleWallet,
    marketingVesting,
    developmentVesting,
    reserveVesting,
    teamVesting,
  ]);

  return {
    token,
    teamVesting,
    marketingVesting,
    developmentVesting,
    reserveVesting,
  };
});
