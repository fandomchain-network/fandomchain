import { MsgSubmitProposal } from "./types/cosmos/gov/v1beta1/tx";
import { MsgVote } from "./types/cosmos/gov/v1beta1/tx";
import { MsgVoteWeighted } from "./types/cosmos/gov/v1beta1/tx";
import { MsgDeposit } from "./types/cosmos/gov/v1beta1/tx";
const msgTypes = [
    ["/cosmos.gov.v1beta1.MsgSubmitProposal", MsgSubmitProposal],
    ["/cosmos.gov.v1beta1.MsgVote", MsgVote],
    ["/cosmos.gov.v1beta1.MsgVoteWeighted", MsgVoteWeighted],
    ["/cosmos.gov.v1beta1.MsgDeposit", MsgDeposit],
];
export { msgTypes };
