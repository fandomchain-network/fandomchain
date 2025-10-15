import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Plan } from "./upgrade";
export declare const protobufPackage = "cosmos.upgrade.v1beta1";
/** MsgSoftwareUpgrade is the Msg/SoftwareUpgrade request type. */
export interface MsgSoftwareUpgrade {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /** plan is the upgrade plan. */
    plan?: Plan | undefined;
}
/** MsgSoftwareUpgradeResponse is the Msg/SoftwareUpgrade response type. */
export interface MsgSoftwareUpgradeResponse {
}
/** MsgCancelUpgrade is the Msg/CancelUpgrade request type. */
export interface MsgCancelUpgrade {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
}
/** MsgCancelUpgradeResponse is the Msg/CancelUpgrade response type. */
export interface MsgCancelUpgradeResponse {
}
export declare const MsgSoftwareUpgrade: MessageFns<MsgSoftwareUpgrade>;
export declare const MsgSoftwareUpgradeResponse: MessageFns<MsgSoftwareUpgradeResponse>;
export declare const MsgCancelUpgrade: MessageFns<MsgCancelUpgrade>;
export declare const MsgCancelUpgradeResponse: MessageFns<MsgCancelUpgradeResponse>;
/** Msg defines the upgrade Msg service. */
export interface Msg {
    /** SoftwareUpgrade is a governance operation for initiating a software upgrade. */
    SoftwareUpgrade(request: MsgSoftwareUpgrade): Promise<MsgSoftwareUpgradeResponse>;
    /**
     * CancelUpgrade is a governance operation for cancelling a previously
     * approved software upgrade.
     */
    CancelUpgrade(request: MsgCancelUpgrade): Promise<MsgCancelUpgradeResponse>;
}
export declare const MsgServiceName = "cosmos.upgrade.v1beta1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    SoftwareUpgrade(request: MsgSoftwareUpgrade): Promise<MsgSoftwareUpgradeResponse>;
    CancelUpgrade(request: MsgCancelUpgrade): Promise<MsgCancelUpgradeResponse>;
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
