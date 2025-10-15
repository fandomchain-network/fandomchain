import { MsgRegisterCounterparty } from "./types/ibc/core/client/v2/tx";
import { MsgUpdateClientConfig } from "./types/ibc/core/client/v2/tx";
const msgTypes = [
    ["/ibc.core.client.v2.MsgRegisterCounterparty", MsgRegisterCounterparty],
    ["/ibc.core.client.v2.MsgUpdateClientConfig", MsgUpdateClientConfig],
];
export { msgTypes };
