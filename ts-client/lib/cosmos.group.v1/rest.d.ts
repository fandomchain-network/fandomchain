import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryGroupMembersRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupsByAdminRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupPoliciesByGroupRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupPoliciesByAdminRequest } from "./types/cosmos/group/v1/query";
import { QueryProposalsByGroupPolicyRequest } from "./types/cosmos/group/v1/query";
import { QueryVotesByProposalRequest } from "./types/cosmos/group/v1/query";
import { QueryVotesByVoterRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupsByMemberRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupsRequest } from "./types/cosmos/group/v1/query";
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
 * @title cosmos.group.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * QueryGroupInfo
     *
     * @tags Query
     * @name queryGroupInfo
     * @request GET:/cosmos/group/v1/group_info/{group_id}
     */
    queryGroupInfo: (group_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        info?: {
            id: any;
            admin: string;
            metadata: string;
            version: any;
            total_weight: string;
            created_at?: string;
        };
    }, any>>;
    /**
     * QueryGroupPolicyInfo
     *
     * @tags Query
     * @name queryGroupPolicyInfo
     * @request GET:/cosmos/group/v1/group_policy_info/{address}
     */
    queryGroupPolicyInfo: (address: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        info?: {
            address: string;
            group_id: any;
            admin: string;
            metadata: string;
            version: any;
            decision_policy?: {
                type_url: string;
                value: string;
            };
            created_at?: string;
        };
    }, any>>;
    /**
     * QueryGroupMembers
     *
     * @tags Query
     * @name queryGroupMembers
     * @request GET:/cosmos/group/v1/group_members/{group_id}
     */
    queryGroupMembers: (group_id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryGroupMembersRequest>>>, "group_id">, params?: RequestParams) => Promise<AxiosResponse<{
        members: {
            group_id: any;
            member?: {
                address: string;
                weight: string;
                metadata: string;
                added_at?: string;
            };
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryGroupsByAdmin
     *
     * @tags Query
     * @name queryGroupsByAdmin
     * @request GET:/cosmos/group/v1/groups_by_admin/{admin}
     */
    queryGroupsByAdmin: (admin: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryGroupsByAdminRequest>>>, "admin">, params?: RequestParams) => Promise<AxiosResponse<{
        groups: {
            id: any;
            admin: string;
            metadata: string;
            version: any;
            total_weight: string;
            created_at?: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryGroupPoliciesByGroup
     *
     * @tags Query
     * @name queryGroupPoliciesByGroup
     * @request GET:/cosmos/group/v1/group_policies_by_group/{group_id}
     */
    queryGroupPoliciesByGroup: (group_id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryGroupPoliciesByGroupRequest>>>, "group_id">, params?: RequestParams) => Promise<AxiosResponse<{
        group_policies: {
            address: string;
            group_id: any;
            admin: string;
            metadata: string;
            version: any;
            decision_policy?: {
                type_url: string;
                value: string;
            };
            created_at?: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryGroupPoliciesByAdmin
     *
     * @tags Query
     * @name queryGroupPoliciesByAdmin
     * @request GET:/cosmos/group/v1/group_policies_by_admin/{admin}
     */
    queryGroupPoliciesByAdmin: (admin: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryGroupPoliciesByAdminRequest>>>, "admin">, params?: RequestParams) => Promise<AxiosResponse<{
        group_policies: {
            address: string;
            group_id: any;
            admin: string;
            metadata: string;
            version: any;
            decision_policy?: {
                type_url: string;
                value: string;
            };
            created_at?: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryProposal
     *
     * @tags Query
     * @name queryProposal
     * @request GET:/cosmos/group/v1/proposal/{proposal_id}
     */
    queryProposal: (proposal_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        proposal?: {
            id: any;
            group_policy_address: string;
            metadata: string;
            proposers: string[];
            submit_time?: string;
            group_version: any;
            group_policy_version: any;
            status: import("./types/cosmos/group/v1/types").ProposalStatus;
            final_tally_result?: {
                yes_count: string;
                abstain_count: string;
                no_count: string;
                no_with_veto_count: string;
            };
            voting_period_end?: string;
            executor_result: import("./types/cosmos/group/v1/types").ProposalExecutorResult;
            messages: {
                type_url: string;
                value: string;
            }[];
            title: string;
            summary: string;
        };
    }, any>>;
    /**
     * QueryProposalsByGroupPolicy
     *
     * @tags Query
     * @name queryProposalsByGroupPolicy
     * @request GET:/cosmos/group/v1/proposals_by_group_policy/{address}
     */
    queryProposalsByGroupPolicy: (address: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryProposalsByGroupPolicyRequest>>>, "address">, params?: RequestParams) => Promise<AxiosResponse<{
        proposals: {
            id: any;
            group_policy_address: string;
            metadata: string;
            proposers: string[];
            submit_time?: string;
            group_version: any;
            group_policy_version: any;
            status: import("./types/cosmos/group/v1/types").ProposalStatus;
            final_tally_result?: {
                yes_count: string;
                abstain_count: string;
                no_count: string;
                no_with_veto_count: string;
            };
            voting_period_end?: string;
            executor_result: import("./types/cosmos/group/v1/types").ProposalExecutorResult;
            messages: {
                type_url: string;
                value: string;
            }[];
            title: string;
            summary: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryVoteByProposalVoter
     *
     * @tags Query
     * @name queryVoteByProposalVoter
     * @request GET:/cosmos/group/v1/vote_by_proposal_voter/{proposal_id}/{voter}
     */
    queryVoteByProposalVoter: (proposal_id: string, voter: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        vote?: {
            proposal_id: any;
            voter: string;
            option: import("./types/cosmos/group/v1/types").VoteOption;
            metadata: string;
            submit_time?: string;
        };
    }, any>>;
    /**
     * QueryVotesByProposal
     *
     * @tags Query
     * @name queryVotesByProposal
     * @request GET:/cosmos/group/v1/votes_by_proposal/{proposal_id}
     */
    queryVotesByProposal: (proposal_id: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryVotesByProposalRequest>>>, "proposal_id">, params?: RequestParams) => Promise<AxiosResponse<{
        votes: {
            proposal_id: any;
            voter: string;
            option: import("./types/cosmos/group/v1/types").VoteOption;
            metadata: string;
            submit_time?: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryVotesByVoter
     *
     * @tags Query
     * @name queryVotesByVoter
     * @request GET:/cosmos/group/v1/votes_by_voter/{voter}
     */
    queryVotesByVoter: (voter: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryVotesByVoterRequest>>>, "voter">, params?: RequestParams) => Promise<AxiosResponse<{
        votes: {
            proposal_id: any;
            voter: string;
            option: import("./types/cosmos/group/v1/types").VoteOption;
            metadata: string;
            submit_time?: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * QueryGroupsByMember
     *
     * @tags Query
     * @name queryGroupsByMember
     * @request GET:/cosmos/group/v1/groups_by_member/{address}
     */
    queryGroupsByMember: (address: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryGroupsByMemberRequest>>>, "address">, params?: RequestParams) => Promise<AxiosResponse<{
        groups: {
            id: any;
            admin: string;
            metadata: string;
            version: any;
            total_weight: string;
            created_at?: string;
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
     * @request GET:/cosmos/group/v1/proposals/{proposal_id}/tally
     */
    queryTallyResult: (proposal_id: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        tally?: {
            yes_count: string;
            abstain_count: string;
            no_count: string;
            no_with_veto_count: string;
        };
    }, any>>;
    /**
     * QueryGroups
     *
     * @tags Query
     * @name queryGroups
     * @request GET:/cosmos/group/v1/groups
     */
    queryGroups: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryGroupsRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        groups: {
            id: any;
            admin: string;
            metadata: string;
            version: any;
            total_weight: string;
            created_at?: string;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
}
export {};
