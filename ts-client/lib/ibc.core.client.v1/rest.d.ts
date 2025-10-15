import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryClientStatesRequest } from "./types/ibc/core/client/v1/query";
import { QueryConsensusStateRequest } from "./types/ibc/core/client/v1/query";
import { QueryConsensusStatesRequest } from "./types/ibc/core/client/v1/query";
import { QueryConsensusStateHeightsRequest } from "./types/ibc/core/client/v1/query";
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
 * @title ibc.core.client.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryClientState
     *
     * @tags Query
     * @name queryClientState
     * @request GET:/ibc/core/client/v1/client_states/{client_id}
     */
    queryClientState: (client_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        client_state?: {
            type_url: string;
            value: string;
        };
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryClientStates
     *
     * @tags Query
     * @name queryClientStates
     * @request GET:/ibc/core/client/v1/client_states
     */
    queryClientStates: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryClientStatesRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        client_states: {
            client_id: string;
            client_state?: {
                type_url: string;
                value: string;
            };
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryConsensusState
     *
     * @tags Query
     * @name queryConsensusState
     * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/revision/{revision_number}/height/{revision_height}
     */
    queryConsensusState: (client_id: string, revision_number: string, revision_height: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryConsensusStateRequest>>>, "client_id" | "revision_number" | "revision_height">, params?: RequestParams) => Promise<AxiosResponse<{
        consensus_state?: {
            type_url: string;
            value: string;
        };
        proof: string;
        proof_height?: {
            revision_number: any;
            revision_height: any;
        };
    }, any>>;
    /**
     * QueryConsensusStates
     *
     * @tags Query
     * @name queryConsensusStates
     * @request GET:/ibc/core/client/v1/consensus_states/{client_id}
     */
    queryConsensusStates: (client_id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryConsensusStatesRequest>>>, "client_id">, params?: RequestParams) => Promise<AxiosResponse<{
        consensus_states: {
            height?: {
                revision_number: any;
                revision_height: any;
            };
            consensus_state?: {
                type_url: string;
                value: string;
            };
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryConsensusStateHeights
     *
     * @tags Query
     * @name queryConsensusStateHeights
     * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/heights
     */
    queryConsensusStateHeights: (client_id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryConsensusStateHeightsRequest>>>, "client_id">, params?: RequestParams) => Promise<AxiosResponse<{
        consensus_state_heights: {
            revision_number: any;
            revision_height: any;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryClientStatus
     *
     * @tags Query
     * @name queryClientStatus
     * @request GET:/ibc/core/client/v1/client_status/{client_id}
     */
    queryClientStatus: (client_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        status: string;
    }, any>>;
    /**
     * QueryClientParams
     *
     * @tags Query
     * @name queryClientParams
     * @request GET:/ibc/core/client/v1/params
     */
    queryClientParams: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            allowed_clients: string[];
        };
    }, any>>;
    /**
     * QueryClientCreator
     *
     * @tags Query
     * @name queryClientCreator
     * @request GET:/ibc/core/client/v1/client_creator/{client_id}
     */
    queryClientCreator: (client_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        creator: string;
    }, any>>;
    /**
     * QueryUpgradedClientState
     *
     * @tags Query
     * @name queryUpgradedClientState
     * @request GET:/ibc/core/client/v1/upgraded_client_states
     */
    queryUpgradedClientState: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        upgraded_client_state?: {
            type_url: string;
            value: string;
        };
    }, any>>;
    /**
     * QueryUpgradedConsensusState
     *
     * @tags Query
     * @name queryUpgradedConsensusState
     * @request GET:/ibc/core/client/v1/upgraded_consensus_states
     */
    queryUpgradedConsensusState: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        upgraded_consensus_state?: {
            type_url: string;
            value: string;
        };
    }, any>>;
    /**
     * QueryVerifyMembership
     *
     * @tags Query
     * @name queryVerifyMembership
     * @request GET:/ibc/core/client/v1/verify_membership
     */
    queryVerifyMembership: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        success: boolean;
    }, any>>;
}
export {};
