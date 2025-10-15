package types

func NewMsgCreateDenom(
	owner string,
	denom string,
	description string,
	ticker string,
	url string,
) *MsgCreateDenom {
	return &MsgCreateDenom{
		Owner:       owner,
		Denom:       denom,
		Description: description,
		Ticker:      ticker,
		Url:         url,
	}
}

func NewMsgBuyWithBondingCurve(
	buyer string,
	denom string,
	fandomAmount int64,
	minTokensOut int64,
) *MsgBuyWithBondingCurve {
	return &MsgBuyWithBondingCurve{
		Buyer:        buyer,
		Denom:        denom,
		FandomAmount: fandomAmount,
		MinTokensOut: minTokensOut,
	}
}

func NewMsgSellWithBondingCurve(
	seller string,
	denom string,
	tokenAmount int64,
	minFandomOut int64,
) *MsgSellWithBondingCurve {
	return &MsgSellWithBondingCurve{
		Seller:       seller,
		Denom:        denom,
		TokenAmount:  tokenAmount,
		MinFandomOut: minFandomOut,
	}
}
