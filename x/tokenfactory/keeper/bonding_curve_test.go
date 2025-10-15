package keeper_test

import (
	"testing"

	"fandomChain/x/tokenfactory/keeper"
	"fandomChain/x/tokenfactory/types"

	"github.com/stretchr/testify/require"
)

func TestCalculateTokensOut(t *testing.T) {
	tests := []struct {
		name              string
		fandomReserves    int64
		tokenReserves     int64
		fandomIn          int64
		expectError       bool
		expectedMinTokens int64 // Minimum tokens we expect to receive
	}{
		{
			name:              "valid buy with small amount",
			fandomReserves:    30_000_000_000,
			tokenReserves:     1_073_000_000_000_000,
			fandomIn:          1_000_000_000, // 1 fandom token
			expectError:       false,
			expectedMinTokens: 1_000_000_000,
		},
		{
			name:           "zero fandom in",
			fandomReserves: 30_000_000_000,
			tokenReserves:  1_073_000_000_000_000,
			fandomIn:       0,
			expectError:    true,
		},
		{
			name:           "negative fandom in",
			fandomReserves: 30_000_000_000,
			tokenReserves:  1_073_000_000_000_000,
			fandomIn:       -1,
			expectError:    true,
		},
		{
			name:           "zero reserves",
			fandomReserves: 0,
			tokenReserves:  1_073_000_000_000_000,
			fandomIn:       1_000_000_000,
			expectError:    true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tokensOut, err := keeper.CalculateTokensOut(tt.fandomReserves, tt.tokenReserves, tt.fandomIn)

			if tt.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.Positive(t, tokensOut)
				if tt.expectedMinTokens > 0 {
					require.GreaterOrEqual(t, tokensOut, tt.expectedMinTokens)
				}
			}
		})
	}
}

func TestCalculateFandomOut(t *testing.T) {
	tests := []struct {
		name              string
		tokenReserves     int64
		fandomReserves    int64
		tokenIn           int64
		expectError       bool
		expectedMinFandom int64
	}{
		{
			name:              "valid sell with small amount",
			tokenReserves:     1_073_000_000_000_000,
			fandomReserves:    30_000_000_000,
			tokenIn:           1_000_000_000_000,
			expectError:       false,
			expectedMinFandom: 1,
		},
		{
			name:           "zero token in",
			tokenReserves:  1_073_000_000_000_000,
			fandomReserves: 30_000_000_000,
			tokenIn:        0,
			expectError:    true,
		},
		{
			name:           "negative token in",
			tokenReserves:  1_073_000_000_000_000,
			fandomReserves: 30_000_000_000,
			tokenIn:        -1,
			expectError:    true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fandomOut, err := keeper.CalculateFandomOut(tt.tokenReserves, tt.fandomReserves, tt.tokenIn)

			if tt.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.Positive(t, fandomOut)
				if tt.expectedMinFandom > 0 {
					require.GreaterOrEqual(t, fandomOut, tt.expectedMinFandom)
				}
			}
		})
	}
}

func TestApplyBuyFee(t *testing.T) {
	amount := int64(100_000_000_000)
	amountAfterFee, feeAmount := keeper.ApplyBuyFee(amount)

	// 1% fee
	expectedFee := amount / 100
	expectedAfterFee := amount - expectedFee

	require.Equal(t, expectedFee, feeAmount)
	require.Equal(t, expectedAfterFee, amountAfterFee)
}

func TestApplySellFee(t *testing.T) {
	amount := int64(100_000_000_000)
	amountAfterFee, feeAmount := keeper.ApplySellFee(amount)

	// 1% fee
	expectedFee := amount / 100
	expectedAfterFee := amount - expectedFee

	require.Equal(t, expectedFee, feeAmount)
	require.Equal(t, expectedAfterFee, amountAfterFee)
}

func TestGetPrice(t *testing.T) {
	tests := []struct {
		name          string
		denom         types.Denom
		expectError   bool
		expectedPrice string
	}{
		{
			name: "valid bonding curve",
			denom: types.Denom{
				BondingCurveEnabled:   true,
				VirtualFandomReserves: 30_000_000_000,
				VirtualTokenReserves:  1_073_000_000_000_000,
			},
			expectError: false,
		},
		{
			name: "bonding curve disabled",
			denom: types.Denom{
				BondingCurveEnabled: false,
			},
			expectError: true,
		},
		{
			name: "zero token reserves",
			denom: types.Denom{
				BondingCurveEnabled:   true,
				VirtualFandomReserves: 30_000_000_000,
				VirtualTokenReserves:  0,
			},
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			price, err := keeper.GetPrice(&tt.denom)

			if tt.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.NotEmpty(t, price)
			}
		})
	}
}

func TestGetBondingProgress(t *testing.T) {
	tests := []struct {
		name        string
		denom       types.Denom
		expectError bool
	}{
		{
			name: "progress at 50%",
			denom: types.Denom{
				BondingCurveEnabled:      true,
				InitialRealTokenReserves: 1_000_000,
				RealTokenReserves:        500_000,
			},
			expectError: false,
		},
		{
			name: "no progress yet",
			denom: types.Denom{
				BondingCurveEnabled:      true,
				InitialRealTokenReserves: 1_000_000,
				RealTokenReserves:        1_000_000,
			},
			expectError: false,
		},
		{
			name: "bonding curve disabled",
			denom: types.Denom{
				BondingCurveEnabled: false,
			},
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			progress, tokensSold, tokensRemaining, err := keeper.GetBondingProgress(&tt.denom)

			if tt.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.NotEmpty(t, progress)
				require.GreaterOrEqual(t, tokensSold, int64(0))
				require.GreaterOrEqual(t, tokensRemaining, int64(0))
			}
		})
	}
}

func TestValidateTrade(t *testing.T) {
	validDenom := types.Denom{
		BondingCurveEnabled:   true,
		VirtualTokenReserves:  1_073_000_000_000_000,
		VirtualFandomReserves: 30_000_000_000,
		RealTokenReserves:     793_100_000_000_000,
		RealFandomReserves:    1_000_000_000,
	}

	tests := []struct {
		name        string
		denom       types.Denom
		amount      int64
		isBuy       bool
		expectError bool
	}{
		{
			name:        "valid buy",
			denom:       validDenom,
			amount:      1_000_000_000,
			isBuy:       true,
			expectError: false,
		},
		{
			name:        "valid sell",
			denom:       validDenom,
			amount:      1_000_000_000,
			isBuy:       false,
			expectError: false,
		},
		{
			name: "bonding curve disabled",
			denom: types.Denom{
				BondingCurveEnabled: false,
			},
			amount:      1_000_000_000,
			isBuy:       true,
			expectError: true,
		},
		{
			name:        "zero amount",
			denom:       validDenom,
			amount:      0,
			isBuy:       true,
			expectError: true,
		},
		{
			name:        "negative amount",
			denom:       validDenom,
			amount:      -1,
			isBuy:       true,
			expectError: true,
		},
		{
			name: "no tokens available",
			denom: types.Denom{
				BondingCurveEnabled:   true,
				VirtualTokenReserves:  1_073_000_000_000_000,
				VirtualFandomReserves: 30_000_000_000,
				RealTokenReserves:     0,
				RealFandomReserves:    1_000_000_000,
			},
			amount:      1_000_000_000,
			isBuy:       true,
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := keeper.ValidateTrade(&tt.denom, tt.amount, tt.isBuy)

			if tt.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestValidateSlippage(t *testing.T) {
	tests := []struct {
		name        string
		actualOut   int64
		minOut      int64
		expectError bool
	}{
		{
			name:        "output meets minimum",
			actualOut:   100,
			minOut:      90,
			expectError: false,
		},
		{
			name:        "output exactly minimum",
			actualOut:   100,
			minOut:      100,
			expectError: false,
		},
		{
			name:        "output below minimum",
			actualOut:   80,
			minOut:      100,
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := keeper.ValidateSlippage(tt.actualOut, tt.minOut)

			if tt.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestInitializeBondingCurve(t *testing.T) {
	denom := &types.Denom{}
	keeper.InitializeBondingCurve(denom)

	require.True(t, denom.BondingCurveEnabled)
	require.Equal(t, keeper.INITIAL_VIRTUAL_TOKEN_RESERVES, denom.VirtualTokenReserves)
	require.Equal(t, keeper.INITIAL_VIRTUAL_FANDOM_RESERVES, denom.VirtualFandomReserves)
	require.Equal(t, keeper.INITIAL_REAL_TOKEN_RESERVES, denom.RealTokenReserves)
	require.Equal(t, keeper.INITIAL_REAL_FANDOM_RESERVES, denom.RealFandomReserves)
	require.Equal(t, keeper.INITIAL_VIRTUAL_TOKEN_RESERVES, denom.InitialVirtualTokenReserves)
	require.Equal(t, keeper.INITIAL_VIRTUAL_FANDOM_RESERVES, denom.InitialVirtualFandomReserves)
	require.Equal(t, keeper.INITIAL_REAL_TOKEN_RESERVES, denom.InitialRealTokenReserves)
}
