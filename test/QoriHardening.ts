import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

const DAY = 24n * 60n * 60n;
const ONE_TOKEN = 10n ** 18n;

describe("QoriToken - controles reforzados", async function () {
  const { viem } = await network.create();
  const testClient = await viem.getTestClient();
  const publicClient = await viem.getPublicClient();

  const wallets = await viem.getWalletClients();
  const [owner, liquidity, presale, marketing, development, reserve, team, stranger, newOwner] =
    wallets;

  async function deployToken(
    addrs: {
      owner?: `0x${string}`;
      liquidity?: `0x${string}`;
      presale?: `0x${string}`;
      marketing?: `0x${string}`;
      development?: `0x${string}`;
      reserve?: `0x${string}`;
      team?: `0x${string}`;
    } = {},
  ) {
    return viem.deployContract("QoriToken", [
      addrs.owner ?? owner.account.address,
      addrs.liquidity ?? liquidity.account.address,
      addrs.presale ?? presale.account.address,
      addrs.marketing ?? marketing.account.address,
      addrs.development ?? development.account.address,
      addrs.reserve ?? reserve.account.address,
      addrs.team ?? team.account.address,
    ]);
  }

  async function advance(seconds: bigint) {
    await testClient.increaseTime({ seconds: Number(seconds) });
    await testClient.mine({ blocks: 1 });
  }

  // ---------------------------------------------------------------
  // Pausa limitada
  // ---------------------------------------------------------------

  it("El owner puede pausar dentro de la ventana y se registra pausedAt", async function () {
    const token = await deployToken();

    await token.write.pause({ account: owner.account });

    assert.equal(await token.read.paused(), true);
    assert.ok((await token.read.pausedAt()) > 0n);
  });

  it("Nadie que no sea el owner puede reanudar antes de que expire la pausa", async function () {
    const token = await deployToken();

    await token.write.pause({ account: owner.account });

    await assert.rejects(async () => {
      await token.write.unpause({ account: stranger.account });
    });

    assert.equal(await token.read.paused(), true);
  });

  it("Cualquiera puede reanudar cuando la pausa supera 7 dias", async function () {
    const token = await deployToken();

    await token.write.pause({ account: owner.account });

    await advance(7n * DAY + 60n);

    await token.write.unpause({ account: stranger.account });

    assert.equal(await token.read.paused(), false);
    assert.equal(await token.read.pausedAt(), 0n);

    // Las transferencias vuelven a funcionar
    await token.write.transfer([presale.account.address, ONE_TOKEN], {
      account: liquidity.account,
    });
  });

  it("El owner no puede pausar una vez cerrada la ventana de 365 dias", async function () {
    const token = await deployToken();

    await advance(365n * DAY + 60n);

    await assert.rejects(async () => {
      await token.write.pause({ account: owner.account });
    });

    assert.equal(await token.read.paused(), false);
  });

  it("Una pausa activa al cerrarse la ventana puede ser levantada por cualquiera", async function () {
    const token = await deployToken();

    await advance(364n * DAY);
    await token.write.pause({ account: owner.account });

    // Aun no pasaron 7 dias ni la ventana: el extrano no puede
    await assert.rejects(async () => {
      await token.write.unpause({ account: stranger.account });
    });

    await advance(2n * DAY);
    await token.write.unpause({ account: stranger.account });

    assert.equal(await token.read.paused(), false);
  });

  // ---------------------------------------------------------------
  // Propiedad
  // ---------------------------------------------------------------

  it("La transferencia de propiedad es en dos pasos", async function () {
    const token = await deployToken();

    await token.write.transferOwnership([newOwner.account.address], {
      account: owner.account,
    });

    const ownerNow = await token.read.owner();
    assert.equal(ownerNow.toLowerCase(), owner.account.address.toLowerCase());

    await token.write.acceptOwnership({ account: newOwner.account });

    const ownerAfter = await token.read.owner();
    assert.equal(ownerAfter.toLowerCase(), newOwner.account.address.toLowerCase());
  });

  it("Un tercero no puede aceptar la propiedad pendiente", async function () {
    const token = await deployToken();

    await token.write.transferOwnership([newOwner.account.address], {
      account: owner.account,
    });

    await assert.rejects(async () => {
      await token.write.acceptOwnership({ account: stranger.account });
    });
  });

  it("No se puede renunciar a la propiedad mientras esta pausado", async function () {
    const token = await deployToken();

    await token.write.pause({ account: owner.account });

    await assert.rejects(async () => {
      await token.write.renounceOwnership({ account: owner.account });
    });
  });

  it("Se puede renunciar a la propiedad cuando no esta pausado", async function () {
    const token = await deployToken();

    await token.write.renounceOwnership({ account: owner.account });

    assert.equal(
      (await token.read.owner()).toLowerCase(),
      "0x0000000000000000000000000000000000000000",
    );
  });

  // ---------------------------------------------------------------
  // Constructor
  // ---------------------------------------------------------------

  it("Rechaza wallets duplicadas", async function () {
    await assert.rejects(async () => {
      await deployToken({ marketing: liquidity.account.address });
    });
  });

  it("Rechaza la direccion cero en cualquier wallet", async function () {
    await assert.rejects(async () => {
      await deployToken({
        team: "0x0000000000000000000000000000000000000000",
      });
    });
  });

  // ---------------------------------------------------------------
  // Vesting
  // ---------------------------------------------------------------

  it("El vesting no libera nada antes del cliff, libera parcialmente despues y todo al final", async function () {
    const token = await deployToken();

    const block = await publicClient.getBlock();
    const start = block.timestamp + 10n;
    const duration = 1095n * DAY; // 36 meses
    const cliff = 365n * DAY; // 12 meses

    const vesting = await viem.deployContract("QoriVestingWallet", [
      stranger.account.address, // beneficiario de prueba
      start,
      duration,
      cliff,
    ]);

    const amount = 50_000_000n * ONE_TOKEN;

    // La billetera del equipo deposita su asignacion en el vesting
    await token.write.transfer([vesting.address, amount], {
      account: team.account,
    });

    const balanceOfBeneficiary = async () =>
      token.read.balanceOf([stranger.account.address]);

    // Antes del cliff (dia ~364): nada liberable
    await advance(cliff - DAY);
    await vesting.write.release([token.address], { account: owner.account });
    assert.equal(await balanceOfBeneficiary(), 0n);

    // Despues del cliff (dia ~730): parcial
    await advance(DAY + 365n * DAY);
    await vesting.write.release([token.address], { account: owner.account });
    const partial = await balanceOfBeneficiary();
    assert.ok(partial > 0n && partial < amount, "debe ser parcial");

    // Los tokens liberados son proporcionales al tiempo (~2/3 a los 730 de 1095 dias)
    assert.ok(partial > (amount * 60n) / 100n && partial < (amount * 72n) / 100n);

    // Al final del calendario: todo
    await advance(duration);
    await vesting.write.release([token.address], { account: owner.account });
    assert.equal(await balanceOfBeneficiary(), amount);
  });

  it("No se puede renunciar a la propiedad de un vesting", async function () {
    const block = await publicClient.getBlock();

    const vesting = await viem.deployContract("QoriVestingWallet", [
      stranger.account.address,
      block.timestamp,
      365n * DAY,
      0n,
    ]);

    await assert.rejects(async () => {
      await vesting.write.renounceOwnership({ account: stranger.account });
    });
  });

  it("Un vesting rechaza un cliff mayor que la duracion", async function () {
    const block = await publicClient.getBlock();

    await assert.rejects(async () => {
      await viem.deployContract("QoriVestingWallet", [
        stranger.account.address,
        block.timestamp,
        100n * DAY,
        200n * DAY,
      ]);
    });
  });
});
