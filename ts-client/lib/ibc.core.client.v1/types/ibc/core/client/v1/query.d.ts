import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { MerklePath } from "../../commitment/v2/commitment";
import { ConsensusStateWithHeight, Height, IdentifiedClientState, Params } from "./client";
export declare const protobufPackage = "ibc.core.client.v1";
/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 */
export interface QueryClientStateRequest {
    /** client state unique identifier */
    clientId: string;
}
/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryClientStateResponse {
    /** client state associated with the request identifier */
    clientState?: Any | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight?: Height | undefined;
}
/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 */
export interface QueryClientStatesRequest {
    /** pagination request */
    pagination?: PageRequest | undefined;
}
/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface QueryClientStatesResponse {
    /** list of stored ClientStates of the chain. */
    clientStates: IdentifiedClientState[];
    /** pagination response */
    pagination?: PageResponse | undefined;
}
/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 */
export interface QueryConsensusStateRequest {
    /** client identifier */
    clientId: string;
    /** consensus state revision number */
    revisionNumber: Long;
    /** consensus state revision height */
    revisionHeight: Long;
    /**
     * latest_height overrides the height field and queries the latest stored
     * ConsensusState
     */
    latestHeight: boolean;
}
/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface QueryConsensusStateResponse {
    /** consensus state associated with the client identifier at the given height */
    consensusState?: Any | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight?: Height | undefined;
}
/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 */
export interface QueryConsensusStatesRequest {
    /** client identifier */
    clientId: string;
    /** pagination request */
    pagination?: PageRequest | undefined;
}
/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface QueryConsensusStatesResponse {
    /** consensus states associated with the identifier */
    consensusStates: ConsensusStateWithHeight[];
    /** pagination response */
    pagination?: PageResponse | undefined;
}
/**
 * QueryConsensusStateHeightsRequest is the request type for Query/ConsensusStateHeights
 * RPC method.
 */
export interface QueryConsensusStateHeightsRequest {
    /** client identifier */
    clientId: string;
    /** pagination request */
    pagination?: PageRequest | undefined;
}
/**
 * QueryConsensusStateHeightsResponse is the response type for the
 * Query/ConsensusStateHeights RPC method
 */
export interface QueryConsensusStateHeightsResponse {
    /** consensus state heights */
    consensusStateHeights: Height[];
    /** pagination response */
    pagination?: PageResponse | undefined;
}
/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 */
export interface QueryClientStatusRequest {
    /** client unique identifier */
    clientId: string;
}
/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface QueryClientStatusResponse {
    status: string;
}
/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsRequest {
}
/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsResponse {
    /** params defines the parameters of the module. */
    params?: Params | undefined;
}
/**
 * QueryClientCreatorRequest is the request type for the Query/ClientCreator RPC
 * method.
 */
export interface QueryClientCreatorRequest {
    /** client unique identifier */
    clientId: string;
}
/**
 * QueryClientCreatorResponse is the response type for the Query/ClientCreator RPC
 * method.
 */
export interface QueryClientCreatorResponse {
    /** creator of the client */
    creator: string;
}
/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 */
export interface QueryUpgradedClientStateRequest {
}
/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface QueryUpgradedClientStateResponse {
    /** client state associated with the request identifier */
    upgradedClientState?: Any | undefined;
}
/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 */
export interface QueryUpgradedConsensusStateRequest {
}
/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface QueryUpgradedConsensusStateResponse {
    /** Consensus state associated with the request identifier */
    upgradedConsensusState?: Any | undefined;
}
/** QueryVerifyMembershipRequest is the request type for the Query/VerifyMembership RPC method */
export interface QueryVerifyMembershipRequest {
    /** client unique identifier. */
    clientId: string;
    /** the proof to be verified by the client. */
    proof: Uint8Array;
    /** the height of the commitment root at which the proof is verified. */
    proofHeight?: Height | undefined;
    /** the value which is proven. */
    value: Uint8Array;
    /** optional time delay */
    timeDelay: Long;
    /** optional block delay */
    blockDelay: Long;
    /** the commitment key path. */
    merklePath?: MerklePath | undefined;
}
/** QueryVerifyMembershipResponse is the response type for the Query/VerifyMembership RPC method */
export interface QueryVerifyMembershipResponse {
    /** boolean indicating success or failure of proof verification. */
    success: boolean;
}
export declare const QueryClientStateRequest: MessageFns<QueryClientStateRequest>;
export declare const QueryClientStateResponse: MessageFns<QueryClientStateResponse>;
export declare const QueryClientStatesRequest: MessageFns<QueryClientStatesRequest>;
export declare const QueryClientStatesResponse: MessageFns<QueryClientStatesResponse>;
export declare const QueryConsensusStateRequest: MessageFns<QueryConsensusStateRequest>;
export declare const QueryConsensusStateResponse: MessageFns<QueryConsensusStateResponse>;
export declare const QueryConsensusStatesRequest: MessageFns<QueryConsensusStatesRequest>;
export declare const QueryConsensusStatesResponse: MessageFns<QueryConsensusStatesResponse>;
export declare const QueryConsensusStateHeightsRequest: MessageFns<QueryConsensusStateHeightsRequest>;
export declare const QueryConsensusStateHeightsResponse: MessageFns<QueryConsensusStateHeightsResponse>;
export declare const QueryClientStatusRequest: MessageFns<QueryClientStatusRequest>;
export declare const QueryClientStatusResponse: MessageFns<QueryClientStatusResponse>;
export declare const QueryClientParamsRequest: MessageFns<QueryClientParamsRequest>;
export declare const QueryClientParamsResponse: MessageFns<QueryClientParamsResponse>;
export declare const QueryClientCreatorRequest: MessageFns<QueryClientCreatorRequest>;
export declare const QueryClientCreatorResponse: MessageFns<QueryClientCreatorResponse>;
export declare const QueryUpgradedClientStateRequest: MessageFns<QueryUpgradedClientStateRequest>;
export declare const QueryUpgradedClientStateResponse: MessageFns<QueryUpgradedClientStateResponse>;
export declare const QueryUpgradedConsensusStateRequest: MessageFns<QueryUpgradedConsensusStateRequest>;
export declare const QueryUpgradedConsensusStateResponse: MessageFns<QueryUpgradedConsensusStateResponse>;
export declare const QueryVerifyMembershipRequest: MessageFns<QueryVerifyMembershipRequest>;
export declare const QueryVerifyMembershipResponse: MessageFns<QueryVerifyMembershipResponse>;
/** Query provides defines the gRPC querier service */
export interface Query {
    /** ClientState queries an IBC light client. */
    ClientState(request: QueryClientStateRequest): Promise<QueryClientStateResponse>;
    /** ClientStates queries all the IBC light clients of a chain. */
    ClientStates(request: QueryClientStatesRequest): Promise<QueryClientStatesResponse>;
    /**
     * ConsensusState queries a consensus state associated with a client state at
     * a given height.
     */
    ConsensusState(request: QueryConsensusStateRequest): Promise<QueryConsensusStateResponse>;
    /**
     * ConsensusStates queries all the consensus state associated with a given
     * client.
     */
    ConsensusStates(request: QueryConsensusStatesRequest): Promise<QueryConsensusStatesResponse>;
    /** ConsensusStateHeights queries the height of every consensus states associated with a given client. */
    ConsensusStateHeights(request: QueryConsensusStateHeightsRequest): Promise<QueryConsensusStateHeightsResponse>;
    /** Status queries the status of an IBC client. */
    ClientStatus(request: QueryClientStatusRequest): Promise<QueryClientStatusResponse>;
    /** ClientParams queries all parameters of the ibc client submodule. */
    ClientParams(request: QueryClientParamsRequest): Promise<QueryClientParamsResponse>;
    /** ClientCreator queries the creator of a given client. */
    ClientCreator(request: QueryClientCreatorRequest): Promise<QueryClientCreatorResponse>;
    /** UpgradedClientState queries an Upgraded IBC light client. */
    UpgradedClientState(request: QueryUpgradedClientStateRequest): Promise<QueryUpgradedClientStateResponse>;
    /** UpgradedConsensusState queries an Upgraded IBC consensus state. */
    UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
    /** VerifyMembership queries an IBC light client for proof verification of a value at a given key path. */
    VerifyMembership(request: QueryVerifyMembershipRequest): Promise<QueryVerifyMembershipResponse>;
}
export declare const QueryServiceName = "ibc.core.client.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    ClientState(request: QueryClientStateRequest): Promise<QueryClientStateResponse>;
    ClientStates(request: QueryClientStatesRequest): Promise<QueryClientStatesResponse>;
    ConsensusState(request: QueryConsensusStateRequest): Promise<QueryConsensusStateResponse>;
    ConsensusStates(request: QueryConsensusStatesRequest): Promise<QueryConsensusStatesResponse>;
    ConsensusStateHeights(request: QueryConsensusStateHeightsRequest): Promise<QueryConsensusStateHeightsResponse>;
    ClientStatus(request: QueryClientStatusRequest): Promise<QueryClientStatusResponse>;
    ClientParams(request: QueryClientParamsRequest): Promise<QueryClientParamsResponse>;
    ClientCreator(request: QueryClientCreatorRequest): Promise<QueryClientCreatorResponse>;
    UpgradedClientState(request: QueryUpgradedClientStateRequest): Promise<QueryUpgradedClientStateResponse>;
    UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
    VerifyMembership(request: QueryVerifyMembershipRequest): Promise<QueryVerifyMembershipResponse>;
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
