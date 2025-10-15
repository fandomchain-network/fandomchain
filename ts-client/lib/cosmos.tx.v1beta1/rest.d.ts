import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { GetTxsEventRequest } from "./types/cosmos/tx/v1beta1/service";
import { GetBlockWithTxsRequest } from "./types/cosmos/tx/v1beta1/service";
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
 * @title cosmos.tx.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * ServiceSimulate
     *
     * @tags Query
     * @name serviceSimulate
     * @request GET:/cosmos/tx/v1beta1/simulate
     */
    serviceSimulate: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        gas_info?: {
            gas_wanted: any;
            gas_used: any;
        };
        result?: {
            data: string;
            log: string;
            events: {
                type: string;
                attributes: {
                    key: string;
                    value: string;
                    index: boolean;
                }[];
            }[];
            msg_responses: {
                type_url: string;
                value: string;
            }[];
        };
    }, any>>;
    /**
     * ServiceGetTx
     *
     * @tags Query
     * @name serviceGetTx
     * @request GET:/cosmos/tx/v1beta1/txs/{hash}
     */
    serviceGetTx: (hash: string, query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        tx?: {
            body?: {
                messages: {
                    type_url: string;
                    value: string;
                }[];
                memo: string;
                timeout_height: any;
                unordered: boolean;
                timeout_timestamp?: string;
                extension_options: {
                    type_url: string;
                    value: string;
                }[];
                non_critical_extension_options: {
                    type_url: string;
                    value: string;
                }[];
            };
            auth_info?: {
                signer_infos: {
                    public_key?: {
                        type_url: string;
                        value: string;
                    };
                    mode_info?: {
                        single?: {
                            mode: import("./types/cosmos/tx/signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extra_bits_stored: number;
                                elems: string;
                            };
                            mode_infos: /*elided*/ any[];
                        };
                    };
                    sequence: any;
                }[];
                fee?: {
                    amount: {
                        denom: string;
                        amount: string;
                    }[];
                    gas_limit: any;
                    payer: string;
                    granter: string;
                };
                tip?: {
                    amount: {
                        denom: string;
                        amount: string;
                    }[];
                    tipper: string;
                };
            };
            signatures: string[];
        };
        tx_response?: {
            height: any;
            txhash: string;
            codespace: string;
            code: number;
            data: string;
            raw_log: string;
            logs: {
                msg_index: number;
                log: string;
                events: {
                    type: string;
                    attributes: {
                        key: string;
                        value: string;
                    }[];
                }[];
            }[];
            info: string;
            gas_wanted: any;
            gas_used: any;
            tx?: {
                type_url: string;
                value: string;
            };
            timestamp: string;
            events: {
                type: string;
                attributes: {
                    key: string;
                    value: string;
                    index: boolean;
                }[];
            }[];
        };
    }, any>>;
    /**
     * ServiceBroadcastTx
     *
     * @tags Query
     * @name serviceBroadcastTx
     * @request GET:/cosmos/tx/v1beta1/txs
     */
    serviceBroadcastTx: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        tx_response?: {
            height: any;
            txhash: string;
            codespace: string;
            code: number;
            data: string;
            raw_log: string;
            logs: {
                msg_index: number;
                log: string;
                events: {
                    type: string;
                    attributes: {
                        key: string;
                        value: string;
                    }[];
                }[];
            }[];
            info: string;
            gas_wanted: any;
            gas_used: any;
            tx?: {
                type_url: string;
                value: string;
            };
            timestamp: string;
            events: {
                type: string;
                attributes: {
                    key: string;
                    value: string;
                    index: boolean;
                }[];
            }[];
        };
    }, any>>;
    /**
     * ServiceGetTxsEvent
     *
     * @tags Query
     * @name serviceGetTxsEvent
     * @request GET:/cosmos/tx/v1beta1/txs
     */
    serviceGetTxsEvent: (query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<GetTxsEventRequest>>>, "">, params?: RequestParams) => Promise<AxiosResponse<{
        txs: {
            body?: {
                messages: {
                    type_url: string;
                    value: string;
                }[];
                memo: string;
                timeout_height: any;
                unordered: boolean;
                timeout_timestamp?: string;
                extension_options: {
                    type_url: string;
                    value: string;
                }[];
                non_critical_extension_options: {
                    type_url: string;
                    value: string;
                }[];
            };
            auth_info?: {
                signer_infos: {
                    public_key?: {
                        type_url: string;
                        value: string;
                    };
                    mode_info?: {
                        single?: {
                            mode: import("./types/cosmos/tx/signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extra_bits_stored: number;
                                elems: string;
                            };
                            mode_infos: /*elided*/ any[];
                        };
                    };
                    sequence: any;
                }[];
                fee?: {
                    amount: {
                        denom: string;
                        amount: string;
                    }[];
                    gas_limit: any;
                    payer: string;
                    granter: string;
                };
                tip?: {
                    amount: {
                        denom: string;
                        amount: string;
                    }[];
                    tipper: string;
                };
            };
            signatures: string[];
        }[];
        tx_responses: {
            height: any;
            txhash: string;
            codespace: string;
            code: number;
            data: string;
            raw_log: string;
            logs: {
                msg_index: number;
                log: string;
                events: {
                    type: string;
                    attributes: {
                        key: string;
                        value: string;
                    }[];
                }[];
            }[];
            info: string;
            gas_wanted: any;
            gas_used: any;
            tx?: {
                type_url: string;
                value: string;
            };
            timestamp: string;
            events: {
                type: string;
                attributes: {
                    key: string;
                    value: string;
                    index: boolean;
                }[];
            }[];
        }[];
        pagination?: {
            next_key: string;
            total: any;
        };
        total: any;
    }, any>>;
    /**
     * ServiceGetBlockWithTxs
     *
     * @tags Query
     * @name serviceGetBlockWithTxs
     * @request GET:/cosmos/tx/v1beta1/txs/block/{height}
     */
    serviceGetBlockWithTxs: (height: string, query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<GetBlockWithTxsRequest>>>, "height">, params?: RequestParams) => Promise<AxiosResponse<{
        txs: {
            body?: {
                messages: {
                    type_url: string;
                    value: string;
                }[];
                memo: string;
                timeout_height: any;
                unordered: boolean;
                timeout_timestamp?: string;
                extension_options: {
                    type_url: string;
                    value: string;
                }[];
                non_critical_extension_options: {
                    type_url: string;
                    value: string;
                }[];
            };
            auth_info?: {
                signer_infos: {
                    public_key?: {
                        type_url: string;
                        value: string;
                    };
                    mode_info?: {
                        single?: {
                            mode: import("./types/cosmos/tx/signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extra_bits_stored: number;
                                elems: string;
                            };
                            mode_infos: /*elided*/ any[];
                        };
                    };
                    sequence: any;
                }[];
                fee?: {
                    amount: {
                        denom: string;
                        amount: string;
                    }[];
                    gas_limit: any;
                    payer: string;
                    granter: string;
                };
                tip?: {
                    amount: {
                        denom: string;
                        amount: string;
                    }[];
                    tipper: string;
                };
            };
            signatures: string[];
        }[];
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
        pagination?: {
            next_key: string;
            total: any;
        };
    }, any>>;
    /**
     * ServiceTxDecode
     *
     * @tags Query
     * @name serviceTxDecode
     * @request GET:/cosmos/tx/v1beta1/decode
     */
    serviceTxDecode: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        tx?: {
            body?: {
                messages: {
                    type_url: string;
                    value: string;
                }[];
                memo: string;
                timeout_height: any;
                unordered: boolean;
                timeout_timestamp?: string;
                extension_options: {
                    type_url: string;
                    value: string;
                }[];
                non_critical_extension_options: {
                    type_url: string;
                    value: string;
                }[];
            };
            auth_info?: {
                signer_infos: {
                    public_key?: {
                        type_url: string;
                        value: string;
                    };
                    mode_info?: {
                        single?: {
                            mode: import("./types/cosmos/tx/signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extra_bits_stored: number;
                                elems: string;
                            };
                            mode_infos: /*elided*/ any[];
                        };
                    };
                    sequence: any;
                }[];
                fee?: {
                    amount: {
                        denom: string;
                        amount: string;
                    }[];
                    gas_limit: any;
                    payer: string;
                    granter: string;
                };
                tip?: {
                    amount: {
                        denom: string;
                        amount: string;
                    }[];
                    tipper: string;
                };
            };
            signatures: string[];
        };
    }, any>>;
    /**
     * ServiceTxEncode
     *
     * @tags Query
     * @name serviceTxEncode
     * @request GET:/cosmos/tx/v1beta1/encode
     */
    serviceTxEncode: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        tx_bytes: string;
    }, any>>;
    /**
     * ServiceTxEncodeAmino
     *
     * @tags Query
     * @name serviceTxEncodeAmino
     * @request GET:/cosmos/tx/v1beta1/encode/amino
     */
    serviceTxEncodeAmino: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        amino_binary: string;
    }, any>>;
    /**
     * ServiceTxDecodeAmino
     *
     * @tags Query
     * @name serviceTxDecodeAmino
     * @request GET:/cosmos/tx/v1beta1/decode/amino
     */
    serviceTxDecodeAmino: (query?: Record<string, any>, params?: RequestParams) => Promise<AxiosResponse<{
        amino_json: string;
    }, any>>;
}
export {};
