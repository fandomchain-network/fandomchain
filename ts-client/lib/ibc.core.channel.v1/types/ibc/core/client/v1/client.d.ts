import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Any } from "../../../../google/protobuf/any";
export declare const protobufPackage = "ibc.core.client.v1";
/**
 * IdentifiedClientState defines a client state with an additional client
 * identifier field.
 */
export interface IdentifiedClientState {
    /** client identifier */
    clientId: string;
    /** client state */
    clientState?: Any | undefined;
}
/**
 * ConsensusStateWithHeight defines a consensus state with an additional height
 * field.
 */
export interface ConsensusStateWithHeight {
    /** consensus state height */
    height?: Height | undefined;
    /** consensus state */
    consensusState?: Any | undefined;
}
/**
 * ClientConsensusStates defines all the stored consensus states for a given
 * client.
 */
export interface ClientConsensusStates {
    /** client identifier */
    clientId: string;
    /** consensus states and their heights associated with the client */
    consensusStates: ConsensusStateWithHeight[];
}
/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 *
 * Please note that json tags for generated Go code are overridden to explicitly exclude the omitempty jsontag.
 * This enforces the Go json marshaller to always emit zero values for both revision_number and revision_height.
 */
export interface Height {
    /** the revision that the client is currently on */
    revisionNumber: Long;
    /** the height within the given revision */
    revisionHeight: Long;
}
/** Params defines the set of IBC light client parameters. */
export interface Params {
    /**
     * allowed_clients defines the list of allowed client state types which can be created
     * and interacted with. If a client type is removed from the allowed clients list, usage
     * of this client will be disabled until it is added again to the list.
     */
    allowedClients: string[];
}
export declare const IdentifiedClientState: MessageFns<IdentifiedClientState>;
export declare const ConsensusStateWithHeight: MessageFns<ConsensusStateWithHeight>;
export declare const ClientConsensusStates: MessageFns<ClientConsensusStates>;
export declare const Height: MessageFns<Height>;
export declare const Params: MessageFns<Params>;
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
