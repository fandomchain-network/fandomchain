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
 * @title cosmos.tx.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * ServiceSimulate
         *
         * @tags Query
         * @name serviceSimulate
         * @request GET:/cosmos/tx/v1beta1/simulate
         */
        this.serviceSimulate = (query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/simulate`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceGetTx
         *
         * @tags Query
         * @name serviceGetTx
         * @request GET:/cosmos/tx/v1beta1/txs/{hash}
         */
        this.serviceGetTx = (hash, query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs/${hash}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceBroadcastTx
         *
         * @tags Query
         * @name serviceBroadcastTx
         * @request GET:/cosmos/tx/v1beta1/txs
         */
        this.serviceBroadcastTx = (query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceGetTxsEvent
         *
         * @tags Query
         * @name serviceGetTxsEvent
         * @request GET:/cosmos/tx/v1beta1/txs
         */
        this.serviceGetTxsEvent = (query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceGetBlockWithTxs
         *
         * @tags Query
         * @name serviceGetBlockWithTxs
         * @request GET:/cosmos/tx/v1beta1/txs/block/{height}
         */
        this.serviceGetBlockWithTxs = (height, query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs/block/${height}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceTxDecode
         *
         * @tags Query
         * @name serviceTxDecode
         * @request GET:/cosmos/tx/v1beta1/decode
         */
        this.serviceTxDecode = (query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/decode`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceTxEncode
         *
         * @tags Query
         * @name serviceTxEncode
         * @request GET:/cosmos/tx/v1beta1/encode
         */
        this.serviceTxEncode = (query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/encode`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceTxEncodeAmino
         *
         * @tags Query
         * @name serviceTxEncodeAmino
         * @request GET:/cosmos/tx/v1beta1/encode/amino
         */
        this.serviceTxEncodeAmino = (query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/encode/amino`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * ServiceTxDecodeAmino
         *
         * @tags Query
         * @name serviceTxDecodeAmino
         * @request GET:/cosmos/tx/v1beta1/decode/amino
         */
        this.serviceTxDecodeAmino = (query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/decode/amino`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
