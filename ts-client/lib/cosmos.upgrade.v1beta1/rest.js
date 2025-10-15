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
 * @title cosmos.upgrade.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryCurrentPlan
         *
         * @tags Query
         * @name queryCurrentPlan
         * @request GET:/cosmos/upgrade/v1beta1/current_plan
         */
        this.queryCurrentPlan = (query, params = {}) => this.request({
            path: `/cosmos/upgrade/v1beta1/current_plan`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryAppliedPlan
         *
         * @tags Query
         * @name queryAppliedPlan
         * @request GET:/cosmos/upgrade/v1beta1/applied_plan/{name}
         */
        this.queryAppliedPlan = (name, query, params = {}) => this.request({
            path: `/cosmos/upgrade/v1beta1/applied_plan/${name}`,
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
         * @request GET:/cosmos/upgrade/v1beta1/upgraded_consensus_state/{last_height}
         */
        this.queryUpgradedConsensusState = (last_height, query, params = {}) => this.request({
            path: `/cosmos/upgrade/v1beta1/upgraded_consensus_state/${last_height}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryModuleVersions
         *
         * @tags Query
         * @name queryModuleVersions
         * @request GET:/cosmos/upgrade/v1beta1/module_versions
         */
        this.queryModuleVersions = (query, params = {}) => this.request({
            path: `/cosmos/upgrade/v1beta1/module_versions`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryAuthority
         *
         * @tags Query
         * @name queryAuthority
         * @request GET:/cosmos/upgrade/v1beta1/authority
         */
        this.queryAuthority = (query, params = {}) => this.request({
            path: `/cosmos/upgrade/v1beta1/authority`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
