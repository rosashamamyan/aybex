const Router = require("express").Router;
const router = new Router();
const userRouter = require("./user/index");
const authRouter = require("./auth/index");
const strategyRouter = require("./strategy/index")
const accountRouter = require("./account/index")

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/strategy", strategyRouter)
router.use("/account", accountRouter)

module.exports = router;
