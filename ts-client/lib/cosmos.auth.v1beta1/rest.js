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
 * @title cosmos.auth.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryAccounts
         *
         * @tags Query
         * @name queryAccounts
         * @request GET:/cosmos/auth/v1beta1/accounts
         */
        this.queryAccounts = (query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/accounts`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryAccount
         *
         * @tags Query
         * @name queryAccount
         * @request GET:/cosmos/auth/v1beta1/accounts/{address}
         */
        this.queryAccount = (address, query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/accounts/${address}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryAccountAddressByID
         *
         * @tags Query
         * @name queryAccountAddressById
         * @request GET:/cosmos/auth/v1beta1/address_by_id/{id}
         */
        this.queryAccountAddressById = (id, query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/address_by_id/${id}`,
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
         * @request GET:/cosmos/auth/v1beta1/params
         */
        this.queryParams = (query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/params`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryModuleAccounts
         *
         * @tags Query
         * @name queryModuleAccounts
         * @request GET:/cosmos/auth/v1beta1/module_accounts
         */
        this.queryModuleAccounts = (query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/module_accounts`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryModuleAccountByName
         *
         * @tags Query
         * @name queryModuleAccountByName
         * @request GET:/cosmos/auth/v1beta1/module_accounts/{name}
         */
        this.queryModuleAccountByName = (name, query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/module_accounts/${name}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryBech32Prefix
         *
         * @tags Query
         * @name queryBech32Prefix
         * @request GET:/cosmos/auth/v1beta1/bech32
         */
        this.queryBech32Prefix = (query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/bech32`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryAddressBytesToString
         *
         * @tags Query
         * @name queryAddressBytesToString
         * @request GET:/cosmos/auth/v1beta1/bech32/{address_bytes}
         */
        this.queryAddressBytesToString = (address_bytes, query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/bech32/${address_bytes}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryAddressStringToBytes
         *
         * @tags Query
         * @name queryAddressStringToBytes
         * @request GET:/cosmos/auth/v1beta1/bech32/{address_string}
         */
        this.queryAddressStringToBytes = (address_string, query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/bech32/${address_string}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryAccountInfo
         *
         * @tags Query
         * @name queryAccountInfo
         * @request GET:/cosmos/auth/v1beta1/account_info/{address}
         */
        this.queryAccountInfo = (address, query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/account_info/${address}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
