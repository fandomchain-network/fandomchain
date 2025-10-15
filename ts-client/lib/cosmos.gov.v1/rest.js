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
 * @title cosmos.gov.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryConstitution
         *
         * @tags Query
         * @name queryConstitution
         * @request GET:/cosmos/gov/v1/constitution
         */
        this.queryConstitution = (query, params = {}) => this.request({
            path: `/cosmos/gov/v1/constitution`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryProposal
         *
         * @tags Query
         * @name queryProposal
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}
         */
        this.queryProposal = (proposal_id, query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposal_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryProposals
         *
         * @tags Query
         * @name queryProposals
         * @request GET:/cosmos/gov/v1/proposals
         */
        this.queryProposals = (query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryVote
         *
         * @tags Query
         * @name queryVote
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/votes/{voter}
         */
        this.queryVote = (proposal_id, voter, query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposal_id}/votes/${voter}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryVotes
         *
         * @tags Query
         * @name queryVotes
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/votes
         */
        this.queryVotes = (proposal_id, query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposal_id}/votes`,
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
         * @request GET:/cosmos/gov/v1/params/{params_type}
         */
        this.queryParams = (params_type, query, params = {}) => this.request({
            path: `/cosmos/gov/v1/params/${params_type}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDeposit
         *
         * @tags Query
         * @name queryDeposit
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/deposits/{depositor}
         */
        this.queryDeposit = (proposal_id, depositor, query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposal_id}/deposits/${depositor}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryDeposits
         *
         * @tags Query
         * @name queryDeposits
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/deposits
         */
        this.queryDeposits = (proposal_id, query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposal_id}/deposits`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryTallyResult
         *
         * @tags Query
         * @name queryTallyResult
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/tally
         */
        this.queryTallyResult = (proposal_id, query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposal_id}/tally`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
