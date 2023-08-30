module.exports = (sequelize, DataTypes) => {
  const { STRING } = DataTypes;
    const StrategyType = sequelize.define(
      "strategyType",
      {
        name: STRING
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return StrategyType;
};