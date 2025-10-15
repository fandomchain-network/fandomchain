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
 * @title cosmos.group.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryGroupInfo
         *
         * @tags Query
         * @name queryGroupInfo
         * @request GET:/cosmos/group/v1/group_info/{group_id}
         */
        this.queryGroupInfo = (group_id, query, params = {}) => this.request({
            path: `/cosmos/group/v1/group_info/${group_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGroupPolicyInfo
         *
         * @tags Query
         * @name queryGroupPolicyInfo
         * @request GET:/cosmos/group/v1/group_policy_info/{address}
         */
        this.queryGroupPolicyInfo = (address, query, params = {}) => this.request({
            path: `/cosmos/group/v1/group_policy_info/${address}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGroupMembers
         *
         * @tags Query
         * @name queryGroupMembers
         * @request GET:/cosmos/group/v1/group_members/{group_id}
         */
        this.queryGroupMembers = (group_id, query, params = {}) => this.request({
            path: `/cosmos/group/v1/group_members/${group_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGroupsByAdmin
         *
         * @tags Query
         * @name queryGroupsByAdmin
         * @request GET:/cosmos/group/v1/groups_by_admin/{admin}
         */
        this.queryGroupsByAdmin = (admin, query, params = {}) => this.request({
            path: `/cosmos/group/v1/groups_by_admin/${admin}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGroupPoliciesByGroup
         *
         * @tags Query
         * @name queryGroupPoliciesByGroup
         * @request GET:/cosmos/group/v1/group_policies_by_group/{group_id}
         */
        this.queryGroupPoliciesByGroup = (group_id, query, params = {}) => this.request({
            path: `/cosmos/group/v1/group_policies_by_group/${group_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGroupPoliciesByAdmin
         *
         * @tags Query
         * @name queryGroupPoliciesByAdmin
         * @request GET:/cosmos/group/v1/group_policies_by_admin/{admin}
         */
        this.queryGroupPoliciesByAdmin = (admin, query, params = {}) => this.request({
            path: `/cosmos/group/v1/group_policies_by_admin/${admin}`,
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
         * @request GET:/cosmos/group/v1/proposal/{proposal_id}
         */
        this.queryProposal = (proposal_id, query, params = {}) => this.request({
            path: `/cosmos/group/v1/proposal/${proposal_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryProposalsByGroupPolicy
         *
         * @tags Query
         * @name queryProposalsByGroupPolicy
         * @request GET:/cosmos/group/v1/proposals_by_group_policy/{address}
         */
        this.queryProposalsByGroupPolicy = (address, query, params = {}) => this.request({
            path: `/cosmos/group/v1/proposals_by_group_policy/${address}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryVoteByProposalVoter
         *
         * @tags Query
         * @name queryVoteByProposalVoter
         * @request GET:/cosmos/group/v1/vote_by_proposal_voter/{proposal_id}/{voter}
         */
        this.queryVoteByProposalVoter = (proposal_id, voter, query, params = {}) => this.request({
            path: `/cosmos/group/v1/vote_by_proposal_voter/${proposal_id}/${voter}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryVotesByProposal
         *
         * @tags Query
         * @name queryVotesByProposal
         * @request GET:/cosmos/group/v1/votes_by_proposal/{proposal_id}
         */
        this.queryVotesByProposal = (proposal_id, query, params = {}) => this.request({
            path: `/cosmos/group/v1/votes_by_proposal/${proposal_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryVotesByVoter
         *
         * @tags Query
         * @name queryVotesByVoter
         * @request GET:/cosmos/group/v1/votes_by_voter/{voter}
         */
        this.queryVotesByVoter = (voter, query, params = {}) => this.request({
            path: `/cosmos/group/v1/votes_by_voter/${voter}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGroupsByMember
         *
         * @tags Query
         * @name queryGroupsByMember
         * @request GET:/cosmos/group/v1/groups_by_member/{address}
         */
        this.queryGroupsByMember = (address, query, params = {}) => this.request({
            path: `/cosmos/group/v1/groups_by_member/${address}`,
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
         * @request GET:/cosmos/group/v1/proposals/{proposal_id}/tally
         */
        this.queryTallyResult = (proposal_id, query, params = {}) => this.request({
            path: `/cosmos/group/v1/proposals/${proposal_id}/tally`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryGroups
         *
         * @tags Query
         * @name queryGroups
         * @request GET:/cosmos/group/v1/groups
         */
        this.queryGroups = (query, params = {}) => this.request({
            path: `/cosmos/group/v1/groups`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
