module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER } = DataTypes;
    const Address = sequelize.define(
      "addresses",
      {
        address: STRING,
        country: STRING,
        state: STRING,
        postal_code: INTEGER,
        city: STRING
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return Address;
  };