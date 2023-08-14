const Router = require("express").Router;
const UserControler = require("../../coontroler/UserControler");
const authMiddleware = require("../../middlewares/authMiddleware");
const { body } = require("express-validator");
const userRouter = new Router();

userRouter.post(
  "/create",
  authMiddleware,
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserControler.create
);

userRouter.get("/getAllUsers", authMiddleware, UserControler.findAllUsers);

module.exports = userRouter;
