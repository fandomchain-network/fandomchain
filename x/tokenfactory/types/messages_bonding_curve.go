package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgBuyWithBondingCurve{}
var _ sdk.Msg = &MsgSellWithBondingCurve{}

// MsgBuyWithBondingCurve validation

func (msg *MsgBuyWithBondingCurve) ValidateBasic() error {
	if _, err := sdk.AccAddressFromBech32(msg.Buyer); err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid buyer address: %s", err)
	}

	if msg.Denom == "" {
		return errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "denom cannot be empty")
	}

	if msg.FandomAmount <= 0 {
		return errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "fandom amount must be positive")
	}

	if msg.MinTokensOut < 0 {
		return errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "min tokens out cannot be negative")
	}

	return nil
}

// MsgSellWithBondingCurve validation

func (msg *MsgSellWithBondingCurve) ValidateBasic() error {
	if _, err := sdk.AccAddressFromBech32(msg.Seller); err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid seller address: %s", err)
	}

	if msg.Denom == "" {
		return errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "denom cannot be empty")
	}

	if msg.TokenAmount <= 0 {
		return errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "token amount must be positive")
	}

	if msg.MinFandomOut < 0 {
		return errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "min fandom out cannot be negative")
	}

	return nil
}
