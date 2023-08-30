module.exports = (sequelize, DataTypes) => {
  const { STRING } = DataTypes;
    const Role = sequelize.define(
      "roles",
      {
        role: STRING
      },
      {
        timestamps: true,
        freezeTableName: true
      }
    );
    return Role;
  };