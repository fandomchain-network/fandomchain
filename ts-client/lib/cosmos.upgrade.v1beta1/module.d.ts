import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgSoftwareUpgrade } from "./types/cosmos/upgrade/v1beta1/tx";
import { MsgCancelUpgrade } from "./types/cosmos/upgrade/v1beta1/tx";
export { MsgSoftwareUpgrade, MsgCancelUpgrade };
type sendMsgSoftwareUpgradeParams = {
    value: MsgSoftwareUpgrade;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCancelUpgradeParams = {
    value: MsgCancelUpgrade;
    fee?: StdFee;
    memo?: string;
};
type msgSoftwareUpgradeParams = {
    value: MsgSoftwareUpgrade;
};
type msgCancelUpgradeParams = {
    value: MsgCancelUpgrade;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgSoftwareUpgrade({ value, fee, memo }: sendMsgSoftwareUpgradeParams): Promise<DeliverTxResponse>;
    sendMsgCancelUpgrade({ value, fee, memo }: sendMsgCancelUpgradeParams): Promise<DeliverTxResponse>;
    msgSoftwareUpgrade({ value }: msgSoftwareUpgradeParams): EncodeObject;
    msgCancelUpgrade({ value }: msgCancelUpgradeParams): EncodeObject;
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
        CosmosUpgradeV_1Beta_1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
