import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Config } from "./config";
export declare const protobufPackage = "ibc.core.client.v2";
/** MsgRegisterCounterparty defines a message to register a counterparty on a client */
export interface MsgRegisterCounterparty {
    /** client identifier */
    clientId: string;
    /** counterparty merkle prefix */
    counterpartyMerklePrefix: Uint8Array[];
    /** counterparty client identifier */
    counterpartyClientId: string;
    /** signer address */
    signer: string;
}
/** MsgRegisterCounterpartyResponse defines the Msg/RegisterCounterparty response type. */
export interface MsgRegisterCounterpartyResponse {
}
/** MsgUpdateClientConfig defines the sdk.Msg type to update the configuration for a given client */
export interface MsgUpdateClientConfig {
    /** client identifier */
    clientId: string;
    /**
     * allowed relayers
     *
     * NOTE: All fields in the config must be supplied.
     */
    config?: Config | undefined;
    /** signer address */
    signer: string;
}
/** MsgUpdateClientConfigResponse defines the MsgUpdateClientConfig response type. */
export interface MsgUpdateClientConfigResponse {
}
export declare const MsgRegisterCounterparty: MessageFns<MsgRegisterCounterparty>;
export declare const MsgRegisterCounterpartyResponse: MessageFns<MsgRegisterCounterpartyResponse>;
export declare const MsgUpdateClientConfig: MessageFns<MsgUpdateClientConfig>;
export declare const MsgUpdateClientConfigResponse: MessageFns<MsgUpdateClientConfigResponse>;
/** Msg defines the ibc/client/v2 Msg service. */
export interface Msg {
    /** RegisterCounterparty defines a rpc handler method for MsgRegisterCounterparty. */
    RegisterCounterparty(request: MsgRegisterCounterparty): Promise<MsgRegisterCounterpartyResponse>;
    /** UpdateClientConfig defines a rpc handler method for MsgUpdateClientConfig. */
    UpdateClientConfig(request: MsgUpdateClientConfig): Promise<MsgUpdateClientConfigResponse>;
}
export declare const MsgServiceName = "ibc.core.client.v2.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    RegisterCounterparty(request: MsgRegisterCounterparty): Promise<MsgRegisterCounterpartyResponse>;
    UpdateClientConfig(request: MsgUpdateClientConfig): Promise<MsgUpdateClientConfigResponse>;
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
