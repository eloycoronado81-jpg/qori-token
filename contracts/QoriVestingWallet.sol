// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/finance/VestingWallet.sol";
import "@openzeppelin/contracts/finance/VestingWalletCliff.sol";

/**
 * @title QORI Vesting Wallet
 * @notice Bloquea tokens y los libera de forma lineal con un cliff.
 *
 * - Nada se libera antes del cliff.
 * - Pasado el cliff se libera lo proporcional al tiempo transcurrido desde
 *   `startTimestamp`, hasta el 100 % al terminar `durationSeconds`.
 * - Cualquiera puede llamar a `release(token)`; los tokens siempre van al owner
 *   (el beneficiario, que debe ser una multifirma).
 * - No se puede renunciar a la propiedad (los tokens quedarian bloqueados).
 */
contract QoriVestingWallet is VestingWalletCliff {
    constructor(
        address beneficiary,
        uint64 startTimestamp,
        uint64 durationSeconds,
        uint64 cliffSeconds
    )
        VestingWallet(beneficiary, startTimestamp, durationSeconds)
        VestingWalletCliff(cliffSeconds)
    {}

    function renounceOwnership() public pure override {
        revert("QORI: vesting ownership cannot be renounced");
    }
}
