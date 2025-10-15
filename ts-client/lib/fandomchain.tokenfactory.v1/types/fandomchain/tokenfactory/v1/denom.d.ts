import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
export declare const protobufPackage = "fandomchain.tokenfactory.v1";
/** Denom defines the Denom message. */
export interface Denom {
    denom: string;
    description: string;
    ticker: string;
    precision: Long;
    url: string;
    owner: string;
    /** Bonding Curve fields */
    virtualTokenReserves: Long;
    virtualFandomReserves: Long;
    realTokenReserves: Long;
    realFandomReserves: Long;
    initialVirtualTokenReserves: Long;
    initialVirtualFandomReserves: Long;
    initialRealTokenReserves: Long;
    bondingCurveEnabled: boolean;
}
export declare const Denom: MessageFns<Denom>;
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
