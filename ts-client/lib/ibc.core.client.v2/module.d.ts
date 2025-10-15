import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgRegisterCounterparty } from "./types/ibc/core/client/v2/tx";
import { MsgUpdateClientConfig } from "./types/ibc/core/client/v2/tx";
export { MsgRegisterCounterparty, MsgUpdateClientConfig };
type sendMsgRegisterCounterpartyParams = {
    value: MsgRegisterCounterparty;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateClientConfigParams = {
    value: MsgUpdateClientConfig;
    fee?: StdFee;
    memo?: string;
};
type msgRegisterCounterpartyParams = {
    value: MsgRegisterCounterparty;
};
type msgUpdateClientConfigParams = {
    value: MsgUpdateClientConfig;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgRegisterCounterparty({ value, fee, memo }: sendMsgRegisterCounterpartyParams): Promise<DeliverTxResponse>;
    sendMsgUpdateClientConfig({ value, fee, memo }: sendMsgUpdateClientConfigParams): Promise<DeliverTxResponse>;
    msgRegisterCounterparty({ value }: msgRegisterCounterpartyParams): EncodeObject;
    msgUpdateClientConfig({ value }: msgUpdateClientConfigParams): EncodeObject;
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
        IbcCoreClientV_2: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
