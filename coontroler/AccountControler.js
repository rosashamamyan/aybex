const AccountService = require("../service/Account.service");

class AccountControler {
  async createAccount(req, res, next) {
    const { strategy_id, fileName, filePath, fileUploaded, fileData } =
      req.body;
    const loggedUserId = req.user.id
    try {
      const accountData = await AccountService.createAccount(
        strategy_id,
        fileName,
        filePath,
        fileUploaded,
        fileData,
        loggedUserId
      );
      return res.json(accountData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AccountControler();