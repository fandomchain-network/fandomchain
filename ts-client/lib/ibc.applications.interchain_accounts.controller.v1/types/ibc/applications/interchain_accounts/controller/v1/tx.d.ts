import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Order } from "../../../../core/channel/v1/channel";
import { InterchainAccountPacketData } from "../../v1/packet";
import { Params } from "./controller";
export declare const protobufPackage = "ibc.applications.interchain_accounts.controller.v1";
/** MsgRegisterInterchainAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccount {
    owner: string;
    connectionId: string;
    version: string;
    ordering: Order;
}
/** MsgRegisterInterchainAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccountResponse {
    channelId: string;
    portId: string;
}
/** MsgSendTx defines the payload for Msg/SendTx */
export interface MsgSendTx {
    owner: string;
    connectionId: string;
    packetData?: InterchainAccountPacketData | undefined;
    /**
     * Relative timeout timestamp provided will be added to the current block time during transaction execution.
     * The timeout timestamp must be non-zero.
     */
    relativeTimeout: Long;
}
/** MsgSendTxResponse defines the response for MsgSendTx */
export interface MsgSendTxResponse {
    sequence: Long;
}
/** MsgUpdateParams defines the payload for Msg/UpdateParams */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the 27-interchain-accounts/controller parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params?: Params | undefined;
}
/** MsgUpdateParamsResponse defines the response for Msg/UpdateParams */
export interface MsgUpdateParamsResponse {
}
export declare const MsgRegisterInterchainAccount: MessageFns<MsgRegisterInterchainAccount>;
export declare const MsgRegisterInterchainAccountResponse: MessageFns<MsgRegisterInterchainAccountResponse>;
export declare const MsgSendTx: MessageFns<MsgSendTx>;
export declare const MsgSendTxResponse: MessageFns<MsgSendTxResponse>;
export declare const MsgUpdateParams: MessageFns<MsgUpdateParams>;
export declare const MsgUpdateParamsResponse: MessageFns<MsgUpdateParamsResponse>;
/** Msg defines the 27-interchain-accounts/controller Msg service. */
export interface Msg {
    /** RegisterInterchainAccount defines a rpc handler for MsgRegisterInterchainAccount. */
    RegisterInterchainAccount(request: MsgRegisterInterchainAccount): Promise<MsgRegisterInterchainAccountResponse>;
    /** SendTx defines a rpc handler for MsgSendTx. */
    SendTx(request: MsgSendTx): Promise<MsgSendTxResponse>;
    /** UpdateParams defines a rpc handler for MsgUpdateParams. */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "ibc.applications.interchain_accounts.controller.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    RegisterInterchainAccount(request: MsgRegisterInterchainAccount): Promise<MsgRegisterInterchainAccountResponse>;
    SendTx(request: MsgSendTx): Promise<MsgSendTxResponse>;
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
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
