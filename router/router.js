const Router = require("express").Router;
const router = new Router();
const userRouter = require("./user/index");
const authRouter = require("./auth/index");
const strategyRouter = require("./strategy/index")

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/strategy", strategyRouter)

module.exports = router;
