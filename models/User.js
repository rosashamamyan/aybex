module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
  return User;
};
