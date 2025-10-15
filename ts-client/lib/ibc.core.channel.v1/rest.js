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
 * @title ibc.core.channel.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryChannel
         *
         * @tags Query
         * @name queryChannel
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}
         */
        this.queryChannel = (channel_id, port_id, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryChannels
         *
         * @tags Query
         * @name queryChannels
         * @request GET:/ibc/core/channel/v1/channels
         */
        this.queryChannels = (query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryConnectionChannels
         *
         * @tags Query
         * @name queryConnectionChannels
         * @request GET:/ibc/core/channel/v1/connections/{connection}/channels
         */
        this.queryConnectionChannels = (connection, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/connections/${connection}/channels`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryChannelClientState
         *
         * @tags Query
         * @name queryChannelClientState
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/client_state
         */
        this.queryChannelClientState = (channel_id, port_id, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/client_state`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryChannelConsensusState
         *
         * @tags Query
         * @name queryChannelConsensusState
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/consensus_state/revision/{revision_number}/height/{revision_height}
         */
        this.queryChannelConsensusState = (channel_id, port_id, revision_number, revision_height, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/consensus_state/revision/${revision_number}/height/${revision_height}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryPacketCommitment
         *
         * @tags Query
         * @name queryPacketCommitment
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{sequence}
         */
        this.queryPacketCommitment = (channel_id, port_id, sequence, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/packet_commitments/${sequence}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryPacketCommitments
         *
         * @tags Query
         * @name queryPacketCommitments
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments
         */
        this.queryPacketCommitments = (channel_id, port_id, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/packet_commitments`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryPacketReceipt
         *
         * @tags Query
         * @name queryPacketReceipt
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_receipts/{sequence}
         */
        this.queryPacketReceipt = (channel_id, port_id, sequence, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/packet_receipts/${sequence}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryPacketAcknowledgement
         *
         * @tags Query
         * @name queryPacketAcknowledgement
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acks/{sequence}
         */
        this.queryPacketAcknowledgement = (channel_id, port_id, sequence, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/packet_acks/${sequence}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryPacketAcknowledgements
         *
         * @tags Query
         * @name queryPacketAcknowledgements
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acknowledgements
         */
        this.queryPacketAcknowledgements = (channel_id, port_id, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/packet_acknowledgements`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryUnreceivedPackets
         *
         * @tags Query
         * @name queryUnreceivedPackets
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_commitment_sequences}/unreceived_packets
         */
        this.queryUnreceivedPackets = (channel_id, port_id, packet_commitment_sequences, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/packet_commitments/${packet_commitment_sequences}/unreceived_packets`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryUnreceivedAcks
         *
         * @tags Query
         * @name queryUnreceivedAcks
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_ack_sequences}/unreceived_acks
         */
        this.queryUnreceivedAcks = (channel_id, port_id, packet_ack_sequences, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/packet_commitments/${packet_ack_sequences}/unreceived_acks`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryNextSequenceReceive
         *
         * @tags Query
         * @name queryNextSequenceReceive
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence
         */
        this.queryNextSequenceReceive = (channel_id, port_id, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/next_sequence`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * QueryNextSequenceSend
         *
         * @tags Query
         * @name queryNextSequenceSend
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence_send
         */
        this.queryNextSequenceSend = (channel_id, port_id, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/next_sequence_send`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
