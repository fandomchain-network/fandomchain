import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Coin } from "../../base/v1beta1/coin";
import { Params } from "./distribution";
export declare const protobufPackage = "cosmos.distribution.v1beta1";
/**
 * MsgSetWithdrawAddress sets the withdraw address for
 * a delegator (or validator self-delegation).
 */
export interface MsgSetWithdrawAddress {
    delegatorAddress: string;
    withdrawAddress: string;
}
/**
 * MsgSetWithdrawAddressResponse defines the Msg/SetWithdrawAddress response
 * type.
 */
export interface MsgSetWithdrawAddressResponse {
}
/**
 * MsgWithdrawDelegatorReward represents delegation withdrawal to a delegator
 * from a single validator.
 */
export interface MsgWithdrawDelegatorReward {
    delegatorAddress: string;
    validatorAddress: string;
}
/**
 * MsgWithdrawDelegatorRewardResponse defines the Msg/WithdrawDelegatorReward
 * response type.
 */
export interface MsgWithdrawDelegatorRewardResponse {
    amount: Coin[];
}
/**
 * MsgWithdrawValidatorCommission withdraws the full commission to the validator
 * address.
 */
export interface MsgWithdrawValidatorCommission {
    validatorAddress: string;
}
/**
 * MsgWithdrawValidatorCommissionResponse defines the
 * Msg/WithdrawValidatorCommission response type.
 */
export interface MsgWithdrawValidatorCommissionResponse {
    amount: Coin[];
}
/**
 * MsgFundCommunityPool allows an account to directly
 * fund the community pool.
 */
export interface MsgFundCommunityPool {
    amount: Coin[];
    depositor: string;
}
/** MsgFundCommunityPoolResponse defines the Msg/FundCommunityPool response type. */
export interface MsgFundCommunityPoolResponse {
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the x/distribution parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params?: Params | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}
/**
 * MsgCommunityPoolSpend defines a message for sending tokens from the community
 * pool to another account. This message is typically executed via a governance
 * proposal with the governance module being the executing authority.
 */
export interface MsgCommunityPoolSpend {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    recipient: string;
    amount: Coin[];
}
/**
 * MsgCommunityPoolSpendResponse defines the response to executing a
 * MsgCommunityPoolSpend message.
 */
export interface MsgCommunityPoolSpendResponse {
}
/**
 * DepositValidatorRewardsPool defines the request structure to provide
 * additional rewards to delegators from a specific validator.
 */
export interface MsgDepositValidatorRewardsPool {
    depositor: string;
    validatorAddress: string;
    amount: Coin[];
}
/**
 * MsgDepositValidatorRewardsPoolResponse defines the response to executing a
 * MsgDepositValidatorRewardsPool message.
 */
export interface MsgDepositValidatorRewardsPoolResponse {
}
export declare const MsgSetWithdrawAddress: MessageFns<MsgSetWithdrawAddress>;
export declare const MsgSetWithdrawAddressResponse: MessageFns<MsgSetWithdrawAddressResponse>;
export declare const MsgWithdrawDelegatorReward: MessageFns<MsgWithdrawDelegatorReward>;
export declare const MsgWithdrawDelegatorRewardResponse: MessageFns<MsgWithdrawDelegatorRewardResponse>;
export declare const MsgWithdrawValidatorCommission: MessageFns<MsgWithdrawValidatorCommission>;
export declare const MsgWithdrawValidatorCommissionResponse: MessageFns<MsgWithdrawValidatorCommissionResponse>;
export declare const MsgFundCommunityPool: MessageFns<MsgFundCommunityPool>;
export declare const MsgFundCommunityPoolResponse: MessageFns<MsgFundCommunityPoolResponse>;
export declare const MsgUpdateParams: MessageFns<MsgUpdateParams>;
export declare const MsgUpdateParamsResponse: MessageFns<MsgUpdateParamsResponse>;
export declare const MsgCommunityPoolSpend: MessageFns<MsgCommunityPoolSpend>;
export declare const MsgCommunityPoolSpendResponse: MessageFns<MsgCommunityPoolSpendResponse>;
export declare const MsgDepositValidatorRewardsPool: MessageFns<MsgDepositValidatorRewardsPool>;
export declare const MsgDepositValidatorRewardsPoolResponse: MessageFns<MsgDepositValidatorRewardsPoolResponse>;
/** Msg defines the distribution Msg service. */
export interface Msg {
    /**
     * SetWithdrawAddress defines a method to change the withdraw address
     * for a delegator (or validator self-delegation).
     */
    SetWithdrawAddress(request: MsgSetWithdrawAddress): Promise<MsgSetWithdrawAddressResponse>;
    /**
     * WithdrawDelegatorReward defines a method to withdraw rewards of delegator
     * from a single validator.
     */
    WithdrawDelegatorReward(request: MsgWithdrawDelegatorReward): Promise<MsgWithdrawDelegatorRewardResponse>;
    /**
     * WithdrawValidatorCommission defines a method to withdraw the
     * full commission to the validator address.
     */
    WithdrawValidatorCommission(request: MsgWithdrawValidatorCommission): Promise<MsgWithdrawValidatorCommissionResponse>;
    /**
     * FundCommunityPool defines a method to allow an account to directly
     * fund the community pool.
     *
     * WARNING: This method will fail if an external community pool is used.
     */
    FundCommunityPool(request: MsgFundCommunityPool): Promise<MsgFundCommunityPoolResponse>;
    /**
     * UpdateParams defines a governance operation for updating the x/distribution
     * module parameters. The authority is defined in the keeper.
     */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /**
     * CommunityPoolSpend defines a governance operation for sending tokens from
     * the community pool in the x/distribution module to another account, which
     * could be the governance module itself. The authority is defined in the
     * keeper.
     *
     * WARNING: This method will fail if an external community pool is used.
     */
    CommunityPoolSpend(request: MsgCommunityPoolSpend): Promise<MsgCommunityPoolSpendResponse>;
    /**
     * DepositValidatorRewardsPool defines a method to provide additional rewards
     * to delegators to a specific validator.
     */
    DepositValidatorRewardsPool(request: MsgDepositValidatorRewardsPool): Promise<MsgDepositValidatorRewardsPoolResponse>;
}
export declare const MsgServiceName = "cosmos.distribution.v1beta1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    SetWithdrawAddress(request: MsgSetWithdrawAddress): Promise<MsgSetWithdrawAddressResponse>;
    WithdrawDelegatorReward(request: MsgWithdrawDelegatorReward): Promise<MsgWithdrawDelegatorRewardResponse>;
    WithdrawValidatorCommission(request: MsgWithdrawValidatorCommission): Promise<MsgWithdrawValidatorCommissionResponse>;
    FundCommunityPool(request: MsgFundCommunityPool): Promise<MsgFundCommunityPoolResponse>;
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    CommunityPoolSpend(request: MsgCommunityPoolSpend): Promise<MsgCommunityPoolSpendResponse>;
    DepositValidatorRewardsPool(request: MsgDepositValidatorRewardsPool): Promise<MsgDepositValidatorRewardsPoolResponse>;
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
