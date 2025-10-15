import { MsgGrant } from "./types/cosmos/authz/v1beta1/tx";
import { MsgExec } from "./types/cosmos/authz/v1beta1/tx";
import { MsgRevoke } from "./types/cosmos/authz/v1beta1/tx";
const msgTypes = [
    ["/cosmos.authz.v1beta1.MsgGrant", MsgGrant],
    ["/cosmos.authz.v1beta1.MsgExec", MsgExec],
    ["/cosmos.authz.v1beta1.MsgRevoke", MsgRevoke],
];
export { msgTypes };
