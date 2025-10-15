import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { CounterpartyInfo } from "./counterparty";
export declare const protobufPackage = "ibc.core.client.v2";
/** GenesisCounterpartyInfo defines the state associating a client with a counterparty. */
export interface GenesisCounterpartyInfo {
    /** ClientId is the ID of the given client. */
    clientId: string;
    /** CounterpartyInfo is the counterparty info of the given client. */
    counterpartyInfo?: CounterpartyInfo | undefined;
}
/** GenesisState defines the ibc client v2 submodule's genesis state. */
export interface GenesisState {
    /** counterparty info for each client */
    counterpartyInfos: GenesisCounterpartyInfo[];
}
export declare const GenesisCounterpartyInfo: MessageFns<GenesisCounterpartyInfo>;
export declare const GenesisState: MessageFns<GenesisState>;
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
