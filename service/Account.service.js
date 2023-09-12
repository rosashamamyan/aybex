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
    const user_accounts = await db.models.UserAccount.findAll({
      include: { all: true },
    });
    const accounts = await db.models.Account.findAll()
    const accUpBatchId = null
    const createAcc = false
    const newAccounts = [];
    const existedAccounts = []

    for await (let e of fileData) {
      if (
        user_accounts.some((a) => a.account_number == e["Admin Account ID"])
      ) {
        existedAccounts.push(e)
      } else {
        newAccounts.push(e);
      }
    }

    if(createAcc || newAccounts.length) {
      try {
        const accountUploadBatch = await db.models.AccountUploadBatch.create({
              strategy_id,
              file_name: fileName,
              total_accounts: fileData.length,
              new_accounts: newAccounts.length,
              file_path: filePath,
              status: 1,
              created_by: loggedUserId,
              updated_by: loggedUserId
            })
            accUpBatchId = accountUploadBatch.id
      } catch(e) {
        const accountUploadBatch = await db.models.AccountUploadBatch.create({
          strategy_id,
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
    }

    for await (let e of existedAccounts) {
      const subFund = await db.models.findOne({
        where: {
          name: acc["Sub-Fund"],
        },
      });
      if (accounts.some((a) => e["Admin Account ID"] == a.admin_account_id)) {
        //UPDATE ACCOUNT
        await db.models.Account.update(
          {
            sub_fund_id: subFund.id,
            name: e["Account Name"],
            updated_by: loggedUserId,
          },
          { where: { admin_account_id: e["Admin Account ID"] } }
        );
        //UPDATE ACCOUNT UPLOAD BATCH
        await db.models.AccountUploadBatch.update(
          {
            strategyId: strategy_id,
            file_name: fileName,
            total_accounts: fileData.length,
            new_accounts: newAccounts.length,
            file_path: filePath,
            updated_by: loggedUserId,
          },
          { where: { id: a.accountUploadBatchId } }
        );
        //UPDATE ACCOUNT DATA
        const accountData = await db.models.AccountData.findOne({where:{accountId: a.accountId}})
        await db.models.AccountData.update(
          {
            committed: e["ITD Net Return %"],
            contribution: e["Period Contributions ($)"],
            distribution: e["Period Distributions ($)"],
            redemptions: e["Period Redemptions ($)"],
            balance: e["Balance ($)"],
            si_net_profit_loss: e["ITD Net/Income Loss ($)"],
            new_investor_irr: e[""], //???????????????????????????????
            post_date: e["As of Date"],
            updated_by: loggedUserId,
          },
          { where: { id: accountData.id } } //account data id ???????
        );
        //UPDATE ACCOUNT TRANSACTIONS
        const accountTransaction = await db.models.AccountTransactions.findOne({where:{accountId: a.accountId}})
        await db.models.AccountTransactions.update(
          {
            strateyId: strategy_id,
            amount: "", //?????????????
            transaction_date: "", //???????????
            transaction_type: "", //?????????
            updated_by: loggedUserId,
          },
          { where: { id: accountTransaction.id } } //account transaction id
        );
        //UPDATE ACCOUNT_USER
      } else {
        const accId = null;
        createAcc = true;

        //CREATE ACCOUNT
        const account = await db.models.Account.create({
          subFundId: subFund.id,
          accountUploadBatchId: accUpBatchId,
          admin_account_id: e["Admin Account ID"],
          name: e["Account Name"],
          created_by: loggedUserId,
          updated_by: loggedUserId,
        });
        accId = account.id;

        //CREATE ACCOUNT DATA
        const accountData = await db.models.AccountData.create({
          accountId: accId,
          accountUploadBatchId: accUpBatchId,
          committed: e["ITD Net Return %"],
          contribution: e["Period Contributions ($)"],
          distribution: e["Period Distributions ($)"],
          redemptions: e["Period Redemptions ($)"],
          balance: e["Balance ($)"],
          si_net_profit_loss: e["ITD Net/Income Loss ($)"],
          new_investor_irr: e[""], //???????????????????????????????
          post_date: e["As of Date"],
          updated_by: loggedUserId,
        });

        //CREATE ACCOUNT TRANSACTIONS
        const accountTransactions = await db.models.AccountTransactions.create({
          userId: "", //??????????????
          accountId: accId,
          strategy_id,
          amount: "", //???????
          transaction_date: "", //??????
          transaction_type: "", //??????
          created_by: loggedUserId,
          updated_by: loggedUserId,
        });

        //CREATE ACCOUNT_USER
        const accountUser = db.models.AccountUser.create({
          accountId: accId,
          userId: "", //????????
          account_status: 1,
          created_by: loggedUserId,
          updated_by: loggedUserId,
        });
      }
    }

    // for await (let e of newAccounts) {
    //   //CREATE
    // }
  }
}

module.exports = new AccountService();