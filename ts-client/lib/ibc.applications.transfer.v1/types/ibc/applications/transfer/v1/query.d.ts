import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { Denom } from "./token";
import { Params } from "./transfer";
export declare const protobufPackage = "ibc.applications.transfer.v1";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params?: Params | undefined;
}
/**
 * QueryDenomRequest is the request type for the Query/Denom RPC
 * method
 */
export interface QueryDenomRequest {
    /** hash (in hex format) or denom (full denom with ibc prefix) of the on chain denomination. */
    hash: string;
}
/**
 * QueryDenomResponse is the response type for the Query/Denom RPC
 * method.
 */
export interface QueryDenomResponse {
    /** denom returns the requested denomination. */
    denom?: Denom | undefined;
}
/**
 * QueryDenomsRequest is the request type for the Query/Denoms RPC
 * method
 */
export interface QueryDenomsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination?: PageRequest | undefined;
}
/**
 * QueryDenomsResponse is the response type for the Query/Denoms RPC
 * method.
 */
export interface QueryDenomsResponse {
    /** denoms returns all denominations. */
    denoms: Denom[];
    /** pagination defines the pagination in the response. */
    pagination?: PageResponse | undefined;
}
/**
 * QueryDenomHashRequest is the request type for the Query/DenomHash RPC
 * method
 */
export interface QueryDenomHashRequest {
    /** The denomination trace ([port_id]/[channel_id])+/[denom] */
    trace: string;
}
/**
 * QueryDenomHashResponse is the response type for the Query/DenomHash RPC
 * method.
 */
export interface QueryDenomHashResponse {
    /** hash (in hex format) of the denomination trace information. */
    hash: string;
}
/** QueryEscrowAddressRequest is the request type for the EscrowAddress RPC method. */
export interface QueryEscrowAddressRequest {
    /** unique port identifier */
    portId: string;
    /** unique channel identifier */
    channelId: string;
}
/** QueryEscrowAddressResponse is the response type of the EscrowAddress RPC method. */
export interface QueryEscrowAddressResponse {
    /** the escrow account address */
    escrowAddress: string;
}
/** QueryTotalEscrowForDenomRequest is the request type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomRequest {
    denom: string;
}
/** QueryTotalEscrowForDenomResponse is the response type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomResponse {
    amount?: Coin | undefined;
}
export declare const QueryParamsRequest: MessageFns<QueryParamsRequest>;
export declare const QueryParamsResponse: MessageFns<QueryParamsResponse>;
export declare const QueryDenomRequest: MessageFns<QueryDenomRequest>;
export declare const QueryDenomResponse: MessageFns<QueryDenomResponse>;
export declare const QueryDenomsRequest: MessageFns<QueryDenomsRequest>;
export declare const QueryDenomsResponse: MessageFns<QueryDenomsResponse>;
export declare const QueryDenomHashRequest: MessageFns<QueryDenomHashRequest>;
export declare const QueryDenomHashResponse: MessageFns<QueryDenomHashResponse>;
export declare const QueryEscrowAddressRequest: MessageFns<QueryEscrowAddressRequest>;
export declare const QueryEscrowAddressResponse: MessageFns<QueryEscrowAddressResponse>;
export declare const QueryTotalEscrowForDenomRequest: MessageFns<QueryTotalEscrowForDenomRequest>;
export declare const QueryTotalEscrowForDenomResponse: MessageFns<QueryTotalEscrowForDenomResponse>;
/** Query provides defines the gRPC querier service. */
export interface Query {
    /** Params queries all parameters of the ibc-transfer module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Denoms queries all denominations */
    Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
    /** Denom queries a denomination */
    Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
    /** DenomHash queries a denomination hash information. */
    DenomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse>;
    /** EscrowAddress returns the escrow address for a particular port and channel id. */
    EscrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse>;
    /** TotalEscrowForDenom returns the total amount of tokens in escrow based on the denom. */
    TotalEscrowForDenom(request: QueryTotalEscrowForDenomRequest): Promise<QueryTotalEscrowForDenomResponse>;
}
export declare const QueryServiceName = "ibc.applications.transfer.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
    Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
    DenomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse>;
    EscrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse>;
    TotalEscrowForDenom(request: QueryTotalEscrowForDenomRequest): Promise<QueryTotalEscrowForDenomResponse>;
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
