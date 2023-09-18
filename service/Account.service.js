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
    const newAccounts = [];
    const existedAccounts = [];

    for await (let e of fileData) {
      if (
        accounts.some((a) => a.admin_account_id == e["Admin Account ID"])
      ) {
        existedAccounts.push(e);
      } else {
        newAccounts.push(e);
      }
    }

    const accountUploadBatch = await db.models.AccountUploadBatch.create({
      strategyId: strategy_id,
      file_name: fileName,
      total_accounts: fileData.length,
      new_accounts: newAccounts.length,
      status: 1,
      error_log: "",
      created_by: loggedUserId,
      updated_by: loggedUserId,
    });

    for await(let e of existedAccounts) {
      //UPDATE ACCOUNT
      await db.models.Account.update(
        {
          name: e["Account Name"],
          updated_by: loggedUserId,
          accountUploadatchId: accountUploadBatch.id
        },
        { where: { admin_account_id: e["Admin Account ID"] } }
      );

      //UPDATE ACCOUNT DATA
      await db.models.AccountData.update(
        {
          committed: e["ITD Net Return %"],
          contribution: e["Period Contributions ($)"],
          distribution: e["Period Distributions ($)"],
          redemptions: e["Period Redemptions ($)"],
          balance: e["Balance ($)"],
          si_net_profit_loss: e["ITD Net/Income Loss ($)"],
          // new_investor_irr: e[""], //???????????????????????????????
          post_date: e["As of Date"],
          updated_by: loggedUserId,
          accountUploadatchId: accountUploadBatch.id
        },
        { where: { admin_account_id: e["Admin Account ID"] } }
      );

      //UPDATE ACCOUNT TRANSACTIONS
      
    }

    const user_accounts = await db.models.UserAccount.findAll({
      include: { all: true },
    });

    for await (let e of newAccounts) {
       if(user_accounts.some((a) => e["Admin Account ID"] == a.admin_account_id)){
         const subFund = await db.models.SubFund.findOne({
           where: {
             name: e["Sub-Fund"],
           },
         });

         //CREATE ACCOUNT
         const account = await db.models.Account.create({
           name: e["Account Name"],
           admin_account_id: e["Admin Account ID"],
           created_by: loggedUserId,
           updated_by: loggedUserId,
           subFundId: subFund.id,
           accountUploadatchId: accountUploadBatch.id
         })
   
         //CREATE ACCOUNT DATA
         const accountData = await db.models.AccountData.create({
           accountId: accId,
           accountUploadatchId: accountUploadBatch.id,
           committed: e["ITD Net Return %"],
           contribution: e["Period Contributions ($)"],
           distribution: e["Period Distributions ($)"],
           redemptions: e["Period Redemptions ($)"],
           balance: e["Balance ($)"],
           si_net_profit_loss: e["ITD Net/Income Loss ($)"],
          //  new_investor_irr: e[""], //???????????????????????????????
           post_date: e["As of Date"],
           updated_by: loggedUserId,
         });
   
         //CREATE ACCOUNT TRANSACTIONS
         for await (const [key, value] of Object.entries(accountData)) {
          console.log(`${key}: ${value}`); 
          
         }
   
         //CREATE ACCOUNT USER
         await db.models.AccountUser.create({
          account_status: 1,
          created_by: loggedUserId,
          updated_by: loggedUserId,
          accountId: account.id,
          userId: a.userId
         })
       } else {
         
       }
    }
  }

  async fetchAccountUploadBatch(){
    return await db.models.AccountUploadBatch.findAll()
  }
}

module.exports = new AccountService();
