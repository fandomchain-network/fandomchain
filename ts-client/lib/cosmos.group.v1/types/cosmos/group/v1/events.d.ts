import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { ProposalExecutorResult, ProposalStatus, TallyResult } from "./types";
export declare const protobufPackage = "cosmos.group.v1";
/** EventCreateGroup is an event emitted when a group is created. */
export interface EventCreateGroup {
    /** group_id is the unique ID of the group. */
    groupId: Long;
}
/** EventUpdateGroup is an event emitted when a group is updated. */
export interface EventUpdateGroup {
    /** group_id is the unique ID of the group. */
    groupId: Long;
}
/** EventCreateGroupPolicy is an event emitted when a group policy is created. */
export interface EventCreateGroupPolicy {
    /** address is the account address of the group policy. */
    address: string;
}
/** EventUpdateGroupPolicy is an event emitted when a group policy is updated. */
export interface EventUpdateGroupPolicy {
    /** address is the account address of the group policy. */
    address: string;
}
/** EventSubmitProposal is an event emitted when a proposal is created. */
export interface EventSubmitProposal {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: Long;
}
/** EventWithdrawProposal is an event emitted when a proposal is withdrawn. */
export interface EventWithdrawProposal {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: Long;
}
/** EventVote is an event emitted when a voter votes on a proposal. */
export interface EventVote {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: Long;
}
/** EventExec is an event emitted when a proposal is executed. */
export interface EventExec {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: Long;
    /** result is the proposal execution result. */
    result: ProposalExecutorResult;
    /** logs contains error logs in case the execution result is FAILURE. */
    logs: string;
}
/** EventLeaveGroup is an event emitted when group member leaves the group. */
export interface EventLeaveGroup {
    /** group_id is the unique ID of the group. */
    groupId: Long;
    /** address is the account address of the group member. */
    address: string;
}
/** EventProposalPruned is an event emitted when a proposal is pruned. */
export interface EventProposalPruned {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: Long;
    /** status is the proposal status (UNSPECIFIED, SUBMITTED, ACCEPTED, REJECTED, ABORTED, WITHDRAWN). */
    status: ProposalStatus;
    /** tally_result is the proposal tally result (when applicable). */
    tallyResult?: TallyResult | undefined;
}
/** EventTallyError is an event emitted when a proposal tally failed with an error. */
export interface EventTallyError {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: Long;
    /** error_message is the raw error output */
    errorMessage: string;
}
export declare const EventCreateGroup: MessageFns<EventCreateGroup>;
export declare const EventUpdateGroup: MessageFns<EventUpdateGroup>;
export declare const EventCreateGroupPolicy: MessageFns<EventCreateGroupPolicy>;
export declare const EventUpdateGroupPolicy: MessageFns<EventUpdateGroupPolicy>;
export declare const EventSubmitProposal: MessageFns<EventSubmitProposal>;
export declare const EventWithdrawProposal: MessageFns<EventWithdrawProposal>;
export declare const EventVote: MessageFns<EventVote>;
export declare const EventExec: MessageFns<EventExec>;
export declare const EventLeaveGroup: MessageFns<EventLeaveGroup>;
export declare const EventProposalPruned: MessageFns<EventProposalPruned>;
export declare const EventTallyError: MessageFns<EventTallyError>;
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
