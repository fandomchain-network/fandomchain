import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { GroupInfo, GroupMember, GroupPolicyInfo, Proposal, Vote } from "./types";
export declare const protobufPackage = "cosmos.group.v1";
/** GenesisState defines the group module's genesis state. */
export interface GenesisState {
    /**
     * group_seq is the group table orm.Sequence,
     * it is used to get the next group ID.
     */
    groupSeq: Long;
    /** groups is the list of groups info. */
    groups: GroupInfo[];
    /** group_members is the list of groups members. */
    groupMembers: GroupMember[];
    /**
     * group_policy_seq is the group policy table orm.Sequence,
     * it is used to generate the next group policy account address.
     */
    groupPolicySeq: Long;
    /** group_policies is the list of group policies info. */
    groupPolicies: GroupPolicyInfo[];
    /**
     * proposal_seq is the proposal table orm.Sequence,
     * it is used to get the next proposal ID.
     */
    proposalSeq: Long;
    /** proposals is the list of proposals. */
    proposals: Proposal[];
    /** votes is the list of votes. */
    votes: Vote[];
}
export declare const GenesisState: MessageFns<GenesisState>;
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
