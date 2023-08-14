const Router = require("express").Router;
const router = new Router();
const userRouter = require("./user/index");
const authRouter = require("./auth/index");

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
