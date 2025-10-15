import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryAllDenomRequest } from "./types/fandomchain/tokenfactory/v1/query";
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
 * @title fandomchain.tokenfactory.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryParams
     *
     * @tags Query
     * @name queryParams
     * @request GET:/fandomChain/tokenfactory/v1/params
     */
    queryParams: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        params?: {};
    }, any>>;
    /**
     * QueryGetDenom
     *
     * @tags Query
     * @name queryGetDenom
     * @request GET:/fandomChain/tokenfactory/v1/denom/{denom}
     */
    queryGetDenom: (denom: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        denom?: {
            denom: string;
            description: string;
            ticker: string;
            precision: any;
            url: string;
            owner: string;
            virtual_token_reserves: any;
            virtual_fandom_reserves: any;
            real_token_reserves: any;
            real_fandom_reserves: any;
            initial_virtual_token_reserves: any;
            initial_virtual_fandom_reserves: any;
            initial_real_token_reserves: any;
            bonding_curve_enabled: boolean;
        };
    }, any>>;
    /**
     * QueryListDenom
     *
     * @tags Query
     * @name queryListDenom
     * @request GET:/fandomChain/tokenfactory/v1/denom
     */
    queryListDenom: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryAllDenomRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        denom: {
            denom: string;
            description: string;
            ticker: string;
            precision: any;
            url: string;
            owner: string;
            virtual_token_reserves: any;
            virtual_fandom_reserves: any;
            real_token_reserves: any;
            real_fandom_reserves: any;
            initial_virtual_token_reserves: any;
            initial_virtual_fandom_reserves: any;
            initial_real_token_reserves: any;
            bonding_curve_enabled: boolean;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryGetBondingCurvePrice
     *
     * @tags Query
     * @name queryGetBondingCurvePrice
     * @request GET:/fandomChain/tokenfactory/v1/bonding_curve_price/{denom}
     */
    queryGetBondingCurvePrice: (denom: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        price: string;
    }, any>>;
    /**
     * QueryGetBondingCurveProgress
     *
     * @tags Query
     * @name queryGetBondingCurveProgress
     * @request GET:/fandomChain/tokenfactory/v1/bonding_curve_progress/{denom}
     */
    queryGetBondingCurveProgress: (denom: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        progress: string;
        tokens_sold: any;
        tokens_remaining: any;
    }, any>>;
    /**
     * QueryEstimateBuy
     *
     * @tags Query
     * @name queryEstimateBuy
     * @request GET:/fandomChain/tokenfactory/v1/estimate_buy/{denom}/{fandom_amount}
     */
    queryEstimateBuy: (denom: string, fandom_amount: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        tokens_out: any;
        price_impact: string;
    }, any>>;
    /**
     * QueryEstimateSell
     *
     * @tags Query
     * @name queryEstimateSell
     * @request GET:/fandomChain/tokenfactory/v1/estimate_sell/{denom}/{token_amount}
     */
    queryEstimateSell: (denom: string, token_amount: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        fandom_out: any;
        price_impact: string;
    }, any>>;
}
export {};
