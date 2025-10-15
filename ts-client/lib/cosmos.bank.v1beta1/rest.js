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
 * @title cosmos.bank.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryBalance
         *
         * @tags Query
         * @name queryBalance
         * @request GET:/cosmos/bank/v1beta1/balances/{address}/by_denom
         */
        this.queryBalance = (address, query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/balances/${address}/by_denom`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryAllBalances
         *
         * @tags Query
         * @name queryAllBalances
         * @request GET:/cosmos/bank/v1beta1/balances/{address}
         */
        this.queryAllBalances = (address, query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/balances/${address}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QuerySpendableBalances
         *
         * @tags Query
         * @name querySpendableBalances
         * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}
         */
        this.querySpendableBalances = (address, query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/spendable_balances/${address}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QuerySpendableBalanceByDenom
         *
         * @tags Query
         * @name querySpendableBalanceByDenom
         * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}/by_denom
         */
        this.querySpendableBalanceByDenom = (address, query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/spendable_balances/${address}/by_denom`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryTotalSupply
         *
         * @tags Query
         * @name queryTotalSupply
         * @request GET:/cosmos/bank/v1beta1/supply
         */
        this.queryTotalSupply = (query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/supply`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QuerySupplyOf
         *
         * @tags Query
         * @name querySupplyOf
         * @request GET:/cosmos/bank/v1beta1/supply/by_denom
         */
        this.querySupplyOf = (query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/supply/by_denom`,
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
         * @request GET:/cosmos/bank/v1beta1/params
         */
        this.queryParams = (query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/params`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDenomsMetadata
         *
         * @tags Query
         * @name queryDenomsMetadata
         * @request GET:/cosmos/bank/v1beta1/denoms_metadata
         */
        this.queryDenomsMetadata = (query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/denoms_metadata`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDenomMetadata
         *
         * @tags Query
         * @name queryDenomMetadata
         * @request GET:/cosmos/bank/v1beta1/denoms_metadata/{denom=**}
         */
        this.queryDenomMetadata = (denom, query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/denoms_metadata/${denom}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDenomMetadataByQueryString
         *
         * @tags Query
         * @name queryDenomMetadataByQueryString
         * @request GET:/cosmos/bank/v1beta1/denoms_metadata_by_query_string
         */
        this.queryDenomMetadataByQueryString = (query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/denoms_metadata_by_query_string`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDenomOwners
         *
         * @tags Query
         * @name queryDenomOwners
         * @request GET:/cosmos/bank/v1beta1/denom_owners/{denom=**}
         */
        this.queryDenomOwners = (denom, query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/denom_owners/${denom}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDenomOwnersByQuery
         *
         * @tags Query
         * @name queryDenomOwnersByQuery
         * @request GET:/cosmos/bank/v1beta1/denom_owners_by_query
         */
        this.queryDenomOwnersByQuery = (query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/denom_owners_by_query`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QuerySendEnabled
         *
         * @tags Query
         * @name querySendEnabled
         * @request GET:/cosmos/bank/v1beta1/send_enabled
         */
        this.querySendEnabled = (query, params = {}) => this.request({
            path: `/cosmos/bank/v1beta1/send_enabled`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
