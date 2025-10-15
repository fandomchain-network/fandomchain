import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgUpdateParams } from "./types/fandomchain/tokenfactory/v1/tx";
import { MsgCreateDenom } from "./types/fandomchain/tokenfactory/v1/tx";
import { MsgBuyWithBondingCurve } from "./types/fandomchain/tokenfactory/v1/tx";
import { MsgSellWithBondingCurve } from "./types/fandomchain/tokenfactory/v1/tx";
export { MsgUpdateParams, MsgCreateDenom, MsgBuyWithBondingCurve, MsgSellWithBondingCurve };
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCreateDenomParams = {
    value: MsgCreateDenom;
    fee?: StdFee;
    memo?: string;
};
type sendMsgBuyWithBondingCurveParams = {
    value: MsgBuyWithBondingCurve;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSellWithBondingCurveParams = {
    value: MsgSellWithBondingCurve;
    fee?: StdFee;
    memo?: string;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgCreateDenomParams = {
    value: MsgCreateDenom;
};
type msgBuyWithBondingCurveParams = {
    value: MsgBuyWithBondingCurve;
};
type msgSellWithBondingCurveParams = {
    value: MsgSellWithBondingCurve;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgCreateDenom({ value, fee, memo }: sendMsgCreateDenomParams): Promise<DeliverTxResponse>;
    sendMsgBuyWithBondingCurve({ value, fee, memo }: sendMsgBuyWithBondingCurveParams): Promise<DeliverTxResponse>;
    sendMsgSellWithBondingCurve({ value, fee, memo }: sendMsgSellWithBondingCurveParams): Promise<DeliverTxResponse>;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgCreateDenom({ value }: msgCreateDenomParams): EncodeObject;
    msgBuyWithBondingCurve({ value }: msgBuyWithBondingCurveParams): EncodeObject;
    msgSellWithBondingCurve({ value }: msgSellWithBondingCurveParams): EncodeObject;
};
interface QueryClientOptions {
    addr: string;
}
export declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Api<unknown>;
declare class SDKModule {
    query: ReturnType<typeof queryClient>;
    tx: ReturnType<typeof txClient>;
    structure: Record<string, unknown>;
    registry: Array<[string, GeneratedType]>;
    constructor(client: IgniteClient);
    updateTX(client: IgniteClient): void;
}
declare const IgntModule: (test: IgniteClient) => {
    module: {
        FandomchainTokenfactoryV_1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
