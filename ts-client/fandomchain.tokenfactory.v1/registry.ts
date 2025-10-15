import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdateParams } from "./types/fandomchain/tokenfactory/v1/tx";
import { MsgCreateDenom } from "./types/fandomchain/tokenfactory/v1/tx";
import { MsgBuyWithBondingCurve } from "./types/fandomchain/tokenfactory/v1/tx";
import { MsgSellWithBondingCurve } from "./types/fandomchain/tokenfactory/v1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/fandomchain.tokenfactory.v1.MsgUpdateParams", MsgUpdateParams],
    ["/fandomchain.tokenfactory.v1.MsgCreateDenom", MsgCreateDenom],
    ["/fandomchain.tokenfactory.v1.MsgBuyWithBondingCurve", MsgBuyWithBondingCurve],
    ["/fandomchain.tokenfactory.v1.MsgSellWithBondingCurve", MsgSellWithBondingCurve],
    
];

export { msgTypes }