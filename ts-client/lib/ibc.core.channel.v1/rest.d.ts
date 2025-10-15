import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryChannelsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryConnectionChannelsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketCommitmentsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketAcknowledgementsRequest } from "./types/ibc/core/channel/v1/query";
import type { SnakeCasedPropertiesDeep } from 'type-fest';
export type QueryParamsType = Record<string | number, any>;
export type FlattenObject<TValue> = CollapseEntries<CreateObjectEntries<TValue, TValue>>;
type Entry = {
    key: string;
    value: unknown;
};
type EmptyEntry<TValue> = {
    key: '';
    value: TValue;
};
type ExcludedTypes = Date | Set<unknown> | Map<unknown, unknown>;
type ArrayEncoder = `[${bigint}]`;
type EscapeArrayKey<TKey extends string> = TKey extends `${infer TKeyBefore}.${ArrayEncoder}${infer TKeyAfter}` ? EscapeArrayKey<`${TKeyBefore}${ArrayEncoder}${TKeyAfter}`> : TKey;
type CollapseEntries<TEntry extends Entry> = {
    [E in TEntry as EscapeArrayKey<E['key']>]: E['value'];
};
type CreateArrayEntry<TValue, TValueInitial> = OmitItself<TValue extends unknown[] ? {
    [k: ArrayEncoder]: TValue[number];
} : TValue, TValueInitial>;
type OmitItself<TValue, TValueInitial> = TValue extends TValueInitial ? EmptyEntry<TValue> : OmitExcludedTypes<TValue, TValueInitial>;
type OmitExcludedTypes<TValue, TValueInitial> = TValue extends ExcludedTypes ? EmptyEntry<TValue> : CreateObjectEntries<TValue, TValueInitial>;
type CreateObjectEntries<TValue, TValueInitial> = TValue extends object ? {
    [TKey in keyof TValue]-?: TKey extends string ? CreateArrayEntry<TValue[TKey], TValueInitial> extends infer TNestedValue ? TNestedValue extends Entry ? TNestedValue['key'] extends '' ? {
        key: TKey;
        value: TNestedValue['value'];
    } : {
        key: `${TKey}.${TNestedValue['key']}`;
        value: TNestedValue['value'];
    } | {
        key: TKey;
        value: TValue[TKey];
    } : never : never : never;
}[keyof TValue] : EmptyEntry<TValue>;
export type ChangeProtoToJSPrimitives<T extends object> = {
    [key in keyof T]: T[key] extends Uint8Array | Date ? string : T[key] extends object ? ChangeProtoToJSPrimitives<T[key]> : T[key];
};
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private mergeRequestParams;
    private createFormData;
    request: <T = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title ibc.core.channel.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryChannel
     *
     * @tags Query
     * @name queryChannel
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}
     */
    queryChannel: (channel_id: string, port_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        channel?: {
            state: import("./types/ibc/core/channel/v1/channel").State;
            ordering: import("./types/ibc/core/channel/v1/channel").Order;
            counterparty?: {
                port_id: string;
                channel_id: string;
            };
            connection_hops: string[];
            version: string;
        };
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryChannels
     *
     * @tags Query
     * @name queryChannels
     * @request GET:/ibc/core/channel/v1/channels
     */
    queryChannels: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryChannelsRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        channels: {
            state: import("./types/ibc/core/channel/v1/channel").State;
            ordering: import("./types/ibc/core/channel/v1/channel").Order;
            counterparty?: {
                port_id: string;
                channel_id: string;
            };
            connection_hops: string[];
            version: string;
            port_id: string;
            channel_id: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
        height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryConnectionChannels
     *
     * @tags Query
     * @name queryConnectionChannels
     * @request GET:/ibc/core/channel/v1/connections/{connection}/channels
     */
    queryConnectionChannels: (connection: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryConnectionChannelsRequest>>>, "connection">, params?: RequestParams) => Promise<AxiosResponse<{
        channels: {
            state: import("./types/ibc/core/channel/v1/channel").State;
            ordering: import("./types/ibc/core/channel/v1/channel").Order;
            counterparty?: {
                port_id: string;
                channel_id: string;
            };
            connection_hops: string[];
            version: string;
            port_id: string;
            channel_id: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
        height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryChannelClientState
     *
     * @tags Query
     * @name queryChannelClientState
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/client_state
     */
    queryChannelClientState: (channel_id: string, port_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        identified_client_state?: {
            client_id: string;
            client_state?: {
                type_url: string;
                value: string;
            };
        };
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryChannelConsensusState
     *
     * @tags Query
     * @name queryChannelConsensusState
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/consensus_state/revision/{revision_number}/height/{revision_height}
     */
    queryChannelConsensusState: (channel_id: string, port_id: string, revision_number: string, revision_height: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        consensus_state?: {
            type_url: string;
            value: string;
        };
        client_id: string;
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryPacketCommitment
     *
     * @tags Query
     * @name queryPacketCommitment
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{sequence}
     */
    queryPacketCommitment: (channel_id: string, port_id: string, sequence: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        commitment: string;
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryPacketCommitments
     *
     * @tags Query
     * @name queryPacketCommitments
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments
     */
    queryPacketCommitments: (channel_id: string, port_id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryPacketCommitmentsRequest>>>, "channel_id" | "port_id">, params?: RequestParams) => Promise<AxiosResponse<{
        commitments: {
            port_id: string;
            channel_id: string;
            sequence: any;
            data: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
        height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryPacketReceipt
     *
     * @tags Query
     * @name queryPacketReceipt
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_receipts/{sequence}
     */
    queryPacketReceipt: (channel_id: string, port_id: string, sequence: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        received: boolean;
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryPacketAcknowledgement
     *
     * @tags Query
     * @name queryPacketAcknowledgement
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acks/{sequence}
     */
    queryPacketAcknowledgement: (channel_id: string, port_id: string, sequence: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        acknowledgement: string;
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryPacketAcknowledgements
     *
     * @tags Query
     * @name queryPacketAcknowledgements
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acknowledgements
     */
    queryPacketAcknowledgements: (channel_id: string, port_id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryPacketAcknowledgementsRequest>>>, "channel_id" | "port_id">, params?: RequestParams) => Promise<AxiosResponse<{
        acknowledgements: {
            port_id: string;
            channel_id: string;
            sequence: any;
            data: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
        height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryUnreceivedPackets
     *
     * @tags Query
     * @name queryUnreceivedPackets
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_commitment_sequences}/unreceived_packets
     */
    queryUnreceivedPackets: (channel_id: string, port_id: string, packet_commitment_sequences: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        sequences: any;
        height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryUnreceivedAcks
     *
     * @tags Query
     * @name queryUnreceivedAcks
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_ack_sequences}/unreceived_acks
     */
    queryUnreceivedAcks: (channel_id: string, port_id: string, packet_ack_sequences: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        sequences: any;
        height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryNextSequenceReceive
     *
     * @tags Query
     * @name queryNextSequenceReceive
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence
     */
    queryNextSequenceReceive: (channel_id: string, port_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        next_sequence_receive: any;
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryNextSequenceSend
     *
     * @tags Query
     * @name queryNextSequenceSend
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence_send
     */
    queryNextSequenceSend: (channel_id: string, port_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        next_sequence_send: any;
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
}
export {};
