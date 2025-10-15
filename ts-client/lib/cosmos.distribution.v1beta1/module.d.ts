import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgSetWithdrawAddress } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgWithdrawDelegatorReward } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgWithdrawValidatorCommission } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgFundCommunityPool } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgUpdateParams } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgCommunityPoolSpend } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgDepositValidatorRewardsPool } from "./types/cosmos/distribution/v1beta1/tx";
export { MsgSetWithdrawAddress, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, MsgFundCommunityPool, MsgUpdateParams, MsgCommunityPoolSpend, MsgDepositValidatorRewardsPool };
type sendMsgSetWithdrawAddressParams = {
    value: MsgSetWithdrawAddress;
    fee?: StdFee;
    memo?: string;
};
type sendMsgWithdrawDelegatorRewardParams = {
    value: MsgWithdrawDelegatorReward;
    fee?: StdFee;
    memo?: string;
};
type sendMsgWithdrawValidatorCommissionParams = {
    value: MsgWithdrawValidatorCommission;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFundCommunityPoolParams = {
    value: MsgFundCommunityPool;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCommunityPoolSpendParams = {
    value: MsgCommunityPoolSpend;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDepositValidatorRewardsPoolParams = {
    value: MsgDepositValidatorRewardsPool;
    fee?: StdFee;
    memo?: string;
};
type msgSetWithdrawAddressParams = {
    value: MsgSetWithdrawAddress;
};
type msgWithdrawDelegatorRewardParams = {
    value: MsgWithdrawDelegatorReward;
};
type msgWithdrawValidatorCommissionParams = {
    value: MsgWithdrawValidatorCommission;
};
type msgFundCommunityPoolParams = {
    value: MsgFundCommunityPool;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgCommunityPoolSpendParams = {
    value: MsgCommunityPoolSpend;
};
type msgDepositValidatorRewardsPoolParams = {
    value: MsgDepositValidatorRewardsPool;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgSetWithdrawAddress({ value, fee, memo }: sendMsgSetWithdrawAddressParams): Promise<DeliverTxResponse>;
    sendMsgWithdrawDelegatorReward({ value, fee, memo }: sendMsgWithdrawDelegatorRewardParams): Promise<DeliverTxResponse>;
    sendMsgWithdrawValidatorCommission({ value, fee, memo }: sendMsgWithdrawValidatorCommissionParams): Promise<DeliverTxResponse>;
    sendMsgFundCommunityPool({ value, fee, memo }: sendMsgFundCommunityPoolParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgCommunityPoolSpend({ value, fee, memo }: sendMsgCommunityPoolSpendParams): Promise<DeliverTxResponse>;
    sendMsgDepositValidatorRewardsPool({ value, fee, memo }: sendMsgDepositValidatorRewardsPoolParams): Promise<DeliverTxResponse>;
    msgSetWithdrawAddress({ value }: msgSetWithdrawAddressParams): EncodeObject;
    msgWithdrawDelegatorReward({ value }: msgWithdrawDelegatorRewardParams): EncodeObject;
    msgWithdrawValidatorCommission({ value }: msgWithdrawValidatorCommissionParams): EncodeObject;
    msgFundCommunityPool({ value }: msgFundCommunityPoolParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgCommunityPoolSpend({ value }: msgCommunityPoolSpendParams): EncodeObject;
    msgDepositValidatorRewardsPool({ value }: msgDepositValidatorRewardsPoolParams): EncodeObject;
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
        CosmosDistributionV_1Beta_1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
