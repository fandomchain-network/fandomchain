import { Registry } from '@cosmjs/proto-signing';
import { IgniteClient } from "./client";
import { MissingWalletError } from "./helpers";
declare const Client: typeof IgniteClient & import("./helpers").Constructor<{
    CosmosBaseTendermintV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.base.tendermint.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.base.tendermint.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosBankV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.bank.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.bank.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosStakingV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.staking.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.staking.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    FandomchainTokenfactoryV_1: {
        query: ReturnType<typeof import("./fandomchain.tokenfactory.v1").queryClient>;
        tx: ReturnType<typeof import("./fandomchain.tokenfactory.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosFeegrantV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.feegrant.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.feegrant.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosAuthV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.auth.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.auth.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosAuthzV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.authz.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.authz.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosBaseNodeV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.base.node.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.base.node.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosConsensusV_1: {
        query: ReturnType<typeof import("./cosmos.consensus.v1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.consensus.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosDistributionV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.distribution.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.distribution.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosEpochsV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.epochs.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.epochs.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosGovV_1: {
        query: ReturnType<typeof import("./cosmos.gov.v1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.gov.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosGovV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.gov.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.gov.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosGroupV_1: {
        query: ReturnType<typeof import("./cosmos.group.v1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.group.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosMintV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.mint.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.mint.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosParamsV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.params.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.params.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosSlashingV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.slashing.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.slashing.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosTxV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.tx.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.tx.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosVestingV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.vesting.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.vesting.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosCircuitV_1: {
        query: ReturnType<typeof import("./cosmos.circuit.v1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.circuit.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosNftV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.nft.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.nft.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcApplicationsInterchainAccountsControllerV_1: {
        query: ReturnType<typeof import("./ibc.applications.interchain_accounts.controller.v1").queryClient>;
        tx: ReturnType<typeof import("./ibc.applications.interchain_accounts.controller.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcApplicationsInterchainAccountsHostV_1: {
        query: ReturnType<typeof import("./ibc.applications.interchain_accounts.host.v1").queryClient>;
        tx: ReturnType<typeof import("./ibc.applications.interchain_accounts.host.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcApplicationsTransferV_1: {
        query: ReturnType<typeof import("./ibc.applications.transfer.v1").queryClient>;
        tx: ReturnType<typeof import("./ibc.applications.transfer.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcCoreChannelV_1: {
        query: ReturnType<typeof import("./ibc.core.channel.v1").queryClient>;
        tx: ReturnType<typeof import("./ibc.core.channel.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcCoreChannelV_2: {
        query: ReturnType<typeof import("./ibc.core.channel.v2").queryClient>;
        tx: ReturnType<typeof import("./ibc.core.channel.v2").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcCoreClientV_1: {
        query: ReturnType<typeof import("./ibc.core.client.v1").queryClient>;
        tx: ReturnType<typeof import("./ibc.core.client.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcCoreClientV_2: {
        query: ReturnType<typeof import("./ibc.core.client.v2").queryClient>;
        tx: ReturnType<typeof import("./ibc.core.client.v2").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcCoreConnectionV_1: {
        query: ReturnType<typeof import("./ibc.core.connection.v1").queryClient>;
        tx: ReturnType<typeof import("./ibc.core.connection.v1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosUpgradeV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.upgrade.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.upgrade.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosEvidenceV_1Beta_1: {
        query: ReturnType<typeof import("./cosmos.evidence.v1beta1").queryClient>;
        tx: ReturnType<typeof import("./cosmos.evidence.v1beta1").txClient>;
        structure: Record<string, unknown>;
        registry: Array<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        updateTX(client: IgniteClient): void;
    };
}>;
declare const registry: Registry;
export { Client, registry, MissingWalletError };
