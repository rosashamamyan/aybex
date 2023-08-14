module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      timestamps: true,
      freezeTableName: true
    }
  );
  return User;
};
