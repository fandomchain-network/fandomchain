import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryConnectionsRequest } from "./types/ibc/core/connection/v1/query";
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
 * @title ibc.core.connection.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryConnection
     *
     * @tags Query
     * @name queryConnection
     * @request GET:/ibc/core/connection/v1/connections/{connection_id}
     */
    queryConnection: (connection_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        connection?: {
            client_id: string;
            versions: {
                identifier: string;
                features: string[];
            }[];
            state: import("./types/ibc/core/connection/v1/connection").State;
            counterparty?: {
                client_id: string;
                connection_id: string;
                prefix?: {
                    key_prefix: string;
                };
            };
            delay_period: any;
        };
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryConnections
     *
     * @tags Query
     * @name queryConnections
     * @request GET:/ibc/core/connection/v1/connections
     */
    queryConnections: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryConnectionsRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        connections: {
            id: string;
            client_id: string;
            versions: {
                identifier: string;
                features: string[];
            }[];
            state: import("./types/ibc/core/connection/v1/connection").State;
            counterparty?: {
                client_id: string;
                connection_id: string;
                prefix?: {
                    key_prefix: string;
                };
            };
            delay_period: any;
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
     * QueryClientConnections
     *
     * @tags Query
     * @name queryClientConnections
     * @request GET:/ibc/core/connection/v1/client_connections/{client_id}
     */
    queryClientConnections: (client_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        connection_paths: string[];
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryConnectionClientState
     *
     * @tags Query
     * @name queryConnectionClientState
     * @request GET:/ibc/core/connection/v1/connections/{connection_id}/client_state
     */
    queryConnectionClientState: (connection_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
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
     * QueryConnectionConsensusState
     *
     * @tags Query
     * @name queryConnectionConsensusState
     * @request GET:/ibc/core/connection/v1/connections/{connection_id}/consensus_state/revision/{revision_number}/height/{revision_height}
     */
    queryConnectionConsensusState: (connection_id: string, revision_number: string, revision_height: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
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
     * QueryConnectionParams
     *
     * @tags Query
     * @name queryConnectionParams
     * @request GET:/ibc/core/connection/v1/params
     */
    queryConnectionParams: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            max_expected_time_per_block: any;
        };
    }, any>>;
}
export {};
