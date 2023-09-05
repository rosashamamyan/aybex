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

  async getStrategy(req, res, next) {
    try {
      const strategyId = req.params.strategyId
      const strategyData = await StrategyService.getStrategy(strategyId)
      return res.json(strategyData)
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

  async createStrategy(req, res, next) {
    console.log("req.bodyyyyyyyyyy", req.body);
   
   
    try {
    //   const {
    //     strategy_name,
    //     icon,
    //     status,
    //     open_closed,
    //     sequence,
    //     video,
    //     primary_color,
    //     secondary_color,
    //     strategy_type,
    //     short_desc_web,
    //     short_desc_mobile,
    //     desc_web_mob,
    //     long_desc,
    //   } = req.body;
    //   const createdStrategy = await StrategyService.createStrategy(
    //     strategy_name,
    //     icon,
    //     status,
    //     open_closed,
    //     sequence,
    //     video,
    //     primary_color,
    //     secondary_color,
    //     strategy_type,
    //     short_desc_web,
    //     short_desc_mobile,
    //     desc_web_mob,
    //     long_desc
    //   );
    //   return res.json(createdStrategy);
    } catch (e) {
      next(e);
    }
  }

  async editStrategy(req, res, next) {
    try {
      const {
        id,
        strategy_name,
        icon,
        status,
        open_closed,
        sequence,
        video,
        primary_color,
        secondary_color,
        strategy_type,
        short_desc_web,
        short_desc_mobile,
        desc_web_mob,
        long_desc,
        exisedSequence
      } = req.body;

      const editedStrategy = await StrategyService.editStrategy(
        id,
        strategy_name,
        icon,
        status,
        open_closed,
        sequence,
        video,
        primary_color,
        secondary_color,
        strategy_type,
        short_desc_web,
        short_desc_mobile,
        desc_web_mob,
        long_desc,
        exisedSequence
      )

      return res.json(editedStrategy);
    } catch (e) {
      next(e)
    }
  }

  async deleteStrategy (req, res, next) {
      try {
        const {strategyId} = req.body
        const newStrategiesData = await StrategyService.deleteStrategy(strategyId)
        return res.json(newStrategiesData)
      } catch(e) {
        next(e)
      }
  }
}

module.exports = new StrategyControler();