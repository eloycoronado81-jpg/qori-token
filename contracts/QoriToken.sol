// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title QORI Token
 * @notice ERC-20 de suministro fijo (1,000,000,000 QORI) para BNB Chain.
 *
 * Controles del owner (pensados para que `initialOwner` sea una billetera
 * multifirma, por ejemplo una Safe, nunca una cuenta personal):
 *
 *  - No existe funcion de mint: el suministro se crea una sola vez.
 *  - La pausa solo puede activarse durante los primeros PAUSE_WINDOW (365 dias).
 *  - Ninguna pausa dura mas de MAX_PAUSE_DURATION (7 dias): pasado ese plazo
 *    CUALQUIER persona puede reanudar las transferencias.
 *  - Terminada la ventana de pausa, el owner ya no puede pausar nunca mas.
 *  - La propiedad se transfiere en dos pasos (Ownable2Step) y no se puede
 *    renunciar a ella mientras el contrato esta pausado.
 *
 * Las asignaciones de equipo, marketing, desarrollo y reserva estan pensadas
 * para recibirse en contratos de vesting (ver QoriVestingWallet).
 */
contract QoriToken is
    ERC20,
    ERC20Burnable,
    ERC20Pausable,
    Ownable2Step
{
    // ============================================================
    // SUMINISTRO
    // ============================================================

    uint256 public constant MAX_SUPPLY =
        1_000_000_000 * 10 ** 18;

    // ============================================================
    // DISTRIBUCION
    // ============================================================

    uint256 public constant LIQUIDITY_ALLOCATION =
        400_000_000 * 10 ** 18;

    uint256 public constant PRESALE_ALLOCATION =
        200_000_000 * 10 ** 18;

    uint256 public constant MARKETING_ALLOCATION =
        150_000_000 * 10 ** 18;

    uint256 public constant DEVELOPMENT_ALLOCATION =
        100_000_000 * 10 ** 18;

    uint256 public constant RESERVE_ALLOCATION =
        100_000_000 * 10 ** 18;

    uint256 public constant TEAM_ALLOCATION =
        50_000_000 * 10 ** 18;

    // ============================================================
    // LIMITES DE LA PAUSA
    // ============================================================

    /// @notice Tiempo (desde el despliegue) durante el cual el owner puede pausar.
    uint256 public constant PAUSE_WINDOW = 365 days;

    /// @notice Duracion maxima de una pausa antes de que cualquiera pueda reanudar.
    uint256 public constant MAX_PAUSE_DURATION = 7 days;

    /// @notice Momento a partir del cual ya no se puede pausar.
    uint256 public immutable pauseDeadline;

    /// @notice Instante en que se activo la pausa vigente (0 si no hay pausa).
    uint256 public pausedAt;

    // ============================================================
    // WALLETS
    // ============================================================

    address public immutable liquidityWallet;
    address public immutable presaleWallet;
    address public immutable marketingWallet;
    address public immutable developmentWallet;
    address public immutable reserveWallet;
    address public immutable teamWallet;

    // ============================================================
    // CONSTRUCTOR
    // ============================================================

    constructor(
        address initialOwner,
        address _liquidityWallet,
        address _presaleWallet,
        address _marketingWallet,
        address _developmentWallet,
        address _reserveWallet,
        address _teamWallet
    )
        ERC20("QORI", "QORI")
        Ownable(initialOwner)
    {
        require(
            initialOwner != address(0),
            "QORI: invalid owner"
        );

        require(
            _liquidityWallet != address(0),
            "QORI: invalid liquidity wallet"
        );

        require(
            _presaleWallet != address(0),
            "QORI: invalid presale wallet"
        );

        require(
            _marketingWallet != address(0),
            "QORI: invalid marketing wallet"
        );

        require(
            _developmentWallet != address(0),
            "QORI: invalid development wallet"
        );

        require(
            _reserveWallet != address(0),
            "QORI: invalid reserve wallet"
        );

        require(
            _teamWallet != address(0),
            "QORI: invalid team wallet"
        );

        address[6] memory wallets = [
            _liquidityWallet,
            _presaleWallet,
            _marketingWallet,
            _developmentWallet,
            _reserveWallet,
            _teamWallet
        ];

        for (uint256 i = 0; i < wallets.length; i++) {
            require(
                wallets[i] != address(this),
                "QORI: wallet cannot be the token"
            );

            for (uint256 j = i + 1; j < wallets.length; j++) {
                require(
                    wallets[i] != wallets[j],
                    "QORI: duplicated wallet"
                );
            }
        }

        liquidityWallet = _liquidityWallet;
        presaleWallet = _presaleWallet;
        marketingWallet = _marketingWallet;
        developmentWallet = _developmentWallet;
        reserveWallet = _reserveWallet;
        teamWallet = _teamWallet;

        pauseDeadline = block.timestamp + PAUSE_WINDOW;

        // ========================================================
        // SUMINISTRO INICIAL FIJO
        // ========================================================

        _mint(liquidityWallet, LIQUIDITY_ALLOCATION);
        _mint(presaleWallet, PRESALE_ALLOCATION);
        _mint(marketingWallet, MARKETING_ALLOCATION);
        _mint(developmentWallet, DEVELOPMENT_ALLOCATION);
        _mint(reserveWallet, RESERVE_ALLOCATION);
        _mint(teamWallet, TEAM_ALLOCATION);

        require(
            totalSupply() == MAX_SUPPLY,
            "QORI: invalid initial supply"
        );
    }

    // ============================================================
    // PAUSA LIMITADA
    // ============================================================

    /// @notice Pausa las transferencias. Solo el owner y solo dentro de la ventana de pausa.
    function pause() external onlyOwner {
        require(
            block.timestamp < pauseDeadline,
            "QORI: pause window closed"
        );

        pausedAt = block.timestamp;
        _pause();
    }

    /**
     * @notice Reanuda las transferencias.
     * El owner puede hacerlo siempre. Cualquier persona puede hacerlo si la
     * pausa ya duro MAX_PAUSE_DURATION o si la ventana de pausa ya termino.
     */
    function unpause() external {
        if (msg.sender != owner()) {
            require(
                block.timestamp >= pausedAt + MAX_PAUSE_DURATION ||
                    block.timestamp >= pauseDeadline,
                "QORI: pause not expired"
            );
        }

        pausedAt = 0;
        _unpause();
    }

    // ============================================================
    // PROPIEDAD
    // ============================================================

    /// @dev No se puede renunciar a la propiedad mientras el contrato esta pausado.
    function renounceOwnership() public override onlyOwner {
        require(
            !paused(),
            "QORI: cannot renounce while paused"
        );

        super.renounceOwnership();
    }

    // ============================================================
    // ERC20 + PAUSABLE
    // ============================================================

    function _update(
        address from,
        address to,
        uint256 value
    )
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
