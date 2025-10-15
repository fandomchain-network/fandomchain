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
 * @title ibc.core.channel.v2
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * QueryNextSequenceSend
         *
         * @tags Query
         * @name queryNextSequenceSend
         * @request GET:/ibc/core/channel/v2/clients/{client_id}/next_sequence_send
         */
        this.queryNextSequenceSend = (client_id, query, params = {}) => this.request({
            path: `/ibc/core/channel/v2/clients/${client_id}/next_sequence_send`,
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
         * @request GET:/ibc/core/channel/v2/clients/{client_id}/packet_commitments/{sequence}
         */
        this.queryPacketCommitment = (client_id, sequence, query, params = {}) => this.request({
            path: `/ibc/core/channel/v2/clients/${client_id}/packet_commitments/${sequence}`,
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
         * @request GET:/ibc/core/channel/v2/clients/{client_id}/packet_commitments
         */
        this.queryPacketCommitments = (client_id, query, params = {}) => this.request({
            path: `/ibc/core/channel/v2/clients/${client_id}/packet_commitments`,
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
         * @request GET:/ibc/core/channel/v2/clients/{client_id}/packet_acks/{sequence}
         */
        this.queryPacketAcknowledgement = (client_id, sequence, query, params = {}) => this.request({
            path: `/ibc/core/channel/v2/clients/${client_id}/packet_acks/${sequence}`,
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
         * @request GET:/ibc/core/channel/v2/clients/{client_id}/packet_acknowledgements
         */
        this.queryPacketAcknowledgements = (client_id, query, params = {}) => this.request({
            path: `/ibc/core/channel/v2/clients/${client_id}/packet_acknowledgements`,
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
         * @request GET:/ibc/core/channel/v2/clients/{client_id}/packet_receipts/{sequence}
         */
        this.queryPacketReceipt = (client_id, sequence, query, params = {}) => this.request({
            path: `/ibc/core/channel/v2/clients/${client_id}/packet_receipts/${sequence}`,
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
         * @request GET:/ibc/core/channel/v2/clients/{client_id}/packet_commitments/{sequences}/unreceived_packets
         */
        this.queryUnreceivedPackets = (client_id, sequences, query, params = {}) => this.request({
            path: `/ibc/core/channel/v2/clients/${client_id}/packet_commitments/${sequences}/unreceived_packets`,
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
         * @request GET:/ibc/core/channel/v2/clients/{client_id}/packet_commitments/{packet_ack_sequences}/unreceived_acks
         */
        this.queryUnreceivedAcks = (client_id, packet_ack_sequences, query, params = {}) => this.request({
            path: `/ibc/core/channel/v2/clients/${client_id}/packet_commitments/${packet_ack_sequences}/unreceived_acks`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
