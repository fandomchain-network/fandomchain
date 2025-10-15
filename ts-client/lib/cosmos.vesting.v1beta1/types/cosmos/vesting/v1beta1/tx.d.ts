import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Coin } from "../../base/v1beta1/coin";
import { Period } from "./vesting";
export declare const protobufPackage = "cosmos.vesting.v1beta1";
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 */
export interface MsgCreateVestingAccount {
    fromAddress: string;
    toAddress: string;
    amount: Coin[];
    /** end of vesting as unix time (in seconds). */
    endTime: Long;
    delayed: boolean;
}
/** MsgCreateVestingAccountResponse defines the Msg/CreateVestingAccount response type. */
export interface MsgCreateVestingAccountResponse {
}
/**
 * MsgCreatePermanentLockedAccount defines a message that enables creating a permanent
 * locked account.
 */
export interface MsgCreatePermanentLockedAccount {
    fromAddress: string;
    toAddress: string;
    amount: Coin[];
}
/** MsgCreatePermanentLockedAccountResponse defines the Msg/CreatePermanentLockedAccount response type. */
export interface MsgCreatePermanentLockedAccountResponse {
}
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 */
export interface MsgCreatePeriodicVestingAccount {
    fromAddress: string;
    toAddress: string;
    /** start of vesting as unix time (in seconds). */
    startTime: Long;
    vestingPeriods: Period[];
}
/**
 * MsgCreateVestingAccountResponse defines the Msg/CreatePeriodicVestingAccount
 * response type.
 */
export interface MsgCreatePeriodicVestingAccountResponse {
}
export declare const MsgCreateVestingAccount: MessageFns<MsgCreateVestingAccount>;
export declare const MsgCreateVestingAccountResponse: MessageFns<MsgCreateVestingAccountResponse>;
export declare const MsgCreatePermanentLockedAccount: MessageFns<MsgCreatePermanentLockedAccount>;
export declare const MsgCreatePermanentLockedAccountResponse: MessageFns<MsgCreatePermanentLockedAccountResponse>;
export declare const MsgCreatePeriodicVestingAccount: MessageFns<MsgCreatePeriodicVestingAccount>;
export declare const MsgCreatePeriodicVestingAccountResponse: MessageFns<MsgCreatePeriodicVestingAccountResponse>;
/** Msg defines the bank Msg service. */
export interface Msg {
    /**
     * CreateVestingAccount defines a method that enables creating a vesting
     * account.
     */
    CreateVestingAccount(request: MsgCreateVestingAccount): Promise<MsgCreateVestingAccountResponse>;
    /**
     * CreatePermanentLockedAccount defines a method that enables creating a permanent
     * locked account.
     */
    CreatePermanentLockedAccount(request: MsgCreatePermanentLockedAccount): Promise<MsgCreatePermanentLockedAccountResponse>;
    /**
     * CreatePeriodicVestingAccount defines a method that enables creating a
     * periodic vesting account.
     */
    CreatePeriodicVestingAccount(request: MsgCreatePeriodicVestingAccount): Promise<MsgCreatePeriodicVestingAccountResponse>;
}
export declare const MsgServiceName = "cosmos.vesting.v1beta1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    CreateVestingAccount(request: MsgCreateVestingAccount): Promise<MsgCreateVestingAccountResponse>;
    CreatePermanentLockedAccount(request: MsgCreatePermanentLockedAccount): Promise<MsgCreatePermanentLockedAccountResponse>;
    CreatePeriodicVestingAccount(request: MsgCreatePeriodicVestingAccount): Promise<MsgCreatePeriodicVestingAccountResponse>;
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
