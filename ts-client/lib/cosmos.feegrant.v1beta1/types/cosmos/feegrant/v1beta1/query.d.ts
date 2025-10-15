import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Grant } from "./feegrant";
export declare const protobufPackage = "cosmos.feegrant.v1beta1";
/** QueryAllowanceRequest is the request type for the Query/Allowance RPC method. */
export interface QueryAllowanceRequest {
    /** granter is the address of the user granting an allowance of their funds. */
    granter: string;
    /** grantee is the address of the user being granted an allowance of another user's funds. */
    grantee: string;
}
/** QueryAllowanceResponse is the response type for the Query/Allowance RPC method. */
export interface QueryAllowanceResponse {
    /** allowance is a allowance granted for grantee by granter. */
    allowance?: Grant | undefined;
}
/** QueryAllowancesRequest is the request type for the Query/Allowances RPC method. */
export interface QueryAllowancesRequest {
    grantee: string;
    /** pagination defines an pagination for the request. */
    pagination?: PageRequest | undefined;
}
/** QueryAllowancesResponse is the response type for the Query/Allowances RPC method. */
export interface QueryAllowancesResponse {
    /** allowances are allowance's granted for grantee by granter. */
    allowances: Grant[];
    /** pagination defines an pagination for the response. */
    pagination?: PageResponse | undefined;
}
/** QueryAllowancesByGranterRequest is the request type for the Query/AllowancesByGranter RPC method. */
export interface QueryAllowancesByGranterRequest {
    granter: string;
    /** pagination defines an pagination for the request. */
    pagination?: PageRequest | undefined;
}
/** QueryAllowancesByGranterResponse is the response type for the Query/AllowancesByGranter RPC method. */
export interface QueryAllowancesByGranterResponse {
    /** allowances that have been issued by the granter. */
    allowances: Grant[];
    /** pagination defines an pagination for the response. */
    pagination?: PageResponse | undefined;
}
export declare const QueryAllowanceRequest: MessageFns<QueryAllowanceRequest>;
export declare const QueryAllowanceResponse: MessageFns<QueryAllowanceResponse>;
export declare const QueryAllowancesRequest: MessageFns<QueryAllowancesRequest>;
export declare const QueryAllowancesResponse: MessageFns<QueryAllowancesResponse>;
export declare const QueryAllowancesByGranterRequest: MessageFns<QueryAllowancesByGranterRequest>;
export declare const QueryAllowancesByGranterResponse: MessageFns<QueryAllowancesByGranterResponse>;
/** Query defines the gRPC querier service. */
export interface Query {
    /** Allowance returns granted allwance to the grantee by the granter. */
    Allowance(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse>;
    /** Allowances returns all the grants for the given grantee address. */
    Allowances(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse>;
    /** AllowancesByGranter returns all the grants given by an address */
    AllowancesByGranter(request: QueryAllowancesByGranterRequest): Promise<QueryAllowancesByGranterResponse>;
}
export declare const QueryServiceName = "cosmos.feegrant.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Allowance(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse>;
    Allowances(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse>;
    AllowancesByGranter(request: QueryAllowancesByGranterRequest): Promise<QueryAllowancesByGranterResponse>;
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
