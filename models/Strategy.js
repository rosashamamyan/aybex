module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER } = DataTypes;
    const Strategy = sequelize.define(
      "strategy",
      {
        icon: STRING,
        strategy_name: STRING,
        status: INTEGER,
        primary_color: STRING,
        secondary_color: STRING,
        video: STRING,
        sequence: INTEGER,
        short_desc_web: STRING,
        short_desc_mobile: STRING,
        open_closed: INTEGER,
        desc_web_mob: STRING,
        long_desc: STRING
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return Strategy;
};