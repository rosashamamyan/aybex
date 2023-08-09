const Router = require("express").Router;
// const UserControler = require("../coontroler/UserControler");
const router = new Router();
const authRouter = require("./auth/index");

router.use("/auth", authRouter);

module.exports = router;
