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

      const userData = await UserService.createUser(
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
      );
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

  async getUser(req, res, next) {
    try {
      const userId = req.params.userId
      const userData = await UserService.getUser(userId)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async updateUser(req, res, next) {
    try {
      const {
        id,
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

      const updatedUserData = await UserService.updateUser(
        id,
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
      );
      return res.json(updatedUserData)
    } catch (e) {
      next(e)
    }
  }

  async reactivateAcc(req, res, next) {
    const {userId, status} = req.body
    console.log("statusssssssss", status);
    try {
       const reactivatedAcc = await UserService.reactivateAcc(userId, status)
       return res.json(reactivatedAcc)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserControler();