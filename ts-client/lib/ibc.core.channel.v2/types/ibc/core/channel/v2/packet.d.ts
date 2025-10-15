import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
export declare const protobufPackage = "ibc.core.channel.v2";
/** PacketStatus specifies the status of a RecvPacketResult. */
export declare enum PacketStatus {
    /** PACKET_STATUS_UNSPECIFIED - PACKET_STATUS_UNSPECIFIED indicates an unknown packet status. */
    PACKET_STATUS_UNSPECIFIED = 0,
    /** PACKET_STATUS_SUCCESS - PACKET_STATUS_SUCCESS indicates a successful packet receipt. */
    PACKET_STATUS_SUCCESS = 1,
    /** PACKET_STATUS_FAILURE - PACKET_STATUS_FAILURE indicates a failed packet receipt. */
    PACKET_STATUS_FAILURE = 2,
    /** PACKET_STATUS_ASYNC - PACKET_STATUS_ASYNC indicates an async packet receipt. */
    PACKET_STATUS_ASYNC = 3,
    UNRECOGNIZED = -1
}
export declare function packetStatusFromJSON(object: any): PacketStatus;
export declare function packetStatusToJSON(object: PacketStatus): string;
/** Packet defines a type that carries data across different chains through IBC */
export interface Packet {
    /**
     * number corresponds to the order of sends and receives, where a Packet
     * with an earlier sequence number must be sent and received before a Packet
     * with a later sequence number.
     */
    sequence: Long;
    /** identifies the sending client on the sending chain. */
    sourceClient: string;
    /** identifies the receiving client on the receiving chain. */
    destinationClient: string;
    /** timeout timestamp in seconds after which the packet times out. */
    timeoutTimestamp: Long;
    /** a list of payloads, each one for a specific application. */
    payloads: Payload[];
}
/** Payload contains the source and destination ports and payload for the application (version, encoding, raw bytes) */
export interface Payload {
    /** specifies the source port of the packet. */
    sourcePort: string;
    /** specifies the destination port of the packet. */
    destinationPort: string;
    /** version of the specified application. */
    version: string;
    /** the encoding used for the provided value. */
    encoding: string;
    /** the raw bytes for the payload. */
    value: Uint8Array;
}
/**
 * Acknowledgement contains a list of all ack results associated with a single packet.
 * In the case of a successful receive, the acknowledgement will contain an app acknowledgement
 * for each application that received a payload in the same order that the payloads were sent
 * in the packet.
 * If the receive is not successful, the acknowledgement will contain a single app acknowledgment
 * which will be a constant error acknowledgment as defined by the IBC v2 protocol.
 */
export interface Acknowledgement {
    appAcknowledgements: Uint8Array[];
}
/** RecvPacketResult speecifies the status of a packet as well as the acknowledgement bytes. */
export interface RecvPacketResult {
    /** status of the packet */
    status: PacketStatus;
    /** acknowledgement of the packet */
    acknowledgement: Uint8Array;
}
export declare const Packet: MessageFns<Packet>;
export declare const Payload: MessageFns<Payload>;
export declare const Acknowledgement: MessageFns<Acknowledgement>;
export declare const RecvPacketResult: MessageFns<RecvPacketResult>;
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
