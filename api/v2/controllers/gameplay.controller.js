const helper = require("../helpers/audit/helper.Audit");
const PlayerQueries = require("../../../config/db/queries/player/PlayerQueries");
const Wallet = require("../../../config/db/queries/wallet/WalletQueries");

//Resume
async function postResume(req, res) {
  try {
    //Check last state
    const last_state = await PlayerQueries.getLatestAudit(req.user.id);
    if (!last_state) return res.status(400).json({ status: false, message: "No Data Found" });
    const responseObj = await helper.createResponseForAudit(last_state);
    const { balance } = await Wallet.findWallet(req.user.wallet_id);
    responseObj.balance = balance;
    return res.status(200).json({ status: true, message: "Last State Fetched Successfully", data: responseObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}
// //Resume
// async function postResume(req, res) {
//   try {
//     //Check last state
//     const last_state = await SpinAuditQueries.checkLastSpins(req.user.id);
//     const spin_status = await helper.checkLastState(
//       last_state,
//       req.user.wallet_id
//     );
//     if (spin_status.status == "blocked") {
//       return res.status(400).json(spin_status);
//     } else if (spin_status.status == "completed") {
//       return res.status(404).json(spin_status);
//     }

//     return res.status(200).json(spin_status);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: false, message: "Internal Server Error" });
//   }
// }

module.exports = {
  postResume,
};
