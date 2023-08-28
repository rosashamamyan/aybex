module.exports = (sequelize, DataTypes) => {
    const Strategy = sequelize.define(
      "strategy",
      {
        icon: DataTypes.STRING,
        strategy_name: DataTypes.STRING,
        status: DataTypes.INTEGER,
        primary_color: DataTypes.STRING,
        secondary_color: DataTypes.STRING,
        video: DataTypes.STRING,
        sequence: DataTypes.INTEGER,
        short_desc_web: DataTypes.STRING,
        short_desc_mobile: DataTypes.STRING,
        open_closed: DataTypes.INTEGER,
        desc_web_mob: DataTypes.STRING,
        long_desc: DataTypes.STRING
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return Strategy;
};