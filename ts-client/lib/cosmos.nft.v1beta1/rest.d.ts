import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryNFTsRequest } from "./types/cosmos/nft/v1beta1/query";
import { QueryClassesRequest } from "./types/cosmos/nft/v1beta1/query";
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
 * @title cosmos.nft.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryBalance
     *
     * @tags Query
     * @name queryBalance
     * @request GET:/cosmos/nft/v1beta1/balance/{owner}/{class_id}
     */
    queryBalance: (owner: string, class_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        amount: any;
    }, any>>;
    /**
     * QueryOwner
     *
     * @tags Query
     * @name queryOwner
     * @request GET:/cosmos/nft/v1beta1/owner/{class_id}/{id}
     */
    queryOwner: (class_id: string, id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        owner: string;
    }, any>>;
    /**
     * QuerySupply
     *
     * @tags Query
     * @name querySupply
     * @request GET:/cosmos/nft/v1beta1/supply/{class_id}
     */
    querySupply: (class_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        amount: any;
    }, any>>;
    /**
     * QueryNFTs
     *
     * @tags Query
     * @name queryNfts
     * @request GET:/cosmos/nft/v1beta1/nfts
     */
    queryNfts: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryNFTsRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        nfts: {
            class_id: string;
            id: string;
            uri: string;
            uri_hash: string;
            data?: {
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
     * QueryNFT
     *
     * @tags Query
     * @name queryNft
     * @request GET:/cosmos/nft/v1beta1/nfts/{class_id}/{id}
     */
    queryNft: (class_id: string, id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        nft?: {
            class_id: string;
            id: string;
            uri: string;
            uri_hash: string;
            data?: {
                type_url: string;
                value: string;
            };
        };
    }, any>>;
    /**
     * QueryClass
     *
     * @tags Query
     * @name queryClass
     * @request GET:/cosmos/nft/v1beta1/classes/{class_id}
     */
    queryClass: (class_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        class?: {
            id: string;
            name: string;
            symbol: string;
            description: string;
            uri: string;
            uri_hash: string;
            data?: {
                type_url: string;
                value: string;
            };
        };
    }, any>>;
    /**
     * QueryClasses
     *
     * @tags Query
     * @name queryClasses
     * @request GET:/cosmos/nft/v1beta1/classes
     */
    queryClasses: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryClassesRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        classes: {
            id: string;
            name: string;
            symbol: string;
            description: string;
            uri: string;
            uri_hash: string;
            data?: {
                type_url: string;
                value: string;
            };
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
}
export {};
