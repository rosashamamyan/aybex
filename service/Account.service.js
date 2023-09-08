const ApiError = require("../exeptions/apiError");
const db = require("../models");

class AccountService {
  async createAccount(
    strategy_id,
    fileName,
    filePath,
    fileUploaded,
    fileData,
    loggedUserId
  ) {
    const user_accounts = await db.models.UserAccount.findAll({ include: all });
    const account_upload_batch_id = null;
    const account_id = null;
    let newAccounts = [];

    for await (let e of fileData) {
      if (
        user_accounts.some((a) => a.account_number == e["Admin Account ID"])
      ) {
        newAccounts.push(e);
      }
    }
    console.log("newAccountssssssss", newAccounts);

    try {
      const account_upload_batch = await db.models.AccountUploadBatch.create({
        file_name: fileName,
        total_accounts: fileData.length,
        new_accounts: newAccounts.length,
        file_path: filePath,
        status: 1,
        created_by: loggedUserId,
        updated_by: loggedUserId,
      });

      account_upload_batch_id = account_upload_batch.id;
    } catch (e) {
      await db.models.AccountUploadBatch.create({
        file_name: fileName,
        total_accounts: fileData.length,
        new_accounts: newAccounts.length,
        file_path: filePath,
        status: 0,
        error_log: e,
        created_by: loggedUserId,
        updated_by: loggedUserId,
      });
      return;
    }

    for await (let acc of newAccounts) {
      const subFund = await db.models.findOne({
        where: {
          name: acc["Sub-Fund"],
        },
      });

      const newAccount = await db.models.Account.create({
        sub_fund_id: subFund.id,
        accountUploadBatchId: account_upload_batch_id,
        admin_account_id: acc["Admin Account ID"],
        name: acc["Account Name"],
        created_by: loggedUserId,
        updated_by: loggedUserId,
      });

      account_id = newAccount.id;

      const newAccountData = await db.models.AccountData.create({
        account_id,
        account_upload_batch_id,
        admin_account_id: acc["Admin Account ID"],
        committed: acc["ITD Net Return %"],
        contribution: acc["Period Contributions ($)"],
        distribution: acc["Period Distributions ($)"],
        redemptions: acc["Period Redemptions ($)"],
        balance: acc["Balance ($)"],
        si_net_profit_loss: acc["ITD Net Income/Loss ($)"],
        net_investor_irr: "", //???????
        post_date: acc["As of Date"],
        created_by: loggedUserId,
        updated_by: loggedUserId,
      });
    }
  }
}

module.exports = new AccountService();
