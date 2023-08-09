const Router = require("express").Router;
const AuthControler = require("../../coontroler/AuthControler");
const authRouter = new Router();

authRouter.post("/signup", AuthControler.signup);
authRouter.post("/signin", AuthControler.signin);

module.exports = authRouter;
