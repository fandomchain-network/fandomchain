import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Height } from "../../client/v1/client";
import { Acknowledgement, Packet, Payload } from "./packet";
export declare const protobufPackage = "ibc.core.channel.v2";
/** ResponseResultType defines the possible outcomes of the execution of a message */
export declare enum ResponseResultType {
    /** RESPONSE_RESULT_TYPE_UNSPECIFIED - Default zero value enumeration */
    RESPONSE_RESULT_TYPE_UNSPECIFIED = 0,
    /** RESPONSE_RESULT_TYPE_NOOP - The message did not call the IBC application callbacks (because, for example, the packet had already been relayed) */
    RESPONSE_RESULT_TYPE_NOOP = 1,
    /** RESPONSE_RESULT_TYPE_SUCCESS - The message was executed successfully */
    RESPONSE_RESULT_TYPE_SUCCESS = 2,
    /** RESPONSE_RESULT_TYPE_FAILURE - The message was executed unsuccessfully */
    RESPONSE_RESULT_TYPE_FAILURE = 3,
    UNRECOGNIZED = -1
}
export declare function responseResultTypeFromJSON(object: any): ResponseResultType;
export declare function responseResultTypeToJSON(object: ResponseResultType): string;
/** MsgSendPacket sends an outgoing IBC packet. */
export interface MsgSendPacket {
    sourceClient: string;
    timeoutTimestamp: Long;
    payloads: Payload[];
    signer: string;
}
/** MsgSendPacketResponse defines the Msg/SendPacket response type. */
export interface MsgSendPacketResponse {
    sequence: Long;
}
/** MsgRecvPacket receives an incoming IBC packet. */
export interface MsgRecvPacket {
    packet?: Packet | undefined;
    proofCommitment: Uint8Array;
    proofHeight?: Height | undefined;
    signer: string;
}
/** MsgRecvPacketResponse defines the Msg/RecvPacket response type. */
export interface MsgRecvPacketResponse {
    result: ResponseResultType;
}
/** MsgTimeout receives timed-out packet */
export interface MsgTimeout {
    packet?: Packet | undefined;
    proofUnreceived: Uint8Array;
    proofHeight?: Height | undefined;
    signer: string;
}
/** MsgTimeoutResponse defines the Msg/Timeout response type. */
export interface MsgTimeoutResponse {
    result: ResponseResultType;
}
/** MsgAcknowledgement receives incoming IBC acknowledgement. */
export interface MsgAcknowledgement {
    packet?: Packet | undefined;
    acknowledgement?: Acknowledgement | undefined;
    proofAcked: Uint8Array;
    proofHeight?: Height | undefined;
    signer: string;
}
/** MsgAcknowledgementResponse defines the Msg/Acknowledgement response type. */
export interface MsgAcknowledgementResponse {
    result: ResponseResultType;
}
export declare const MsgSendPacket: MessageFns<MsgSendPacket>;
export declare const MsgSendPacketResponse: MessageFns<MsgSendPacketResponse>;
export declare const MsgRecvPacket: MessageFns<MsgRecvPacket>;
export declare const MsgRecvPacketResponse: MessageFns<MsgRecvPacketResponse>;
export declare const MsgTimeout: MessageFns<MsgTimeout>;
export declare const MsgTimeoutResponse: MessageFns<MsgTimeoutResponse>;
export declare const MsgAcknowledgement: MessageFns<MsgAcknowledgement>;
export declare const MsgAcknowledgementResponse: MessageFns<MsgAcknowledgementResponse>;
/** Msg defines the ibc/channel/v2 Msg service. */
export interface Msg {
    /** SendPacket defines a rpc handler method for MsgSendPacket. */
    SendPacket(request: MsgSendPacket): Promise<MsgSendPacketResponse>;
    /** RecvPacket defines a rpc handler method for MsgRecvPacket. */
    RecvPacket(request: MsgRecvPacket): Promise<MsgRecvPacketResponse>;
    /** Timeout defines a rpc handler method for MsgTimeout. */
    Timeout(request: MsgTimeout): Promise<MsgTimeoutResponse>;
    /** Acknowledgement defines a rpc handler method for MsgAcknowledgement. */
    Acknowledgement(request: MsgAcknowledgement): Promise<MsgAcknowledgementResponse>;
}
export declare const MsgServiceName = "ibc.core.channel.v2.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    SendPacket(request: MsgSendPacket): Promise<MsgSendPacketResponse>;
    RecvPacket(request: MsgRecvPacket): Promise<MsgRecvPacketResponse>;
    Timeout(request: MsgTimeout): Promise<MsgTimeoutResponse>;
    Acknowledgement(request: MsgAcknowledgement): Promise<MsgAcknowledgementResponse>;
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
