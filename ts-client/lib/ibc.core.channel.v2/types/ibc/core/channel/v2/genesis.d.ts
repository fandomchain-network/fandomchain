import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
export declare const protobufPackage = "ibc.core.channel.v2";
/** GenesisState defines the ibc channel/v2 submodule's genesis state. */
export interface GenesisState {
    acknowledgements: PacketState[];
    commitments: PacketState[];
    receipts: PacketState[];
    asyncPackets: PacketState[];
    sendSequences: PacketSequence[];
}
/**
 * PacketState defines the generic type necessary to retrieve and store
 * packet commitments, acknowledgements, and receipts.
 * Caller is responsible for knowing the context necessary to interpret this
 * state as a commitment, acknowledgement, or a receipt.
 */
export interface PacketState {
    /** client unique identifier. */
    clientId: string;
    /** packet sequence. */
    sequence: Long;
    /** embedded data that represents packet state. */
    data: Uint8Array;
}
/** PacketSequence defines the genesis type necessary to retrieve and store next send sequences. */
export interface PacketSequence {
    /** client unique identifier. */
    clientId: string;
    /** packet sequence */
    sequence: Long;
}
export declare const GenesisState: MessageFns<GenesisState>;
export declare const PacketState: MessageFns<PacketState>;
export declare const PacketSequence: MessageFns<PacketSequence>;
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
