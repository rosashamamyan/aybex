module.exports = (sequelize, DataTypes) => {
    const StrategyType = sequelize.define(
      "strategyType",
      {
        name: DataTypes.STRING
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return StrategyType;
};