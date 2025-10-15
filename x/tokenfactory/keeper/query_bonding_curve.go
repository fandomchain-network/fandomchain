package keeper

import (
	"context"
	"fmt"

	"fandomChain/x/tokenfactory/types"

	errorsmod "cosmossdk.io/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// GetBondingCurvePrice returns the current price of a denom in the bonding curve
func (q queryServer) GetBondingCurvePrice(ctx context.Context, req *types.QueryGetBondingCurvePriceRequest) (*types.QueryGetBondingCurvePriceResponse, error) {
	if req == nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "empty request")
	}

	// Get the denom
	denom, err := q.k.Denom.Get(ctx, req.Denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("denom not found: %s", err))
	}

	// Calculate price
	price, err := GetPrice(&denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	return &types.QueryGetBondingCurvePriceResponse{
		Price: price,
	}, nil
}

// GetBondingCurveProgress returns the progress of a bonding curve
func (q queryServer) GetBondingCurveProgress(ctx context.Context, req *types.QueryGetBondingCurveProgressRequest) (*types.QueryGetBondingCurveProgressResponse, error) {
	if req == nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "empty request")
	}

	// Get the denom
	denom, err := q.k.Denom.Get(ctx, req.Denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("denom not found: %s", err))
	}

	// Calculate progress
	progress, tokensSold, tokensRemaining, err := GetBondingProgress(&denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	return &types.QueryGetBondingCurveProgressResponse{
		Progress:        progress,
		TokensSold:      tokensSold,
		TokensRemaining: tokensRemaining,
	}, nil
}

// EstimateBuy estimates how many tokens would be received for a given fandom amount
func (q queryServer) EstimateBuy(ctx context.Context, req *types.QueryEstimateBuyRequest) (*types.QueryEstimateBuyResponse, error) {
	if req == nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "empty request")
	}

	// Get the denom
	denom, err := q.k.Denom.Get(ctx, req.Denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("denom not found: %s", err))
	}

	if !denom.BondingCurveEnabled {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "bonding curve not enabled")
	}

	// Apply fee
	fandomAfterFee, _ := ApplyBuyFee(req.FandomAmount)

	// Calculate tokens out
	tokensOut, err := CalculateTokensOut(denom.VirtualFandomReserves, denom.VirtualTokenReserves, fandomAfterFee)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to calculate tokens out: %s", err))
	}

	// Calculate price before trade
	oldPrice, err := GetPrice(&denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to get old price: %s", err))
	}

	// Simulate new reserves after trade
	newDenom := denom
	newDenom.VirtualFandomReserves = denom.VirtualFandomReserves + fandomAfterFee
	newDenom.VirtualTokenReserves = denom.VirtualTokenReserves - tokensOut

	// Calculate price after trade
	newPrice, err := GetPrice(&newDenom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to get new price: %s", err))
	}

	// Calculate price impact percentage
	priceImpact := CalculatePriceImpact(oldPrice, newPrice)

	return &types.QueryEstimateBuyResponse{
		TokensOut:   tokensOut,
		PriceImpact: priceImpact,
	}, nil
}

// EstimateSell estimates how many fandom tokens would be received for selling tokens
func (q queryServer) EstimateSell(ctx context.Context, req *types.QueryEstimateSellRequest) (*types.QueryEstimateSellResponse, error) {
	if req == nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "empty request")
	}

	// Get the denom
	denom, err := q.k.Denom.Get(ctx, req.Denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("denom not found: %s", err))
	}

	if !denom.BondingCurveEnabled {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "bonding curve not enabled")
	}

	// Apply fee
	tokensAfterFee, _ := ApplySellFee(req.TokenAmount)

	// Calculate fandom out
	fandomOut, err := CalculateFandomOut(denom.VirtualTokenReserves, denom.VirtualFandomReserves, tokensAfterFee)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to calculate fandom out: %s", err))
	}

	// Calculate price before trade
	oldPrice, err := GetPrice(&denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to get old price: %s", err))
	}

	// Simulate new reserves after trade
	newDenom := denom
	newDenom.VirtualFandomReserves = denom.VirtualFandomReserves - fandomOut
	newDenom.VirtualTokenReserves = denom.VirtualTokenReserves + tokensAfterFee

	// Calculate price after trade
	newPrice, err := GetPrice(&newDenom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to get new price: %s", err))
	}

	// Calculate price impact percentage
	priceImpact := CalculatePriceImpact(oldPrice, newPrice)

	return &types.QueryEstimateSellResponse{
		FandomOut:   fandomOut,
		PriceImpact: priceImpact,
	}, nil
}
