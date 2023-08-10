const Router = require("express").Router;
const router = new Router();
const authRouter = require("./auth/index");

router.use("/auth", authRouter);

module.exports = router;
