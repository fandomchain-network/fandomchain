package keeper

import (
	"context"
	"fmt"

	"fandomChain/x/tokenfactory/types"

	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) CreateDenom(ctx context.Context, msg *types.MsgCreateDenom) (*types.MsgCreateDenomResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidAddress, fmt.Sprintf("invalid address: %s", err))
	}

	// Check if the value already exists
	ok, err := k.Denom.Has(ctx, msg.Denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	} else if ok {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "index already set")
	}

	var denom = types.Denom{
		Owner:       msg.Owner,
		Denom:       msg.Denom,
		Description: msg.Description,
		Ticker:      msg.Ticker,
		Url:         msg.Url,
		Precision:   TOKEN_DECIMALS,
	}

	// Initialize bonding curve
	InitializeBondingCurve(&denom)

	if err := k.Denom.Set(ctx, denom.Denom, denom); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	// Mint tokens for the bonding curve pool (held by module account)
	err = k.bankKeeper.MintCoins(ctx, "tokenfactory", sdk.NewCoins(sdk.NewCoin(denom.Denom, math.NewInt(denom.RealTokenReserves))))
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to mint coins: %s", err))
	}
	// Tokens remain in module account for bonding curve trading

	return &types.MsgCreateDenomResponse{}, nil
}

func (k msgServer) BuyWithBondingCurve(ctx context.Context, msg *types.MsgBuyWithBondingCurve) (*types.MsgBuyWithBondingCurveResponse, error) {
	// Convert string address to AccAddress
	buyerAddr, err := k.addressCodec.StringToBytes(msg.Buyer)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidAddress, fmt.Sprintf("invalid buyer address: %s", err))
	}

	// Get the denom
	denom, err := k.Denom.Get(ctx, msg.Denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("denom not found: %s", err))
	}

	// Validate trade
	if err := ValidateTrade(&denom, msg.FandomAmount, true); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, err.Error())
	}

	// Apply buy fee
	fandomAfterFee, _ := ApplyBuyFee(msg.FandomAmount)

	// Calculate tokens out using virtual reserves
	tokensOut, err := CalculateTokensOut(denom.VirtualFandomReserves, denom.VirtualTokenReserves, fandomAfterFee)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to calculate tokens out: %s", err))
	}

	// Validate slippage
	if err := ValidateSlippage(tokensOut, msg.MinTokensOut); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, err.Error())
	}

	// Check if we have enough real tokens
	if tokensOut > denom.RealTokenReserves {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "insufficient token reserves")
	}

	// Check if buyer has enough fandom tokens
	spendableCoins := k.bankKeeper.SpendableCoins(ctx, buyerAddr)
	fandomBalance := spendableCoins.AmountOf("fandomChain")
	if fandomBalance.Int64() < msg.FandomAmount {
		return nil, errorsmod.Wrap(sdkerrors.ErrInsufficientFunds, "insufficient fandom balance")
	}

	// Get module address for holding bonding curve funds
	moduleAddr := k.authKeeper.GetModuleAddress("tokenfactory")
	if moduleAddr == nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, "failed to get module address")
	}

	// Transfer fandom tokens from buyer to module
	err = k.bankKeeper.SendCoins(ctx, buyerAddr, moduleAddr, sdk.NewCoins(sdk.NewCoin("fandomChain", math.NewInt(msg.FandomAmount))))
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to send fandom coins: %s", err))
	}

	// Transfer tokens from module to buyer
	err = k.bankKeeper.SendCoins(ctx, moduleAddr, buyerAddr, sdk.NewCoins(sdk.NewCoin(denom.Denom, math.NewInt(tokensOut))))
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to send tokens: %s", err))
	}

	// Update virtual reserves
	denom.VirtualFandomReserves += fandomAfterFee
	denom.VirtualTokenReserves -= tokensOut

	// Update real reserves
	denom.RealFandomReserves += msg.FandomAmount
	denom.RealTokenReserves -= tokensOut

	// Save updated denom
	if err := k.Denom.Set(ctx, denom.Denom, denom); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, "failed to update denom")
	}

	return &types.MsgBuyWithBondingCurveResponse{
		TokensReceived: tokensOut,
	}, nil
}

func (k msgServer) SellWithBondingCurve(ctx context.Context, msg *types.MsgSellWithBondingCurve) (*types.MsgSellWithBondingCurveResponse, error) {
	// Convert string address to AccAddress
	sellerAddr, err := k.addressCodec.StringToBytes(msg.Seller)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidAddress, fmt.Sprintf("invalid seller address: %s", err))
	}

	// Get the denom
	denom, err := k.Denom.Get(ctx, msg.Denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("denom not found: %s", err))
	}

	// Validate trade
	if err := ValidateTrade(&denom, msg.TokenAmount, false); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, err.Error())
	}

	// Apply sell fee
	tokensAfterFee, _ := ApplySellFee(msg.TokenAmount)

	// Calculate fandom out using virtual reserves
	fandomOut, err := CalculateFandomOut(denom.VirtualTokenReserves, denom.VirtualFandomReserves, tokensAfterFee)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to calculate fandom out: %s", err))
	}

	// Validate slippage
	if err := ValidateSlippage(fandomOut, msg.MinFandomOut); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, err.Error())
	}

	// Check if we have enough fandom in reserves
	if fandomOut > denom.RealFandomReserves {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "insufficient fandom reserves")
	}

	// Check if seller has enough tokens
	spendableCoins := k.bankKeeper.SpendableCoins(ctx, sellerAddr)
	tokenBalance := spendableCoins.AmountOf(denom.Denom)
	if tokenBalance.Int64() < msg.TokenAmount {
		return nil, errorsmod.Wrap(sdkerrors.ErrInsufficientFunds, "insufficient token balance")
	}

	// Get module address
	moduleAddr := k.authKeeper.GetModuleAddress("tokenfactory")
	if moduleAddr == nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, "failed to get module address")
	}

	// Transfer tokens from seller to module
	err = k.bankKeeper.SendCoins(ctx, sellerAddr, moduleAddr, sdk.NewCoins(sdk.NewCoin(denom.Denom, math.NewInt(msg.TokenAmount))))
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to send tokens: %s", err))
	}

	// Transfer fandom from module to seller
	err = k.bankKeeper.SendCoins(ctx, moduleAddr, sellerAddr, sdk.NewCoins(sdk.NewCoin("fandomChain", math.NewInt(fandomOut))))
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, fmt.Sprintf("failed to send fandom coins: %s", err))
	}

	// Update virtual reserves
	denom.VirtualTokenReserves += tokensAfterFee
	denom.VirtualFandomReserves -= fandomOut

	// Update real reserves
	denom.RealTokenReserves += msg.TokenAmount
	denom.RealFandomReserves -= fandomOut

	// Save updated denom
	if err := k.Denom.Set(ctx, denom.Denom, denom); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, "failed to update denom")
	}

	return &types.MsgSellWithBondingCurveResponse{
		FandomReceived: fandomOut,
	}, nil
}
