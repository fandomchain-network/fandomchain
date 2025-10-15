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
 * @title cosmos.distribution.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryParams
         *
         * @tags Query
         * @name queryParams
         * @request GET:/cosmos/distribution/v1beta1/params
         */
        this.queryParams = (query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/params`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryValidatorDistributionInfo
         *
         * @tags Query
         * @name queryValidatorDistributionInfo
         * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}
         */
        this.queryValidatorDistributionInfo = (validator_address, query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/validators/${validator_address}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryValidatorOutstandingRewards
         *
         * @tags Query
         * @name queryValidatorOutstandingRewards
         * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/outstanding_rewards
         */
        this.queryValidatorOutstandingRewards = (validator_address, query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/validators/${validator_address}/outstanding_rewards`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryValidatorCommission
         *
         * @tags Query
         * @name queryValidatorCommission
         * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/commission
         */
        this.queryValidatorCommission = (validator_address, query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/validators/${validator_address}/commission`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryValidatorSlashes
         *
         * @tags Query
         * @name queryValidatorSlashes
         * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/slashes
         */
        this.queryValidatorSlashes = (validator_address, query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/validators/${validator_address}/slashes`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDelegationRewards
         *
         * @tags Query
         * @name queryDelegationRewards
         * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards/{validator_address}
         */
        this.queryDelegationRewards = (delegator_address, validator_address, query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/delegators/${delegator_address}/rewards/${validator_address}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDelegationTotalRewards
         *
         * @tags Query
         * @name queryDelegationTotalRewards
         * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards
         */
        this.queryDelegationTotalRewards = (delegator_address, query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/delegators/${delegator_address}/rewards`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDelegatorValidators
         *
         * @tags Query
         * @name queryDelegatorValidators
         * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/validators
         */
        this.queryDelegatorValidators = (delegator_address, query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/delegators/${delegator_address}/validators`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDelegatorWithdrawAddress
         *
         * @tags Query
         * @name queryDelegatorWithdrawAddress
         * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/withdraw_address
         */
        this.queryDelegatorWithdrawAddress = (delegator_address, query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/delegators/${delegator_address}/withdraw_address`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryCommunityPool
         *
         * @tags Query
         * @name queryCommunityPool
         * @request GET:/cosmos/distribution/v1beta1/community_pool
         */
        this.queryCommunityPool = (query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/community_pool`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
