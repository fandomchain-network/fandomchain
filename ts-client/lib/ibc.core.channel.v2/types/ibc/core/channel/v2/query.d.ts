import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Height } from "../../client/v1/client";
import { PacketState } from "./genesis";
export declare const protobufPackage = "ibc.core.channel.v2";
/** QueryNextSequenceSendRequest is the request type for the Query/QueryNextSequenceSend RPC method */
export interface QueryNextSequenceSendRequest {
    /** client unique identifier */
    clientId: string;
}
/** QueryNextSequenceSendResponse is the response type for the Query/QueryNextSequenceSend RPC method */
export interface QueryNextSequenceSendResponse {
    /** next sequence send number */
    nextSequenceSend: Long;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight?: Height | undefined;
}
/** QueryPacketCommitmentRequest is the request type for the Query/PacketCommitment RPC method. */
export interface QueryPacketCommitmentRequest {
    /** client unique identifier */
    clientId: string;
    /** packet sequence */
    sequence: Long;
}
/** QueryPacketCommitmentResponse is the response type for the Query/PacketCommitment RPC method. */
export interface QueryPacketCommitmentResponse {
    /** packet associated with the request fields */
    commitment: Uint8Array;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight?: Height | undefined;
}
/** QueryPacketCommitmentsRequest is the request type for the Query/PacketCommitments RPC method. */
export interface QueryPacketCommitmentsRequest {
    /** client unique identifier */
    clientId: string;
    /** pagination request */
    pagination?: PageRequest | undefined;
}
/** QueryPacketCommitmentResponse is the response type for the Query/PacketCommitment RPC method. */
export interface QueryPacketCommitmentsResponse {
    /** collection of packet commitments for the requested channel identifier. */
    commitments: PacketState[];
    /** pagination response. */
    pagination?: PageResponse | undefined;
    /** query block height. */
    height?: Height | undefined;
}
/** QueryPacketAcknowledgementRequest is the request type for the Query/PacketAcknowledgement RPC method. */
export interface QueryPacketAcknowledgementRequest {
    /** client unique identifier */
    clientId: string;
    /** packet sequence */
    sequence: Long;
}
/** QueryPacketAcknowledgementResponse is the response type for the Query/PacketAcknowledgement RPC method. */
export interface QueryPacketAcknowledgementResponse {
    /** acknowledgement associated with the request fields */
    acknowledgement: Uint8Array;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight?: Height | undefined;
}
/**
 * QueryPacketAcknowledgementsRequest is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketAcknowledgementsRequest {
    /** client unique identifier */
    clientId: string;
    /** pagination request */
    pagination?: PageRequest | undefined;
    /** list of packet sequences */
    packetCommitmentSequences: Long[];
}
/**
 * QueryPacketAcknowledgemetsResponse is the request type for the
 * Query/QueryPacketAcknowledgements RPC method
 */
export interface QueryPacketAcknowledgementsResponse {
    acknowledgements: PacketState[];
    /** pagination response */
    pagination?: PageResponse | undefined;
    /** query block height */
    height?: Height | undefined;
}
/** QueryPacketReceiptRequest is the request type for the Query/PacketReceipt RPC method. */
export interface QueryPacketReceiptRequest {
    /** client unique identifier */
    clientId: string;
    /** packet sequence */
    sequence: Long;
}
/** QueryPacketReceiptResponse is the response type for the Query/PacketReceipt RPC method. */
export interface QueryPacketReceiptResponse {
    /** success flag for if receipt exists */
    received: boolean;
    /** merkle proof of existence or absence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight?: Height | undefined;
}
/** QueryUnreceivedPacketsRequest is the request type for the Query/UnreceivedPackets RPC method */
export interface QueryUnreceivedPacketsRequest {
    /** client unique identifier */
    clientId: string;
    /** list of packet sequences */
    sequences: Long[];
}
/** QueryUnreceivedPacketsResponse is the response type for the Query/UnreceivedPacketCommitments RPC method */
export interface QueryUnreceivedPacketsResponse {
    /** list of unreceived packet sequences */
    sequences: Long[];
    /** query block height */
    height?: Height | undefined;
}
/**
 * QueryUnreceivedAcks is the request type for the
 * Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksRequest {
    /** client unique identifier */
    clientId: string;
    /** list of acknowledgement sequences */
    packetAckSequences: Long[];
}
/**
 * QueryUnreceivedAcksResponse is the response type for the
 * Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksResponse {
    /** list of unreceived acknowledgement sequences */
    sequences: Long[];
    /** query block height */
    height?: Height | undefined;
}
export declare const QueryNextSequenceSendRequest: MessageFns<QueryNextSequenceSendRequest>;
export declare const QueryNextSequenceSendResponse: MessageFns<QueryNextSequenceSendResponse>;
export declare const QueryPacketCommitmentRequest: MessageFns<QueryPacketCommitmentRequest>;
export declare const QueryPacketCommitmentResponse: MessageFns<QueryPacketCommitmentResponse>;
export declare const QueryPacketCommitmentsRequest: MessageFns<QueryPacketCommitmentsRequest>;
export declare const QueryPacketCommitmentsResponse: MessageFns<QueryPacketCommitmentsResponse>;
export declare const QueryPacketAcknowledgementRequest: MessageFns<QueryPacketAcknowledgementRequest>;
export declare const QueryPacketAcknowledgementResponse: MessageFns<QueryPacketAcknowledgementResponse>;
export declare const QueryPacketAcknowledgementsRequest: MessageFns<QueryPacketAcknowledgementsRequest>;
export declare const QueryPacketAcknowledgementsResponse: MessageFns<QueryPacketAcknowledgementsResponse>;
export declare const QueryPacketReceiptRequest: MessageFns<QueryPacketReceiptRequest>;
export declare const QueryPacketReceiptResponse: MessageFns<QueryPacketReceiptResponse>;
export declare const QueryUnreceivedPacketsRequest: MessageFns<QueryUnreceivedPacketsRequest>;
export declare const QueryUnreceivedPacketsResponse: MessageFns<QueryUnreceivedPacketsResponse>;
export declare const QueryUnreceivedAcksRequest: MessageFns<QueryUnreceivedAcksRequest>;
export declare const QueryUnreceivedAcksResponse: MessageFns<QueryUnreceivedAcksResponse>;
/** Query provides defines the gRPC querier service */
export interface Query {
    /** NextSequenceSend returns the next send sequence for a given channel. */
    NextSequenceSend(request: QueryNextSequenceSendRequest): Promise<QueryNextSequenceSendResponse>;
    /** PacketCommitment queries a stored packet commitment hash. */
    PacketCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse>;
    /** PacketCommitments queries a stored packet commitment hash. */
    PacketCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse>;
    /** PacketAcknowledgement queries a stored acknowledgement commitment hash. */
    PacketAcknowledgement(request: QueryPacketAcknowledgementRequest): Promise<QueryPacketAcknowledgementResponse>;
    /** PacketAcknowledgements returns all packet acknowledgements associated with a channel. */
    PacketAcknowledgements(request: QueryPacketAcknowledgementsRequest): Promise<QueryPacketAcknowledgementsResponse>;
    /** PacketReceipt queries a stored packet receipt. */
    PacketReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse>;
    /** UnreceivedPackets returns all the unreceived IBC packets associated with a channel and sequences. */
    UnreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse>;
    /** UnreceivedAcks returns all the unreceived IBC acknowledgements associated with a channel and sequences. */
    UnreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse>;
}
export declare const QueryServiceName = "ibc.core.channel.v2.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    NextSequenceSend(request: QueryNextSequenceSendRequest): Promise<QueryNextSequenceSendResponse>;
    PacketCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse>;
    PacketCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse>;
    PacketAcknowledgement(request: QueryPacketAcknowledgementRequest): Promise<QueryPacketAcknowledgementResponse>;
    PacketAcknowledgements(request: QueryPacketAcknowledgementsRequest): Promise<QueryPacketAcknowledgementsResponse>;
    PacketReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse>;
    UnreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse>;
    UnreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse>;
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
