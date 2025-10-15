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
 * @title cosmos.base.tendermint.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * ServiceGetNodeInfo
         *
         * @tags Query
         * @name serviceGetNodeInfo
         * @request GET:/cosmos/base/tendermint/v1beta1/node_info
         */
        this.serviceGetNodeInfo = (query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/node_info`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceGetSyncing
         *
         * @tags Query
         * @name serviceGetSyncing
         * @request GET:/cosmos/base/tendermint/v1beta1/syncing
         */
        this.serviceGetSyncing = (query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/syncing`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceGetLatestBlock
         *
         * @tags Query
         * @name serviceGetLatestBlock
         * @request GET:/cosmos/base/tendermint/v1beta1/blocks/latest
         */
        this.serviceGetLatestBlock = (query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/blocks/latest`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceGetBlockByHeight
         *
         * @tags Query
         * @name serviceGetBlockByHeight
         * @request GET:/cosmos/base/tendermint/v1beta1/blocks/{height}
         */
        this.serviceGetBlockByHeight = (height, query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/blocks/${height}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceGetLatestValidatorSet
         *
         * @tags Query
         * @name serviceGetLatestValidatorSet
         * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/latest
         */
        this.serviceGetLatestValidatorSet = (query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/validatorsets/latest`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceGetValidatorSetByHeight
         *
         * @tags Query
         * @name serviceGetValidatorSetByHeight
         * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/{height}
         */
        this.serviceGetValidatorSetByHeight = (height, query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/validatorsets/${height}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceABCIQuery
         *
         * @tags Query
         * @name serviceAbciquery
         * @request GET:/cosmos/base/tendermint/v1beta1/abci_query
         */
        this.serviceAbciquery = (query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/abci_query`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
