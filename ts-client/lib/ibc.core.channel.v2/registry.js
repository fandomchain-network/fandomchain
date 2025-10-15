import { MsgSendPacket } from "./types/ibc/core/channel/v2/tx";
import { MsgRecvPacket } from "./types/ibc/core/channel/v2/tx";
import { MsgTimeout } from "./types/ibc/core/channel/v2/tx";
import { MsgAcknowledgement } from "./types/ibc/core/channel/v2/tx";
const msgTypes = [
    ["/ibc.core.channel.v2.MsgSendPacket", MsgSendPacket],
    ["/ibc.core.channel.v2.MsgRecvPacket", MsgRecvPacket],
    ["/ibc.core.channel.v2.MsgTimeout", MsgTimeout],
    ["/ibc.core.channel.v2.MsgAcknowledgement", MsgAcknowledgement],
];
export { msgTypes };
