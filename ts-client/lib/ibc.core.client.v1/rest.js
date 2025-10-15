import axios from "axios";
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
    constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
        this.securityData = null;
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.request = async ({ secure, path, type, query, format, body, ...params }) => {
            const secureParams = ((typeof secure === "boolean" ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
                {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const responseFormat = (format && this.format) || void 0;
            if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
                requestParams.headers.common = { Accept: "*/*" };
                requestParams.headers.post = {};
                requestParams.headers.put = {};
                body = this.createFormData(body);
            }
            return this.instance.request({
                ...requestParams,
                headers: {
                    ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
                    ...(requestParams.headers || {}),
                },
                params: query,
                responseType: responseFormat,
                data: body,
                url: path,
            });
        };
        this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }
    mergeRequestParams(params1, params2) {
        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.instance.defaults.headers),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }
    createFormData(input) {
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            formData.append(key, property instanceof Blob
                ? property
                : typeof property === "object" && property !== null
                    ? JSON.stringify(property)
                    : `${property}`);
            return formData;
        }, new FormData());
    }
}
/**
 * @title ibc.core.client.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryClientState
         *
         * @tags Query
         * @name queryClientState
         * @request GET:/ibc/core/client/v1/client_states/{client_id}
         */
        this.queryClientState = (client_id, query, params = {}) => this.request({
            path: `/ibc/core/client/v1/client_states/${client_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryClientStates
         *
         * @tags Query
         * @name queryClientStates
         * @request GET:/ibc/core/client/v1/client_states
         */
        this.queryClientStates = (query, params = {}) => this.request({
            path: `/ibc/core/client/v1/client_states`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryConsensusState
         *
         * @tags Query
         * @name queryConsensusState
         * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/revision/{revision_number}/height/{revision_height}
         */
        this.queryConsensusState = (client_id, revision_number, revision_height, query, params = {}) => this.request({
            path: `/ibc/core/client/v1/consensus_states/${client_id}/revision/${revision_number}/height/${revision_height}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryConsensusStates
         *
         * @tags Query
         * @name queryConsensusStates
         * @request GET:/ibc/core/client/v1/consensus_states/{client_id}
         */
        this.queryConsensusStates = (client_id, query, params = {}) => this.request({
            path: `/ibc/core/client/v1/consensus_states/${client_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryConsensusStateHeights
         *
         * @tags Query
         * @name queryConsensusStateHeights
         * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/heights
         */
        this.queryConsensusStateHeights = (client_id, query, params = {}) => this.request({
            path: `/ibc/core/client/v1/consensus_states/${client_id}/heights`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryClientStatus
         *
         * @tags Query
         * @name queryClientStatus
         * @request GET:/ibc/core/client/v1/client_status/{client_id}
         */
        this.queryClientStatus = (client_id, query, params = {}) => this.request({
            path: `/ibc/core/client/v1/client_status/${client_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryClientParams
         *
         * @tags Query
         * @name queryClientParams
         * @request GET:/ibc/core/client/v1/params
         */
        this.queryClientParams = (query, params = {}) => this.request({
            path: `/ibc/core/client/v1/params`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryClientCreator
         *
         * @tags Query
         * @name queryClientCreator
         * @request GET:/ibc/core/client/v1/client_creator/{client_id}
         */
        this.queryClientCreator = (client_id, query, params = {}) => this.request({
            path: `/ibc/core/client/v1/client_creator/${client_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryUpgradedClientState
         *
         * @tags Query
         * @name queryUpgradedClientState
         * @request GET:/ibc/core/client/v1/upgraded_client_states
         */
        this.queryUpgradedClientState = (query, params = {}) => this.request({
            path: `/ibc/core/client/v1/upgraded_client_states`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryUpgradedConsensusState
         *
         * @tags Query
         * @name queryUpgradedConsensusState
         * @request GET:/ibc/core/client/v1/upgraded_consensus_states
         */
        this.queryUpgradedConsensusState = (query, params = {}) => this.request({
            path: `/ibc/core/client/v1/upgraded_consensus_states`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryVerifyMembership
         *
         * @tags Query
         * @name queryVerifyMembership
         * @request GET:/ibc/core/client/v1/verify_membership
         */
        this.queryVerifyMembership = (query, params = {}) => this.request({
            path: `/ibc/core/client/v1/verify_membership`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
