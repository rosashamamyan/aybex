module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      hashRT: DataTypes.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return User;
};
