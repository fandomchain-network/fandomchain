import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Permissions } from "./types";
export declare const protobufPackage = "cosmos.circuit.v1";
/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker request type. */
export interface MsgAuthorizeCircuitBreaker {
    /**
     * granter is the granter of the circuit breaker permissions and must have
     * LEVEL_SUPER_ADMIN.
     */
    granter: string;
    /** grantee is the account authorized with the provided permissions. */
    grantee: string;
    /**
     * permissions are the circuit breaker permissions that the grantee receives.
     * These will overwrite any existing permissions. LEVEL_NONE_UNSPECIFIED can
     * be specified to revoke all permissions.
     */
    permissions?: Permissions | undefined;
}
/** MsgAuthorizeCircuitBreakerResponse defines the Msg/AuthorizeCircuitBreaker response type. */
export interface MsgAuthorizeCircuitBreakerResponse {
    success: boolean;
}
/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker request type. */
export interface MsgTripCircuitBreaker {
    /** authority is the account authorized to trip the circuit breaker. */
    authority: string;
    /**
     * msg_type_urls specifies a list of type URLs to immediately stop processing.
     * IF IT IS LEFT EMPTY, ALL MSG PROCESSING WILL STOP IMMEDIATELY.
     * This value is validated against the authority's permissions and if the
     * authority does not have permissions to trip the specified msg type URLs
     * (or all URLs), the operation will fail.
     */
    msgTypeUrls: string[];
}
/** MsgTripCircuitBreakerResponse defines the Msg/TripCircuitBreaker response type. */
export interface MsgTripCircuitBreakerResponse {
    success: boolean;
}
/** MsgResetCircuitBreaker defines the Msg/ResetCircuitBreaker request type. */
export interface MsgResetCircuitBreaker {
    /** authority is the account authorized to trip or reset the circuit breaker. */
    authority: string;
    /**
     * msg_type_urls specifies a list of Msg type URLs to resume processing. If
     * it is left empty all Msg processing for type URLs that the account is
     * authorized to trip will resume.
     */
    msgTypeUrls: string[];
}
/** MsgResetCircuitBreakerResponse defines the Msg/ResetCircuitBreaker response type. */
export interface MsgResetCircuitBreakerResponse {
    success: boolean;
}
export declare const MsgAuthorizeCircuitBreaker: MessageFns<MsgAuthorizeCircuitBreaker>;
export declare const MsgAuthorizeCircuitBreakerResponse: MessageFns<MsgAuthorizeCircuitBreakerResponse>;
export declare const MsgTripCircuitBreaker: MessageFns<MsgTripCircuitBreaker>;
export declare const MsgTripCircuitBreakerResponse: MessageFns<MsgTripCircuitBreakerResponse>;
export declare const MsgResetCircuitBreaker: MessageFns<MsgResetCircuitBreaker>;
export declare const MsgResetCircuitBreakerResponse: MessageFns<MsgResetCircuitBreakerResponse>;
/** Msg defines the circuit Msg service. */
export interface Msg {
    /**
     * AuthorizeCircuitBreaker allows a super-admin to grant (or revoke) another
     * account's circuit breaker permissions.
     */
    AuthorizeCircuitBreaker(request: MsgAuthorizeCircuitBreaker): Promise<MsgAuthorizeCircuitBreakerResponse>;
    /** TripCircuitBreaker pauses processing of Msg's in the state machine. */
    TripCircuitBreaker(request: MsgTripCircuitBreaker): Promise<MsgTripCircuitBreakerResponse>;
    /**
     * ResetCircuitBreaker resumes processing of Msg's in the state machine that
     * have been been paused using TripCircuitBreaker.
     */
    ResetCircuitBreaker(request: MsgResetCircuitBreaker): Promise<MsgResetCircuitBreakerResponse>;
}
export declare const MsgServiceName = "cosmos.circuit.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    AuthorizeCircuitBreaker(request: MsgAuthorizeCircuitBreaker): Promise<MsgAuthorizeCircuitBreakerResponse>;
    TripCircuitBreaker(request: MsgTripCircuitBreaker): Promise<MsgTripCircuitBreakerResponse>;
    ResetCircuitBreaker(request: MsgResetCircuitBreaker): Promise<MsgResetCircuitBreakerResponse>;
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
