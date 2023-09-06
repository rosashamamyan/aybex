const Router = require("express").Router;
const AccountControler = require("../../coontroler/AccountControler");
const authMiddleware = require("../../middlewares/authMiddleware");
const accountRouter = new Router();

accountRouter.post(
  "/createAccount",
  authMiddleware,
  AccountControler.createAccount
);

module.exports = accountRouter;
