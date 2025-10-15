import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Params, QueryRequest } from "./host";
export declare const protobufPackage = "ibc.applications.interchain_accounts.host.v1";
/** MsgUpdateParams defines the payload for Msg/UpdateParams */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the 27-interchain-accounts/host parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params?: Params | undefined;
}
/** MsgUpdateParamsResponse defines the response for Msg/UpdateParams */
export interface MsgUpdateParamsResponse {
}
/** MsgModuleQuerySafe defines the payload for Msg/ModuleQuerySafe */
export interface MsgModuleQuerySafe {
    /** signer address */
    signer: string;
    /** requests defines the module safe queries to execute. */
    requests: QueryRequest[];
}
/** MsgModuleQuerySafeResponse defines the response for Msg/ModuleQuerySafe */
export interface MsgModuleQuerySafeResponse {
    /** height at which the responses were queried */
    height: Long;
    /** protobuf encoded responses for each query */
    responses: Uint8Array[];
}
export declare const MsgUpdateParams: MessageFns<MsgUpdateParams>;
export declare const MsgUpdateParamsResponse: MessageFns<MsgUpdateParamsResponse>;
export declare const MsgModuleQuerySafe: MessageFns<MsgModuleQuerySafe>;
export declare const MsgModuleQuerySafeResponse: MessageFns<MsgModuleQuerySafeResponse>;
/** Msg defines the 27-interchain-accounts/host Msg service. */
export interface Msg {
    /** UpdateParams defines a rpc handler for MsgUpdateParams. */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /** ModuleQuerySafe defines a rpc handler for MsgModuleQuerySafe. */
    ModuleQuerySafe(request: MsgModuleQuerySafe): Promise<MsgModuleQuerySafeResponse>;
}
export declare const MsgServiceName = "ibc.applications.interchain_accounts.host.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    ModuleQuerySafe(request: MsgModuleQuerySafe): Promise<MsgModuleQuerySafeResponse>;
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
