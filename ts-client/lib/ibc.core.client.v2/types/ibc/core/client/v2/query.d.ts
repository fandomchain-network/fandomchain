import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Config } from "./config";
import { CounterpartyInfo } from "./counterparty";
export declare const protobufPackage = "ibc.core.client.v2";
/**
 * QueryCounterpartyInfoRequest is the request type for the Query/CounterpartyInfo RPC
 * method
 */
export interface QueryCounterpartyInfoRequest {
    /** client state unique identifier */
    clientId: string;
}
/**
 * QueryCounterpartyInfoResponse is the response type for the
 * Query/CounterpartyInfo RPC method.
 */
export interface QueryCounterpartyInfoResponse {
    counterpartyInfo?: CounterpartyInfo | undefined;
}
/** QueryConfigRequest is the request type for the Query/Config RPC method */
export interface QueryConfigRequest {
    /** client state unique identifier */
    clientId: string;
}
/** QueryConfigResponse is the response type for the Query/Config RPC method */
export interface QueryConfigResponse {
    config?: Config | undefined;
}
export declare const QueryCounterpartyInfoRequest: MessageFns<QueryCounterpartyInfoRequest>;
export declare const QueryCounterpartyInfoResponse: MessageFns<QueryCounterpartyInfoResponse>;
export declare const QueryConfigRequest: MessageFns<QueryConfigRequest>;
export declare const QueryConfigResponse: MessageFns<QueryConfigResponse>;
/** Query provides defines the gRPC querier service */
export interface Query {
    /** CounterpartyInfo queries an IBC light counter party info. */
    CounterpartyInfo(request: QueryCounterpartyInfoRequest): Promise<QueryCounterpartyInfoResponse>;
    /** Config queries the IBC client v2 configuration for a given client. */
    Config(request: QueryConfigRequest): Promise<QueryConfigResponse>;
}
export declare const QueryServiceName = "ibc.core.client.v2.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    CounterpartyInfo(request: QueryCounterpartyInfoRequest): Promise<QueryCounterpartyInfoResponse>;
    Config(request: QueryConfigRequest): Promise<QueryConfigResponse>;
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
