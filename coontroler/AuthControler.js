const AuthService = require("../service/Auth.service");
const { validationResult } = require("express-validator");
const ApiError = require("../exeptions/apiError");

class AuthControler {
  async signup(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("validation error", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await AuthService.signup(email, password);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.signin(email, password);
      res.cookie("refreshToken", userData.refreshToken);
      console.log("req.cookies", req.cookies);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    // try {
    //   console.log("00000000000000000000000000000000000000000000000000000000");
    // const { refreshToken } = req.cookies;
    //   console.log("refreshToken", refreshToken);
    //   const token = await AuthService.logout(refreshToken);
    //   res.clearCookie("refreshToken");
    //   return res.json(token);
    // } catch (e) {
    console.log(
      "11111111111111111111111111111111111111111111111111111111",
      req.cookies[0]
    );

    //   next(e);
    // }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await AuthService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await AuthService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthControler();
