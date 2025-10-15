import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryModuleVersionsRequest } from "./types/cosmos/upgrade/v1beta1/query";
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
 * @title cosmos.upgrade.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryCurrentPlan
     *
     * @tags Query
     * @name queryCurrentPlan
     * @request GET:/cosmos/upgrade/v1beta1/current_plan
     */
    queryCurrentPlan: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        plan?: {
            name: string;
            time?: string;
            height: any;
            info: string;
            upgraded_client_state?: {
                type_url: string;
                value: string;
            };
        };
    }, any>>;
    /**
     * QueryAppliedPlan
     *
     * @tags Query
     * @name queryAppliedPlan
     * @request GET:/cosmos/upgrade/v1beta1/applied_plan/{name}
     */
    queryAppliedPlan: (name: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        height: any;
    }, any>>;
    /**
     * QueryUpgradedConsensusState
     *
     * @tags Query
     * @name queryUpgradedConsensusState
     * @request GET:/cosmos/upgrade/v1beta1/upgraded_consensus_state/{last_height}
     */
    queryUpgradedConsensusState: (last_height: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        upgraded_consensus_state: string;
    }, any>>;
    /**
     * QueryModuleVersions
     *
     * @tags Query
     * @name queryModuleVersions
     * @request GET:/cosmos/upgrade/v1beta1/module_versions
     */
    queryModuleVersions: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryModuleVersionsRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        module_versions: {
            name: string;
            version: any;
        }[];
    }, any>>;
    /**
     * QueryAuthority
     *
     * @tags Query
     * @name queryAuthority
     * @request GET:/cosmos/upgrade/v1beta1/authority
     */
    queryAuthority: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        address: string;
    }, any>>;
}
export {};
