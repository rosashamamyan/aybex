const AccountService = require("../service/Account.service");

class AccountControler {
  async createAccount(req, res, next) {
    console.log("req.bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", req.body);
    const { strategy_id, fileName, filePath, fileUploaded, fileData } =
      req.body;
    try {
      const accountData = await AccountService.createAccount(
        strategy_id,
        fileName,
        filePath,
        fileUploaded,
        fileData
      );
      return res.json(accountData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AccountControler();