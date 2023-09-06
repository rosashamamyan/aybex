const AccountService = require("../service/Account.service");

class AccountControler {

  async createAccount(req, res, next) {
      console.log("req.bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", req.body);
    try {
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AccountControler();