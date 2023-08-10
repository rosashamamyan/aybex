const db = require("../models/index");
const bcrypt = require("bcrypt");
const tokenService = require("./TokenService");
const UserDto = require("../dtos/userdto");
const ApiError = require("../exeptions/apiError");

class AuthService {
  async signup(email, password) {
    const candidate = await db.models.User.findOne({
      where: {
        email,
      },
    });
    if (candidate) {
      throw ApiError.BadRequest(`User with ${email} email already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await db.models.User.create({
      email,
      password: hashPassword,
    });
    const userDto = new UserDto(user);
    return { user: userDto.email };
  }

  async signin(email, password) {
    const user = await db.models.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw ApiError.BadRequest(`User with ${email} email doesn't exist`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Incorrect password`);
    }
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await db.models.UserToken.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await db.models.User.findAll();
    return users;
  }
}

module.exports = new AuthService();
