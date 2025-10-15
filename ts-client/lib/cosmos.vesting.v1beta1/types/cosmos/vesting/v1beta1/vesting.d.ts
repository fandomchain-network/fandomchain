import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { BaseAccount } from "../../auth/v1beta1/auth";
import { Coin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.vesting.v1beta1";
/**
 * BaseVestingAccount implements the VestingAccount interface. It contains all
 * the necessary fields needed for any vesting account implementation.
 */
export interface BaseVestingAccount {
    baseAccount?: BaseAccount | undefined;
    originalVesting: Coin[];
    delegatedFree: Coin[];
    delegatedVesting: Coin[];
    /** Vesting end time, as unix timestamp (in seconds). */
    endTime: Long;
}
/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export interface ContinuousVestingAccount {
    baseVestingAccount?: BaseVestingAccount | undefined;
    /** Vesting start time, as unix timestamp (in seconds). */
    startTime: Long;
}
/**
 * DelayedVestingAccount implements the VestingAccount interface. It vests all
 * coins after a specific time, but non prior. In other words, it keeps them
 * locked until a specified time.
 */
export interface DelayedVestingAccount {
    baseVestingAccount?: BaseVestingAccount | undefined;
}
/** Period defines a length of time and amount of coins that will vest. */
export interface Period {
    /** Period duration in seconds. */
    length: Long;
    amount: Coin[];
}
/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
export interface PeriodicVestingAccount {
    baseVestingAccount?: BaseVestingAccount | undefined;
    startTime: Long;
    vestingPeriods: Period[];
}
/**
 * PermanentLockedAccount implements the VestingAccount interface. It does
 * not ever release coins, locking them indefinitely. Coins in this account can
 * still be used for delegating and for governance votes even while locked.
 */
export interface PermanentLockedAccount {
    baseVestingAccount?: BaseVestingAccount | undefined;
}
export declare const BaseVestingAccount: MessageFns<BaseVestingAccount>;
export declare const ContinuousVestingAccount: MessageFns<ContinuousVestingAccount>;
export declare const DelayedVestingAccount: MessageFns<DelayedVestingAccount>;
export declare const Period: MessageFns<Period>;
export declare const PeriodicVestingAccount: MessageFns<PeriodicVestingAccount>;
export declare const PermanentLockedAccount: MessageFns<PermanentLockedAccount>;
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
