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
 * @title cosmos.staking.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryValidators
         *
         * @tags Query
         * @name queryValidators
         * @request GET:/cosmos/staking/v1beta1/validators
         */
        this.queryValidators = (query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryValidator
         *
         * @tags Query
         * @name queryValidator
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}
         */
        this.queryValidator = (validator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validator_addr}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryValidatorDelegations
         *
         * @tags Query
         * @name queryValidatorDelegations
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations
         */
        this.queryValidatorDelegations = (validator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validator_addr}/delegations`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryValidatorUnbondingDelegations
         *
         * @tags Query
         * @name queryValidatorUnbondingDelegations
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/unbonding_delegations
         */
        this.queryValidatorUnbondingDelegations = (validator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validator_addr}/unbonding_delegations`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDelegation
         *
         * @tags Query
         * @name queryDelegation
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}
         */
        this.queryDelegation = (validator_addr, delegator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validator_addr}/delegations/${delegator_addr}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryUnbondingDelegation
         *
         * @tags Query
         * @name queryUnbondingDelegation
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}/unbonding_delegation
         */
        this.queryUnbondingDelegation = (validator_addr, delegator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validator_addr}/delegations/${delegator_addr}/unbonding_delegation`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDelegatorDelegations
         *
         * @tags Query
         * @name queryDelegatorDelegations
         * @request GET:/cosmos/staking/v1beta1/delegations/{delegator_addr}
         */
        this.queryDelegatorDelegations = (delegator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegations/${delegator_addr}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDelegatorUnbondingDelegations
         *
         * @tags Query
         * @name queryDelegatorUnbondingDelegations
         * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/unbonding_delegations
         */
        this.queryDelegatorUnbondingDelegations = (delegator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegators/${delegator_addr}/unbonding_delegations`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryRedelegations
         *
         * @tags Query
         * @name queryRedelegations
         * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/redelegations
         */
        this.queryRedelegations = (delegator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegators/${delegator_addr}/redelegations`,
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
         * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators
         */
        this.queryDelegatorValidators = (delegator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegators/${delegator_addr}/validators`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDelegatorValidator
         *
         * @tags Query
         * @name queryDelegatorValidator
         * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators/{validator_addr}
         */
        this.queryDelegatorValidator = (delegator_addr, validator_addr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegators/${delegator_addr}/validators/${validator_addr}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryHistoricalInfo
         *
         * @tags Query
         * @name queryHistoricalInfo
         * @request GET:/cosmos/staking/v1beta1/historical_info/{height}
         */
        this.queryHistoricalInfo = (height, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/historical_info/${height}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryPool
         *
         * @tags Query
         * @name queryPool
         * @request GET:/cosmos/staking/v1beta1/pool
         */
        this.queryPool = (query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/pool`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryParams
         *
         * @tags Query
         * @name queryParams
         * @request GET:/cosmos/staking/v1beta1/params
         */
        this.queryParams = (query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/params`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
