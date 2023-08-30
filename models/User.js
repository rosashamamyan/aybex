module.exports = (sequelize, DataTypes) => {
  const { STRING, DATEONLY } = DataTypes;
  const User = sequelize.define(
    "users",
    {
      email: STRING,
      password: STRING,
      firstName: STRING,
      lastName: STRING,
      phone: STRING,
      dob: DATEONLY,
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
  return User;
};
