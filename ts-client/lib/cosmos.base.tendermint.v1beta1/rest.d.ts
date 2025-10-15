import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { GetLatestValidatorSetRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetValidatorSetByHeightRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
import { ABCIQueryRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
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
 * @title cosmos.base.tendermint.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * ServiceGetNodeInfo
     *
     * @tags Query
     * @name serviceGetNodeInfo
     * @request GET:/cosmos/base/tendermint/v1beta1/node_info
     */
    serviceGetNodeInfo: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        default_node_info?: {
            protocol_version?: {
                p2p: any;
                block: any;
                app: any;
            };
            default_node_id: string;
            listen_addr: string;
            network: string;
            version: string;
            channels: string;
            moniker: string;
            other?: {
                tx_index: string;
                rpc_address: string;
            };
        };
        application_version?: {
            name: string;
            app_name: string;
            version: string;
            git_commit: string;
            build_tags: string;
            go_version: string;
            build_deps: {
                path: string;
                version: string;
                sum: string;
            }[];
            cosmos_sdk_version: string;
        };
    }, any>>;
    /**
     * ServiceGetSyncing
     *
     * @tags Query
     * @name serviceGetSyncing
     * @request GET:/cosmos/base/tendermint/v1beta1/syncing
     */
    serviceGetSyncing: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        syncing: boolean;
    }, any>>;
    /**
     * ServiceGetLatestBlock
     *
     * @tags Query
     * @name serviceGetLatestBlock
     * @request GET:/cosmos/base/tendermint/v1beta1/blocks/latest
     */
    serviceGetLatestBlock: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        block_id?: {
            hash: string;
            part_set_header?: {
                total: number;
                hash: string;
            };
        };
        block?: {
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
            data?: {
                txs: string[];
            };
            evidence?: {
                evidence: {
                    duplicate_vote_evidence?: {
                        vote_a?: {
                            type: import("./types/tendermint/types/types").SignedMsgType;
                            height: any;
                            round: number;
                            block_id?: {
                                hash: string;
                                part_set_header?: {
                                    total: number;
                                    hash: string;
                                };
                            };
                            timestamp?: string;
                            validator_address: string;
                            validator_index: number;
                            signature: string;
                            extension: string;
                            extension_signature: string;
                        };
                        vote_b?: {
                            type: import("./types/tendermint/types/types").SignedMsgType;
                            height: any;
                            round: number;
                            block_id?: {
                                hash: string;
                                part_set_header?: {
                                    total: number;
                                    hash: string;
                                };
                            };
                            timestamp?: string;
                            validator_address: string;
                            validator_index: number;
                            signature: string;
                            extension: string;
                            extension_signature: string;
                        };
                        total_voting_power: any;
                        validator_power: any;
                        timestamp?: string;
                    };
                    light_client_attack_evidence?: {
                        conflicting_block?: {
                            signed_header?: {
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
                                commit?: {
                                    height: any;
                                    round: number;
                                    block_id?: {
                                        hash: string;
                                        part_set_header?: {
                                            total: number;
                                            hash: string;
                                        };
                                    };
                                    signatures: {
                                        block_id_flag: import("./types/tendermint/types/validator").BlockIDFlag;
                                        validator_address: string;
                                        timestamp?: string;
                                        signature: string;
                                    }[];
                                };
                            };
                            validator_set?: {
                                validators: {
                                    address: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power: any;
                                    proposer_priority: any;
                                }[];
                                proposer?: {
                                    address: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power: any;
                                    proposer_priority: any;
                                };
                                total_voting_power: any;
                            };
                        };
                        common_height: any;
                        byzantine_validators: {
                            address: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power: any;
                            proposer_priority: any;
                        }[];
                        total_voting_power: any;
                        timestamp?: string;
                    };
                }[];
            };
            last_commit?: {
                height: any;
                round: number;
                block_id?: {
                    hash: string;
                    part_set_header?: {
                        total: number;
                        hash: string;
                    };
                };
                signatures: {
                    block_id_flag: import("./types/tendermint/types/validator").BlockIDFlag;
                    validator_address: string;
                    timestamp?: string;
                    signature: string;
                }[];
            };
        };
        sdk_block?: {
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
            data?: {
                txs: string[];
            };
            evidence?: {
                evidence: {
                    duplicate_vote_evidence?: {
                        vote_a?: {
                            type: import("./types/tendermint/types/types").SignedMsgType;
                            height: any;
                            round: number;
                            block_id?: {
                                hash: string;
                                part_set_header?: {
                                    total: number;
                                    hash: string;
                                };
                            };
                            timestamp?: string;
                            validator_address: string;
                            validator_index: number;
                            signature: string;
                            extension: string;
                            extension_signature: string;
                        };
                        vote_b?: {
                            type: import("./types/tendermint/types/types").SignedMsgType;
                            height: any;
                            round: number;
                            block_id?: {
                                hash: string;
                                part_set_header?: {
                                    total: number;
                                    hash: string;
                                };
                            };
                            timestamp?: string;
                            validator_address: string;
                            validator_index: number;
                            signature: string;
                            extension: string;
                            extension_signature: string;
                        };
                        total_voting_power: any;
                        validator_power: any;
                        timestamp?: string;
                    };
                    light_client_attack_evidence?: {
                        conflicting_block?: {
                            signed_header?: {
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
                                commit?: {
                                    height: any;
                                    round: number;
                                    block_id?: {
                                        hash: string;
                                        part_set_header?: {
                                            total: number;
                                            hash: string;
                                        };
                                    };
                                    signatures: {
                                        block_id_flag: import("./types/tendermint/types/validator").BlockIDFlag;
                                        validator_address: string;
                                        timestamp?: string;
                                        signature: string;
                                    }[];
                                };
                            };
                            validator_set?: {
                                validators: {
                                    address: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power: any;
                                    proposer_priority: any;
                                }[];
                                proposer?: {
                                    address: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power: any;
                                    proposer_priority: any;
                                };
                                total_voting_power: any;
                            };
                        };
                        common_height: any;
                        byzantine_validators: {
                            address: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power: any;
                            proposer_priority: any;
                        }[];
                        total_voting_power: any;
                        timestamp?: string;
                    };
                }[];
            };
            last_commit?: {
                height: any;
                round: number;
                block_id?: {
                    hash: string;
                    part_set_header?: {
                        total: number;
                        hash: string;
                    };
                };
                signatures: {
                    block_id_flag: import("./types/tendermint/types/validator").BlockIDFlag;
                    validator_address: string;
                    timestamp?: string;
                    signature: string;
                }[];
            };
        };
    }, any>>;
    /**
     * ServiceGetBlockByHeight
     *
     * @tags Query
     * @name serviceGetBlockByHeight
     * @request GET:/cosmos/base/tendermint/v1beta1/blocks/{height}
     */
    serviceGetBlockByHeight: (height: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        block_id?: {
            hash: string;
            part_set_header?: {
                total: number;
                hash: string;
            };
        };
        block?: {
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
            data?: {
                txs: string[];
            };
            evidence?: {
                evidence: {
                    duplicate_vote_evidence?: {
                        vote_a?: {
                            type: import("./types/tendermint/types/types").SignedMsgType;
                            height: any;
                            round: number;
                            block_id?: {
                                hash: string;
                                part_set_header?: {
                                    total: number;
                                    hash: string;
                                };
                            };
                            timestamp?: string;
                            validator_address: string;
                            validator_index: number;
                            signature: string;
                            extension: string;
                            extension_signature: string;
                        };
                        vote_b?: {
                            type: import("./types/tendermint/types/types").SignedMsgType;
                            height: any;
                            round: number;
                            block_id?: {
                                hash: string;
                                part_set_header?: {
                                    total: number;
                                    hash: string;
                                };
                            };
                            timestamp?: string;
                            validator_address: string;
                            validator_index: number;
                            signature: string;
                            extension: string;
                            extension_signature: string;
                        };
                        total_voting_power: any;
                        validator_power: any;
                        timestamp?: string;
                    };
                    light_client_attack_evidence?: {
                        conflicting_block?: {
                            signed_header?: {
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
                                commit?: {
                                    height: any;
                                    round: number;
                                    block_id?: {
                                        hash: string;
                                        part_set_header?: {
                                            total: number;
                                            hash: string;
                                        };
                                    };
                                    signatures: {
                                        block_id_flag: import("./types/tendermint/types/validator").BlockIDFlag;
                                        validator_address: string;
                                        timestamp?: string;
                                        signature: string;
                                    }[];
                                };
                            };
                            validator_set?: {
                                validators: {
                                    address: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power: any;
                                    proposer_priority: any;
                                }[];
                                proposer?: {
                                    address: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power: any;
                                    proposer_priority: any;
                                };
                                total_voting_power: any;
                            };
                        };
                        common_height: any;
                        byzantine_validators: {
                            address: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power: any;
                            proposer_priority: any;
                        }[];
                        total_voting_power: any;
                        timestamp?: string;
                    };
                }[];
            };
            last_commit?: {
                height: any;
                round: number;
                block_id?: {
                    hash: string;
                    part_set_header?: {
                        total: number;
                        hash: string;
                    };
                };
                signatures: {
                    block_id_flag: import("./types/tendermint/types/validator").BlockIDFlag;
                    validator_address: string;
                    timestamp?: string;
                    signature: string;
                }[];
            };
        };
        sdk_block?: {
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
            data?: {
                txs: string[];
            };
            evidence?: {
                evidence: {
                    duplicate_vote_evidence?: {
                        vote_a?: {
                            type: import("./types/tendermint/types/types").SignedMsgType;
                            height: any;
                            round: number;
                            block_id?: {
                                hash: string;
                                part_set_header?: {
                                    total: number;
                                    hash: string;
                                };
                            };
                            timestamp?: string;
                            validator_address: string;
                            validator_index: number;
                            signature: string;
                            extension: string;
                            extension_signature: string;
                        };
                        vote_b?: {
                            type: import("./types/tendermint/types/types").SignedMsgType;
                            height: any;
                            round: number;
                            block_id?: {
                                hash: string;
                                part_set_header?: {
                                    total: number;
                                    hash: string;
                                };
                            };
                            timestamp?: string;
                            validator_address: string;
                            validator_index: number;
                            signature: string;
                            extension: string;
                            extension_signature: string;
                        };
                        total_voting_power: any;
                        validator_power: any;
                        timestamp?: string;
                    };
                    light_client_attack_evidence?: {
                        conflicting_block?: {
                            signed_header?: {
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
                                commit?: {
                                    height: any;
                                    round: number;
                                    block_id?: {
                                        hash: string;
                                        part_set_header?: {
                                            total: number;
                                            hash: string;
                                        };
                                    };
                                    signatures: {
                                        block_id_flag: import("./types/tendermint/types/validator").BlockIDFlag;
                                        validator_address: string;
                                        timestamp?: string;
                                        signature: string;
                                    }[];
                                };
                            };
                            validator_set?: {
                                validators: {
                                    address: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power: any;
                                    proposer_priority: any;
                                }[];
                                proposer?: {
                                    address: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power: any;
                                    proposer_priority: any;
                                };
                                total_voting_power: any;
                            };
                        };
                        common_height: any;
                        byzantine_validators: {
                            address: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power: any;
                            proposer_priority: any;
                        }[];
                        total_voting_power: any;
                        timestamp?: string;
                    };
                }[];
            };
            last_commit?: {
                height: any;
                round: number;
                block_id?: {
                    hash: string;
                    part_set_header?: {
                        total: number;
                        hash: string;
                    };
                };
                signatures: {
                    block_id_flag: import("./types/tendermint/types/validator").BlockIDFlag;
                    validator_address: string;
                    timestamp?: string;
                    signature: string;
                }[];
            };
        };
    }, any>>;
    /**
     * ServiceGetLatestValidatorSet
     *
     * @tags Query
     * @name serviceGetLatestValidatorSet
     * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/latest
     */
    serviceGetLatestValidatorSet: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<GetLatestValidatorSetRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        block_height: any;
        validators: {
            address: string;
            pub_key?: {
                type_url: string;
                value: string;
            };
            voting_power: any;
            proposer_priority: any;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * ServiceGetValidatorSetByHeight
     *
     * @tags Query
     * @name serviceGetValidatorSetByHeight
     * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/{height}
     */
    serviceGetValidatorSetByHeight: (height: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<GetValidatorSetByHeightRequest>>>, "height">, params?: RequestParams) => Promise<AxiosResponse<{
        block_height: any;
        validators: {
            address: string;
            pub_key?: {
                type_url: string;
                value: string;
            };
            voting_power: any;
            proposer_priority: any;
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * ServiceABCIQuery
     *
     * @tags Query
     * @name serviceAbciquery
     * @request GET:/cosmos/base/tendermint/v1beta1/abci_query
     */
    serviceAbciquery: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<ABCIQueryRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        code: number;
        log: string;
        info: string;
        index: any;
        key: string;
        value: string;
        proof_ops?: {
            ops: {
                type: string;
                key: string;
                data: string;
            }[];
        };
        height: any;
        codespace: string;
    }, any>>;
}
export {};
