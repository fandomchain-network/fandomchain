import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Coin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.staking.v1beta1";
/** AuthorizationType defines the type of staking module authorization type */
export declare enum AuthorizationType {
    /** AUTHORIZATION_TYPE_UNSPECIFIED - AUTHORIZATION_TYPE_UNSPECIFIED specifies an unknown authorization type */
    AUTHORIZATION_TYPE_UNSPECIFIED = 0,
    /** AUTHORIZATION_TYPE_DELEGATE - AUTHORIZATION_TYPE_DELEGATE defines an authorization type for Msg/Delegate */
    AUTHORIZATION_TYPE_DELEGATE = 1,
    /** AUTHORIZATION_TYPE_UNDELEGATE - AUTHORIZATION_TYPE_UNDELEGATE defines an authorization type for Msg/Undelegate */
    AUTHORIZATION_TYPE_UNDELEGATE = 2,
    /** AUTHORIZATION_TYPE_REDELEGATE - AUTHORIZATION_TYPE_REDELEGATE defines an authorization type for Msg/BeginRedelegate */
    AUTHORIZATION_TYPE_REDELEGATE = 3,
    /** AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION - AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION defines an authorization type for Msg/MsgCancelUnbondingDelegation */
    AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION = 4,
    UNRECOGNIZED = -1
}
export declare function authorizationTypeFromJSON(object: any): AuthorizationType;
export declare function authorizationTypeToJSON(object: AuthorizationType): string;
/** StakeAuthorization defines authorization for delegate/undelegate/redelegate. */
export interface StakeAuthorization {
    /**
     * max_tokens specifies the maximum amount of tokens can be delegate to a validator. If it is
     * empty, there is no spend limit and any amount of coins can be delegated.
     */
    maxTokens?: Coin | undefined;
    /**
     * allow_list specifies list of validator addresses to whom grantee can delegate tokens on behalf of granter's
     * account.
     */
    allowList?: StakeAuthorization_Validators | undefined;
    /** deny_list specifies list of validator addresses to whom grantee can not delegate tokens. */
    denyList?: StakeAuthorization_Validators | undefined;
    /** authorization_type defines one of AuthorizationType. */
    authorizationType: AuthorizationType;
}
/** Validators defines list of validator addresses. */
export interface StakeAuthorization_Validators {
    address: string[];
}
export declare const StakeAuthorization: MessageFns<StakeAuthorization>;
export declare const StakeAuthorization_Validators: MessageFns<StakeAuthorization_Validators>;
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
