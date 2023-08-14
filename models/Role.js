module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
      "roles",
      {
        role: DataTypes.STRING
      },
      {
        timestamps: true,
        freezeTableName: true
      }
    );
    return Role;
  };