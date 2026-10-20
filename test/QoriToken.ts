import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

describe("QoriToken", async function () {
  const { viem } = await network.create();

  const walletClients = await viem.getWalletClients();

  const owner = walletClients[0];
  const liquidityWallet = walletClients[1];
  const presaleWallet = walletClients[2];
  const marketingWallet = walletClients[3];
  const developmentWallet = walletClients[4];
  const reserveWallet = walletClients[5];
  const teamWallet = walletClients[6];

  const ONE_TOKEN = 10n ** 18n;

  const MAX_SUPPLY =
    1_000_000_000n * ONE_TOKEN;

  const LIQUIDITY =
    400_000_000n * ONE_TOKEN;

  const PRESALE =
    200_000_000n * ONE_TOKEN;

  const MARKETING =
    150_000_000n * ONE_TOKEN;

  const DEVELOPMENT =
    100_000_000n * ONE_TOKEN;

  const RESERVE =
    100_000_000n * ONE_TOKEN;

  const TEAM =
    50_000_000n * ONE_TOKEN;

  async function deployQori() {
    return viem.deployContract("QoriToken", [
      owner.account.address,
      liquidityWallet.account.address,
      presaleWallet.account.address,
      marketingWallet.account.address,
      developmentWallet.account.address,
      reserveWallet.account.address,
      teamWallet.account.address,
    ]);
  }

  it("Debe usar nombre QORI y simbolo QORI", async function () {
    const token = await deployQori();

    assert.equal(
      await token.read.name(),
      "QORI"
    );

    assert.equal(
      await token.read.symbol(),
      "QORI"
    );
  });

  it("Debe utilizar 18 decimales", async function () {
    const token = await deployQori();

    assert.equal(
      await token.read.decimals(),
      18
    );
  });

  it("Debe crear exactamente 1,000,000,000 QORI", async function () {
    const token = await deployQori();

    const totalSupply =
      await token.read.totalSupply();

    assert.equal(
      totalSupply,
      MAX_SUPPLY
    );
  });

  it("MAX_SUPPLY debe ser exactamente 1,000,000,000 QORI", async function () {
    const token = await deployQori();

    const maxSupply =
      await token.read.MAX_SUPPLY();

    assert.equal(
      maxSupply,
      MAX_SUPPLY
    );
  });

  it("Debe asignar 400,000,000 QORI a liquidez", async function () {
    const token = await deployQori();

    const balance =
      await token.read.balanceOf([
        liquidityWallet.account.address,
      ]);

    assert.equal(
      balance,
      LIQUIDITY
    );
  });

  it("Debe asignar 200,000,000 QORI a preventa", async function () {
    const token = await deployQori();

    const balance =
      await token.read.balanceOf([
        presaleWallet.account.address,
      ]);

    assert.equal(
      balance,
      PRESALE
    );
  });

  it("Debe asignar 150,000,000 QORI a marketing", async function () {
    const token = await deployQori();

    const balance =
      await token.read.balanceOf([
        marketingWallet.account.address,
      ]);

    assert.equal(
      balance,
      MARKETING
    );
  });

  it("Debe asignar 100,000,000 QORI a desarrollo", async function () {
    const token = await deployQori();

    const balance =
      await token.read.balanceOf([
        developmentWallet.account.address,
      ]);

    assert.equal(
      balance,
      DEVELOPMENT
    );
  });

  it("Debe asignar 100,000,000 QORI a reserva", async function () {
    const token = await deployQori();

    const balance =
      await token.read.balanceOf([
        reserveWallet.account.address,
      ]);

    assert.equal(
      balance,
      RESERVE
    );
  });

  it("Debe asignar 50,000,000 QORI al equipo", async function () {
    const token = await deployQori();

    const balance =
      await token.read.balanceOf([
        teamWallet.account.address,
      ]);

    assert.equal(
      balance,
      TEAM
    );
  });

  it("La suma de las seis asignaciones debe ser igual al suministro total", async function () {
    const totalAllocated =
      LIQUIDITY +
      PRESALE +
      MARKETING +
      DEVELOPMENT +
      RESERVE +
      TEAM;

    assert.equal(
      totalAllocated,
      MAX_SUPPLY
    );
  });

  it("No debe existir una funcion publica mint", async function () {
    const token = await deployQori();

    const mintFunction =
      token.abi.find(
        (item) =>
          item.type === "function" &&
          item.name === "mint"
      );

    assert.equal(
      mintFunction,
      undefined
    );
  });

  it("El burn debe reducir el suministro total", async function () {
    const token = await deployQori();

    const burnAmount =
      1_000n * ONE_TOKEN;

    const supplyBefore =
      await token.read.totalSupply();

    await token.write.burn(
      [burnAmount],
      {
        account: liquidityWallet.account,
      }
    );

    const supplyAfter =
      await token.read.totalSupply();

    assert.equal(
      supplyAfter,
      supplyBefore - burnAmount
    );
  });

  it("El owner debe poder pausar el contrato", async function () {
    const token = await deployQori();

    await token.write.pause({
      account: owner.account,
    });

    assert.equal(
      await token.read.paused(),
      true
    );
  });

  it("El owner debe poder reactivar el contrato", async function () {
    const token = await deployQori();

    await token.write.pause({
      account: owner.account,
    });

    await token.write.unpause({
      account: owner.account,
    });

    assert.equal(
      await token.read.paused(),
      false
    );
  });

  it("Una wallet que no es owner no debe poder pausar QORI", async function () {
    const token = await deployQori();

    await assert.rejects(
      async () => {
        await token.write.pause({
          account: liquidityWallet.account,
        });
      }
    );
  });

  it("Cuando QORI esta pausado no deben permitirse transferencias", async function () {
    const token = await deployQori();

    await token.write.pause({
      account: owner.account,
    });

    await assert.rejects(
      async () => {
        await token.write.transfer(
          [
            presaleWallet.account.address,
            100n * ONE_TOKEN,
          ],
          {
            account: liquidityWallet.account,
          }
        );
      }
    );
  });

  it("Al reactivar QORI las transferencias deben funcionar nuevamente", async function () {
    const token = await deployQori();

    await token.write.pause({
      account: owner.account,
    });

    await token.write.unpause({
      account: owner.account,
    });

    const amount =
      100n * ONE_TOKEN;

    const balanceBefore =
      await token.read.balanceOf([
        presaleWallet.account.address,
      ]);

    await token.write.transfer(
      [
        presaleWallet.account.address,
        amount,
      ],
      {
        account: liquidityWallet.account,
      }
    );

    const balanceAfter =
      await token.read.balanceOf([
        presaleWallet.account.address,
      ]);

    assert.equal(
      balanceAfter,
      balanceBefore + amount
    );
  });
});