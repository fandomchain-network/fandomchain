import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Any } from "../../../../google/protobuf/any";
import { Height } from "../../client/v1/client";
import { Counterparty, Params, Version } from "./connection";
export declare const protobufPackage = "ibc.core.connection.v1";
/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to
 * initialize a connection with Chain B.
 */
export interface MsgConnectionOpenInit {
    clientId: string;
    counterparty?: Counterparty | undefined;
    version?: Version | undefined;
    delayPeriod: Long;
    signer: string;
}
/**
 * MsgConnectionOpenInitResponse defines the Msg/ConnectionOpenInit response
 * type.
 */
export interface MsgConnectionOpenInitResponse {
}
/**
 * MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a
 * connection on Chain B.
 */
export interface MsgConnectionOpenTry {
    clientId: string;
    /**
     * Deprecated: this field is unused. Crossing hellos are no longer supported in core IBC.
     *
     * @deprecated
     */
    previousConnectionId: string;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    clientState?: Any | undefined;
    counterparty?: Counterparty | undefined;
    delayPeriod: Long;
    counterpartyVersions: Version[];
    proofHeight?: Height | undefined;
    /**
     * proof of the initialization the connection on Chain A: `UNINITIALIZED ->
     * INIT`
     */
    proofInit: Uint8Array;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    proofClient: Uint8Array;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    proofConsensus: Uint8Array;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    consensusHeight?: Height | undefined;
    signer: string;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    hostConsensusStateProof: Uint8Array;
}
/** MsgConnectionOpenTryResponse defines the Msg/ConnectionOpenTry response type. */
export interface MsgConnectionOpenTryResponse {
}
/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export interface MsgConnectionOpenAck {
    connectionId: string;
    counterpartyConnectionId: string;
    version?: Version | undefined;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    clientState?: Any | undefined;
    proofHeight?: Height | undefined;
    /**
     * proof of the initialization the connection on Chain B: `UNINITIALIZED ->
     * TRYOPEN`
     */
    proofTry: Uint8Array;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    proofClient: Uint8Array;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    proofConsensus: Uint8Array;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    consensusHeight?: Height | undefined;
    signer: string;
    /**
     * Deprecated: this field is unused.
     *
     * @deprecated
     */
    hostConsensusStateProof: Uint8Array;
}
/** MsgConnectionOpenAckResponse defines the Msg/ConnectionOpenAck response type. */
export interface MsgConnectionOpenAckResponse {
}
/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export interface MsgConnectionOpenConfirm {
    connectionId: string;
    /** proof for the change of the connection state on Chain A: `INIT -> OPEN` */
    proofAck: Uint8Array;
    proofHeight?: Height | undefined;
    signer: string;
}
/**
 * MsgConnectionOpenConfirmResponse defines the Msg/ConnectionOpenConfirm
 * response type.
 */
export interface MsgConnectionOpenConfirmResponse {
}
/** MsgUpdateParams defines the sdk.Msg type to update the connection parameters. */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the connection parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params?: Params | undefined;
}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {
}
export declare const MsgConnectionOpenInit: MessageFns<MsgConnectionOpenInit>;
export declare const MsgConnectionOpenInitResponse: MessageFns<MsgConnectionOpenInitResponse>;
export declare const MsgConnectionOpenTry: MessageFns<MsgConnectionOpenTry>;
export declare const MsgConnectionOpenTryResponse: MessageFns<MsgConnectionOpenTryResponse>;
export declare const MsgConnectionOpenAck: MessageFns<MsgConnectionOpenAck>;
export declare const MsgConnectionOpenAckResponse: MessageFns<MsgConnectionOpenAckResponse>;
export declare const MsgConnectionOpenConfirm: MessageFns<MsgConnectionOpenConfirm>;
export declare const MsgConnectionOpenConfirmResponse: MessageFns<MsgConnectionOpenConfirmResponse>;
export declare const MsgUpdateParams: MessageFns<MsgUpdateParams>;
export declare const MsgUpdateParamsResponse: MessageFns<MsgUpdateParamsResponse>;
/** Msg defines the ibc/connection Msg service. */
export interface Msg {
    /** ConnectionOpenInit defines a rpc handler method for MsgConnectionOpenInit. */
    ConnectionOpenInit(request: MsgConnectionOpenInit): Promise<MsgConnectionOpenInitResponse>;
    /** ConnectionOpenTry defines a rpc handler method for MsgConnectionOpenTry. */
    ConnectionOpenTry(request: MsgConnectionOpenTry): Promise<MsgConnectionOpenTryResponse>;
    /** ConnectionOpenAck defines a rpc handler method for MsgConnectionOpenAck. */
    ConnectionOpenAck(request: MsgConnectionOpenAck): Promise<MsgConnectionOpenAckResponse>;
    /**
     * ConnectionOpenConfirm defines a rpc handler method for
     * MsgConnectionOpenConfirm.
     */
    ConnectionOpenConfirm(request: MsgConnectionOpenConfirm): Promise<MsgConnectionOpenConfirmResponse>;
    /**
     * UpdateConnectionParams defines a rpc handler method for
     * MsgUpdateParams.
     */
    UpdateConnectionParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "ibc.core.connection.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    ConnectionOpenInit(request: MsgConnectionOpenInit): Promise<MsgConnectionOpenInitResponse>;
    ConnectionOpenTry(request: MsgConnectionOpenTry): Promise<MsgConnectionOpenTryResponse>;
    ConnectionOpenAck(request: MsgConnectionOpenAck): Promise<MsgConnectionOpenAckResponse>;
    ConnectionOpenConfirm(request: MsgConnectionOpenConfirm): Promise<MsgConnectionOpenConfirmResponse>;
    UpdateConnectionParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
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
