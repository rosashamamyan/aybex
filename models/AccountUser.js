module.exports = (sequelize, DataTypes) => {
    const {STRING, INTEGER} = DataTypes
    const AccountUser = sequelize.define(
      "account_users",
      {
        account_status: INTEGER,
        created_by: INTEGER,
        updated_by: INTEGER
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return AccountUser;
  };