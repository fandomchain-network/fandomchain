import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Denom } from "./denom";
import { Params } from "./params";
export declare const protobufPackage = "fandomchain.tokenfactory.v1";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params?: Params | undefined;
}
/** QueryGetDenomRequest defines the QueryGetDenomRequest message. */
export interface QueryGetDenomRequest {
    denom: string;
}
/** QueryGetDenomResponse defines the QueryGetDenomResponse message. */
export interface QueryGetDenomResponse {
    denom?: Denom | undefined;
}
/** QueryAllDenomRequest defines the QueryAllDenomRequest message. */
export interface QueryAllDenomRequest {
    pagination?: PageRequest | undefined;
}
/** QueryAllDenomResponse defines the QueryAllDenomResponse message. */
export interface QueryAllDenomResponse {
    denom: Denom[];
    pagination?: PageResponse | undefined;
}
/** QueryGetBondingCurvePriceRequest defines the request for getting bonding curve price */
export interface QueryGetBondingCurvePriceRequest {
    denom: string;
}
/** QueryGetBondingCurvePriceResponse defines the response for bonding curve price */
export interface QueryGetBondingCurvePriceResponse {
    /** Price as a decimal string */
    price: string;
}
/** QueryGetBondingCurveProgressRequest defines the request for bonding curve progress */
export interface QueryGetBondingCurveProgressRequest {
    denom: string;
}
/** QueryGetBondingCurveProgressResponse defines the response for bonding curve progress */
export interface QueryGetBondingCurveProgressResponse {
    /** Progress as a percentage (0-100) */
    progress: string;
    tokensSold: Long;
    tokensRemaining: Long;
}
/** QueryEstimateBuyRequest defines the request for estimating a buy */
export interface QueryEstimateBuyRequest {
    denom: string;
    fandomAmount: Long;
}
/** QueryEstimateBuyResponse defines the response for estimating a buy */
export interface QueryEstimateBuyResponse {
    tokensOut: Long;
    /** Price impact as percentage */
    priceImpact: string;
}
/** QueryEstimateSellRequest defines the request for estimating a sell */
export interface QueryEstimateSellRequest {
    denom: string;
    tokenAmount: Long;
}
/** QueryEstimateSellResponse defines the response for estimating a sell */
export interface QueryEstimateSellResponse {
    fandomOut: Long;
    /** Price impact as percentage */
    priceImpact: string;
}
export declare const QueryParamsRequest: MessageFns<QueryParamsRequest>;
export declare const QueryParamsResponse: MessageFns<QueryParamsResponse>;
export declare const QueryGetDenomRequest: MessageFns<QueryGetDenomRequest>;
export declare const QueryGetDenomResponse: MessageFns<QueryGetDenomResponse>;
export declare const QueryAllDenomRequest: MessageFns<QueryAllDenomRequest>;
export declare const QueryAllDenomResponse: MessageFns<QueryAllDenomResponse>;
export declare const QueryGetBondingCurvePriceRequest: MessageFns<QueryGetBondingCurvePriceRequest>;
export declare const QueryGetBondingCurvePriceResponse: MessageFns<QueryGetBondingCurvePriceResponse>;
export declare const QueryGetBondingCurveProgressRequest: MessageFns<QueryGetBondingCurveProgressRequest>;
export declare const QueryGetBondingCurveProgressResponse: MessageFns<QueryGetBondingCurveProgressResponse>;
export declare const QueryEstimateBuyRequest: MessageFns<QueryEstimateBuyRequest>;
export declare const QueryEstimateBuyResponse: MessageFns<QueryEstimateBuyResponse>;
export declare const QueryEstimateSellRequest: MessageFns<QueryEstimateSellRequest>;
export declare const QueryEstimateSellResponse: MessageFns<QueryEstimateSellResponse>;
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** ListDenom Queries a list of Denom items. */
    GetDenom(request: QueryGetDenomRequest): Promise<QueryGetDenomResponse>;
    /** ListDenom defines the ListDenom RPC. */
    ListDenom(request: QueryAllDenomRequest): Promise<QueryAllDenomResponse>;
    /** GetBondingCurvePrice queries the current price of a denom in the bonding curve */
    GetBondingCurvePrice(request: QueryGetBondingCurvePriceRequest): Promise<QueryGetBondingCurvePriceResponse>;
    /** GetBondingCurveProgress queries the progress of a bonding curve */
    GetBondingCurveProgress(request: QueryGetBondingCurveProgressRequest): Promise<QueryGetBondingCurveProgressResponse>;
    /** EstimateBuy estimates how many tokens would be received for a given fandom amount */
    EstimateBuy(request: QueryEstimateBuyRequest): Promise<QueryEstimateBuyResponse>;
    /** EstimateSell estimates how many fandom tokens would be received for selling tokens */
    EstimateSell(request: QueryEstimateSellRequest): Promise<QueryEstimateSellResponse>;
}
export declare const QueryServiceName = "fandomchain.tokenfactory.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    GetDenom(request: QueryGetDenomRequest): Promise<QueryGetDenomResponse>;
    ListDenom(request: QueryAllDenomRequest): Promise<QueryAllDenomResponse>;
    GetBondingCurvePrice(request: QueryGetBondingCurvePriceRequest): Promise<QueryGetBondingCurvePriceResponse>;
    GetBondingCurveProgress(request: QueryGetBondingCurveProgressRequest): Promise<QueryGetBondingCurveProgressResponse>;
    EstimateBuy(request: QueryEstimateBuyRequest): Promise<QueryEstimateBuyResponse>;
    EstimateSell(request: QueryEstimateSellRequest): Promise<QueryEstimateSellResponse>;
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
