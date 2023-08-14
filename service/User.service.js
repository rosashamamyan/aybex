const db = require("../models");
const bcrypt = require("bcrypt");
const ApiError = require("../exeptions/apiError");

class UserService {
  async create(firstName, lastName, email, phone, password) {
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
      firstName,
      lastName,
      email,
      phone,
      password: hashPassword,
      roleId: 2,
    });
    return user;
  }

  async findAllUsers() {
     const allUsers = await db.models.User.findAll()
     return allUsers
  }
}

module.exports = new UserService();
