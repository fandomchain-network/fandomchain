import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { EpochInfo } from "./genesis";
export declare const protobufPackage = "cosmos.epochs.v1beta1";
/**
 * QueryEpochInfosRequest defines the gRPC request structure for
 * querying all epoch info.
 */
export interface QueryEpochInfosRequest {
}
/**
 * QueryEpochInfosRequest defines the gRPC response structure for
 * querying all epoch info.
 */
export interface QueryEpochInfosResponse {
    epochs: EpochInfo[];
}
/**
 * QueryCurrentEpochRequest defines the gRPC request structure for
 * querying an epoch by its identifier.
 */
export interface QueryCurrentEpochRequest {
    identifier: string;
}
/**
 * QueryCurrentEpochResponse defines the gRPC response structure for
 * querying an epoch by its identifier.
 */
export interface QueryCurrentEpochResponse {
    currentEpoch: number;
}
export declare const QueryEpochInfosRequest: MessageFns<QueryEpochInfosRequest>;
export declare const QueryEpochInfosResponse: MessageFns<QueryEpochInfosResponse>;
export declare const QueryCurrentEpochRequest: MessageFns<QueryCurrentEpochRequest>;
export declare const QueryCurrentEpochResponse: MessageFns<QueryCurrentEpochResponse>;
/** Query defines the gRPC querier service. */
export interface Query {
    /** EpochInfos provide running epochInfos */
    EpochInfos(request: QueryEpochInfosRequest): Promise<QueryEpochInfosResponse>;
    /** CurrentEpoch provide current epoch of specified identifier */
    CurrentEpoch(request: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse>;
}
export declare const QueryServiceName = "cosmos.epochs.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    EpochInfos(request: QueryEpochInfosRequest): Promise<QueryEpochInfosResponse>;
    CurrentEpoch(request: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
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
