import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Grant, GrantAuthorization } from "./authz";
export declare const protobufPackage = "cosmos.authz.v1beta1";
/** QueryGrantsRequest is the request type for the Query/Grants RPC method. */
export interface QueryGrantsRequest {
    granter: string;
    grantee: string;
    /** Optional, msg_type_url, when set, will query only grants matching given msg type. */
    msgTypeUrl: string;
    /** pagination defines an pagination for the request. */
    pagination?: PageRequest | undefined;
}
/** QueryGrantsResponse is the response type for the Query/Authorizations RPC method. */
export interface QueryGrantsResponse {
    /** authorizations is a list of grants granted for grantee by granter. */
    grants: Grant[];
    /** pagination defines an pagination for the response. */
    pagination?: PageResponse | undefined;
}
/** QueryGranterGrantsRequest is the request type for the Query/GranterGrants RPC method. */
export interface QueryGranterGrantsRequest {
    granter: string;
    /** pagination defines an pagination for the request. */
    pagination?: PageRequest | undefined;
}
/** QueryGranterGrantsResponse is the response type for the Query/GranterGrants RPC method. */
export interface QueryGranterGrantsResponse {
    /** grants is a list of grants granted by the granter. */
    grants: GrantAuthorization[];
    /** pagination defines an pagination for the response. */
    pagination?: PageResponse | undefined;
}
/** QueryGranteeGrantsRequest is the request type for the Query/GranteeGrants RPC method. */
export interface QueryGranteeGrantsRequest {
    grantee: string;
    /** pagination defines an pagination for the request. */
    pagination?: PageRequest | undefined;
}
/** QueryGranteeGrantsResponse is the response type for the Query/GranteeGrants RPC method. */
export interface QueryGranteeGrantsResponse {
    /** grants is a list of grants granted to the grantee. */
    grants: GrantAuthorization[];
    /** pagination defines an pagination for the response. */
    pagination?: PageResponse | undefined;
}
export declare const QueryGrantsRequest: MessageFns<QueryGrantsRequest>;
export declare const QueryGrantsResponse: MessageFns<QueryGrantsResponse>;
export declare const QueryGranterGrantsRequest: MessageFns<QueryGranterGrantsRequest>;
export declare const QueryGranterGrantsResponse: MessageFns<QueryGranterGrantsResponse>;
export declare const QueryGranteeGrantsRequest: MessageFns<QueryGranteeGrantsRequest>;
export declare const QueryGranteeGrantsResponse: MessageFns<QueryGranteeGrantsResponse>;
/** Query defines the gRPC querier service. */
export interface Query {
    /** Returns list of `Authorization`, granted to the grantee by the granter. */
    Grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse>;
    /** GranterGrants returns list of `GrantAuthorization`, granted by granter. */
    GranterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse>;
    /** GranteeGrants returns a list of `GrantAuthorization` by grantee. */
    GranteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse>;
}
export declare const QueryServiceName = "cosmos.authz.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse>;
    GranterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse>;
    GranteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse>;
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
