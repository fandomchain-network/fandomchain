package keeper

import (
	"fmt"

	"fandomChain/x/tokenfactory/types"

	"cosmossdk.io/math"
)

// Constants for bonding curve
const (
	TOKEN_DECIMALS                  = int64(1_000_000)     // 10^6 (6 decimals for created tokens)
	FANDOMCHAIN_DECIMALS            = int64(1_000_000_000)   // 10^9 (9 decimals for fandomChain native token)
	INITIAL_VIRTUAL_TOKEN_RESERVES  = int64(1_000_000_000_000)     // 1,000,000 tokens with 6 decimals
	INITIAL_VIRTUAL_FANDOM_RESERVES = int64(30_000_000_000) // 30 FandomChain tokens with 9 decimals (30 * 10^9)
	INITIAL_REAL_TOKEN_RESERVES     = int64(800_000_000_000)   // 800,000 tokens with 6 decimals
	INITIAL_REAL_FANDOM_RESERVES    = int64(0)
	
	// Fee constants (1% = 0.01)
	BUY_FEE_NUMERATOR    = int64(1)
	BUY_FEE_DENOMINATOR  = int64(100)
	SELL_FEE_NUMERATOR   = int64(1)
	SELL_FEE_DENOMINATOR = int64(100)

	// Security constants
	MIN_TRADE_AMOUNT         = int64(1)
	MAX_SLIPPAGE_PERCENT     = int64(5)  // 5%
	MAX_PRICE_IMPACT_PERCENT = int64(10) // 10%
)

// InitializeBondingCurve initializes a denom with bonding curve parameters
func InitializeBondingCurve(denom *types.Denom) {
	denom.VirtualTokenReserves = INITIAL_VIRTUAL_TOKEN_RESERVES
	denom.VirtualFandomReserves = INITIAL_VIRTUAL_FANDOM_RESERVES
	denom.RealTokenReserves = INITIAL_REAL_TOKEN_RESERVES
	denom.RealFandomReserves = INITIAL_REAL_FANDOM_RESERVES
	denom.InitialVirtualTokenReserves = INITIAL_VIRTUAL_TOKEN_RESERVES
	denom.InitialVirtualFandomReserves = INITIAL_VIRTUAL_FANDOM_RESERVES
	denom.InitialRealTokenReserves = INITIAL_REAL_TOKEN_RESERVES
	denom.BondingCurveEnabled = true
}

// CalculateTokensOut calculates how many tokens a buyer will receive
// Formula: tokensOut = tokenReserves - (k / (fandomReserves + fandomIn))
// Where k = fandomReserves * tokenReserves (constant product)
func CalculateTokensOut(fandomReserves, tokenReserves, fandomIn int64) (int64, error) {
	if fandomReserves <= 0 || tokenReserves <= 0 || fandomIn <= 0 {
		return 0, fmt.Errorf("invalid input: all values must be positive")
	}

	// Calculate k = fandomReserves * tokenReserves
	fandomReservesBig := math.NewInt(fandomReserves)
	tokenReservesBig := math.NewInt(tokenReserves)
	k := fandomReservesBig.Mul(tokenReservesBig)

	// Calculate newFandomReserves = fandomReserves + fandomIn
	fandomInBig := math.NewInt(fandomIn)
	newFandomReserves := fandomReservesBig.Add(fandomInBig)

	// Calculate newTokenReserves = k / newFandomReserves
	newTokenReserves := k.Quo(newFandomReserves)

	// Calculate tokensOut = tokenReserves - newTokenReserves
	tokensOut := tokenReservesBig.Sub(newTokenReserves)

	if tokensOut.IsNegative() || tokensOut.IsZero() {
		return 0, fmt.Errorf("calculated tokens out is non-positive")
	}

	return tokensOut.Int64(), nil
}

// CalculateFandomOut calculates how many fandom tokens a seller will receive
// Formula: fandomOut = fandomReserves - (k / (tokenReserves + tokenIn))
func CalculateFandomOut(tokenReserves, fandomReserves, tokenIn int64) (int64, error) {
	if tokenReserves <= 0 || fandomReserves <= 0 || tokenIn <= 0 {
		return 0, fmt.Errorf("invalid input: all values must be positive")
	}

	// Calculate k = tokenReserves * fandomReserves
	tokenReservesBig := math.NewInt(tokenReserves)
	fandomReservesBig := math.NewInt(fandomReserves)
	k := tokenReservesBig.Mul(fandomReservesBig)

	// Calculate newTokenReserves = tokenReserves + tokenIn
	tokenInBig := math.NewInt(tokenIn)
	newTokenReserves := tokenReservesBig.Add(tokenInBig)

	// Calculate newFandomReserves = k / newTokenReserves
	newFandomReserves := k.Quo(newTokenReserves)

	// Calculate fandomOut = fandomReserves - newFandomReserves
	fandomOut := fandomReservesBig.Sub(newFandomReserves)

	if fandomOut.IsNegative() || fandomOut.IsZero() {
		return 0, fmt.Errorf("calculated fandom out is non-positive")
	}

	return fandomOut.Int64(), nil
}

// ApplyBuyFee applies the buy fee to the fandom amount
// Returns: amountAfterFee, feeAmount
func ApplyBuyFee(amount int64) (int64, int64) {
	feeAmount := (amount * BUY_FEE_NUMERATOR) / BUY_FEE_DENOMINATOR
	amountAfterFee := amount - feeAmount
	return amountAfterFee, feeAmount
}

// ApplySellFee applies the sell fee to the token amount
// Returns: amountAfterFee, feeAmount
func ApplySellFee(amount int64) (int64, int64) {
	feeAmount := (amount * SELL_FEE_NUMERATOR) / SELL_FEE_DENOMINATOR
	amountAfterFee := amount - feeAmount
	return amountAfterFee, feeAmount
}

// GetPrice calculates the current price of the token in fandom tokens
// Price = virtualFandomReserves / (virtualTokenReserves / TOKEN_DECIMALS)
// Returns price as a decimal string (e.g. "0.00003")
func GetPrice(denom *types.Denom) (string, error) {
	if !denom.BondingCurveEnabled {
		return "0", fmt.Errorf("bonding curve not enabled for this denom")
	}

	if denom.VirtualTokenReserves <= 0 {
		return "0", fmt.Errorf("invalid token reserves")
	}

	// Calculate price using float64 to preserve decimal precision
	// price = (virtualFandomReserves / FANDOMCHAIN_DECIMALS) / (virtualTokenReserves / TOKEN_DECIMALS)
	fandomReservesFloat := float64(denom.VirtualFandomReserves)
	tokenReservesFloat := float64(denom.VirtualTokenReserves)
	
	// Convert to display units
	fandomChainDecimalsFloat := float64(FANDOMCHAIN_DECIMALS)
	tokenDecimalsFloat := float64(TOKEN_DECIMALS)

	// Calculate price in FandomChain display units per token
	fandomReservesAdjusted := fandomReservesFloat / fandomChainDecimalsFloat
	tokenReservesAdjusted := tokenReservesFloat / tokenDecimalsFloat

	price := fandomReservesAdjusted / tokenReservesAdjusted

	return fmt.Sprintf("%.6f", price), nil
}

// GetBondingProgress calculates the progress of the bonding curve (0-100%)
func GetBondingProgress(denom *types.Denom) (string, int64, int64, error) {
	if !denom.BondingCurveEnabled {
		return "0", 0, 0, fmt.Errorf("bonding curve not enabled for this denom")
	}

	if denom.InitialRealTokenReserves <= 0 {
		return "0", 0, 0, fmt.Errorf("invalid initial reserves")
	}

	// If we still have all or more tokens, progress is 0
	if denom.RealTokenReserves >= denom.InitialRealTokenReserves {
		return "0", 0, denom.InitialRealTokenReserves, nil
	}

	// Calculate tokens sold
	tokensSold := denom.InitialRealTokenReserves - denom.RealTokenReserves

	// Calculate progress percentage
	progressBig := math.NewInt(tokensSold)
	progressBig = progressBig.Mul(math.NewInt(100))
	progressBig = progressBig.Quo(math.NewInt(denom.InitialRealTokenReserves))

	return progressBig.String(), tokensSold, denom.RealTokenReserves, nil
}

// ValidateTrade validates a trade operation
func ValidateTrade(denom *types.Denom, amount int64, isBuy bool) error {
	// Check if bonding curve is enabled
	if !denom.BondingCurveEnabled {
		return fmt.Errorf("bonding curve not enabled for this denom")
	}

	// Check positive amounts
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}

	// Check minimum trade amount
	if amount < MIN_TRADE_AMOUNT {
		return fmt.Errorf("amount below minimum trade amount")
	}

	// Check liquidity
	if isBuy {
		if denom.RealTokenReserves <= 0 {
			return fmt.Errorf("no tokens available")
		}
	} else {
		if denom.RealFandomReserves <= 0 {
			return fmt.Errorf("insufficient fandom liquidity")
		}
	}

	// Check virtual reserves
	if denom.VirtualTokenReserves <= 0 || denom.VirtualFandomReserves <= 0 {
		return fmt.Errorf("invalid virtual reserves")
	}

	return nil
}

// CalculatePriceImpact calculates the price impact of a trade
// Takes price strings from GetPrice() and returns percentage as string
func CalculatePriceImpact(oldPriceStr, newPriceStr string) string {
	// Parse prices from strings to float64
	var oldPrice, newPrice float64
	fmt.Sscanf(oldPriceStr, "%f", &oldPrice)
	fmt.Sscanf(newPriceStr, "%f", &newPrice)
	
	if oldPrice <= 0 {
		return "0.00"
	}

	// priceImpact = abs((newPrice - oldPrice) / oldPrice) * 100
	diff := newPrice - oldPrice
	if diff < 0 {
		diff = -diff
	}


	impact := (diff / oldPrice) * 100.0
	return fmt.Sprintf("%.6f", impact)
}

// ValidateSlippage validates that the output meets the minimum expected
func ValidateSlippage(actualOut, minOut int64) error {
	if actualOut < minOut {
		return fmt.Errorf("slippage too high: expected at least %d, got %d", minOut, actualOut)
	}
	return nil
}
