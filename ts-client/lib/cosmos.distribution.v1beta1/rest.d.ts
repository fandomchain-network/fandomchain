import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryValidatorSlashesRequest } from "./types/cosmos/distribution/v1beta1/query";
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
 * @title cosmos.distribution.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryParams
     *
     * @tags Query
     * @name queryParams
     * @request GET:/cosmos/distribution/v1beta1/params
     */
    queryParams: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            community_tax: string;
            base_proposer_reward: string;
            bonus_proposer_reward: string;
            withdraw_addr_enabled: boolean;
        };
    }, any>>;
    /**
     * QueryValidatorDistributionInfo
     *
     * @tags Query
     * @name queryValidatorDistributionInfo
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}
     */
    queryValidatorDistributionInfo: (validator_address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        operator_address: string;
        self_bond_rewards: {
            denom: string;
            amount: string;
        }[];
        commission: {
            denom: string;
            amount: string;
        }[];
    }, any>>;
    /**
     * QueryValidatorOutstandingRewards
     *
     * @tags Query
     * @name queryValidatorOutstandingRewards
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/outstanding_rewards
     */
    queryValidatorOutstandingRewards: (validator_address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        rewards?: {
            rewards: {
                denom: string;
                amount: string;
            }[];
        };
    }, any>>;
    /**
     * QueryValidatorCommission
     *
     * @tags Query
     * @name queryValidatorCommission
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/commission
     */
    queryValidatorCommission: (validator_address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        commission?: {
            commission: {
                denom: string;
                amount: string;
            }[];
        };
    }, any>>;
    /**
     * QueryValidatorSlashes
     *
     * @tags Query
     * @name queryValidatorSlashes
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/slashes
     */
    queryValidatorSlashes: (validator_address: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryValidatorSlashesRequest>>>, "validator_address">, params?: RequestParams) => Promise<AxiosResponse<{
        slashes: {
            validator_period: any;
            fraction: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryDelegationRewards
     *
     * @tags Query
     * @name queryDelegationRewards
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards/{validator_address}
     */
    queryDelegationRewards: (delegator_address: string, validator_address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        rewards: {
            denom: string;
            amount: string;
        }[];
    }, any>>;
    /**
     * QueryDelegationTotalRewards
     *
     * @tags Query
     * @name queryDelegationTotalRewards
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards
     */
    queryDelegationTotalRewards: (delegator_address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        rewards: {
            validator_address: string;
            reward: {
                denom: string;
                amount: string;
            }[];
        }[];
        total: {
            denom: string;
            amount: string;
        }[];
    }, any>>;
    /**
     * QueryDelegatorValidators
     *
     * @tags Query
     * @name queryDelegatorValidators
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/validators
     */
    queryDelegatorValidators: (delegator_address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        validators: string[];
    }, any>>;
    /**
     * QueryDelegatorWithdrawAddress
     *
     * @tags Query
     * @name queryDelegatorWithdrawAddress
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/withdraw_address
     */
    queryDelegatorWithdrawAddress: (delegator_address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        withdraw_address: string;
    }, any>>;
    /**
     * QueryCommunityPool
     *
     * @tags Query
     * @name queryCommunityPool
     * @request GET:/cosmos/distribution/v1beta1/community_pool
     */
    queryCommunityPool: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        pool: {
            denom: string;
            amount: string;
        }[];
    }, any>>;
}
export {};
