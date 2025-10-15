import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Any } from "../../../../google/protobuf/any";
export declare const protobufPackage = "ibc.applications.interchain_accounts.v1";
/**
 * Type defines a classification of message issued from a controller chain to its associated interchain accounts
 * host
 */
export declare enum Type {
    /** TYPE_UNSPECIFIED - Default zero value enumeration */
    TYPE_UNSPECIFIED = 0,
    /** TYPE_EXECUTE_TX - Execute a transaction on an interchain accounts host chain */
    TYPE_EXECUTE_TX = 1,
    UNRECOGNIZED = -1
}
export declare function typeFromJSON(object: any): Type;
export declare function typeToJSON(object: Type): string;
/** InterchainAccountPacketData is comprised of a raw transaction, type of transaction and optional memo field. */
export interface InterchainAccountPacketData {
    type: Type;
    data: Uint8Array;
    memo: string;
}
/** CosmosTx contains a list of sdk.Msg's. It should be used when sending transactions to an SDK host chain. */
export interface CosmosTx {
    messages: Any[];
}
export declare const InterchainAccountPacketData: MessageFns<InterchainAccountPacketData>;
export declare const CosmosTx: MessageFns<CosmosTx>;
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
