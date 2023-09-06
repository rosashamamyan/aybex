module.exports = (sequelize, DataTypes) => {
    const {STRING, INTEGER, DECIMAL, DATEONLY} = DataTypes
    const AccountTransactions = sequelize.define(
      "account_transactions",
      {
        amount: INTEGER,
        date: DATEONLY,
        type: STRING,
        created_by: INTEGER,
        updated_by: INTEGER
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return AccountTransactions;
  };