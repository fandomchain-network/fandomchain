import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { Height } from "../../../core/client/v1/client";
import { Params } from "./transfer";
export declare const protobufPackage = "ibc.applications.transfer.v1";
/**
 * MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between
 * ICS20 enabled chains. See ICS Spec here:
 * https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#data-structures
 */
export interface MsgTransfer {
    /** the port on which the packet will be sent */
    sourcePort: string;
    /** the channel by which the packet will be sent */
    sourceChannel: string;
    /** token to be transferred */
    token?: Coin | undefined;
    /** the sender address */
    sender: string;
    /** the recipient address on the destination chain */
    receiver: string;
    /**
     * Timeout height relative to the current block height.
     * If you are sending with IBC v1 protocol, either timeout_height or timeout_timestamp must be set.
     * If you are sending with IBC v2 protocol, timeout_timestamp must be set, and timeout_height must be omitted.
     */
    timeoutHeight?: Height | undefined;
    /**
     * Timeout timestamp in absolute nanoseconds since unix epoch.
     * If you are sending with IBC v1 protocol, either timeout_height or timeout_timestamp must be set.
     * If you are sending with IBC v2 protocol, timeout_timestamp must be set.
     */
    timeoutTimestamp: Long;
    /** optional memo */
    memo: string;
    /** optional encoding */
    encoding: string;
}
/** MsgTransferResponse defines the Msg/Transfer response type. */
export interface MsgTransferResponse {
    /** sequence number of the transfer packet sent */
    sequence: Long;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the transfer parameters to update.
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
export declare const MsgTransfer: MessageFns<MsgTransfer>;
export declare const MsgTransferResponse: MessageFns<MsgTransferResponse>;
export declare const MsgUpdateParams: MessageFns<MsgUpdateParams>;
export declare const MsgUpdateParamsResponse: MessageFns<MsgUpdateParamsResponse>;
/** Msg defines the ibc/transfer Msg service. */
export interface Msg {
    /** Transfer defines a rpc handler method for MsgTransfer. */
    Transfer(request: MsgTransfer): Promise<MsgTransferResponse>;
    /** UpdateParams defines a rpc handler for MsgUpdateParams. */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "ibc.applications.transfer.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Transfer(request: MsgTransfer): Promise<MsgTransferResponse>;
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
