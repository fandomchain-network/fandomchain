package tokenfactory

import (
	autocliv1 "cosmossdk.io/api/cosmos/autocli/v1"

	"fandomChain/x/tokenfactory/types"
)

// AutoCLIOptions implements the autocli.HasAutoCLIConfig interface.
func (am AppModule) AutoCLIOptions() *autocliv1.ModuleOptions {
	return &autocliv1.ModuleOptions{
		Query: &autocliv1.ServiceCommandDescriptor{
			Service: types.Query_serviceDesc.ServiceName,
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "Params",
					Use:       "params",
					Short:     "Shows the parameters of the module",
				},
				{
					RpcMethod: "ListDenom",
					Use:       "list-denom",
					Short:     "List all Denom",
				},
				{
					RpcMethod:      "GetDenom",
					Use:            "get-denom [id]",
					Short:          "Gets a Denom",
					Alias:          []string{"show-denom"},
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}},
				},
				{
					RpcMethod:      "GetBondingCurvePrice",
					Use:            "get-bonding-curve-price [denom]",
					Short:          "Gets the bonding curve price",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}},
				},
				{
					RpcMethod:      "GetBondingCurveProgress",
					Use:            "get-bonding-curve-progress [denom]",
					Short:          "Gets the bonding curve progress",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}},
				},
				{
					RpcMethod:      "EstimateBuy",
					Use:            "estimate-buy [denom] [fandom-amount]",
					Short:          "Estimates tokens received for buying with fandom amount",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "fandom_amount"}},
				},
				{
					RpcMethod:      "EstimateSell",
					Use:            "estimate-sell [denom] [token-amount]",
					Short:          "Estimates fandom received for selling token amount",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "token_amount"}},
				},
				// this line is used by ignite scaffolding # autocli/query
			},
		},
		Tx: &autocliv1.ServiceCommandDescriptor{
			Service:              types.Msg_serviceDesc.ServiceName,
			EnhanceCustomCommand: true, // only required if you want to use the custom command
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "UpdateParams",
					Skip:      true, // skipped because authority gated
				},
				{
					RpcMethod:      "CreateDenom",
					Use:            "create-denom [denom] [description] [ticker] [url]",
					Short:          "Create a new Denom with bonding curve",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "description"}, {ProtoField: "ticker"}, {ProtoField: "url"}},
				},
				{
					RpcMethod:      "BuyWithBondingCurve",
					Use:            "buy-with-bonding-curve [buyer] [denom] [fandomAmount] [minTokensOut]",
					Short:          "Buy Denom with Bonding Curve",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "buyer"}, {ProtoField: "denom"}, {ProtoField: "fandomAmount"}, {ProtoField: "minTokensOut"}},
				},
				{
					RpcMethod:      "SellWithBondingCurve",
					Use:            "sell-with-bonding-curve [seller] [denom] [tokensIn] [minFandomOut]",
					Short:          "Sell Denom with Bonding Curve",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "seller"}, {ProtoField: "denom"}, {ProtoField: "tokenAmount"}, {ProtoField: "minFandomOut"}},
				},
				// this line is used by ignite scaffolding # autocli/tx
			},
		},
	}
}
