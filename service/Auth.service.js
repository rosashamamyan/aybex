const db = require("../models/index");

class AuthService {
  async signup(email, password) {
   
    const user = db.models.User.findOne({
      where: {
        email
      }
    })

    if(!user) {
      const newUser = await db.models.User.create({
        email: email,
        password: password,
        hashRT: "tets",
      });
      return newUser;
    } else {
      return {errorMessage: "user already exists"}
    }

  }
  signin() {}
}

module.exports = new AuthService();
