module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define(
      "addresses",
      {
        address: DataTypes.STRING,
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        postal_code: DataTypes.INTEGER,
        city: DataTypes.STRING
      },
      {
        timestamps: true,
        freezeTableName: true
      }
    );
    return Address;
  };