const StrategyService = require("../service/Strategy.service");

class StrategyControler {
  async getStrategies(req, res, next) {
    try {
      const strategiesData = await StrategyService.getStrategies()
      return res.json(strategiesData);
    } catch (e) {
      next(e);
    }
  }

  async getStrategyTypes(req, res, next) {
    try {
      const strategyTypesData = await StrategyService.getStrategyTypes()
      return res.json(strategyTypesData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new StrategyControler();