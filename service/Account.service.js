const ApiError = require("../exeptions/apiError");
const db = require("../models");

class AccountService {
  async createAccount(
    strategy_id,
    fileName,
    fileData,
    loggedUserId
    ) {
      const accounts = await db.models.Account.findAll();
      const user_accounts = await db.models.UserAccount.findAll({
        include: { all: true },
      });
      const newAccounts = [];
      const existedAccounts = [];
      const accountsForCreating = [];

      for await (let e of fileData) {
        if (accounts.some((a) => a.admin_account_id == e["Admin Account ID"])) {
          existedAccounts.push(e);
        } else {
          newAccounts.push(e);
        }
      }

      for await (let e of newAccounts) {
        if (
          user_accounts.some((a) => e["Admin Account ID"] == a.account_number)
        ) {
          accountsForCreating.push(e);
        }
      }

      const accountUploadBatch = await db.models.AccountUploadBatch.create({
        strategyId: strategy_id,
        file_name: fileName,
        total_accounts: fileData.length,
        new_accounts: accountsForCreating.length,
        status: 1,
        error_log: "",
        created_by: loggedUserId,
        updated_by: loggedUserId,
      });

      for await (let e of existedAccounts) {
        //UPDATE ACCOUNT
        await db.models.Account.update(
          {
            name: e["Account Name"],
            updated_by: loggedUserId,
            accountUploadBatchId: accountUploadBatch.id,
          },
          { where: { admin_account_id: e["Admin Account ID"] } }
        );

        //UPDATE ACCOUNT DATA
        const account = db.models.Account.findOne({
          where: { admin_account_id: e["Admin Account ID"] },
        });
        const oldAccountData = await db.models.AccountData.findOne({
          where: { admin_account_id: e["Admin Account ID"] },
        });

        await db.models.AccountData.update(
          {
            commited: e["ITD Net Return %"],
            contribution:
            parseFloat(oldAccountData.contribution) + parseFloat(e["Period Contributions ($)"]),
            distribution:
            parseFloat(oldAccountData.distribution) + parseFloat(e["Period Distributions ($)"]),
            redemption: parseFloat(oldAccountData.redemption) + parseFloat(e["Period Redemptions ($)"]),
            balance: parseFloat(oldAccountData.balance) + parseFloat(e["Balance ($)"]),
            si_net_profit_loss: e["ITD Net/Income Loss ($)"],
            post_date: e["As of Date"],
            updated_by: loggedUserId,
            accountUploadBatchId: accountUploadBatch.id,
          },
          { where: { admin_account_id: e["Admin Account ID"] } }
        );

        const accountData = await db.models.AccountData.findOne({
          where: { admin_account_id: e["Admin Account ID"] },
        });
        const user = user_accounts.find(
          (elm) => elm.account_number === e["Admin Account ID"]
        );
        //CREATE ACCOUNT TRANSACTIONS
        const validKeys = [
          "commited",
          "contribution",
          "distribution",
          "redemption",
        ];
        for await (const [key, value] of Object.entries(
          accountData.dataValues
        )) {
          if (validKeys.includes(key)) {
            await db.models.AccountTransactions.create({
              // date: ,
              type: key,
              amount: value,
              created_by: loggedUserId,
              updated_by: loggedUserId,
              userId: user.userId,
              accountId: account.id,
              strategyId: strategy_id,
            });
          }
        }
      }

      for await (let e of accountsForCreating) {
        const subFund = await db.models.SubFund.findOne({
          where: {
            name: e["Sub-Fund"],
          },
        });
        const user = user_accounts.find(
          (elm) => elm.account_number === e["Admin Account ID"]
        );

        //CREATE ACCOUNT
        const account = await db.models.Account.create({
          name: e["Account Name"],
          admin_account_id: e["Admin Account ID"],
          created_by: loggedUserId,
          updated_by: loggedUserId,
          subFundId: subFund.id,
          accountUploadBatchId: accountUploadBatch.id,
        });

        //CREATE ACCOUNT DATA
        const accountData = await db.models.AccountData.create({
          accountId: account.id,
          admin_account_id: e["Admin Account ID"],
          accountUploadBatchId: accountUploadBatch.id,
          commited: e["ITD Net Return %"],
          contribution: e["Period Contributions ($)"],
          distribution: e["Period Distributions ($)"],
          redemption: e["Period Redemptions ($)"],
          balance: e["Balance ($)"],
          si_net_profit_loss: e["ITD Net Income/Loss ($)"],
          post_date: e["As of Date"],
          created_by: loggedUserId,
          updated_by: loggedUserId,
        });

        //CREATE ACCOUNT TRANSACTIONS
        const validKeys = [
          "commited",
          "contribution",
          "distribution",
          "redemption",
        ];
        for await (const [key, value] of Object.entries(
          accountData.dataValues
        )) {
          if (validKeys.includes(key)) {
            await db.models.AccountTransactions.create({
              // date: ,
              type: key,
              amount: value,
              created_by: loggedUserId,
              updated_by: loggedUserId,
              userId: user.userId,
              accountId: account.id,
              strategyId: strategy_id,
            });
          }
        }

        //CREATE ACCOUNT USER
        await db.models.AccountUser.create({
          account_status: 1,
          created_by: loggedUserId,
          updated_by: loggedUserId,
          accountId: account.id,
          userId: user.userId,
        });
      }
    }

  async fetchAccountUploadBatch(){
    return await db.models.AccountUploadBatch.findAll({include: {all: true}})
  }

  async fetchLastAccountUploadBatch(){
    const [lastUploadBatchData] = await db.models.AccountUploadBatch.findAll({limit: 1, order: [ [ 'createdAt', 'DESC' ]], include: {all: true}})
    const strategy = await db.models.Strategy.findOne({where: {id: lastUploadBatchData.strategy.id}})
    const strategyType = await db.models.StrategyType.findOne({where: {id: strategy.strategyTypeId}})
    console.log({...lastUploadBatchData, strategy_type: strategyType.name});
    return {...lastUploadBatchData, strategy_type: strategyType.name}
    
  }
}

module.exports = new AccountService();
