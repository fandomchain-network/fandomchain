import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryValidatorsRequest } from "./types/cosmos/staking/v1beta1/query";
import { QueryValidatorDelegationsRequest } from "./types/cosmos/staking/v1beta1/query";
import { QueryValidatorUnbondingDelegationsRequest } from "./types/cosmos/staking/v1beta1/query";
import { QueryDelegatorDelegationsRequest } from "./types/cosmos/staking/v1beta1/query";
import { QueryDelegatorUnbondingDelegationsRequest } from "./types/cosmos/staking/v1beta1/query";
import { QueryRedelegationsRequest } from "./types/cosmos/staking/v1beta1/query";
import { QueryDelegatorValidatorsRequest } from "./types/cosmos/staking/v1beta1/query";
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
 * @title cosmos.staking.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryValidators
     *
     * @tags Query
     * @name queryValidators
     * @request GET:/cosmos/staking/v1beta1/validators
     */
    queryValidators: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryValidatorsRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        validators: {
            operator_address: string;
            consensus_pubkey?: {
                type_url: string;
                value: string;
            };
            jailed: boolean;
            status: import("./types/cosmos/staking/v1beta1/staking").BondStatus;
            tokens: string;
            delegator_shares: string;
            description?: {
                moniker: string;
                identity: string;
                website: string;
                security_contact: string;
                details: string;
            };
            unbonding_height: any;
            unbonding_time?: string;
            commission?: {
                commission_rates?: {
                    rate: string;
                    max_rate: string;
                    max_change_rate: string;
                };
                update_time?: string;
            };
            min_self_delegation: string;
            unbonding_on_hold_ref_count: any;
            unbonding_ids: any;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryValidator
     *
     * @tags Query
     * @name queryValidator
     * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}
     */
    queryValidator: (validator_addr: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        validator?: {
            operator_address: string;
            consensus_pubkey?: {
                type_url: string;
                value: string;
            };
            jailed: boolean;
            status: import("./types/cosmos/staking/v1beta1/staking").BondStatus;
            tokens: string;
            delegator_shares: string;
            description?: {
                moniker: string;
                identity: string;
                website: string;
                security_contact: string;
                details: string;
            };
            unbonding_height: any;
            unbonding_time?: string;
            commission?: {
                commission_rates?: {
                    rate: string;
                    max_rate: string;
                    max_change_rate: string;
                };
                update_time?: string;
            };
            min_self_delegation: string;
            unbonding_on_hold_ref_count: any;
            unbonding_ids: any;
        };
    }, any>>;
    /**
     * QueryValidatorDelegations
     *
     * @tags Query
     * @name queryValidatorDelegations
     * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations
     */
    queryValidatorDelegations: (validator_addr: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryValidatorDelegationsRequest>>>, "validator_addr">, params?: RequestParams) => Promise<AxiosResponse<{
        delegation_responses: {
            delegation?: {
                delegator_address: string;
                validator_address: string;
                shares: string;
            };
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
     * QueryValidatorUnbondingDelegations
     *
     * @tags Query
     * @name queryValidatorUnbondingDelegations
     * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/unbonding_delegations
     */
    queryValidatorUnbondingDelegations: (validator_addr: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryValidatorUnbondingDelegationsRequest>>>, "validator_addr">, params?: RequestParams) => Promise<AxiosResponse<{
        unbonding_responses: {
            delegator_address: string;
            validator_address: string;
            entries: {
                creation_height: any;
                completion_time?: string;
                initial_balance: string;
                balance: string;
                unbonding_id: any;
                unbonding_on_hold_ref_count: any;
            }[];
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryDelegation
     *
     * @tags Query
     * @name queryDelegation
     * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}
     */
    queryDelegation: (validator_addr: string, delegator_addr: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        delegation_response?: {
            delegation?: {
                delegator_address: string;
                validator_address: string;
                shares: string;
            };
            balance?: {
                denom: string;
                amount: string;
            };
        };
    }, any>>;
    /**
     * QueryUnbondingDelegation
     *
     * @tags Query
     * @name queryUnbondingDelegation
     * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}/unbonding_delegation
     */
    queryUnbondingDelegation: (validator_addr: string, delegator_addr: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        unbond?: {
            delegator_address: string;
            validator_address: string;
            entries: {
                creation_height: any;
                completion_time?: string;
                initial_balance: string;
                balance: string;
                unbonding_id: any;
                unbonding_on_hold_ref_count: any;
            }[];
        };
    }, any>>;
    /**
     * QueryDelegatorDelegations
     *
     * @tags Query
     * @name queryDelegatorDelegations
     * @request GET:/cosmos/staking/v1beta1/delegations/{delegator_addr}
     */
    queryDelegatorDelegations: (delegator_addr: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryDelegatorDelegationsRequest>>>, "delegator_addr">, params?: RequestParams) => Promise<AxiosResponse<{
        delegation_responses: {
            delegation?: {
                delegator_address: string;
                validator_address: string;
                shares: string;
            };
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
     * QueryDelegatorUnbondingDelegations
     *
     * @tags Query
     * @name queryDelegatorUnbondingDelegations
     * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/unbonding_delegations
     */
    queryDelegatorUnbondingDelegations: (delegator_addr: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryDelegatorUnbondingDelegationsRequest>>>, "delegator_addr">, params?: RequestParams) => Promise<AxiosResponse<{
        unbonding_responses: {
            delegator_address: string;
            validator_address: string;
            entries: {
                creation_height: any;
                completion_time?: string;
                initial_balance: string;
                balance: string;
                unbonding_id: any;
                unbonding_on_hold_ref_count: any;
            }[];
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryRedelegations
     *
     * @tags Query
     * @name queryRedelegations
     * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/redelegations
     */
    queryRedelegations: (delegator_addr: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryRedelegationsRequest>>>, "delegator_addr">, params?: RequestParams) => Promise<AxiosResponse<{
        redelegation_responses: {
            redelegation?: {
                delegator_address: string;
                validator_src_address: string;
                validator_dst_address: string;
                entries: {
                    creation_height: any;
                    completion_time?: string;
                    initial_balance: string;
                    shares_dst: string;
                    unbonding_id: any;
                    unbonding_on_hold_ref_count: any;
                }[];
            };
            entries: {
                redelegation_entry?: {
                    creation_height: any;
                    completion_time?: string;
                    initial_balance: string;
                    shares_dst: string;
                    unbonding_id: any;
                    unbonding_on_hold_ref_count: any;
                };
                balance: string;
            }[];
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryDelegatorValidators
     *
     * @tags Query
     * @name queryDelegatorValidators
     * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators
     */
    queryDelegatorValidators: (delegator_addr: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryDelegatorValidatorsRequest>>>, "delegator_addr">, params?: RequestParams) => Promise<AxiosResponse<{
        validators: {
            operator_address: string;
            consensus_pubkey?: {
                type_url: string;
                value: string;
            };
            jailed: boolean;
            status: import("./types/cosmos/staking/v1beta1/staking").BondStatus;
            tokens: string;
            delegator_shares: string;
            description?: {
                moniker: string;
                identity: string;
                website: string;
                security_contact: string;
                details: string;
            };
            unbonding_height: any;
            unbonding_time?: string;
            commission?: {
                commission_rates?: {
                    rate: string;
                    max_rate: string;
                    max_change_rate: string;
                };
                update_time?: string;
            };
            min_self_delegation: string;
            unbonding_on_hold_ref_count: any;
            unbonding_ids: any;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryDelegatorValidator
     *
     * @tags Query
     * @name queryDelegatorValidator
     * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators/{validator_addr}
     */
    queryDelegatorValidator: (delegator_addr: string, validator_addr: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        validator?: {
            operator_address: string;
            consensus_pubkey?: {
                type_url: string;
                value: string;
            };
            jailed: boolean;
            status: import("./types/cosmos/staking/v1beta1/staking").BondStatus;
            tokens: string;
            delegator_shares: string;
            description?: {
                moniker: string;
                identity: string;
                website: string;
                security_contact: string;
                details: string;
            };
            unbonding_height: any;
            unbonding_time?: string;
            commission?: {
                commission_rates?: {
                    rate: string;
                    max_rate: string;
                    max_change_rate: string;
                };
                update_time?: string;
            };
            min_self_delegation: string;
            unbonding_on_hold_ref_count: any;
            unbonding_ids: any;
        };
    }, any>>;
    /**
     * QueryHistoricalInfo
     *
     * @tags Query
     * @name queryHistoricalInfo
     * @request GET:/cosmos/staking/v1beta1/historical_info/{height}
     */
    queryHistoricalInfo: (height: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        hist?: {
            header?: {
                version?: {
                    block: any;
                    app: any;
                };
                chain_id: string;
                height: any;
                time?: string;
                last_block_id?: {
                    hash: string;
                    part_set_header?: {
                        total: number;
                        hash: string;
                    };
                };
                last_commit_hash: string;
                data_hash: string;
                validators_hash: string;
                next_validators_hash: string;
                consensus_hash: string;
                app_hash: string;
                last_results_hash: string;
                evidence_hash: string;
                proposer_address: string;
            };
            valset: {
                operator_address: string;
                consensus_pubkey?: {
                    type_url: string;
                    value: string;
                };
                jailed: boolean;
                status: import("./types/cosmos/staking/v1beta1/staking").BondStatus;
                tokens: string;
                delegator_shares: string;
                description?: {
                    moniker: string;
                    identity: string;
                    website: string;
                    security_contact: string;
                    details: string;
                };
                unbonding_height: any;
                unbonding_time?: string;
                commission?: {
                    commission_rates?: {
                        rate: string;
                        max_rate: string;
                        max_change_rate: string;
                    };
                    update_time?: string;
                };
                min_self_delegation: string;
                unbonding_on_hold_ref_count: any;
                unbonding_ids: any;
            }[];
        };
    }, any>>;
    /**
     * QueryPool
     *
     * @tags Query
     * @name queryPool
     * @request GET:/cosmos/staking/v1beta1/pool
     */
    queryPool: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        pool?: {
            not_bonded_tokens: string;
            bonded_tokens: string;
        };
    }, any>>;
    /**
     * QueryParams
     *
     * @tags Query
     * @name queryParams
     * @request GET:/cosmos/staking/v1beta1/params
     */
    queryParams: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            unbonding_time?: {
                seconds: any;
                nanos: number;
            };
            max_validators: number;
            max_entries: number;
            historical_entries: number;
            bond_denom: string;
            min_commission_rate: string;
        };
    }, any>>;
}
export {};
