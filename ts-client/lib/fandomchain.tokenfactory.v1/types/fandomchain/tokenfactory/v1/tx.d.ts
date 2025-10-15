import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Params } from "./params";
export declare const protobufPackage = "fandomchain.tokenfactory.v1";
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /** NOTE: All parameters must be supplied. */
    params?: Params | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}
/** MsgCreateDenom defines the MsgCreateDenom message. */
export interface MsgCreateDenom {
    owner: string;
    denom: string;
    description: string;
    ticker: string;
    url: string;
}
/** MsgCreateDenomResponse defines the MsgCreateDenomResponse message. */
export interface MsgCreateDenomResponse {
}
/** MsgBuyWithBondingCurve defines the MsgBuyWithBondingCurve message. */
export interface MsgBuyWithBondingCurve {
    buyer: string;
    denom: string;
    /** Amount of FandomChain tokens to spend */
    fandomAmount: Long;
    /** Minimum tokens expected (slippage protection) */
    minTokensOut: Long;
}
/** MsgBuyWithBondingCurveResponse defines the response. */
export interface MsgBuyWithBondingCurveResponse {
    tokensReceived: Long;
}
/** MsgSellWithBondingCurve defines the MsgSellWithBondingCurve message. */
export interface MsgSellWithBondingCurve {
    seller: string;
    denom: string;
    /** Amount of tokens to sell */
    tokenAmount: Long;
    /** Minimum FandomChain tokens expected (slippage protection) */
    minFandomOut: Long;
}
/** MsgSellWithBondingCurveResponse defines the response. */
export interface MsgSellWithBondingCurveResponse {
    fandomReceived: Long;
}
export declare const MsgUpdateParams: MessageFns<MsgUpdateParams>;
export declare const MsgUpdateParamsResponse: MessageFns<MsgUpdateParamsResponse>;
export declare const MsgCreateDenom: MessageFns<MsgCreateDenom>;
export declare const MsgCreateDenomResponse: MessageFns<MsgCreateDenomResponse>;
export declare const MsgBuyWithBondingCurve: MessageFns<MsgBuyWithBondingCurve>;
export declare const MsgBuyWithBondingCurveResponse: MessageFns<MsgBuyWithBondingCurveResponse>;
export declare const MsgSellWithBondingCurve: MessageFns<MsgSellWithBondingCurve>;
export declare const MsgSellWithBondingCurveResponse: MessageFns<MsgSellWithBondingCurveResponse>;
/** Msg defines the Msg service. */
export interface Msg {
    /**
     * UpdateParams defines a (governance) operation for updating the module
     * parameters. The authority defaults to the x/gov module account.
     */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /** CreateDenom defines the CreateDenom RPC. */
    CreateDenom(request: MsgCreateDenom): Promise<MsgCreateDenomResponse>;
    /** BuyWithBondingCurve defines the BuyWithBondingCurve RPC. */
    BuyWithBondingCurve(request: MsgBuyWithBondingCurve): Promise<MsgBuyWithBondingCurveResponse>;
    /** SellWithBondingCurve defines the SellWithBondingCurve RPC. */
    SellWithBondingCurve(request: MsgSellWithBondingCurve): Promise<MsgSellWithBondingCurveResponse>;
}
export declare const MsgServiceName = "fandomchain.tokenfactory.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    CreateDenom(request: MsgCreateDenom): Promise<MsgCreateDenomResponse>;
    BuyWithBondingCurve(request: MsgBuyWithBondingCurve): Promise<MsgBuyWithBondingCurveResponse>;
    SellWithBondingCurve(request: MsgSellWithBondingCurve): Promise<MsgSellWithBondingCurveResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
export {};
