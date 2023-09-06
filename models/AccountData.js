module.exports = (sequelize, DataTypes) => {
    const {INTEGER, DECIMAL, DATEONLY} = DataTypes
    const AccountData = sequelize.define(
      "account_data",
      {
        commited: DECIMAL(10, 2),
        contribution: DECIMAL(10, 2),
        distribution: DECIMAL(10, 2),
        redemption: DECIMAL(10, 2),
        balance: DECIMAL(10, 2),
        si_net_profit_loss: DECIMAL(10, 2),
        net_investor_irr: DECIMAL(10, 2),
        post_date: DATEONLY,
        created_by: INTEGER,
        updated_by: INTEGER
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return AccountData;
  };