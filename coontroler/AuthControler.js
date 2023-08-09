const AuthService = require("../service/Auth.service");

class AuthControler {
  async signup(req, res, next) {
    const { email, password } = req.body.data;
    const data = await AuthService.signup(email, password);
    res.send(data);
  }

  signin(req, res, next) {
    res.send(req.body);
  }
}

module.exports = new AuthControler();
