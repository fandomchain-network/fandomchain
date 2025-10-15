import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Deposit, DepositParams, Params, Proposal, ProposalStatus, TallyParams, TallyResult, Vote, VotingParams } from "./gov";
export declare const protobufPackage = "cosmos.gov.v1";
/** QueryConstitutionRequest is the request type for the Query/Constitution RPC method */
export interface QueryConstitutionRequest {
}
/** QueryConstitutionResponse is the response type for the Query/Constitution RPC method */
export interface QueryConstitutionResponse {
    constitution: string;
}
/** QueryProposalRequest is the request type for the Query/Proposal RPC method. */
export interface QueryProposalRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: Long;
}
/** QueryProposalResponse is the response type for the Query/Proposal RPC method. */
export interface QueryProposalResponse {
    /** proposal is the requested governance proposal. */
    proposal?: Proposal | undefined;
}
/** QueryProposalsRequest is the request type for the Query/Proposals RPC method. */
export interface QueryProposalsRequest {
    /** proposal_status defines the status of the proposals. */
    proposalStatus: ProposalStatus;
    /** voter defines the voter address for the proposals. */
    voter: string;
    /** depositor defines the deposit addresses from the proposals. */
    depositor: string;
    /** pagination defines an optional pagination for the request. */
    pagination?: PageRequest | undefined;
}
/**
 * QueryProposalsResponse is the response type for the Query/Proposals RPC
 * method.
 */
export interface QueryProposalsResponse {
    /** proposals defines all the requested governance proposals. */
    proposals: Proposal[];
    /** pagination defines the pagination in the response. */
    pagination?: PageResponse | undefined;
}
/** QueryVoteRequest is the request type for the Query/Vote RPC method. */
export interface QueryVoteRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: Long;
    /** voter defines the voter address for the proposals. */
    voter: string;
}
/** QueryVoteResponse is the response type for the Query/Vote RPC method. */
export interface QueryVoteResponse {
    /** vote defines the queried vote. */
    vote?: Vote | undefined;
}
/** QueryVotesRequest is the request type for the Query/Votes RPC method. */
export interface QueryVotesRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: Long;
    /** pagination defines an optional pagination for the request. */
    pagination?: PageRequest | undefined;
}
/** QueryVotesResponse is the response type for the Query/Votes RPC method. */
export interface QueryVotesResponse {
    /** votes defines the queried votes. */
    votes: Vote[];
    /** pagination defines the pagination in the response. */
    pagination?: PageResponse | undefined;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
    /**
     * params_type defines which parameters to query for, can be one of "voting",
     * "tallying" or "deposit".
     */
    paramsType: string;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /**
     * Deprecated: Prefer to use `params` instead.
     * voting_params defines the parameters related to voting.
     *
     * @deprecated
     */
    votingParams?: VotingParams | undefined;
    /**
     * Deprecated: Prefer to use `params` instead.
     * deposit_params defines the parameters related to deposit.
     *
     * @deprecated
     */
    depositParams?: DepositParams | undefined;
    /**
     * Deprecated: Prefer to use `params` instead.
     * tally_params defines the parameters related to tally.
     *
     * @deprecated
     */
    tallyParams?: TallyParams | undefined;
    /** params defines all the paramaters of x/gov module. */
    params?: Params | undefined;
}
/** QueryDepositRequest is the request type for the Query/Deposit RPC method. */
export interface QueryDepositRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: Long;
    /** depositor defines the deposit addresses from the proposals. */
    depositor: string;
}
/** QueryDepositResponse is the response type for the Query/Deposit RPC method. */
export interface QueryDepositResponse {
    /** deposit defines the requested deposit. */
    deposit?: Deposit | undefined;
}
/** QueryDepositsRequest is the request type for the Query/Deposits RPC method. */
export interface QueryDepositsRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: Long;
    /** pagination defines an optional pagination for the request. */
    pagination?: PageRequest | undefined;
}
/** QueryDepositsResponse is the response type for the Query/Deposits RPC method. */
export interface QueryDepositsResponse {
    /** deposits defines the requested deposits. */
    deposits: Deposit[];
    /** pagination defines the pagination in the response. */
    pagination?: PageResponse | undefined;
}
/** QueryTallyResultRequest is the request type for the Query/Tally RPC method. */
export interface QueryTallyResultRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: Long;
}
/** QueryTallyResultResponse is the response type for the Query/Tally RPC method. */
export interface QueryTallyResultResponse {
    /** tally defines the requested tally. */
    tally?: TallyResult | undefined;
}
export declare const QueryConstitutionRequest: MessageFns<QueryConstitutionRequest>;
export declare const QueryConstitutionResponse: MessageFns<QueryConstitutionResponse>;
export declare const QueryProposalRequest: MessageFns<QueryProposalRequest>;
export declare const QueryProposalResponse: MessageFns<QueryProposalResponse>;
export declare const QueryProposalsRequest: MessageFns<QueryProposalsRequest>;
export declare const QueryProposalsResponse: MessageFns<QueryProposalsResponse>;
export declare const QueryVoteRequest: MessageFns<QueryVoteRequest>;
export declare const QueryVoteResponse: MessageFns<QueryVoteResponse>;
export declare const QueryVotesRequest: MessageFns<QueryVotesRequest>;
export declare const QueryVotesResponse: MessageFns<QueryVotesResponse>;
export declare const QueryParamsRequest: MessageFns<QueryParamsRequest>;
export declare const QueryParamsResponse: MessageFns<QueryParamsResponse>;
export declare const QueryDepositRequest: MessageFns<QueryDepositRequest>;
export declare const QueryDepositResponse: MessageFns<QueryDepositResponse>;
export declare const QueryDepositsRequest: MessageFns<QueryDepositsRequest>;
export declare const QueryDepositsResponse: MessageFns<QueryDepositsResponse>;
export declare const QueryTallyResultRequest: MessageFns<QueryTallyResultRequest>;
export declare const QueryTallyResultResponse: MessageFns<QueryTallyResultResponse>;
/** Query defines the gRPC querier service for gov module */
export interface Query {
    /** Constitution queries the chain's constitution. */
    Constitution(request: QueryConstitutionRequest): Promise<QueryConstitutionResponse>;
    /** Proposal queries proposal details based on ProposalID. */
    Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
    /** Proposals queries all proposals based on given status. */
    Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse>;
    /** Vote queries voted information based on proposalID, voterAddr. */
    Vote(request: QueryVoteRequest): Promise<QueryVoteResponse>;
    /** Votes queries votes of a given proposal. */
    Votes(request: QueryVotesRequest): Promise<QueryVotesResponse>;
    /** Params queries all parameters of the gov module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Deposit queries single deposit information based on proposalID, depositAddr. */
    Deposit(request: QueryDepositRequest): Promise<QueryDepositResponse>;
    /** Deposits queries all deposits of a single proposal. */
    Deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
    /** TallyResult queries the tally of a proposal vote. */
    TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
}
export declare const QueryServiceName = "cosmos.gov.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Constitution(request: QueryConstitutionRequest): Promise<QueryConstitutionResponse>;
    Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
    Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse>;
    Vote(request: QueryVoteRequest): Promise<QueryVoteResponse>;
    Votes(request: QueryVotesRequest): Promise<QueryVotesResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Deposit(request: QueryDepositRequest): Promise<QueryDepositResponse>;
    Deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
    TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
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
