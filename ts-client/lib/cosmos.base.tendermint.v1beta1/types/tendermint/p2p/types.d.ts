import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
export declare const protobufPackage = "tendermint.p2p";
export interface NetAddress {
    id: string;
    ip: string;
    port: number;
}
export interface ProtocolVersion {
    p2p: Long;
    block: Long;
    app: Long;
}
export interface DefaultNodeInfo {
    protocolVersion?: ProtocolVersion | undefined;
    defaultNodeId: string;
    listenAddr: string;
    network: string;
    version: string;
    channels: Uint8Array;
    moniker: string;
    other?: DefaultNodeInfoOther | undefined;
}
export interface DefaultNodeInfoOther {
    txIndex: string;
    rpcAddress: string;
}
export declare const NetAddress: MessageFns<NetAddress>;
export declare const ProtocolVersion: MessageFns<ProtocolVersion>;
export declare const DefaultNodeInfo: MessageFns<DefaultNodeInfo>;
export declare const DefaultNodeInfoOther: MessageFns<DefaultNodeInfoOther>;
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
