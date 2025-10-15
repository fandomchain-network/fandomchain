import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryDenomsRequest } from "./types/ibc/applications/transfer/v1/query";
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
 * @title ibc.applications.transfer.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryParams
     *
     * @tags Query
     * @name queryParams
     * @request GET:/ibc/apps/transfer/v1/params
     */
    queryParams: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            send_enabled: boolean;
            receive_enabled: boolean;
        };
    }, any>>;
    /**
     * QueryDenoms
     *
     * @tags Query
     * @name queryDenoms
     * @request GET:/ibc/apps/transfer/v1/denoms
     */
    queryDenoms: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryDenomsRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        denoms: {
            base: string;
            trace: {
                port_id: string;
                channel_id: string;
            }[];
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryDenom
     *
     * @tags Query
     * @name queryDenom
     * @request GET:/ibc/apps/transfer/v1/denoms/{hash=**}
     */
    queryDenom: (hash: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        denom?: {
            base: string;
            trace: {
                port_id: string;
                channel_id: string;
            }[];
        };
    }, any>>;
    /**
     * QueryDenomHash
     *
     * @tags Query
     * @name queryDenomHash
     * @request GET:/ibc/apps/transfer/v1/denom_hashes/{trace=**}
     */
    queryDenomHash: (trace: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        hash: string;
    }, any>>;
    /**
     * QueryEscrowAddress
     *
     * @tags Query
     * @name queryEscrowAddress
     * @request GET:/ibc/apps/transfer/v1/channels/{channel_id}/ports/{port_id}/escrow_address
     */
    queryEscrowAddress: (channel_id: string, port_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        escrow_address: string;
    }, any>>;
    /**
     * QueryTotalEscrowForDenom
     *
     * @tags Query
     * @name queryTotalEscrowForDenom
     * @request GET:/ibc/apps/transfer/v1/total_escrow/{denom=**}
     */
    queryTotalEscrowForDenom: (denom: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        amount?: {
            denom: string;
            amount: string;
        };
    }, any>>;
}
export {};
