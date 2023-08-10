const Router = require("express").Router;
const AuthControler = require("../../coontroler/AuthControler");
const authRouter = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../../middlewares/authMiddleware");

authRouter.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  AuthControler.signup
);
authRouter.post(
  "/signin",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  AuthControler.signin
);
authRouter.post("/logout", AuthControler.logout);
authRouter.get("/refresh", AuthControler.refresh);
authRouter.get("/users", authMiddleware, AuthControler.getUsers);

module.exports = authRouter;
