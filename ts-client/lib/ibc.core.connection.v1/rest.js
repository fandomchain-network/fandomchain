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
 * @title ibc.core.connection.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryConnection
         *
         * @tags Query
         * @name queryConnection
         * @request GET:/ibc/core/connection/v1/connections/{connection_id}
         */
        this.queryConnection = (connection_id, query, params = {}) => this.request({
            path: `/ibc/core/connection/v1/connections/${connection_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryConnections
         *
         * @tags Query
         * @name queryConnections
         * @request GET:/ibc/core/connection/v1/connections
         */
        this.queryConnections = (query, params = {}) => this.request({
            path: `/ibc/core/connection/v1/connections`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryClientConnections
         *
         * @tags Query
         * @name queryClientConnections
         * @request GET:/ibc/core/connection/v1/client_connections/{client_id}
         */
        this.queryClientConnections = (client_id, query, params = {}) => this.request({
            path: `/ibc/core/connection/v1/client_connections/${client_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryConnectionClientState
         *
         * @tags Query
         * @name queryConnectionClientState
         * @request GET:/ibc/core/connection/v1/connections/{connection_id}/client_state
         */
        this.queryConnectionClientState = (connection_id, query, params = {}) => this.request({
            path: `/ibc/core/connection/v1/connections/${connection_id}/client_state`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryConnectionConsensusState
         *
         * @tags Query
         * @name queryConnectionConsensusState
         * @request GET:/ibc/core/connection/v1/connections/{connection_id}/consensus_state/revision/{revision_number}/height/{revision_height}
         */
        this.queryConnectionConsensusState = (connection_id, revision_number, revision_height, query, params = {}) => this.request({
            path: `/ibc/core/connection/v1/connections/${connection_id}/consensus_state/revision/${revision_number}/height/${revision_height}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryConnectionParams
         *
         * @tags Query
         * @name queryConnectionParams
         * @request GET:/ibc/core/connection/v1/params
         */
        this.queryConnectionParams = (query, params = {}) => this.request({
            path: `/ibc/core/connection/v1/params`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
