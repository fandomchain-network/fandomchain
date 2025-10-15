import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
export declare const protobufPackage = "cosmos.crypto.multisig.v1beta1";
/**
 * MultiSignature wraps the signatures from a multisig.LegacyAminoPubKey.
 * See cosmos.tx.v1betata1.ModeInfo.Multi for how to specify which signers
 * signed and with which modes.
 */
export interface MultiSignature {
    signatures: Uint8Array[];
}
/**
 * CompactBitArray is an implementation of a space efficient bit array.
 * This is used to ensure that the encoded data takes up a minimal amount of
 * space after proto encoding.
 * This is not thread safe, and is not intended for concurrent usage.
 */
export interface CompactBitArray {
    extraBitsStored: number;
    elems: Uint8Array;
}
export declare const MultiSignature: MessageFns<MultiSignature>;
export declare const CompactBitArray: MessageFns<CompactBitArray>;
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
