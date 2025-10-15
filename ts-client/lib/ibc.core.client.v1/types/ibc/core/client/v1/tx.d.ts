import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Plan } from "../../../../cosmos/upgrade/v1beta1/upgrade";
import { Any } from "../../../../google/protobuf/any";
import { Params } from "./client";
export declare const protobufPackage = "ibc.core.client.v1";
/** MsgCreateClient defines a message to create an IBC client */
export interface MsgCreateClient {
    /** light client state */
    clientState?: Any | undefined;
    /**
     * consensus state associated with the client that corresponds to a given
     * height.
     */
    consensusState?: Any | undefined;
    /** signer address */
    signer: string;
}
/** MsgCreateClientResponse defines the Msg/CreateClient response type. */
export interface MsgCreateClientResponse {
    clientId: string;
}
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using
 * the given client message.
 */
export interface MsgUpdateClient {
    /** client unique identifier */
    clientId: string;
    /** client message to update the light client */
    clientMessage?: Any | undefined;
    /** signer address */
    signer: string;
}
/** MsgUpdateClientResponse defines the Msg/UpdateClient response type. */
export interface MsgUpdateClientResponse {
}
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client
 * state
 */
export interface MsgUpgradeClient {
    /** client unique identifier */
    clientId: string;
    /** upgraded client state */
    clientState?: Any | undefined;
    /**
     * upgraded consensus state, only contains enough information to serve as a
     * basis of trust in update logic
     */
    consensusState?: Any | undefined;
    /** proof that old chain committed to new client */
    proofUpgradeClient: Uint8Array;
    /** proof that old chain committed to new consensus state */
    proofUpgradeConsensusState: Uint8Array;
    /** signer address */
    signer: string;
}
/** MsgUpgradeClientResponse defines the Msg/UpgradeClient response type. */
export interface MsgUpgradeClientResponse {
}
/**
 * MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for
 * light client misbehaviour.
 * This message has been deprecated. Use MsgUpdateClient instead.
 *
 * @deprecated
 */
export interface MsgSubmitMisbehaviour {
    /** client unique identifier */
    clientId: string;
    /** misbehaviour used for freezing the light client */
    misbehaviour?: Any | undefined;
    /** signer address */
    signer: string;
}
/**
 * MsgSubmitMisbehaviourResponse defines the Msg/SubmitMisbehaviour response
 * type.
 */
export interface MsgSubmitMisbehaviourResponse {
}
/** MsgRecoverClient defines the message used to recover a frozen or expired client. */
export interface MsgRecoverClient {
    /** the client identifier for the client to be updated if the proposal passes */
    subjectClientId: string;
    /**
     * the substitute client identifier for the client which will replace the subject
     * client
     */
    substituteClientId: string;
    /** signer address */
    signer: string;
}
/** MsgRecoverClientResponse defines the Msg/RecoverClient response type. */
export interface MsgRecoverClientResponse {
}
/** MsgIBCSoftwareUpgrade defines the message used to schedule an upgrade of an IBC client using a v1 governance proposal */
export interface MsgIBCSoftwareUpgrade {
    plan?: Plan | undefined;
    /**
     * An UpgradedClientState must be provided to perform an IBC breaking upgrade.
     * This will make the chain commit to the correct upgraded (self) client state
     * before the upgrade occurs, so that connecting chains can verify that the
     * new upgraded client is valid by verifying a proof on the previous version
     * of the chain. This will allow IBC connections to persist smoothly across
     * planned chain upgrades. Correspondingly, the UpgradedClientState field has been
     * deprecated in the Cosmos SDK to allow for this logic to exist solely in
     * the 02-client module.
     */
    upgradedClientState?: Any | undefined;
    /** signer address */
    signer: string;
}
/** MsgIBCSoftwareUpgradeResponse defines the Msg/IBCSoftwareUpgrade response type. */
export interface MsgIBCSoftwareUpgradeResponse {
}
/** MsgUpdateParams defines the sdk.Msg type to update the client parameters. */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the client parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params?: Params | undefined;
}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {
}
/** MsgDeleteClientCreator defines a message to delete the client creator of a client */
export interface MsgDeleteClientCreator {
    /** client identifier */
    clientId: string;
    /** signer address */
    signer: string;
}
/** MsgDeleteClientCreatorResponse defines the Msg/DeleteClientCreator response type. */
export interface MsgDeleteClientCreatorResponse {
}
export declare const MsgCreateClient: MessageFns<MsgCreateClient>;
export declare const MsgCreateClientResponse: MessageFns<MsgCreateClientResponse>;
export declare const MsgUpdateClient: MessageFns<MsgUpdateClient>;
export declare const MsgUpdateClientResponse: MessageFns<MsgUpdateClientResponse>;
export declare const MsgUpgradeClient: MessageFns<MsgUpgradeClient>;
export declare const MsgUpgradeClientResponse: MessageFns<MsgUpgradeClientResponse>;
export declare const MsgSubmitMisbehaviour: MessageFns<MsgSubmitMisbehaviour>;
export declare const MsgSubmitMisbehaviourResponse: MessageFns<MsgSubmitMisbehaviourResponse>;
export declare const MsgRecoverClient: MessageFns<MsgRecoverClient>;
export declare const MsgRecoverClientResponse: MessageFns<MsgRecoverClientResponse>;
export declare const MsgIBCSoftwareUpgrade: MessageFns<MsgIBCSoftwareUpgrade>;
export declare const MsgIBCSoftwareUpgradeResponse: MessageFns<MsgIBCSoftwareUpgradeResponse>;
export declare const MsgUpdateParams: MessageFns<MsgUpdateParams>;
export declare const MsgUpdateParamsResponse: MessageFns<MsgUpdateParamsResponse>;
export declare const MsgDeleteClientCreator: MessageFns<MsgDeleteClientCreator>;
export declare const MsgDeleteClientCreatorResponse: MessageFns<MsgDeleteClientCreatorResponse>;
/** Msg defines the ibc/client Msg service. */
export interface Msg {
    /** CreateClient defines a rpc handler method for MsgCreateClient. */
    CreateClient(request: MsgCreateClient): Promise<MsgCreateClientResponse>;
    /** UpdateClient defines a rpc handler method for MsgUpdateClient. */
    UpdateClient(request: MsgUpdateClient): Promise<MsgUpdateClientResponse>;
    /** UpgradeClient defines a rpc handler method for MsgUpgradeClient. */
    UpgradeClient(request: MsgUpgradeClient): Promise<MsgUpgradeClientResponse>;
    /** SubmitMisbehaviour defines a rpc handler method for MsgSubmitMisbehaviour. */
    SubmitMisbehaviour(request: MsgSubmitMisbehaviour): Promise<MsgSubmitMisbehaviourResponse>;
    /** RecoverClient defines a rpc handler method for MsgRecoverClient. */
    RecoverClient(request: MsgRecoverClient): Promise<MsgRecoverClientResponse>;
    /** IBCSoftwareUpgrade defines a rpc handler method for MsgIBCSoftwareUpgrade. */
    IBCSoftwareUpgrade(request: MsgIBCSoftwareUpgrade): Promise<MsgIBCSoftwareUpgradeResponse>;
    /** UpdateClientParams defines a rpc handler method for MsgUpdateParams. */
    UpdateClientParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /** DeleteClientCreator defines a rpc handler method for MsgDeleteClientCreator. */
    DeleteClientCreator(request: MsgDeleteClientCreator): Promise<MsgDeleteClientCreatorResponse>;
}
export declare const MsgServiceName = "ibc.core.client.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    CreateClient(request: MsgCreateClient): Promise<MsgCreateClientResponse>;
    UpdateClient(request: MsgUpdateClient): Promise<MsgUpdateClientResponse>;
    UpgradeClient(request: MsgUpgradeClient): Promise<MsgUpgradeClientResponse>;
    SubmitMisbehaviour(request: MsgSubmitMisbehaviour): Promise<MsgSubmitMisbehaviourResponse>;
    RecoverClient(request: MsgRecoverClient): Promise<MsgRecoverClientResponse>;
    IBCSoftwareUpgrade(request: MsgIBCSoftwareUpgrade): Promise<MsgIBCSoftwareUpgradeResponse>;
    UpdateClientParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    DeleteClientCreator(request: MsgDeleteClientCreator): Promise<MsgDeleteClientCreatorResponse>;
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
