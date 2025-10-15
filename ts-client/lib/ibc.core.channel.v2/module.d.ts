import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgSendPacket } from "./types/ibc/core/channel/v2/tx";
import { MsgRecvPacket } from "./types/ibc/core/channel/v2/tx";
import { MsgTimeout } from "./types/ibc/core/channel/v2/tx";
import { MsgAcknowledgement } from "./types/ibc/core/channel/v2/tx";
export { MsgSendPacket, MsgRecvPacket, MsgTimeout, MsgAcknowledgement };
type sendMsgSendPacketParams = {
    value: MsgSendPacket;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRecvPacketParams = {
    value: MsgRecvPacket;
    fee?: StdFee;
    memo?: string;
};
type sendMsgTimeoutParams = {
    value: MsgTimeout;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAcknowledgementParams = {
    value: MsgAcknowledgement;
    fee?: StdFee;
    memo?: string;
};
type msgSendPacketParams = {
    value: MsgSendPacket;
};
type msgRecvPacketParams = {
    value: MsgRecvPacket;
};
type msgTimeoutParams = {
    value: MsgTimeout;
};
type msgAcknowledgementParams = {
    value: MsgAcknowledgement;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgSendPacket({ value, fee, memo }: sendMsgSendPacketParams): Promise<DeliverTxResponse>;
    sendMsgRecvPacket({ value, fee, memo }: sendMsgRecvPacketParams): Promise<DeliverTxResponse>;
    sendMsgTimeout({ value, fee, memo }: sendMsgTimeoutParams): Promise<DeliverTxResponse>;
    sendMsgAcknowledgement({ value, fee, memo }: sendMsgAcknowledgementParams): Promise<DeliverTxResponse>;
    msgSendPacket({ value }: msgSendPacketParams): EncodeObject;
    msgRecvPacket({ value }: msgRecvPacketParams): EncodeObject;
    msgTimeout({ value }: msgTimeoutParams): EncodeObject;
    msgAcknowledgement({ value }: msgAcknowledgementParams): EncodeObject;
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
        IbcCoreChannelV_2: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
