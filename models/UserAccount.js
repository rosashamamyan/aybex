module.exports = (sequelize, DataTypes) => {
    const { INTEGER } = DataTypes;
    const UserAccount = sequelize.define(
      "user_account",
      {
        user_id: INTEGER,
        account_number: INTEGER,
        account_status: INTEGER
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return UserAccount;
};