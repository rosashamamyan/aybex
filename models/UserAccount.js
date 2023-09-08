module.exports = (sequelize, DataTypes) => {
    const { INTEGER, STRING } = DataTypes;
    const UserAccount = sequelize.define(
      "user_account",
      {
        account_number: STRING,
        account_status: INTEGER
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return UserAccount;
};