const Router = require("express").Router;
const AccountControler = require("../../coontroler/AccountControler");
const authMiddleware = require("../../middlewares/authMiddleware");
const accountRouter = new Router();

accountRouter.post(
  "/createAccount",
  authMiddleware,
  AccountControler.createAccount
);

accountRouter.get(
  "/fetchAccountUploadBatch",
  authMiddleware,
  AccountControler.fetchAccountUploadBatch
)

accountRouter.get(
  "/fetchLastAccountUploadBatch",
  authMiddleware,
  AccountControler.fetchLastAccountUploadBatch
)

module.exports = accountRouter;
