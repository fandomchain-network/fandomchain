import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryAccountsRequest } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountAddressByIDRequest } from "./types/cosmos/auth/v1beta1/query";
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
 * @title cosmos.auth.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryAccounts
     *
     * @tags Query
     * @name queryAccounts
     * @request GET:/cosmos/auth/v1beta1/accounts
     */
    queryAccounts: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryAccountsRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        accounts: {
            type_url: string;
            value: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryAccount
     *
     * @tags Query
     * @name queryAccount
     * @request GET:/cosmos/auth/v1beta1/accounts/{address}
     */
    queryAccount: (address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        account?: {
            type_url: string;
            value: string;
        };
    }, any>>;
    /**
     * QueryAccountAddressByID
     *
     * @tags Query
     * @name queryAccountAddressById
     * @request GET:/cosmos/auth/v1beta1/address_by_id/{id}
     */
    queryAccountAddressById: (id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryAccountAddressByIDRequest>>>, "id">, params?: RequestParams) => Promise<AxiosResponse<{
        account_address: string;
    }, any>>;
    /**
     * QueryParams
     *
     * @tags Query
     * @name queryParams
     * @request GET:/cosmos/auth/v1beta1/params
     */
    queryParams: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            max_memo_characters: any;
            tx_sig_limit: any;
            tx_size_cost_per_byte: any;
            sig_verify_cost_ed25519: any;
            sig_verify_cost_secp256k1: any;
        };
    }, any>>;
    /**
     * QueryModuleAccounts
     *
     * @tags Query
     * @name queryModuleAccounts
     * @request GET:/cosmos/auth/v1beta1/module_accounts
     */
    queryModuleAccounts: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        accounts: {
            type_url: string;
            value: string;
        }[];
    }, any>>;
    /**
     * QueryModuleAccountByName
     *
     * @tags Query
     * @name queryModuleAccountByName
     * @request GET:/cosmos/auth/v1beta1/module_accounts/{name}
     */
    queryModuleAccountByName: (name: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        account?: {
            type_url: string;
            value: string;
        };
    }, any>>;
    /**
     * QueryBech32Prefix
     *
     * @tags Query
     * @name queryBech32Prefix
     * @request GET:/cosmos/auth/v1beta1/bech32
     */
    queryBech32Prefix: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        bech32_prefix: string;
    }, any>>;
    /**
     * QueryAddressBytesToString
     *
     * @tags Query
     * @name queryAddressBytesToString
     * @request GET:/cosmos/auth/v1beta1/bech32/{address_bytes}
     */
    queryAddressBytesToString: (address_bytes: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        address_string: string;
    }, any>>;
    /**
     * QueryAddressStringToBytes
     *
     * @tags Query
     * @name queryAddressStringToBytes
     * @request GET:/cosmos/auth/v1beta1/bech32/{address_string}
     */
    queryAddressStringToBytes: (address_string: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        address_bytes: string;
    }, any>>;
    /**
     * QueryAccountInfo
     *
     * @tags Query
     * @name queryAccountInfo
     * @request GET:/cosmos/auth/v1beta1/account_info/{address}
     */
    queryAccountInfo: (address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        info?: {
            address: string;
            pub_key?: {
                type_url: string;
                value: string;
            };
            account_number: any;
            sequence: any;
        };
    }, any>>;
}
export {};
