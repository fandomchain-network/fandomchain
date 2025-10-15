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
 * @title cosmos.authz.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryGrants
         *
         * @tags Query
         * @name queryGrants
         * @request GET:/cosmos/authz/v1beta1/grants
         */
        this.queryGrants = (query, params = {}) => this.request({
            path: `/cosmos/authz/v1beta1/grants`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGranterGrants
         *
         * @tags Query
         * @name queryGranterGrants
         * @request GET:/cosmos/authz/v1beta1/grants/granter/{granter}
         */
        this.queryGranterGrants = (granter, query, params = {}) => this.request({
            path: `/cosmos/authz/v1beta1/grants/granter/${granter}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGranteeGrants
         *
         * @tags Query
         * @name queryGranteeGrants
         * @request GET:/cosmos/authz/v1beta1/grants/grantee/{grantee}
         */
        this.queryGranteeGrants = (grantee, query, params = {}) => this.request({
            path: `/cosmos/authz/v1beta1/grants/grantee/${grantee}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
