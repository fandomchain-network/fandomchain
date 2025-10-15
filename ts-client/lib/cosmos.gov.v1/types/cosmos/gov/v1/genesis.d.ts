import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Deposit, DepositParams, Params, Proposal, TallyParams, Vote, VotingParams } from "./gov";
export declare const protobufPackage = "cosmos.gov.v1";
/** GenesisState defines the gov module's genesis state. */
export interface GenesisState {
    /** starting_proposal_id is the ID of the starting proposal. */
    startingProposalId: Long;
    /** deposits defines all the deposits present at genesis. */
    deposits: Deposit[];
    /** votes defines all the votes present at genesis. */
    votes: Vote[];
    /** proposals defines all the proposals present at genesis. */
    proposals: Proposal[];
    /**
     * Deprecated: Prefer to use `params` instead.
     * deposit_params defines all the paramaters of related to deposit.
     *
     * @deprecated
     */
    depositParams?: DepositParams | undefined;
    /**
     * Deprecated: Prefer to use `params` instead.
     * voting_params defines all the paramaters of related to voting.
     *
     * @deprecated
     */
    votingParams?: VotingParams | undefined;
    /**
     * Deprecated: Prefer to use `params` instead.
     * tally_params defines all the paramaters of related to tally.
     *
     * @deprecated
     */
    tallyParams?: TallyParams | undefined;
    /** params defines all the paramaters of x/gov module. */
    params?: Params | undefined;
    /**
     * The constitution allows builders to lay a foundation and define purpose.
     * This is an immutable string set in genesis.
     * There are no amendments, to go outside of scope, just fork.
     * constitution is an immutable string in genesis for a chain builder to lay out their vision, ideas and ideals.
     */
    constitution: string;
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
