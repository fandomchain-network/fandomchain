import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
export declare const protobufPackage = "ibc.applications.transfer.v1";
/** Token defines a struct which represents a token to be transferred. */
export interface Token {
    /** the token denomination */
    denom?: Denom | undefined;
    /** the token amount to be transferred */
    amount: string;
}
/** Denom holds the base denom of a Token and a trace of the chains it was sent through. */
export interface Denom {
    /** the base token denomination */
    base: string;
    /** the trace of the token */
    trace: Hop[];
}
/** Hop defines a port ID, channel ID pair specifying a unique "hop" in a trace */
export interface Hop {
    portId: string;
    channelId: string;
}
export declare const Token: MessageFns<Token>;
export declare const Denom: MessageFns<Denom>;
export declare const Hop: MessageFns<Hop>;
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
