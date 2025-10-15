import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgConnectionOpenInit } from "./types/ibc/core/connection/v1/tx";
import { MsgConnectionOpenTry } from "./types/ibc/core/connection/v1/tx";
import { MsgConnectionOpenAck } from "./types/ibc/core/connection/v1/tx";
import { MsgConnectionOpenConfirm } from "./types/ibc/core/connection/v1/tx";
import { MsgUpdateParams } from "./types/ibc/core/connection/v1/tx";
export { MsgConnectionOpenInit, MsgConnectionOpenTry, MsgConnectionOpenAck, MsgConnectionOpenConfirm, MsgUpdateParams };
type sendMsgConnectionOpenInitParams = {
    value: MsgConnectionOpenInit;
    fee?: StdFee;
    memo?: string;
};
type sendMsgConnectionOpenTryParams = {
    value: MsgConnectionOpenTry;
    fee?: StdFee;
    memo?: string;
};
type sendMsgConnectionOpenAckParams = {
    value: MsgConnectionOpenAck;
    fee?: StdFee;
    memo?: string;
};
type sendMsgConnectionOpenConfirmParams = {
    value: MsgConnectionOpenConfirm;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type msgConnectionOpenInitParams = {
    value: MsgConnectionOpenInit;
};
type msgConnectionOpenTryParams = {
    value: MsgConnectionOpenTry;
};
type msgConnectionOpenAckParams = {
    value: MsgConnectionOpenAck;
};
type msgConnectionOpenConfirmParams = {
    value: MsgConnectionOpenConfirm;
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
    sendMsgConnectionOpenInit({ value, fee, memo }: sendMsgConnectionOpenInitParams): Promise<DeliverTxResponse>;
    sendMsgConnectionOpenTry({ value, fee, memo }: sendMsgConnectionOpenTryParams): Promise<DeliverTxResponse>;
    sendMsgConnectionOpenAck({ value, fee, memo }: sendMsgConnectionOpenAckParams): Promise<DeliverTxResponse>;
    sendMsgConnectionOpenConfirm({ value, fee, memo }: sendMsgConnectionOpenConfirmParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    msgConnectionOpenInit({ value }: msgConnectionOpenInitParams): EncodeObject;
    msgConnectionOpenTry({ value }: msgConnectionOpenTryParams): EncodeObject;
    msgConnectionOpenAck({ value }: msgConnectionOpenAckParams): EncodeObject;
    msgConnectionOpenConfirm({ value }: msgConnectionOpenConfirmParams): EncodeObject;
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
        IbcCoreConnectionV_1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
