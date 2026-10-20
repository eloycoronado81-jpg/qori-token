// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QoriToken is
    ERC20,
    ERC20Burnable,
    ERC20Pausable,
    Ownable
{
    // =========================================================
    // QORI TOKEN
    // =========================================================

    uint256 public constant MAX_SUPPLY =
        1_000_000_000 * 10 ** 18;

    // =========================================================
    // DISTRIBUTION
    // =========================================================

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

    // =========================================================
    // WALLETS
    // =========================================================

    address public immutable liquidityWallet;
    address public immutable presaleWallet;
    address public immutable marketingWallet;
    address public immutable developmentWallet;
    address public immutable reserveWallet;
    address public immutable teamWallet;

    // =========================================================
    // CONSTRUCTOR
    // =========================================================

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

        liquidityWallet = _liquidityWallet;
        presaleWallet = _presaleWallet;
        marketingWallet = _marketingWallet;
        developmentWallet = _developmentWallet;
        reserveWallet = _reserveWallet;
        teamWallet = _teamWallet;

        // =====================================================
        // INITIAL FIXED SUPPLY
        // =====================================================

        _mint(
            liquidityWallet,
            LIQUIDITY_ALLOCATION
        );

        _mint(
            presaleWallet,
            PRESALE_ALLOCATION
        );

        _mint(
            marketingWallet,
            MARKETING_ALLOCATION
        );

        _mint(
            developmentWallet,
            DEVELOPMENT_ALLOCATION
        );

        _mint(
            reserveWallet,
            RESERVE_ALLOCATION
        );

        _mint(
            teamWallet,
            TEAM_ALLOCATION
        );

        require(
            totalSupply() == MAX_SUPPLY,
            "QORI: invalid initial supply"
        );
    }

    // =========================================================
    // PAUSE
    // =========================================================

    function pause()
        external
        onlyOwner
    {
        _pause();
    }

    function unpause()
        external
        onlyOwner
    {
        _unpause();
    }

    // =========================================================
    // ERC20 + PAUSABLE
    // =========================================================

    function _update(
        address from,
        address to,
        uint256 value
    )
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(
            from,
            to,
            value
        );
    }
}