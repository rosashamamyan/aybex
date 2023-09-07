module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER } = DataTypes;
  const Account = sequelize.define(
    "accounts",
    {
      admin_account_id: INTEGER,
      name: STRING,
      created_by: INTEGER,
      updated_by: INTEGER,
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
  return Account;
};