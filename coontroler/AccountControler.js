const AccountService = require("../service/Account.service");

class AccountControler {
  async createAccount(req, res, next) {
    const { strategy_id, fileName, fileData } =
      req.body;
    const loggedUserId = req.user.id

    try {
      const accountData = await AccountService.createAccount(
        strategy_id,
        fileName,
        fileData,
        loggedUserId
      );
      return res.json(accountData);
    } catch (e) {
      next(e);
    }
  }

  async fetchAccountUploadBatch(req, res, next) {
     try {
      const accountUploadBatchData = await AccountService.fetchAccountUploadBatch()
      return res.json(accountUploadBatchData)
     } catch (e) {
      next(e);
     }
  }

  async fetchLastAccountUploadBatch(req, res, next) {
    try {
      const lastAccountUploadBatchData = await AccountService.fetchLastAccountUploadBatch()
      res.send(lastAccountUploadBatchData)
    } catch(e) {
      next(e)
    }
  }

  async deleteUploadBatch(req, res, next) {
    const {uploadBatchId} = req.body
    try {
      res.send(await AccountService.deleteUploadBatch(uploadBatchId))
    } catch(e) {
       next(e)
    }
  }
}

module.exports = new AccountControler();