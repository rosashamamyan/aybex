const db = require("../models");
const bcrypt = require("bcrypt");
const ApiError = require("../exeptions/apiError");
const Address = require("../models/Address");

class UserService {
  async createAddress(id, address, state, country, city, postal_code) {
    const addressData = await db.models.Address.create({
      userId: id,
      address,
      state,
      country,
      city,
      postal_code
    })
    return addressData
  }
  
  async createUser(firstName, lastName, email, phone, password, dob) {
    const candidate = await db.models.User.findOne({
      where: {
        email,
      },
    });
    if (candidate) {
      throw ApiError.BadRequest(`User with ${email} email already exists`);
    }
    const defaultPassword = '11111'
    const hashDefaultPassword = await bcrypt.hash(defaultPassword, 3)
    if(!password) {
      const user = await db.models.User.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashDefaultPassword,
        dob,
        roleId: 2
      });
      return user
    }
    const hashPassword = await bcrypt.hash(password, 3);
    console.log(hashPassword)
    const user = await db.models.User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashPassword,
      dob,
      roleId: 2,
    });
    return user;
  }


  async findAllUsers() {
    const allUsers = await db.models.User.findAll({ include: { all: true }})
     return allUsers
  }
}

module.exports = new UserService();
