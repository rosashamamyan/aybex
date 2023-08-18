const { validationResult } = require("express-validator");
const ApiError = require("../exeptions/apiError");
const UserService = require("../service/User.service");

class UserControler {
  async createUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("validation error", errors.array()));
      }
      const {
        firstName,
        lastName,
        email,
        phone,
        password,
        dob,
        address,
        state,
        country,
        city,
        postal_code,
        account_number,
        account_status
      } = req.body;
      console.log(req.body);
      const userId = req.user.id
      const userData = await UserService.createUser(
        firstName,
        lastName,
        email,
        phone,
        password,
        dob
      );
      const addressData = await UserService.createAddress(
        userId,
        address,
        state,
        country,
        city,
        postal_code,
        account_number,
        account_status
      )
      const responseData = {
        userData,
        addressData
      };
      console.log("responseeeeeeeeeee data", responseData);
      return res.json(responseData);
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
