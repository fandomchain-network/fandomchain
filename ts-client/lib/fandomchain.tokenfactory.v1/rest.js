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
 * @title fandomchain.tokenfactory.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryParams
         *
         * @tags Query
         * @name queryParams
         * @request GET:/fandomChain/tokenfactory/v1/params
         */
        this.queryParams = (query, params = {}) => this.request({
            path: `/fandomChain/tokenfactory/v1/params`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGetDenom
         *
         * @tags Query
         * @name queryGetDenom
         * @request GET:/fandomChain/tokenfactory/v1/denom/{denom}
         */
        this.queryGetDenom = (denom, query, params = {}) => this.request({
            path: `/fandomChain/tokenfactory/v1/denom/${denom}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryListDenom
         *
         * @tags Query
         * @name queryListDenom
         * @request GET:/fandomChain/tokenfactory/v1/denom
         */
        this.queryListDenom = (query, params = {}) => this.request({
            path: `/fandomChain/tokenfactory/v1/denom`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGetBondingCurvePrice
         *
         * @tags Query
         * @name queryGetBondingCurvePrice
         * @request GET:/fandomChain/tokenfactory/v1/bonding_curve_price/{denom}
         */
        this.queryGetBondingCurvePrice = (denom, query, params = {}) => this.request({
            path: `/fandomChain/tokenfactory/v1/bonding_curve_price/${denom}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGetBondingCurveProgress
         *
         * @tags Query
         * @name queryGetBondingCurveProgress
         * @request GET:/fandomChain/tokenfactory/v1/bonding_curve_progress/{denom}
         */
        this.queryGetBondingCurveProgress = (denom, query, params = {}) => this.request({
            path: `/fandomChain/tokenfactory/v1/bonding_curve_progress/${denom}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryEstimateBuy
         *
         * @tags Query
         * @name queryEstimateBuy
         * @request GET:/fandomChain/tokenfactory/v1/estimate_buy/{denom}/{fandom_amount}
         */
        this.queryEstimateBuy = (denom, fandom_amount, query, params = {}) => this.request({
            path: `/fandomChain/tokenfactory/v1/estimate_buy/${denom}/${fandom_amount}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryEstimateSell
         *
         * @tags Query
         * @name queryEstimateSell
         * @request GET:/fandomChain/tokenfactory/v1/estimate_sell/{denom}/{token_amount}
         */
        this.queryEstimateSell = (denom, token_amount, query, params = {}) => this.request({
            path: `/fandomChain/tokenfactory/v1/estimate_sell/${denom}/${token_amount}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
