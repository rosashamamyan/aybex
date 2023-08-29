const Router = require("express").Router;
const StrategyControler = require("../../coontroler/StrategyControler");
const authMiddleware = require("../../middlewares/authMiddleware");
const strategyRouter = new Router();
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       return cb(null, "../../../client/src/assets/images")
//     },
//     filename: function (req, file, cb) {
//       return cb(null, `${Date.now()}_${file.originalname}`)
//     }
//   })
  
// const upload = multer({storage})

strategyRouter.get("/getStrategies", authMiddleware, StrategyControler.getStrategies);

strategyRouter.get("/getStrategy/:strategyId", authMiddleware, StrategyControler.getStrategy)

strategyRouter.get("/getStrategyTypes", authMiddleware, StrategyControler.getStrategyTypes);

strategyRouter.post("/createStrategy", authMiddleware, StrategyControler.createStrategy) //upload.single("icon")

strategyRouter.post("/editStrategy", authMiddleware, StrategyControler.editStrategy)

module.exports = strategyRouter;