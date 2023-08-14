const { validationResult } = require("express-validator");
const ApiError = require("../exeptions/apiError");
const UserService = require("../service/User.service");

class UserControler {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("validation error", errors.array()));
      }
      const {firstName, lastName, email, phone, password, roleID} = req.body
      const userData = await UserService.create(firstName, lastName, email, phone, password, roleID)
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async findAllUsers(req, res, next) {
    try {
      const usersData = await UserService.findAllUsers()
      return res.json(usersData);
    } catch (e) {
      next(e);
    }
  }


}

module.exports = new UserControler();
