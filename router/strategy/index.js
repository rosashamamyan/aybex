const Router = require("express").Router;
const StrategyControler = require("../../coontroler/StrategyControler");
const authMiddleware = require("../../middlewares/authMiddleware");
const strategyRouter = new Router();

strategyRouter.get("/getStrategies", authMiddleware, StrategyControler.getStrategies);

strategyRouter.get("/getStrategyTypes", authMiddleware, StrategyControler.getStrategyTypes);

strategyRouter.post("/createStrategy", authMiddleware, StrategyControler.createStrategy)

module.exports = strategyRouter;