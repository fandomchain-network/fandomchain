import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryBalanceRequest } from "./types/cosmos/bank/v1beta1/query";
import { QueryAllBalancesRequest } from "./types/cosmos/bank/v1beta1/query";
import { QuerySpendableBalancesRequest } from "./types/cosmos/bank/v1beta1/query";
import { QuerySpendableBalanceByDenomRequest } from "./types/cosmos/bank/v1beta1/query";
import { QueryTotalSupplyRequest } from "./types/cosmos/bank/v1beta1/query";
import { QuerySupplyOfRequest } from "./types/cosmos/bank/v1beta1/query";
import { QueryDenomsMetadataRequest } from "./types/cosmos/bank/v1beta1/query";
import { QueryDenomMetadataByQueryStringRequest } from "./types/cosmos/bank/v1beta1/query";
import { QueryDenomOwnersRequest } from "./types/cosmos/bank/v1beta1/query";
import { QueryDenomOwnersByQueryRequest } from "./types/cosmos/bank/v1beta1/query";
import { QuerySendEnabledRequest } from "./types/cosmos/bank/v1beta1/query";
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
 * @title cosmos.bank.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryBalance
     *
     * @tags Query
     * @name queryBalance
     * @request GET:/cosmos/bank/v1beta1/balances/{address}/by_denom
     */
    queryBalance: (address: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryBalanceRequest>>>, "address">, params?: RequestParams) => Promise<AxiosResponse<{
        balance?: {
            denom: string;
            amount: string;
        };
    }, any>>;
    /**
     * QueryAllBalances
     *
     * @tags Query
     * @name queryAllBalances
     * @request GET:/cosmos/bank/v1beta1/balances/{address}
     */
    queryAllBalances: (address: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryAllBalancesRequest>>>, "address">, params?: RequestParams) => Promise<AxiosResponse<{
        balances: {
            denom: string;
            amount: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QuerySpendableBalances
     *
     * @tags Query
     * @name querySpendableBalances
     * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}
     */
    querySpendableBalances: (address: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QuerySpendableBalancesRequest>>>, "address">, params?: RequestParams) => Promise<AxiosResponse<{
        balances: {
            denom: string;
            amount: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QuerySpendableBalanceByDenom
     *
     * @tags Query
     * @name querySpendableBalanceByDenom
     * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}/by_denom
     */
    querySpendableBalanceByDenom: (address: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QuerySpendableBalanceByDenomRequest>>>, "address">, params?: RequestParams) => Promise<AxiosResponse<{
        balance?: {
            denom: string;
            amount: string;
        };
    }, any>>;
    /**
     * QueryTotalSupply
     *
     * @tags Query
     * @name queryTotalSupply
     * @request GET:/cosmos/bank/v1beta1/supply
     */
    queryTotalSupply: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryTotalSupplyRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        supply: {
            denom: string;
            amount: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QuerySupplyOf
     *
     * @tags Query
     * @name querySupplyOf
     * @request GET:/cosmos/bank/v1beta1/supply/by_denom
     */
    querySupplyOf: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QuerySupplyOfRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        amount?: {
            denom: string;
            amount: string;
        };
    }, any>>;
    /**
     * QueryParams
     *
     * @tags Query
     * @name queryParams
     * @request GET:/cosmos/bank/v1beta1/params
     */
    queryParams: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            send_enabled: {
                denom: string;
                enabled: boolean;
            }[];
            default_send_enabled: boolean;
        };
    }, any>>;
    /**
     * QueryDenomsMetadata
     *
     * @tags Query
     * @name queryDenomsMetadata
     * @request GET:/cosmos/bank/v1beta1/denoms_metadata
     */
    queryDenomsMetadata: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryDenomsMetadataRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        metadatas: {
            description: string;
            denom_units: {
                denom: string;
                exponent: number;
                aliases: string[];
            }[];
            base: string;
            display: string;
            name: string;
            symbol: string;
            uri: string;
            uri_hash: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryDenomMetadata
     *
     * @tags Query
     * @name queryDenomMetadata
     * @request GET:/cosmos/bank/v1beta1/denoms_metadata/{denom=**}
     */
    queryDenomMetadata: (denom: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        metadata?: {
            description: string;
            denom_units: {
                denom: string;
                exponent: number;
                aliases: string[];
            }[];
            base: string;
            display: string;
            name: string;
            symbol: string;
            uri: string;
            uri_hash: string;
        };
    }, any>>;
    /**
     * QueryDenomMetadataByQueryString
     *
     * @tags Query
     * @name queryDenomMetadataByQueryString
     * @request GET:/cosmos/bank/v1beta1/denoms_metadata_by_query_string
     */
    queryDenomMetadataByQueryString: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryDenomMetadataByQueryStringRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        metadata?: {
            description: string;
            denom_units: {
                denom: string;
                exponent: number;
                aliases: string[];
            }[];
            base: string;
            display: string;
            name: string;
            symbol: string;
            uri: string;
            uri_hash: string;
        };
    }, any>>;
    /**
     * QueryDenomOwners
     *
     * @tags Query
     * @name queryDenomOwners
     * @request GET:/cosmos/bank/v1beta1/denom_owners/{denom=**}
     */
    queryDenomOwners: (denom: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryDenomOwnersRequest>>>, "denom">, params?: RequestParams) => Promise<AxiosResponse<{
        denom_owners: {
            address: string;
            balance?: {
                denom: string;
                amount: string;
            };
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryDenomOwnersByQuery
     *
     * @tags Query
     * @name queryDenomOwnersByQuery
     * @request GET:/cosmos/bank/v1beta1/denom_owners_by_query
     */
    queryDenomOwnersByQuery: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryDenomOwnersByQueryRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        denom_owners: {
            address: string;
            balance?: {
                denom: string;
                amount: string;
            };
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QuerySendEnabled
     *
     * @tags Query
     * @name querySendEnabled
     * @request GET:/cosmos/bank/v1beta1/send_enabled
     */
    querySendEnabled: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QuerySendEnabledRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        send_enabled: {
            denom: string;
            enabled: boolean;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
}
export {};
