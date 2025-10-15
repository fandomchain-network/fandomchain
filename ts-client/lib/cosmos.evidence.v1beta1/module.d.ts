import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgSubmitEvidence } from "./types/cosmos/evidence/v1beta1/tx";
export { MsgSubmitEvidence };
type sendMsgSubmitEvidenceParams = {
    value: MsgSubmitEvidence;
    fee?: StdFee;
    memo?: string;
};
type msgSubmitEvidenceParams = {
    value: MsgSubmitEvidence;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgSubmitEvidence({ value, fee, memo }: sendMsgSubmitEvidenceParams): Promise<DeliverTxResponse>;
    msgSubmitEvidence({ value }: msgSubmitEvidenceParams): EncodeObject;
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
        CosmosEvidenceV_1Beta_1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
