import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgCreateValidator } from "./types/cosmos/staking/v1beta1/tx";
import { MsgEditValidator } from "./types/cosmos/staking/v1beta1/tx";
import { MsgDelegate } from "./types/cosmos/staking/v1beta1/tx";
import { MsgBeginRedelegate } from "./types/cosmos/staking/v1beta1/tx";
import { MsgUndelegate } from "./types/cosmos/staking/v1beta1/tx";
import { MsgCancelUnbondingDelegation } from "./types/cosmos/staking/v1beta1/tx";
import { MsgUpdateParams } from "./types/cosmos/staking/v1beta1/tx";
export { MsgCreateValidator, MsgEditValidator, MsgDelegate, MsgBeginRedelegate, MsgUndelegate, MsgCancelUnbondingDelegation, MsgUpdateParams };
type sendMsgCreateValidatorParams = {
    value: MsgCreateValidator;
    fee?: StdFee;
    memo?: string;
};
type sendMsgEditValidatorParams = {
    value: MsgEditValidator;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDelegateParams = {
    value: MsgDelegate;
    fee?: StdFee;
    memo?: string;
};
type sendMsgBeginRedelegateParams = {
    value: MsgBeginRedelegate;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUndelegateParams = {
    value: MsgUndelegate;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCancelUnbondingDelegationParams = {
    value: MsgCancelUnbondingDelegation;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type msgCreateValidatorParams = {
    value: MsgCreateValidator;
};
type msgEditValidatorParams = {
    value: MsgEditValidator;
};
type msgDelegateParams = {
    value: MsgDelegate;
};
type msgBeginRedelegateParams = {
    value: MsgBeginRedelegate;
};
type msgUndelegateParams = {
    value: MsgUndelegate;
};
type msgCancelUnbondingDelegationParams = {
    value: MsgCancelUnbondingDelegation;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgCreateValidator({ value, fee, memo }: sendMsgCreateValidatorParams): Promise<DeliverTxResponse>;
    sendMsgEditValidator({ value, fee, memo }: sendMsgEditValidatorParams): Promise<DeliverTxResponse>;
    sendMsgDelegate({ value, fee, memo }: sendMsgDelegateParams): Promise<DeliverTxResponse>;
    sendMsgBeginRedelegate({ value, fee, memo }: sendMsgBeginRedelegateParams): Promise<DeliverTxResponse>;
    sendMsgUndelegate({ value, fee, memo }: sendMsgUndelegateParams): Promise<DeliverTxResponse>;
    sendMsgCancelUnbondingDelegation({ value, fee, memo }: sendMsgCancelUnbondingDelegationParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    msgCreateValidator({ value }: msgCreateValidatorParams): EncodeObject;
    msgEditValidator({ value }: msgEditValidatorParams): EncodeObject;
    msgDelegate({ value }: msgDelegateParams): EncodeObject;
    msgBeginRedelegate({ value }: msgBeginRedelegateParams): EncodeObject;
    msgUndelegate({ value }: msgUndelegateParams): EncodeObject;
    msgCancelUnbondingDelegation({ value }: msgCancelUnbondingDelegationParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
};
interface QueryClientOptions {
    addr: string;
}
export declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Api<unknown>;
declare class SDKModule {
    query: ReturnType<typeof queryClient>;
    tx: ReturnType<typeof txClient>;
    structure: Record<string, unknown>;
    registry: Array<[string, GeneratedType]>;
    constructor(client: IgniteClient);
    updateTX(client: IgniteClient): void;
}
declare const IgntModule: (test: IgniteClient) => {
    module: {
        CosmosStakingV_1Beta_1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
