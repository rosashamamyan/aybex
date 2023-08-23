const Router = require("express").Router;
const UserControler = require("../../coontroler/UserControler");
const authMiddleware = require("../../middlewares/authMiddleware");
const { body } = require("express-validator");
const userRouter = new Router();

userRouter.post(
  "/createUser",
  authMiddleware,
  body("email").isEmail(),
  // body("password").isLength({ min: 3, max: 32 }),
  UserControler.createUser
);

userRouter.get("/getAllUsers", authMiddleware, UserControler.findAllUsers);

userRouter.get("/getUser/:userId", authMiddleware, UserControler.getUser)

userRouter.post("/updateUser", authMiddleware, UserControler.updateUser)

module.exports = userRouter;
