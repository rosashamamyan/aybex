const db = require("../models");
const bcrypt = require("bcrypt");
const CryptoJS = require('crypto-js');
const ApiError = require("../exeptions/apiError");

class UserService {
  async createUser(
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
    postal_code
  ) {
    const candidate = await db.models.User.findOne({
      where: {
        email,
      },
    });
    if (candidate) {
      throw ApiError.BadRequest(`User with ${email} email already exists`);
    }
    const defaultPassword = "11111";
    const hashDefaultPassword = await bcrypt.hash(defaultPassword, 3);

    const userData = await db.models.User.create({
      firstName,
      lastName,
      email,
      phone,
      password: password ? await bcrypt.hash(password, 3) : hashDefaultPassword,
      dob,
      roleId: 2,
    });

    const userId = userData.id;

    const userActiveData = await db.models.UserActive.create({
      userId,
      activated: 1,
      deleted: 0,
    });

    const addressData = await db.models.Address.create({
      address,
      state,
      country,
      city,
      postal_code,
      userId,
    });

    return userData;
  }

  async findAllUsers() {
    const usersData = await db.models.User.findAll({ include: { all: true } });
    return usersData;
  }

  async getUser(userId) {
    const userData = await db.models.User.findOne({
      where: {
        id: userId,
      },
      include: { all: true },
    });
    return userData;
  }

  async updateUser(
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
  ) {
    // const candidate = await db.models.User.findOne({
    //   where: {
    //     email,
    //   },
    // });
    // if (candidate) {
    //   throw ApiError.BadRequest(`User with ${email} email already exists`);
    // }

    const updatedUser = await db.models.User.update({
      firstName,
      lastName,
      email,
      phone,
      password,
      dob,
    }, {
      where: {
        email
      }
    });

    const updatedAddress = await db.models.Address.update(
      {
        address,
        state,
        country,
        city,
        postal_code,
      },
      {
        where: {
          email,
        },
      }
    );
    console.log("updatedUser", updatedUser);
    return updatedUser
  }
}

module.exports = new UserService();
