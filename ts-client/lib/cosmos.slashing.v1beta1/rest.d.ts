import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QuerySigningInfosRequest } from "./types/cosmos/slashing/v1beta1/query";
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
 * @title cosmos.slashing.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryParams
     *
     * @tags Query
     * @name queryParams
     * @request GET:/cosmos/slashing/v1beta1/params
     */
    queryParams: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            signed_blocks_window: any;
            min_signed_per_window: string;
            downtime_jail_duration?: {
                seconds: any;
                nanos: number;
            };
            slash_fraction_double_sign: string;
            slash_fraction_downtime: string;
        };
    }, any>>;
    /**
     * QuerySigningInfo
     *
     * @tags Query
     * @name querySigningInfo
     * @request GET:/cosmos/slashing/v1beta1/signing_infos/{cons_address}
     */
    querySigningInfo: (cons_address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        val_signing_info?: {
            address: string;
            start_height: any;
            index_offset: any;
            jailed_until?: string;
            tombstoned: boolean;
            missed_blocks_counter: any;
        };
    }, any>>;
    /**
     * QuerySigningInfos
     *
     * @tags Query
     * @name querySigningInfos
     * @request GET:/cosmos/slashing/v1beta1/signing_infos
     */
    querySigningInfos: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QuerySigningInfosRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        info: {
            address: string;
            start_height: any;
            index_offset: any;
            jailed_until?: string;
            tombstoned: boolean;
            missed_blocks_counter: any;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
}
export {};
