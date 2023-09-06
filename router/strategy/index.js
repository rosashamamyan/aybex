const Router = require("express").Router;
const StrategyControler = require("../../coontroler/StrategyControler");
const authMiddleware = require("../../middlewares/authMiddleware");
const path = require("path");
const strategyRouter = new Router();
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets/images"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

strategyRouter.get(
  "/getStrategies",
  authMiddleware,
  StrategyControler.getStrategies
);

strategyRouter.get(
  "/getStrategy/:strategyId",
  authMiddleware,
  StrategyControler.getStrategy
);

strategyRouter.get(
  "/getStrategyTypes",
  authMiddleware,
  StrategyControler.getStrategyTypes
);

strategyRouter.post(
  "/createStrategy",
  authMiddleware,
  upload.single("file"),
  StrategyControler.createStrategy
);

strategyRouter.post(
  "/editStrategy",
  authMiddleware,
  upload.single("file"),
  StrategyControler.editStrategy
);

strategyRouter.post(
  "/deleteStrategy",
  authMiddleware,
  StrategyControler.deleteStrategy
);

module.exports = strategyRouter;
