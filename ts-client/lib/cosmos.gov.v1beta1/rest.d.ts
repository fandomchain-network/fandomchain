import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryProposalsRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryVotesRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositsRequest } from "./types/cosmos/gov/v1beta1/query";
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
 * @title cosmos.gov.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryProposal
     *
     * @tags Query
     * @name queryProposal
     * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}
     */
    queryProposal: (proposal_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        proposal?: {
            proposal_id: any;
            content?: {
                type_url: string;
                value: string;
            };
            status: import("./types/cosmos/gov/v1beta1/gov").ProposalStatus;
            final_tally_result?: {
                yes: string;
                abstain: string;
                no: string;
                no_with_veto: string;
            };
            submit_time?: string;
            deposit_end_time?: string;
            total_deposit: {
                denom: string;
                amount: string;
            }[];
            voting_start_time?: string;
            voting_end_time?: string;
        };
    }, any>>;
    /**
     * QueryProposals
     *
     * @tags Query
     * @name queryProposals
     * @request GET:/cosmos/gov/v1beta1/proposals
     */
    queryProposals: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryProposalsRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        proposals: {
            proposal_id: any;
            content?: {
                type_url: string;
                value: string;
            };
            status: import("./types/cosmos/gov/v1beta1/gov").ProposalStatus;
            final_tally_result?: {
                yes: string;
                abstain: string;
                no: string;
                no_with_veto: string;
            };
            submit_time?: string;
            deposit_end_time?: string;
            total_deposit: {
                denom: string;
                amount: string;
            }[];
            voting_start_time?: string;
            voting_end_time?: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryVote
     *
     * @tags Query
     * @name queryVote
     * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/votes/{voter}
     */
    queryVote: (proposal_id: string, voter: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        vote?: {
            proposal_id: any;
            voter: string;
            option: import("./types/cosmos/gov/v1beta1/gov").VoteOption;
            options: {
                option: import("./types/cosmos/gov/v1beta1/gov").VoteOption;
                weight: string;
            }[];
        };
    }, any>>;
    /**
     * QueryVotes
     *
     * @tags Query
     * @name queryVotes
     * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/votes
     */
    queryVotes: (proposal_id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryVotesRequest>>>, "proposal_id">, params?: RequestParams) => Promise<AxiosResponse<{
        votes: {
            proposal_id: any;
            voter: string;
            option: import("./types/cosmos/gov/v1beta1/gov").VoteOption;
            options: {
                option: import("./types/cosmos/gov/v1beta1/gov").VoteOption;
                weight: string;
            }[];
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryParams
     *
     * @tags Query
     * @name queryParams
     * @request GET:/cosmos/gov/v1beta1/params/{params_type}
     */
    queryParams: (params_type: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        voting_params?: {
            voting_period?: {
                seconds: any;
                nanos: number;
            };
        };
        deposit_params?: {
            min_deposit: {
                denom: string;
                amount: string;
            }[];
            max_deposit_period?: {
                seconds: any;
                nanos: number;
            };
        };
        tally_params?: {
            quorum: string;
            threshold: string;
            veto_threshold: string;
        };
    }, any>>;
    /**
     * QueryDeposit
     *
     * @tags Query
     * @name queryDeposit
     * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/deposits/{depositor}
     */
    queryDeposit: (proposal_id: string, depositor: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        deposit?: {
            proposal_id: any;
            depositor: string;
            amount: {
                denom: string;
                amount: string;
            }[];
        };
    }, any>>;
    /**
     * QueryDeposits
     *
     * @tags Query
     * @name queryDeposits
     * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/deposits
     */
    queryDeposits: (proposal_id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryDepositsRequest>>>, "proposal_id">, params?: RequestParams) => Promise<AxiosResponse<{
        deposits: {
            proposal_id: any;
            depositor: string;
            amount: {
                denom: string;
                amount: string;
            }[];
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryTallyResult
     *
     * @tags Query
     * @name queryTallyResult
     * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/tally
     */
    queryTallyResult: (proposal_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        tally?: {
            yes: string;
            abstain: string;
            no: string;
            no_with_veto: string;
        };
    }, any>>;
}
export {};
