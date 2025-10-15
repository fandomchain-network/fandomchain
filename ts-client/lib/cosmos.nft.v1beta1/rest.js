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
 * @title cosmos.nft.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryBalance
         *
         * @tags Query
         * @name queryBalance
         * @request GET:/cosmos/nft/v1beta1/balance/{owner}/{class_id}
         */
        this.queryBalance = (owner, class_id, query, params = {}) => this.request({
            path: `/cosmos/nft/v1beta1/balance/${owner}/${class_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryOwner
         *
         * @tags Query
         * @name queryOwner
         * @request GET:/cosmos/nft/v1beta1/owner/{class_id}/{id}
         */
        this.queryOwner = (class_id, id, query, params = {}) => this.request({
            path: `/cosmos/nft/v1beta1/owner/${class_id}/${id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QuerySupply
         *
         * @tags Query
         * @name querySupply
         * @request GET:/cosmos/nft/v1beta1/supply/{class_id}
         */
        this.querySupply = (class_id, query, params = {}) => this.request({
            path: `/cosmos/nft/v1beta1/supply/${class_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryNFTs
         *
         * @tags Query
         * @name queryNfts
         * @request GET:/cosmos/nft/v1beta1/nfts
         */
        this.queryNfts = (query, params = {}) => this.request({
            path: `/cosmos/nft/v1beta1/nfts`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryNFT
         *
         * @tags Query
         * @name queryNft
         * @request GET:/cosmos/nft/v1beta1/nfts/{class_id}/{id}
         */
        this.queryNft = (class_id, id, query, params = {}) => this.request({
            path: `/cosmos/nft/v1beta1/nfts/${class_id}/${id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryClass
         *
         * @tags Query
         * @name queryClass
         * @request GET:/cosmos/nft/v1beta1/classes/{class_id}
         */
        this.queryClass = (class_id, query, params = {}) => this.request({
            path: `/cosmos/nft/v1beta1/classes/${class_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryClasses
         *
         * @tags Query
         * @name queryClasses
         * @request GET:/cosmos/nft/v1beta1/classes
         */
        this.queryClasses = (query, params = {}) => this.request({
            path: `/cosmos/nft/v1beta1/classes`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
