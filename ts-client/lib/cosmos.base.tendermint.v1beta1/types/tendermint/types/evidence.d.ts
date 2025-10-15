import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { LightBlock, Vote } from "./types";
import { Validator } from "./validator";
export declare const protobufPackage = "tendermint.types";
export interface Evidence {
    duplicateVoteEvidence?: DuplicateVoteEvidence | undefined;
    lightClientAttackEvidence?: LightClientAttackEvidence | undefined;
}
/** DuplicateVoteEvidence contains evidence of a validator signed two conflicting votes. */
export interface DuplicateVoteEvidence {
    voteA?: Vote | undefined;
    voteB?: Vote | undefined;
    totalVotingPower: Long;
    validatorPower: Long;
    timestamp?: Date | undefined;
}
/** LightClientAttackEvidence contains evidence of a set of validators attempting to mislead a light client. */
export interface LightClientAttackEvidence {
    conflictingBlock?: LightBlock | undefined;
    commonHeight: Long;
    byzantineValidators: Validator[];
    totalVotingPower: Long;
    timestamp?: Date | undefined;
}
export interface EvidenceList {
    evidence: Evidence[];
}
export declare const Evidence: MessageFns<Evidence>;
export declare const DuplicateVoteEvidence: MessageFns<DuplicateVoteEvidence>;
export declare const LightClientAttackEvidence: MessageFns<LightClientAttackEvidence>;
export declare const EvidenceList: MessageFns<EvidenceList>;
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
