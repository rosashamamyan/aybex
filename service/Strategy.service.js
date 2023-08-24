const db = require("../models");

class StrategyService {
  async getStrategies() {
    const strategiesData = await db.models.Strategy.findAll({ include: { all: true } });
    return strategiesData;
  }

  async getStrategyTypes() {
    const strategyTypesData = await db.models.StrategyType.findAll({ include: { all: true } });
    return strategyTypesData;
  }
}

module.exports = new StrategyService();
