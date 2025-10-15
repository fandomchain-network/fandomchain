import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Any } from "../../../google/protobuf/any";
export declare const protobufPackage = "cosmos.feegrant.v1beta1";
/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export interface MsgGrantAllowance {
    /** granter is the address of the user granting an allowance of their funds. */
    granter: string;
    /** grantee is the address of the user being granted an allowance of another user's funds. */
    grantee: string;
    /** allowance can be any of basic, periodic, allowed fee allowance. */
    allowance?: Any | undefined;
}
/** MsgGrantAllowanceResponse defines the Msg/GrantAllowanceResponse response type. */
export interface MsgGrantAllowanceResponse {
}
/** MsgRevokeAllowance removes any existing Allowance from Granter to Grantee. */
export interface MsgRevokeAllowance {
    /** granter is the address of the user granting an allowance of their funds. */
    granter: string;
    /** grantee is the address of the user being granted an allowance of another user's funds. */
    grantee: string;
}
/** MsgRevokeAllowanceResponse defines the Msg/RevokeAllowanceResponse response type. */
export interface MsgRevokeAllowanceResponse {
}
/** MsgPruneAllowances prunes expired fee allowances. */
export interface MsgPruneAllowances {
    /** pruner is the address of the user pruning expired allowances. */
    pruner: string;
}
/** MsgPruneAllowancesResponse defines the Msg/PruneAllowancesResponse response type. */
export interface MsgPruneAllowancesResponse {
}
export declare const MsgGrantAllowance: MessageFns<MsgGrantAllowance>;
export declare const MsgGrantAllowanceResponse: MessageFns<MsgGrantAllowanceResponse>;
export declare const MsgRevokeAllowance: MessageFns<MsgRevokeAllowance>;
export declare const MsgRevokeAllowanceResponse: MessageFns<MsgRevokeAllowanceResponse>;
export declare const MsgPruneAllowances: MessageFns<MsgPruneAllowances>;
export declare const MsgPruneAllowancesResponse: MessageFns<MsgPruneAllowancesResponse>;
/** Msg defines the feegrant msg service. */
export interface Msg {
    /**
     * GrantAllowance grants fee allowance to the grantee on the granter's
     * account with the provided expiration time.
     */
    GrantAllowance(request: MsgGrantAllowance): Promise<MsgGrantAllowanceResponse>;
    /**
     * RevokeAllowance revokes any fee allowance of granter's account that
     * has been granted to the grantee.
     */
    RevokeAllowance(request: MsgRevokeAllowance): Promise<MsgRevokeAllowanceResponse>;
    /** PruneAllowances prunes expired fee allowances, currently up to 75 at a time. */
    PruneAllowances(request: MsgPruneAllowances): Promise<MsgPruneAllowancesResponse>;
}
export declare const MsgServiceName = "cosmos.feegrant.v1beta1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    GrantAllowance(request: MsgGrantAllowance): Promise<MsgGrantAllowanceResponse>;
    RevokeAllowance(request: MsgRevokeAllowance): Promise<MsgRevokeAllowanceResponse>;
    PruneAllowances(request: MsgPruneAllowances): Promise<MsgPruneAllowancesResponse>;
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
