const ApiError = require("../exeptions/apiError");
const db = require("../models");

class StrategyService {
  async getStrategies() {
    const strategiesData = await db.models.Strategy.findAll({
      include: { all: true },
    });
    return strategiesData;
  }

  async getStrategy(strategyId) {
    const strategyData = await db.models.Strategy.findOne({
      where: {
        id: strategyId,
      },
    });
    return strategyData;
  }

  async getStrategyTypes() {
    const strategyTypesData = await db.models.StrategyType.findAll({
      include: { all: true },
    });
    return strategyTypesData;
  }

  async createStrategy(
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
    long_desc
  ) {
    const allStrategies = await db.models.Strategy.findAll();
    const existsStrategy = await db.models.Strategy.findOne({
      where: {
        strategy_name,
      },
    });
    if (existsStrategy) {
      throw ApiError.BadRequest(
        `Strategy with ${strategy_name} name already exists`
      );
    }

    db.models.Strategy.update(
      {
        sequence: allStrategies.length + 1,
      },
      {
        where: {
          sequence,
        },
      }
    );

    const createdStrategy = db.models.Strategy.create({
      strategy_name,
      icon,
      status,
      open_closed,
      sequence,
      video,
      primary_color,
      secondary_color,
      strategyTypeId: strategy_type,
      short_desc_web,
      short_desc_mobile,
      desc_web_mob,
      long_desc,
    });
    return createdStrategy;
  }

  async editStrategy(
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
  ) {
    const updatedSequence = await db.models.Strategy.update(
      {
        sequence: exisedSequence,
      },
      {
        where: {
          sequence,
        },
      }
    );
    const editedStrategy = await db.models.Strategy.update(
      {
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
      },
      { where: { id } }
    );
    return editedStrategy;
  }

  async deleteStrategy(strategyId) {
    await db.models.Strategy.destroy({
      where: {
        id: strategyId
      }
    })
    const strategiesData = await db.models.Strategy.findAll();
    const updatedStrategies = strategiesData.map((elm, index) => {
      return {
        id: elm.id, 
        sequence: index + 1,
      };
    });

    await db.models.Strategy.bulkCreate(updatedStrategies, {
      updateOnDuplicate: ['sequence']
    });

    const newStrategiesData = await db.models.Strategy.findAll();
    return newStrategiesData
  }
}

module.exports = new StrategyService();
