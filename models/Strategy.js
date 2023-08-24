module.exports = (sequelize, DataTypes) => {
    const Strategy = sequelize.define(
      "strategy",
      {
        icon: DataTypes.STRING,
        strategy_name: DataTypes.STRING,
        status: DataTypes.INTEGER,
        color: DataTypes.STRING,
        video: DataTypes.STRING,
        order: DataTypes.INTEGER
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return Strategy;
};